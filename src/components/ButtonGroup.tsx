import React, { createContext, useContext } from 'react';
import { cn } from '../lib/utils';
import { Button, ButtonProps } from './Button';

interface ButtonGroupContextValue {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'segmented' | 'radio' | 'navigation';
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

interface ButtonGroupProps {
  children: React.ReactNode;
  value?: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'segmented' | 'radio' | 'navigation';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ButtonGroup({
  children,
  value,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'segmented',
  orientation = 'horizontal',
  className,
}: ButtonGroupProps) {
  const contextValue: ButtonGroupContextValue = {
    value,
    onChange,
    disabled,
    size,
    variant,
  };

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        className={cn(
          'inline-flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          variant === 'segmented' && 'rounded-lg overflow-hidden border border-gray-200',
          variant === 'radio' && 'gap-spacing-sm',
          variant === 'navigation' && 'gap-spacing-sm',
          className
        )}
        role="group"
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

interface ButtonGroupItemProps extends Omit<ButtonProps, 'onClick' | 'disabled' | 'size'> {
  value: string | number;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function ButtonGroupItem({
  value,
  children,
  icon,
  iconPosition = 'right',
  className,
  ...props
}: ButtonGroupItemProps) {
  const context = useContext(ButtonGroupContext);
  
  if (!context) {
    throw new Error('ButtonGroupItem must be used within a ButtonGroup');
  }

  const { value: selectedValue, onChange, disabled, size, variant } = context;
  const isSelected = selectedValue === value;
  const isDisabled = disabled || props.disabled;

  // Segmented button styling
  if (variant === 'segmented') {
    return (
      <button
        className={cn(
          'px-spacing-lg py-spacing-md',
          'border-r border-gray-200 last:border-r-0',
          'text-sm font-medium',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:cursor-not-allowed',
          
          // States
          isDisabled
            ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
            : isSelected
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-white text-gray-700 hover:bg-gray-50',
          
          className
        )}
        onClick={() => !isDisabled && onChange(value)}
        disabled={isDisabled}
        {...props}
      >
        <div className="flex items-center gap-spacing-sm">
          {icon && iconPosition === 'left' && (
            <span className="w-4 h-4">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="w-4 h-4">{icon}</span>
          )}
        </div>
      </button>
    );
  }

  // Radio button styling
  if (variant === 'radio') {
    return (
      <button
        className={cn(
          'px-spacing-lg py-spacing-md',
          'border border-solid rounded-lg',
          'text-sm font-medium',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:cursor-not-allowed',
          
          // States
          isDisabled
            ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
            : isSelected
            ? 'bg-primary-50 text-primary-500 border-primary-500 hover:bg-primary-100'
            : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-gray-50',
          
          className
        )}
        onClick={() => !isDisabled && onChange(value)}
        disabled={isDisabled}
        {...props}
      >
        <div className="flex items-center gap-spacing-sm">
          {icon && iconPosition === 'left' && (
            <span className="w-4 h-4">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="w-4 h-4">{icon}</span>
          )}
        </div>
      </button>
    );
  }

  // Navigation button styling
  if (variant === 'navigation') {
    return (
      <button
        className={cn(
          'px-spacing-lg py-spacing-md',
          'border border-solid rounded-lg',
          'text-sm font-medium',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          'disabled:cursor-not-allowed',
          
          // States
          isDisabled
            ? 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed'
            : isSelected
            ? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-600'
            : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-gray-50',
          
          className
        )}
        onClick={() => !isDisabled && onChange(value)}
        disabled={isDisabled}
        {...props}
      >
        <div className="flex items-center gap-spacing-sm">
          {icon && iconPosition === 'left' && (
            <span className="w-4 h-4">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="w-4 h-4">{icon}</span>
          )}
        </div>
      </button>
    );
  }

  return null;
}

// Convenience components for different variants
export function SegmentedButtonGroup({ children, ...props }: Omit<ButtonGroupProps, 'variant'>) {
  return <ButtonGroup variant="segmented" {...props}>{children}</ButtonGroup>;
}

export function RadioButtonGroup({ children, ...props }: Omit<ButtonGroupProps, 'variant'>) {
  return <ButtonGroup variant="radio" {...props}>{children}</ButtonGroup>;
}

export function NavigationButtonGroup({ children, ...props }: Omit<ButtonGroupProps, 'variant'>) {
  return <ButtonGroup variant="navigation" {...props}>{children}</ButtonGroup>;
}

// Icon components for navigation
export function LeftArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-4 h-4', className)} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export function RightArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-4 h-4', className)} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export function CircleIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-4 h-4', className)} fill="currentColor" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="2" />
    </svg>
  );
}
