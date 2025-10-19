'use client';
import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';
import { Display } from './Typography'; // ⬅️ use DS typography

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  initialFocusRef?: React.RefObject<HTMLElement>;
  titleId?: string;
  ariaDescribedBy?: string;
  onCloseRequest?: (reason: 'overlay' | 'esc' | 'programmatic') => void;
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm:  'w-[min(640px,calc(100vw-32px))] max-h-[min(80vh,720px)]',
  md:  'w-[min(768px,calc(100vw-32px))] max-h-[min(85vh,800px)]',
  lg:  'w-[min(864px,calc(100vw-32px))] max-h-[min(88vh,880px)]',
  // Figma spec – Fixed 848×607 with small-screen clamp
  xl:  'w-[min(848px,calc(100vw-32px))] h-[min(607px,calc(100vh-32px))]',
  full:'w-[min(90vw,calc(100vw-32px))] h-[min(90vh,calc(100vh-32px))]',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
  contentClassName,
  initialFocusRef,
  titleId,
  ariaDescribedBy,
  onCloseRequest,
}: ModalProps) {
  const autoId = useId();
  const labelId = title ? (titleId ?? `modal-${autoId}-title`) : undefined;
  const contentRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement;
    (initialFocusRef?.current || contentRef.current)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onCloseRequest?.('esc');
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, initialFocusRef, closeOnEscape, onClose, onCloseRequest]);

  useEffect(() => { if (!isOpen) lastFocusedRef.current?.focus?.(); }, [isOpen]);

  if (!isOpen) return null;

  const overlay = (
    <div
      className={cn('fixed inset-0 z-50 flex items-center justify-center p-4', overlayClassName)}
      onClick={(e) => {
        if (!closeOnOverlayClick) return;
        if (e.target !== e.currentTarget) return;
        onCloseRequest?.('overlay');
        onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedBy}
        aria-label={!labelId && title ? title : undefined}
        tabIndex={-1}
        ref={contentRef}
        className={cn(
          'relative z-10 w-full bg-white shadow-xl outline-none',
          'rounded-[20px] overflow-hidden',
          'flex flex-col', // footer pinned
          'mx-auto',
          sizeClasses[size],
          contentClassName,
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            {title && (
              <Display
                as="h2"
                id={labelId}
                size="xs"
                weight="bold"
                color="heading"
                className="tracking-[0.24px]"
              >
                {title}
              </Display>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={() => { onCloseRequest?.('programmatic'); onClose(); }}
                aria-label="Close modal"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

/* Slots */
export function ModalBody({ children, className }: { children: React.ReactNode; className?: string; }) {
  return <div className={cn('flex-1 min-h-0 overflow-auto px-6 py-6', className)}>{children}</div>;
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <div className={cn('mt-auto px-6 py-6 border-t border-gray-200 flex items-center justify-between', className)}>
      {children}
    </div>
  );
}
