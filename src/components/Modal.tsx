// components/Modal.tsx
'use client';
import * as React from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<ModalSize, string> = {
  sm: 'w-[480px]',
  md: 'w-[640px]',
  lg: 'w-[720px]',
  xl: 'w-[848px]', // Figma width
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  contentClassName,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />
      {/* dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          'relative z-[101] w-full',
          sizeClasses[size],
          // keep 10px breathing room to viewport (Figma shows 10 outside)
          'my-[10px] mx-[10px]',
          // column so footer pins; Figma radius + shadow
          'flex flex-col rounded-[20px] bg-white',
          'shadow-[0_5px_20px_0_rgba(128,128,128,0.40)]',
          // height: cap to viewport minus 20px; ensure children can scroll
          'max-h-[calc(100vh-20px)] overflow-hidden'
        )}
      >
        {/* header — 20px gutters */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          {title ? (
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* content wrapper (caller controls extra padding per section) */}
        <div className={clsx('flex-1 min-h-0', contentClassName)}>{children}</div>
      </div>
    </div>
  );
}

export function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // no default px; callers add exact gutters
  return <div className={clsx('py-0', className)}>{children}</div>;
}

/** Full-bleed footer; restore 20px inner gutters; 16px vertical from Figma */
export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'mt-auto',
        '-mx-5 px-5',
        'py-4',
        'border-t border-gray-200',
        'flex items-center justify-between',
        className
      )}
    >
      {children}
    </div>
  );
}
