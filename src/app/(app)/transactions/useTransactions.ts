// src/domain/transactions/useTransactions.ts
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type {
  TransactionRow,
  NewTransactionInput,
  UpdateTransactionInput,
  TransactionStatus,
} from './types';

type FetchOpts = {
  status?: TransactionStatus | 'All';
  limit?: number;
  offset?: number;
};

export function useTransactions() {
  const [rows, setRows] = useState<TransactionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);
  const currentUserIdRef = useRef<string | null>(null);

  // ————————————————————————————
  // Fetch
  // ————————————————————————————
  const fetchAll = useCallback(
    async (opts: FetchOpts = {}) => {
      const { status = 'All', limit, offset } = opts;
      setLoading(true);
      setError(null);

      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr) {
        setError(userErr.message);
        setRows([]);
        setLoading(false);
        return;
      }
      if (!user) {
        setRows([]);
        setLoading(false);
        return;
      }

      currentUserIdRef.current = user.id;

      let query = supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (status !== 'All') query = query.eq('status', status);
      if (typeof limit === 'number') query = query.range(offset ?? 0, (offset ?? 0) + limit - 1);

      const { data, error } = await query.returns<TransactionRow[]>();

      if (error) {
        if (mounted.current) {
          setError(error.message);
          setRows([]);
          setLoading(false);
        }
        return;
      }

      if (mounted.current) {
        setRows(data ?? []);
        setLoading(false);
      }
    },
    []
  );

  // ————————————————————————————
  // Realtime (scope to current user)
  // ————————————————————————————
  useEffect(() => {
    mounted.current = true;

    // Initial fetch
    fetchAll();

    // Attach realtime after we know user_id
    let unsub = () => {};
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Keep a stable ref
      currentUserIdRef.current = user.id;

      const channel = supabase
        .channel('transactions-feed')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'transactions',
            filter: `user_id=eq.${user.id}`, // scope to the signed-in user
          },
          () => fetchAll()
        )
        .subscribe();

      unsub = () => supabase.removeChannel(channel);
    })();

    return () => {
      mounted.current = false;
      unsub();
    };
  }, [fetchAll]);

  // ————————————————————————————
  // Mutations (return rows for optimistic UX if needed)
  // ————————————————————————————
  const add = useCallback(
    async (payload: NewTransactionInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('transactions')
        .insert({ ...payload, user_id: user.id })
        .select('*')
        .single<TransactionRow>();

      if (error) throw error;

      // Optimistic: local push (realtime will also refetch)
      setRows((prev) => [data, ...prev]);
      return data;
    },
    []
  );

  const update = useCallback(
    async (id: string, payload: UpdateTransactionInput) => {
      const { data, error } = await supabase
        .from('transactions')
        .update(payload)
        .eq('id', id)
        .select('*')
        .single<TransactionRow>();

      if (error) throw error;

      // Optimistic local update
      setRows((prev) => prev.map((r) => (r.id === id ? data : r)));
      return data;
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) throw error;

    // Optimistic local remove
    setRows((prev) => prev.filter((r) => r.id !== id));
  }, []);

  // ————————————————————————————
  // API
  // ————————————————————————————
  return useMemo(
    () => ({
      rows,
      loading,
      error,
      fetchAll,  // accepts { status, limit, offset }
      add,
      update,
      remove,
    }),
    [rows, loading, error, fetchAll, add, update, remove]
  );
}
