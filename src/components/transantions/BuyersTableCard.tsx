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

export default function BuyersTableCard({
  rows, onRefresh, onDelete,
}: { rows: BaseRow[]; onRefresh?: () => void; onDelete?: (r: BaseRow) => void | Promise<void>; }) {
  const cols = [
    { key: 'status', header: 'STATUS', render: StatusCell },
    { key: 'buyer', header: 'BUYER', render: (r: BaseRow) => (
        <div>
          <Text size="md" weight="bold" color="heading">{(r as Record<string, unknown>).buyer as string ?? (r as Record<string, unknown>).listing as string ?? '—'}</Text>
          <Text size="sm" color="muted">{(r as Record<string, unknown>).location as string ?? '—'}</Text>
        </div>
      ) },
    { key: 'start_date', header: 'START DATE', render: (r: BaseRow) => {
        const rs = r as Record<string, unknown>;
        const date = (rs.start_date as string | null) ?? (rs.list_date as string | null);
        return <Text size="md">{formatDate(date)}</Text>;
      } },
    { key: 'lead_source', header: 'LEAD SOURCE', render: (r: BaseRow) => <Text size="md">{(r.lead_source as string | null) ?? '—'}</Text> },
  ];
  return <TableCardWithRows title="Buyers" columns={cols} rows={rows} onRefresh={onRefresh} onDelete={onDelete} />;
}
