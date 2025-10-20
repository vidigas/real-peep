// src/app/transactions/TransactionTable.tsx
'use client';

import React, { useMemo } from 'react';
import type { TransactionRow } from './types';

function formatDate(d: string | null) {
  if (!d) return '-';
  // Accept "YYYY-MM-DD" or ISO; guard invalid dates
  const dt = new Date(d.length === 10 ? `${d}T00:00:00` : d);
  if (isNaN(dt.getTime())) return '-';
  return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: '2-digit' }).format(dt);
}

export default function TransactionTable({
  rows,
  onEdit,
  onDelete,
}: {
  rows: TransactionRow[];
  onEdit: (row: TransactionRow) => void;
  onDelete: (row: TransactionRow) => void;
}) {
  const hasRows = rows && rows.length > 0;

  const statusClass = useMemo(
    () =>
      ({
        active:
          'bg-green-50 text-green-700 border-green-200',
        pending:
          'bg-amber-50 text-amber-700 border-amber-200',
        closed:
          'bg-gray-50 text-gray-700 border-gray-200',
      } as const),
    []
  );

  if (!hasRows) {
    return (
      <div className="px-6 pb-8">
        <div className="h-[200px] rounded-xl border border-gray-200 grid place-items-center text-center">
          <div>
            <div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-lg border-2 border-gray-300">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-400 mx-auto"
                aria-hidden
              >
                <rect
                  x="7"
                  y="7"
                  width="10"
                  height="12"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
              </svg>
            </div>
            <div className="text-[20px] leading-[28px] font-semibold text-[#1A1A1A]">
              No Listings Yet
            </div>
            <div className="text-gray-500 mt-1">
              Add a listing to track status, lead source, and commissions.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {rows.map((r) => (
        <div key={r.id} className="grid grid-cols-4 gap-6 px-6 py-4 items-center">
          {/* STATUS */}
          <div className="text-sm">
            <span
              className={[
                'inline-flex items-center rounded-full px-2 py-1 text-xs border',
                statusClass[r.status] ?? 'bg-gray-50 text-gray-700 border-gray-200',
              ].join(' ')}
              data-status={r.status}
            >
              {r.status}
            </span>
          </div>

          {/* LISTING */}
          <div className="text-sm text-gray-900 truncate" title={r.listing ?? '-'}>
            {r.listing ?? '-'}
          </div>

          {/* LIST DATE */}
          <div className="text-sm text-gray-700">
            {r.list_date ? (
              <time dateTime={r.list_date}>{formatDate(r.list_date)}</time>
            ) : (
              '-'
            )}
          </div>

          {/* LEAD SOURCE */}
          <div className="text-sm text-gray-700 truncate" title={r.lead_source ?? '-'}>
            {r.lead_source ?? '-'}
          </div>

          {/* Row actions (full width below in the same grid template) */}
          <div className="col-span-4 flex gap-3 justify-end">
            <button
              type="button"
              className="text-sm text-primary-700 hover:underline"
              onClick={() => onEdit(r)}
              aria-label={`Edit transaction ${r.id}`}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-sm text-error-600 hover:underline"
              onClick={() => onDelete(r)}
              aria-label={`Delete transaction ${r.id}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
