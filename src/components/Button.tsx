import React from 'react';
import { cn } from '../lib/utils';

// Button hierarchy types
type ButtonHierarchy =
  | 'primary'
  | 'secondary-color'
  | 'link-color'
  | 'link-gray'
  | 'tertiary-color'
  | 'tertiary-gray'
  | 'secondary-gray';

// Button size types
type ButtonSize = 'sm' | 'md' | 'lg';

// Button state types
type ButtonState = 'default' | 'disabled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  state?: ButtonState;
  destructive?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export function Button({
  children,
  hierarchy = 'primary',
  size = 'md',
  state = 'default',
  destructive = false,
  icon,
  iconPosition = 'right',
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || state === 'disabled';

  // Size classes
  const sizeClasses = {
    sm: 'px-spacing-md py-spacing-sm text-sm',
    md: 'px-spacing-lg py-spacing-md text-base',
    lg: 'px-spacing-xl py-spacing-lg text-lg',
  };

  // Hierarchy classes for default state (brand uses 700/800/900)
  const hierarchyClasses = {
    primary: destructive
      ? 'bg-error-600 text-white border-error-600 hover:bg-error-700 active:bg-error-800'
      : 'bg-primary-700 text-white border-primary-700 hover:bg-primary-800 active:bg-primary-900',

    'secondary-color': destructive
      ? 'bg-white text-error-600 border-error-600 hover:bg-error-50 active:bg-error-100'
      : 'bg-white text-primary-700 border-primary-700 hover:bg-primary-75 active:bg-primary-100',

    'link-color': destructive
      ? 'bg-transparent text-error-600 border-transparent hover:bg-error-50 active:bg-error-100'
      : 'bg-transparent text-primary-700 border-transparent hover:bg-primary-75 active:bg-primary-100',

    'link-gray': 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50 active:bg-gray-100',

    'tertiary-color': destructive
      ? 'bg-error-50 text-error-600 border-error-50 hover:bg-error-100 active:bg-error-200'
      : 'bg-primary-50 text-primary-700 border-primary-50 hover:bg-primary-100 active:bg-primary-200',

    'tertiary-gray': 'bg-gray-50 text-gray-500 border-gray-50 hover:bg-gray-100 active:bg-gray-200',

    'secondary-gray': 'bg-gray-100 text-gray-900 border-gray-100 hover:bg-gray-200 active:bg-gray-300',
  } as const;

  // Disabled state classes
  const disabledClasses =
    'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed';

  // Icon sizes
  const iconClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      className={cn(
        // Base button styles
        'inline-flex items-center justify-center gap-spacing-sm',
        'border border-solid rounded-lg',
        'font-medium transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed',

        // Size
        sizeClasses[size],

        // Hierarchy and state
        isDisabled ? disabledClasses : hierarchyClasses[hierarchy],

        // Focus ring colors (brand)
        !isDisabled && (destructive ? 'focus:ring-error-600' : 'focus:ring-primary-700'),

        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={cn(iconClasses[size])}>{icon}</span>
      )}

      {children}

      {icon && iconPosition === 'right' && (
        <span className={cn(iconClasses[size])}>{icon}</span>
      )}
    </button>
  );
}

// Convenience components
export function PrimaryButton({ children, ...props }: Omit<ButtonProps, 'hierarchy'>) {
  return (
    <Button hierarchy="primary" {...props}>
      {children}
    </Button>
  );
}

export function SecondaryButton({ children, ...props }: Omit<ButtonProps, 'hierarchy'>) {
  return (
    <Button hierarchy="secondary-color" {...props}>
      {children}
    </Button>
  );
}

export function LinkButton({ children, ...props }: Omit<ButtonProps, 'hierarchy'>) {
  return (
    <Button hierarchy="link-color" {...props}>
      {children}
    </Button>
  );
}

export function TertiaryButton({ children, ...props }: Omit<ButtonProps, 'hierarchy'>) {
  return (
    <Button hierarchy="tertiary-color" {...props}>
      {children}
    </Button>
  );
}

// Icon wrapper (circular)
export function ButtonIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'w-5 h-5 rounded-full border border-current',
        className
      )}
    >
      {children}
    </span>
  );
}

// Default circular dot icon
export function DefaultIcon({ className }: { className?: string }) {
  return (
    <ButtonIcon className={className}>
      <span className="w-2 h-2 bg-current rounded-full" />
    </ButtonIcon>
  );
}
