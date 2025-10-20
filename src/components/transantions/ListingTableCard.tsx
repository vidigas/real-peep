// components/transactions/ListingsTableCard.tsx
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

export default function ListingsTableCard({
  rows, onRefresh, onDelete,
}: { rows: BaseRow[]; onRefresh?: () => void; onDelete?: (r: BaseRow) => void | Promise<void>; }) {
  const cols = [
    { key: 'status', header: 'STATUS', render: StatusCell },
    {
      key: 'listing',
      header: 'LISTING',
      render: (r: BaseRow) => {
        // 1st line: listing/address (unchanged)
        const title =
          (field<string>(r, 'listing_title', 'address_line', 'listing', 'owner_full_name')) ?? '—';
    
        // 2nd line: 👇 owner name preferred, then location
        const sub =
          (field<string>(r, 'owner_full_name')) ??
          (field<string>(r, 'location')) ??
          '—';
    
        return (
          <div>
            <Text size="md" weight="bold" color="heading">{title}</Text>
            <Text size="sm" color="muted">{sub}</Text>
          </div>
        );
      },
    },
    {
      key: 'list_date',
      header: 'LIST DATE',
      render: (r: BaseRow) => {
        const date = field<string | null>(r, 'list_date') ?? null;
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
      title="Listings"
      columns={cols}
      rows={rows}
      onRefresh={onRefresh}
      onDelete={onDelete}
    />
  );
}
