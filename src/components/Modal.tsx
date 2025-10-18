import React, { useEffect, useRef } from 'react';
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
}

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
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-spacing-md',
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'bg-black bg-opacity-50 backdrop-blur-sm',
        'transition-opacity duration-300',
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={cn(
          'relative bg-white rounded-lg shadow-xl',
          'transform transition-all duration-300',
          'w-full mx-spacing-md',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-spacing-lg border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'p-spacing-xs rounded-md',
                  'text-gray-400 hover:text-gray-600',
                  'hover:bg-gray-100 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500'
                )}
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn('p-spacing-lg', contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Convenience components for different sizes
export function SmallModal(props: Omit<ModalProps, 'size'>) {
  return <Modal size="sm" {...props} />;
}

export function LargeModal(props: Omit<ModalProps, 'size'>) {
  return <Modal size="lg" {...props} />;
}

export function ExtraLargeModal(props: Omit<ModalProps, 'size'>) {
  return <Modal size="xl" {...props} />;
}

export function FullModal(props: Omit<ModalProps, 'size'>) {
  return <Modal size="full" {...props} />;
}

// Modal with no close button
export function NonDismissibleModal(props: Omit<ModalProps, 'showCloseButton' | 'closeOnOverlayClick' | 'closeOnEscape'>) {
  return (
    <Modal
      showCloseButton={false}
      closeOnOverlayClick={false}
      closeOnEscape={false}
      {...props}
    />
  );
}

// Modal footer component for consistent button placement
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn(
      'flex items-center justify-between pt-spacing-lg border-t border-gray-200 mt-spacing-lg',
      className
    )}>
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
  return (
    <div className={cn('space-y-spacing-md', className)}>
      {children}
    </div>
  );
}
