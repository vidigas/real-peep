'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Optional node rendered under the title (we use it for the Stepper row). */
  subHeader?: React.ReactNode;
  children: React.ReactNode;

  /** Legacy width key – still works if you don’t pass panelClassName. */
  size?: ModalSize;

  /** Classes for the OUTER dialog panel (width/height). */
  panelClassName?: string;

  /** Classes for the inner flex wrapper (e.g., make it h-full, p-0). */
  contentClassName?: string;

  /** Class for the title row container. */
  headerClassName?: string;

  /** Optional: id for aria-labelledby if you manage labels yourself. */
  labelledById?: string;
};

const sizeToWidth: Record<ModalSize, string> = {
  sm: 'w-[440px]',
  md: 'w-[640px]',
  lg: 'w-[760px]',
  xl: 'w-[880px]',
};

export function Modal({
  isOpen,
  onClose,
  title,
  subHeader,
  children,
  size = 'md',
  panelClassName,
  contentClassName,
  headerClassName,
  labelledById,
}: ModalProps) {
  // lock body scroll while open
  React.useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const titleId =
    labelledById ?? (title ? 'modal-title-' + Math.random().toString(36).slice(2) : undefined);

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      {/* scrim */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" onClick={onClose} />

      {/* panel */}
      <div className="absolute inset-0 grid place-items-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn(
            // clip children so footer corners follow the panel radius
            'rounded-2xl bg-white shadow-2xl overflow-hidden',
            sizeToWidth[size],
            'max-w-[calc(100vw-32px)]',
            panelClassName
          )}
        >
          {/* inner flex column */}
          <div className={cn('flex flex-col', contentClassName)}>
            {/* Header */}
            {(title || subHeader) && (
              <>
                {title && (
                  <div className={cn('px-6 pt-6 pb-0 h-[56px]', headerClassName)}>
                    <div className="flex items-start justify-between">
                      {/* Figma: 24/32, 700, +0.24, #1A1A1A */}
                      <Text
                        id={titleId}
                        as="h2"
                        size="md"
                        className="text-[24px] leading-[32px] font-bold tracking-[0.24px] text-[#1A1A1A]"
                      >
                        {title}
                      </Text>

                      <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-700"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path
                            d="M15 5L5 15M5 5l10 10"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Stepper row: fixed to 48px; 24px side padding */}
                {subHeader}
              </>
            )}

            {/* body + footer are provided by children */}
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ----------------------- Layout helpers ----------------------- */

type SectionProps = React.HTMLAttributes<HTMLDivElement>;

/** Use inside the modal for the scrolled middle region’s padding rhythm. */
export function ModalBody({ className, ...rest }: SectionProps) {
  return <div className={cn('px-6', className)} {...rest} />;
}

/** Fixed footer row (stick it at the bottom of your inner flex). */
export function ModalFooter({ className, ...rest }: SectionProps) {
  return (
    <div
      className={cn(
        // Figma: 20px (x) × 12px (y); 8px gap between buttons; top divider; rounded bottom
        'mt-auto flex items-center justify-between gap-2 border-t border-gray-200 px-6 py-3 rounded-b-2xl bg-white',
        className
      )}
      {...rest}
    />
  );
}

export default Modal;
