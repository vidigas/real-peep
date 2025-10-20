// components/transactions/BuyersTableCard.tsx
'use client';
import * as React from 'react';
import { Text } from '@/components/Typography';
import TableCardWithRows, { BaseRow, StatusCell } from '../table/TableCardWithRows';

function formatDate(value?: string | null) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(+d)) return '—';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: '2-digit', year: 'numeric' })
    .format(d)
    .replace(/\s/, ', ');
}

function field<T = unknown>(obj: BaseRow, ...keys: string[]): T | undefined {
  const r = obj as unknown as Record<string, T>;
  for (const k of keys) {
    const v = r[k];
    if (v != null && (typeof v !== 'string' || v.trim() !== '')) return v;
  }
  return undefined;
}

export default function BuyersTableCard({
  rows, onRefresh, onDelete,
}: { rows: BaseRow[]; onRefresh?: () => void; onDelete?: (r: BaseRow) => void | Promise<void>; }) {
  const cols = [
    { key: 'status', header: 'STATUS', render: StatusCell },
    {
      key: 'buyer',
      header: 'BUYER',
      render: (r: BaseRow) => {
        // top line (bold) can be a small label; keep "—" for now
        const title = field<string>(r, 'buyer_label') ?? '—';
    
        // muted 2nd line = the name we mapped above, with fallbacks
        const name =
          field<string>(r, 'name_for_second_line', 'client_name', 'buyer_full_name', 'buyer') ?? '—';
    
        return (
          <div>
            <Text size="md" weight="bold" color="heading">{title}</Text>
            <Text size="sm" color="muted">{name}</Text>
          </div>
        );
      },
    },
    {
      key: 'start_date',
      header: 'START DATE',
      render: (r: BaseRow) => {
        // Support both buyer start_date and a generic list_date fallback
        const date = (field<string | null>(r, 'start_date') ?? field<string | null>(r, 'agreement_start') ?? field<string | null>(r, 'list_date')) ?? null;
        return <Text size="md">{formatDate(date)}</Text>;
      },
    },
    {
      key: 'lead_source',
      header: 'LEAD SOURCE',
      render: (r: BaseRow) => <Text size="md">{(r.lead_source as string | null) ?? '—'}</Text>,
    },
  ];

  return (
    <TableCardWithRows
      title="Buyers"
      columns={cols}
      rows={rows}
      onRefresh={onRefresh}
      onDelete={onDelete}
    />
  );
}
