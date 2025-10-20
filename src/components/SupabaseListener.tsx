'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SupabaseListener() {
  const router = useRouter();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.refresh(); // re-run middleware on next nav/render
    });
    return () => subscription.unsubscribe();
  }, [router]);
  return null;
}
