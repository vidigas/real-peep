'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

type Ctx = { isOpen: boolean; open: () => void; close: () => void };
const Ctx = createContext<Ctx | null>(null);

export function NewTransactionProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }), [isOpen]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNewTransactionModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useNewTransactionModal must be used within NewTransactionProvider');
  return ctx;
}
