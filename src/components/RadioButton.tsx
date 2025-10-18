import React from 'react';
import { cn } from '../lib/utils';

interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'compact';
  className?: string;
  labelClassName?: string;
}

export function RadioButton({
  label,
  description,
  size = 'md',
  variant = 'default',
  className,
  labelClassName,
  checked,
  disabled,
  ...props
}: RadioButtonProps) {
  const isChecked = checked;
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

  // Radio button element
  const radioElement = (
    <div className="relative">
      <input
        type="radio"
        className="sr-only"
        checked={isChecked}
        disabled={isDisabled}
        {...props}
      />
      <div
        className={cn(
          'flex items-center justify-center',
          'border-2 border-solid rounded-full',
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
          <div className="w-2 h-2 bg-white rounded-full" />
        )}
      </div>
    </div>
  );

  // Compact variant (smaller icon)
  if (variant === 'compact') {
    const compactRadioElement = (
      <div className="relative">
        <input
          type="radio"
          className="sr-only"
          checked={isChecked}
          disabled={isDisabled}
          {...props}
        />
        <div
          className={cn(
            'flex items-center justify-center',
            'border-2 border-solid rounded-full',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'w-3 h-3',
            
            // States
            isDisabled
              ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
              : isChecked
              ? 'bg-primary-500 border-primary-500 hover:bg-primary-600 focus:ring-primary-500'
              : 'bg-white border-gray-300 hover:border-primary-500 focus:ring-primary-500'
          )}
        >
          {isChecked && (
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          )}
        </div>
      </div>
    );

    return (
      <label
        className={cn(
          'flex items-center cursor-pointer',
          spacingClasses[size],
          isDisabled && 'cursor-not-allowed',
          className
        )}
      >
        {compactRadioElement}
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
        onClick={() => !isDisabled && props.onChange?.({ target: { checked: !isChecked } } as any)}
      >
        {radioElement}
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
      {radioElement}
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
export function RadioCard({ children, ...props }: RadioButtonProps) {
  return <RadioButton variant="card" {...props}>{children}</RadioCard>;
}

export function RadioCompact({ children, ...props }: RadioButtonProps) {
  return <RadioButton variant="compact" {...props}>{children}</RadioCompact>;
}

export function RadioSmall({ children, ...props }: RadioButtonProps) {
  return <RadioButton size="sm" {...props}>{children}</RadioSmall>;
}

export function RadioLarge({ children, ...props }: RadioButtonProps) {
  return <RadioButton size="lg" {...props}>{children}</RadioLarge>;
}
