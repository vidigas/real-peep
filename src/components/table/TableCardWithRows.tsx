'use client';

import * as React from 'react';
import { Text } from '@/components/Typography';
import { TableCard, TableCardHeader, EmptyStateTable } from '@/components/table/EmptyTable';
import AddTransactionModal from '@/app/(app)/transactions/transaction-modal-headless/components/transactions/AddTransactionModal';
import type { NewTransactionInput } from '@/app/(app)/transactions/types';

type Status = 'active' | 'pending' | 'closed';

export type BaseRow = {
  id: string;
  status: Status;
  lead_source?: string | null;
  // anything else you need to pass to the edit modal:
  [key: string]: unknown;
};

type Column = {
  key: string;
  header: string;
  render: (row: BaseRow) => React.ReactNode;
  className?: string;
};

type Props = {
  title: string;
  columns: Column[];                // 4 columns to match layout
  rows: BaseRow[];
  onRefresh?: () => void;
  onDelete?: (row: BaseRow) => Promise<void> | void;
  /** show N rows then reveal a Show more control (optional) */
  initialCount?: number;
};

function StatusPill({ status }: { status: Status }) {
  const styles =
    status === 'active'
      ? 'text-green-700 bg-green-50 ring-green-200/80'
      : status === 'pending'
      ? 'text-amber-700 bg-amber-50 ring-amber-200/80'
      : 'text-red-700 bg-red-50 ring-red-200/80';
  const label = status[0].toUpperCase() + status.slice(1);
  return (
    <span className={`inline-flex h-7 items-center rounded-full px-3 text-sm ring-1 ring-inset ${styles}`}>
      {label}
    </span>
  );
}

export const StatusCell: Column['render'] = (row: BaseRow) => (
  <StatusPill status={row.status} />
);

function DeleteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337"
        stroke="#D32F2F" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TableCardWithRows({
  title,
  columns,
  rows,
  onRefresh,
  onDelete,
  initialCount = 4,
}: Props) {
  const [editing, setEditing] = React.useState<BaseRow | null>(null);
  const [expanded, setExpanded] = React.useState(false);

  const visibleRows = expanded ? rows : rows.slice(0, initialCount);
  const hasMore = rows.length > visibleRows.length;

  return (
    <>
      <TableCard>
        <TableCardHeader title={title} onRefresh={onRefresh} />

        {/* standardized 4-col header */}
        <div className="grid grid-cols-4 gap-6 px-6 py-3 border-t border-[#E0E0E0] bg-[#FAFAFA]">
          {columns.map((c) => (
            <Text key={c.key} as="div" size="xs" weight="medium" color="muted" className="tracking-[0.6px] uppercase">
              {c.header}
            </Text>
          ))}
        </div>

        {rows.length === 0 ? (
          <div className="px-6 pb-8">
            <EmptyStateTable heading={title} subtitle={`Add a ${title.slice(0, -1).toLowerCase()} to get started.`} />
          </div>
        ) : (
          <>
            <ul className="divide-y divide-[#E0E0E0]">
              {visibleRows.map((row) => (
                <li
                  key={row.id}
                  role="button"
                  tabIndex={0}
                  className="group grid grid-cols-4 gap-6 px-6 py-4 hover:bg-gray-50/70 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700 rounded-md"
                  onClick={() => setEditing(row)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setEditing(row); }
                  }}
                >
                  {columns.map((c, idx) => (
                    <div key={c.key + row.id} className={c.className ?? (idx === 0 ? 'flex items-center' : '')}>
                      {c.render(row)}
                    </div>
                  ))}

                  {/* delete icon in last column (right side) */}
                  <div className="col-span-4 -mt-10 flex justify-end pr-6">
                    <button
                      type="button"
                      aria-label="Delete"
                      className="invisible group-hover:visible rounded-full p-1 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); onDelete?.(row); }}
                    >
                      <DeleteIcon />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Show more / less */}
            <div className="px-6 py-3">
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="mx-auto flex items-center gap-2 text-green-700 hover:text-green-800"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Show more</span>
                </button>
              ) : rows.length > initialCount ? (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="mx-auto flex items-center gap-2 text-green-700 hover:text-green-800"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Show less</span>
                </button>
              ) : null}
            </div>
          </>
        )}
      </TableCard>

      {/* edit modal */}
      {editing && (
        <AddTransactionModal
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          initialData={editing as Partial<NewTransactionInput>}
          onSave={async () => { setEditing(null); }}
        />
      )}
    </>
  );
}
