'use client';

import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/Typography';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'bottom-border';

export interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id?: string;
  label?: string;
  required?: boolean;              // controls asterisk
  hint?: string;
  error?: string;
  size?: Size;
  variant?: Variant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  showStepIndicator?: boolean;
  stepStatus?: 'default' | 'active' | 'valid' | 'error';
}

export const Input = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const {
    id,
    label,
    required,
    hint,
    error,
    size = 'md',
    variant = 'default',
    leftIcon,
    rightIcon,
    className,
    labelClassName,
    containerClassName,
    disabled,
    showStepIndicator = false,
    stepStatus = 'default',
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? autoId;

  const hasError = !!error;
  const isDisabled = !!disabled;

  // Exact control heights/paddings
  const sizeCls: Record<Size, string> = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-base px-3',
    lg: 'h-12 text-lg px-4',
  };

  const variantCls =
    variant === 'bottom-border'
      ? 'border-0 border-b-2 rounded-none px-0'
      : 'border rounded-lg';

  const stateCls = () => {
    if (isDisabled) return 'bg-gray-50 border-gray-200 text-gray-400';
    if (hasError || stepStatus === 'error')
      return 'border-error-500 focus:ring-error-600';
    if (stepStatus === 'active')
      return 'border-primary-600 focus:border-primary-700 focus:ring-primary-700';
    if (stepStatus === 'valid')
      return 'border-success-600 focus:border-success-700 focus:ring-success-700';
    return 'border-gray-300 focus:border-primary-700 focus:ring-primary-700';
  };

  const stepIndicatorClasses = () => {
    if (!showStepIndicator) return '';
    const base = 'absolute left-0 top-0 w-0.5 h-full';
    switch (stepStatus) {
      case 'active': return `${base} bg-primary-600`;
      case 'valid':  return `${base} bg-success-600`;
      case 'error':  return `${base} bg-error-600`;
      default:       return `${base} bg-gray-300`;
    }
  };

  const describedBy =
    [hint ? `${inputId}-hint` : '', error ? `${inputId}-error` : '']
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className={cn('inline-flex items-center gap-1', labelClassName)}>
          {/* Label: 14/20, medium */}
          <Text as="span" size="sm" weight="medium" color="inherit" className="text-gray-700">
            {label}
          </Text>
          {required && (
            // Asterisk: 14/20, medium, accent
            <Text as="span" size="sm" weight="medium" color="inherit" className="text-primary-600">
              *
            </Text>
          )}
        </label>
      )}

      <div className="relative">
        {showStepIndicator && <div className={stepIndicatorClasses()} />}

        <input
          id={inputId}
          ref={ref}
          disabled={isDisabled}
          aria-invalid={hasError || stepStatus === 'error' || undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full border border-solid transition-colors duration-200',
            // Focus: inset ring so control doesn’t grow
            'focus:outline-none focus:ring-2 focus:ring-inset ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-gray-50',
            'placeholder:text-gray-400',
            sizeCls[size],
            variantCls,
            stateCls(),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          required={required}
          {...rest}
        />

        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            {leftIcon}
          </span>
        )}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        // Error: 14/20, error-600
        <Text id={`${inputId}-error`} as="p" size="sm" color="inherit" className="text-error-600">
          {error}
        </Text>
      ) : hint ? (
        // Hint: 14/20, gray-600
        <Text id={`${inputId}-hint`} as="p" size="sm" color="inherit" className="text-gray-600">
          {hint}
        </Text>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
