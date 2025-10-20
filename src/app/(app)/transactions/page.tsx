'use client';

import React from 'react';
import { useNewTransactionModal } from '@/providers';
import AddTransactionModal from './transaction-modal-headless/components/transactions/AddTransactionModal';
import { Display, Text } from '@/components/Typography';
import TransactionTable from './TransactionTable';
import { NewTransactionInput } from './types';
import { useTransactions } from './useTransactions';

const tabs = ['All', 'Active', 'Pending', 'Closed'] as const;
type Tab = (typeof tabs)[number];

export default function TransactionsPage() {
  const [active, setActive] = React.useState<Tab>('All');
  const { isOpen, close } = useNewTransactionModal();

  // Hook connected to Supabase
  const { rows, loading, add, remove } = useTransactions();

  // Derived rows for active tab
  const filteredRows =
    active === 'All'
      ? rows
      : rows.filter((r) => r.status.toLowerCase() === active.toLowerCase());

  return (
    <div className="min-h-full">
      {/* Page header */}
      <section className="px-6 pb-0 pt-8 bg-[#F7F8FA]">
        <Display
          as="h1"
          size="xs"
          weight="bold"
          color="heading"
          className="tracking-[0.24px]"
        >
          Transactions
        </Display>

        {/* Tabs */}
        <div className="mt-5 mb-8 border-b border-gray-200">
          <div
            role="tablist"
            aria-label="Transaction filters"
            className="flex items-center gap-2 h-9"
          >
            {tabs.map((t) => {
              const isActive = t === active;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(t)}
                  className={[
                    'relative h-9 px-3 outline-none',
                    isActive
                      ? 'text-primary-700'
                      : 'text-gray-500 hover:text-gray-600',
                    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700 rounded-md',
                  ].join(' ')}
                >
                  <Text as="span" size="md" weight="bold" color="inherit">
                    {t}
                  </Text>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute left-0 bottom-[-1px] h-[2px] w-full bg-primary-700 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="px-6 pt-0 pb-8">
        <section className="rounded-2xl border border-gray-200 bg-white">
          <header className="px-6 py-8">
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#1A1A1A]">
              Listings
            </h2>
          </header>

          {/* Table headings */}
          <div className="grid grid-cols-4 gap-6 border-t border-gray-200 px-6 py-4 text-gray-500 text-[12px] tracking-[0.6px]">
            <div>STATUS</div>
            <div>LISTING</div>
            <div>LIST DATE</div>
            <div>LEAD SOURCE</div>
          </div>

          {/* Table / Empty State */}
          {loading ? (
            <div className="px-6 py-10 text-gray-500">Loading…</div>
          ) : filteredRows.length === 0 ? (
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
          ) : (
            <TransactionTable
              rows={filteredRows}
              onEdit={(row) => {
                console.log('Edit transaction', row.id);
              }}
              onDelete={async (row) => {
                await remove(row.id);
              }}
            />
          )}
        </section>
      </main>

      {/* Modal (Save → add to Supabase) */}
      <AddTransactionModal
        isOpen={isOpen}
        onClose={close}
        onSave={async (payload: NewTransactionInput) => {
          await add(payload);
          close();
        }}
      />
    </div>
  );
}
