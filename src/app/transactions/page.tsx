'use client';

import React from 'react';
import { useNewTransactionModal } from '@/providers';

import AddTransactionModal from './transaction-modal-headless/components/transactions/AddTransactionModal';

const tabs = ['All', 'Active', 'Pending', 'Closed'] as const;
type Tab = typeof tabs[number];

export default function TransactionsPage() {
  const [active, setActive] = React.useState<Tab>('All');
  const { isOpen, close } = useNewTransactionModal();

  return (
    <div className="min-h-full">
      {/* Page header */}
      <section className="px-6 pb-8 pt-8 bg-[#F7F8FA]">
        <h1 className="text-[24px] leading-[32px] font-bold tracking-[0.24px] text-[#1A1A1A]">
          Transactions
        </h1>

        <div className="mt-[21px] border-b border-gray-200">
          <div className="flex items-center gap-2 h-9">
            {tabs.map((t) => {
              const isActive = t === active;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={[
                    'relative h-9 px-3 text-[20px] leading-[24px] font-medium',
                    isActive ? 'text-primary-700' : 'text-gray-500',
                  ].join(' ')}
                >
                  {t}
                  {isActive && (
                    <span className="absolute left-0 bottom-[-1px] h-[2px] w-full bg-primary-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content (unchanged) */}
      <main className="px-6 pt-0 pb-8">
        <section className="rounded-2xl border border-gray-200 bg-white">
          <header className="px-6 py-8">
            <h2 className="text-[24px] leading-[32px] font-semibold text-[#1A1A1A]">Listings</h2>
          </header>

          <div className="grid grid-cols-4 gap-6 border-t border-gray-200 px-6 py-4 text-gray-500 text-[12px] tracking-[0.6px]">
            <div>STATUS</div>
            <div>LISTING</div>
            <div>LIST DATE</div>
            <div>LEAD SOURCE</div>
          </div>

          <div className="px-6 pb-8">
            <div className="h-[200px] rounded-xl border border-gray-200 grid place-items-center text-center">
              <div>
                <div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-lg border-2 border-gray-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 mx-auto" aria-hidden>
                    <rect x="7" y="7" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </div>
                <div className="text-[20px] leading-[28px] font-semibold text-[#1A1A1A]">No Listings Yet</div>
                <div className="text-gray-500 mt-1">Add a listing to track status, lead source, and commissions.</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mount the NEW modal only */}
      <AddTransactionModal
        isOpen={isOpen}
        onClose={close}
        onSave={(data: { type: 'buyer' | 'seller' | 'tenant' | 'landlord' }) => {
          console.log('save later to Supabase', data);
        }}
      />
    </div>
  );
}
