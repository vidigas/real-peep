import React, { useRef } from 'react';
import { cn } from '../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
  className?: string;
  labelClassName?: string;
  indeterminate?: boolean;
}

export function Checkbox({
  label,
  description,
  size = 'md',
  variant = 'default',
  className,
  labelClassName,
  checked,
  indeterminate,
  disabled,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isChecked = checked || indeterminate;
  const isDisabled = disabled;

  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const spacingClasses = {
    sm: 'gap-spacing-sm',
    md: 'gap-spacing-md',
    lg: 'gap-spacing-lg',
  };

  // Checkbox icon component
  const CheckIcon = () => (
    <svg
      className="w-3 h-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Indeterminate icon component
  const IndeterminateIcon = () => (
    <svg
      className="w-3 h-3 text-white"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const checkboxElement = (
    <div className="relative">
      <input ref={inputRef}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        disabled={isDisabled}
        {...props}
      />
      <div
        className={cn(
          'flex items-center justify-center',
          'border-2 border-solid rounded-sm',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          sizeClasses[size],
          
          // States
          isDisabled
            ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
            : isChecked
            ? 'bg-primary-500 border-primary-500 hover:bg-primary-600 focus:ring-primary-500'
            : 'bg-white border-gray-300 hover:border-primary-500 focus:ring-primary-500'
        )}
      >
        {isChecked && (
          <div className="flex items-center justify-center">
            {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
          </div>
        )}
      </div>
    </div>
  );

  // Card variant with background
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'flex items-start gap-spacing-md p-spacing-lg',
          'border border-solid rounded-lg',
          'transition-colors duration-200',
          'cursor-pointer',
          isDisabled
            ? 'bg-gray-50 border-gray-200 cursor-not-allowed'
            : isChecked
            ? 'bg-primary-50 border-primary-500 hover:bg-primary-100'
            : 'bg-white border-gray-200 hover:border-primary-300 hover:bg-gray-50',
          className
        )}
        onClick={() => !isDisabled && props.onChange?.({ target: { checked: !isChecked } } as React.ChangeEvent<HTMLInputElement>)}
      >
        {checkboxElement}
        <div className="flex-1 min-w-0">
          {label && (
            <div className={cn('font-medium text-gray-900', textSizeClasses[size], labelClassName)}>
              {label}
            </div>
          )}
          {description && (
            <div className={cn('text-gray-500 mt-spacing-xs', textSizeClasses[size])}>
              {description}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <label
      className={cn(
        'flex items-start cursor-pointer',
        spacingClasses[size],
        isDisabled && 'cursor-not-allowed',
        className
      )}
    >
      {checkboxElement}
      {(label || description) && (
        <div className="flex-1 min-w-0">
          {label && (
            <div className={cn('font-medium text-gray-900', textSizeClasses[size], labelClassName)}>
              {label}
            </div>
          )}
          {description && (
            <div className={cn('text-gray-500 mt-spacing-xs', textSizeClasses[size])}>
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
}

// Convenience components
export function CheckboxCard({ children, ...props }: CheckboxProps) {
  return <Checkbox variant="card" {...props}>{children}</Checkbox>;
}

export function CheckboxSmall({ children, ...props }: CheckboxProps) {
  return <Checkbox size="sm" {...props}>{children}</Checkbox>;
}

export function CheckboxLarge({ children, ...props }: CheckboxProps) {
  return <Checkbox size="lg" {...props}>{children}</Checkbox>;
}
