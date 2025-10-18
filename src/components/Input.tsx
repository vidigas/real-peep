'use client';
import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'bottom-border';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
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

  const sizeCls: Record<Size, string> = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-base px-3',
    lg: 'h-12 text-lg px-4',
  };

  const variantCls =
    variant === 'bottom-border'
      ? 'border-0 border-b-2 rounded-none px-0'
      : 'border rounded-lg';

  const stepIndicatorClasses = () => {
    if (!showStepIndicator) return '';
    const base = 'absolute left-0 top-0 w-0.5 h-full';
    switch (stepStatus) {
      case 'active': return base + ' bg-primary-500';
      case 'valid': return base + ' bg-success-500';
      case 'error': return base + ' bg-error-500';
      default: return base + ' bg-gray-300';
    }
  };

  const stateCls = () => {
    if (isDisabled) return 'bg-gray-50 border-gray-200 text-gray-400';
    if (hasError || stepStatus === 'error') return 'border-error-500 focus:ring-error-500';
    if (stepStatus === 'active') return 'border-primary-500 focus:border-primary-500 focus:ring-primary-500';
    if (stepStatus === 'valid') return 'border-success-500 focus:border-success-500 focus:ring-success-500';
    return 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
  };

  const describedBy =
    [hint ? `${inputId}-hint` : '', error ? `${inputId}-error` : '']
      .filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('space-y-1', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn('block text-sm font-medium text-gray-900', labelClassName)}
        >
          {label}
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
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:bg-gray-50',
            sizeCls[size],
            variantCls,
            stateCls(),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
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
        <p id={`${inputId}-error`} className="text-sm text-error-600">{error}</p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-sm text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
});
Input.displayName = 'Input';
