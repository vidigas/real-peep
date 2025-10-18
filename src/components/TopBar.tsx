'use client';

import React from 'react';
import { useNewTransactionModal } from '@/providers'; // <- from /src/providers/new-transaction

export default function TopBar() {
  const { open } = useNewTransactionModal();

  return (
    <header className="h-20 border-b border-gray-200 bg-white flex items-center px-6">
      {/* Search (400 x 41) */}
      <div className="relative w-[400px]">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {/* magnifier */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
            <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </span>
        <input
          placeholder="Search for transactions, clients, finances"
          className="h-[41px] w-[400px] rounded-xl pl-10 pr-3 text-body-md text-gray-600 placeholder-gray-300 border border-gray-200 outline-none focus:border-gray-300 bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* + Transaction */}
        <button
          type="button"
          onClick={open}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-primary-500 text-white text-body-md hover:bg-primary-600 active:bg-primary-700"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Transaction
        </button>

        {/* Bell */}
        <button
          className="h-10 w-10 grid place-items-center rounded-lg text-gray-500 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9a6 6 0 1112 0v5l1.5 2H4.5L6 14V9z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M9.5 18a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
