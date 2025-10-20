'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
};

export function IconPill({ children, ariaLabel, onClick, className }: Props) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={[
        'h-12 w-12 grid place-items-center rounded-full bg-white',
        'shadow-[0_2px_4px_rgba(128,128,128,0.30)]',
        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-700/40',
        className ?? ''
      ].join(' ')}
    >
      {children}
    </button>
  );
}
