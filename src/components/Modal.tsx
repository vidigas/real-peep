import React, { useEffect, useRef, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';

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
  /** Focus this element when modal opens */
  initialFocusRef?: React.RefObject<HTMLElement>;
  /** Optional name/id to title element for aria-labelledby */
  titleId?: string;
  /** Optional callback to describe why it closed */
  onCloseRequest?: (reason: 'overlay' | 'esc' | 'programmatic') => void;
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw] h-[90vh]',
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
  onCloseRequest,
}: ModalProps) {
  const autoId = useId();
  const labelId = title ? (titleId ?? `modal-${autoId}-title`) : undefined;
  const contentRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      const toFocus = initialFocusRef?.current || contentRef.current;
      toFocus?.focus();
    } else {
      lastFocusedRef.current?.focus?.();
    }
  }, [isOpen, initialFocusRef]);

  // ESC to close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape' && closeOnEscape) {
      onCloseRequest?.('esc');
      onClose();
    }
  }, [isOpen, closeOnEscape, onClose, onCloseRequest]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const overlay = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        overlayClassName
      )}
      onClick={() => {
        if (!closeOnOverlayClick) return;
        onCloseRequest?.('overlay');
        onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Content */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        ref={contentRef}
        className={cn(
          'relative z-10 w-full mx-4 rounded-2xl bg-white shadow-xl outline-none',
          sizeClasses[size],
          contentClassName,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-spacing-lg border-b border-gray-200">
            {title && (
              <h2 id={labelId} className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={() => { onCloseRequest?.('programmatic'); onClose(); }}
                aria-label="Close modal"
                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="p-spacing-lg">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

// Sub-components to preserve API
interface ModalHeaderProps {
  children?: React.ReactNode;
  title?: string;
  titleId?: string;
  className?: string;
}
export function ModalHeader({ children, title, titleId, className }: ModalHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between p-spacing-lg border-b border-gray-200', className)}>
      {title ? <h2 id={titleId} className="text-xl font-semibold text-gray-900">{title}</h2> : children}
    </div>
  );
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}
export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn('flex items-center justify-end gap-3 p-spacing-lg border-t border-gray-200', className)}>
      {children}
    </div>
  );
}

// Modal body component for consistent content spacing
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}
export function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={cn('space-y-spacing-md', className)}>{children}</div>;
}
