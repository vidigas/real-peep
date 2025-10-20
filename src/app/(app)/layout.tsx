'use client';

import React from 'react';
import SideNav from '@/components/SideNav';
import { NewTransactionProvider } from '@/providers/newTransaction';
import TopBar from '@/components/topBar/TopBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <NewTransactionProvider>
      <div className="min-h-screen flex">
        <SideNav />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 bg-[#F7F8FA]">{children}</main>
        </div>
      </div>
    </NewTransactionProvider>
  );
}
