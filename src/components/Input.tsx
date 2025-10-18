import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'email' | 'phone' | 'currency' | 'card' | 'bottom-border';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
  showStepIndicator?: boolean;
  stepStatus?: 'default' | 'active' | 'valid' | 'error';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    hint,
    error,
    leftIcon,
    rightIcon,
    variant = 'default',
    size = 'md',
    className,
    labelClassName,
    disabled,
    showStepIndicator = false,
    stepStatus = 'default',
    ...props
  }, ref) => {
    const hasError = !!error;
    const isDisabled = disabled;

    // Size classes
    const sizeClasses = {
      sm: 'h-8 px-spacing-sm text-sm',
      md: 'h-10 px-spacing-md text-base',
      lg: 'h-12 px-spacing-lg text-lg',
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const textSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    // Step indicator styling
    const getStepIndicatorClasses = () => {
      if (!showStepIndicator) return {};
      
      const baseClasses = 'absolute left-0 top-0 w-0.5 h-full';
      
      switch (stepStatus) {
        case 'active':
          return `${baseClasses} bg-primary-500`;
        case 'valid':
          return `${baseClasses} bg-success-500`;
        case 'error':
          return `${baseClasses} bg-error-500`;
        default:
          return `${baseClasses} bg-gray-300`;
      }
    };

    // Variant-specific styling
    const getVariantClasses = () => {
      switch (variant) {
        case 'email':
          return {
            leftIcon: (
              <svg className={iconSizeClasses[size]} fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            ),
            placeholder: 'olivia@untitledui.com',
          };
        case 'phone':
          return {
            leftIcon: (
              <div className="flex items-center gap-spacing-xs">
                <span className="text-sm font-medium">US</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            ),
            placeholder: '+1 (555) 000-0000',
          };
        case 'currency':
          return {
            leftIcon: <span className="text-gray-500">$</span>,
            rightIcon: (
              <div className="flex items-center gap-spacing-xs">
                <span className="text-sm font-medium">USD</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            ),
            placeholder: '1,000.00',
          };
        case 'card':
          return {
            leftIcon: (
              <div className="w-6 h-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
            ),
            placeholder: 'Card number',
          };
        case 'bottom-border':
          return {
            inputClasses: 'border-0 border-b-2 border-solid rounded-none px-0',
            containerClasses: 'relative',
          };
        default:
          return {};
      }
    };

    const variantConfig = getVariantClasses();
    const effectiveLeftIcon = leftIcon || variantConfig.leftIcon;
    const effectiveRightIcon = rightIcon || variantConfig.rightIcon;
    const stepIndicatorClasses = getStepIndicatorClasses();

    // Enhanced state colors based on step status
    const getStateClasses = () => {
      if (isDisabled) {
        return 'bg-gray-50 border-gray-200 text-gray-400';
      }
      
      if (hasError || stepStatus === 'error') {
        return 'border-error-500 focus:ring-error-500';
      }
      
      if (stepStatus === 'active') {
        return 'border-primary-500 focus:border-primary-500 focus:ring-primary-500';
      }
      
      if (stepStatus === 'valid') {
        return 'border-success-500 focus:border-success-500 focus:ring-success-500';
      }
      
      return 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
    };

    return (
      <div className="space-y-spacing-xs">
        {label && (
          <label className={cn(
            'block font-medium',
            textSizeClasses[size],
            stepStatus === 'active' ? 'text-primary-500' : 
            stepStatus === 'valid' ? 'text-gray-900' :
            stepStatus === 'error' ? 'text-error-500' : 'text-gray-900',
            labelClassName
          )}>
            {label}
          </label>
        )}
        
        <div className={cn('relative', variantConfig.containerClasses)}>
          {/* Step Indicator */}
          {showStepIndicator && (
            <div className={stepIndicatorClasses} />
          )}
          
          <input
            ref={ref}
            className={cn(
              'w-full border border-solid',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:bg-gray-50',
              sizeClasses[size],
              
              // Variant-specific classes
              variantConfig.inputClasses || 'rounded-lg',
              
              // States
              getStateClasses(),
              
              // Icon padding
              effectiveLeftIcon && 'pl-spacing-xl',
              effectiveRightIcon && 'pr-spacing-xl',
              
              className
            )}
            disabled={isDisabled}
            placeholder={props.placeholder || variantConfig.placeholder}
            {...props}
          />
          
          {/* Left Icon */}
          {effectiveLeftIcon && (
            <div className={cn(
              'absolute left-spacing-md top-1/2 -translate-y-1/2',
              'flex items-center justify-center',
              'pointer-events-none',
              isDisabled ? 'text-gray-400' : hasError ? 'text-error-500' : 'text-gray-500'
            )}>
              {effectiveLeftIcon}
            </div>
          )}
          
          {/* Right Icon */}
          {effectiveRightIcon && (
            <div className={cn(
              'absolute right-spacing-md top-1/2 -translate-y-1/2',
              'flex items-center justify-center',
              'pointer-events-none',
              isDisabled ? 'text-gray-400' : hasError ? 'text-error-500' : 'text-gray-500'
            )}>
              {effectiveRightIcon}
            </div>
          )}
        </div>
        
        {/* Hint or Error Text */}
        {(hint || error) && (
          <p className={cn(
            textSizeClasses[size],
            hasError ? 'text-error-500' : 'text-gray-500'
          )}>
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Convenience components for specific variants
export function EmailInput(props: Omit<InputProps, 'variant'>) {
  return <Input variant="email" {...props} />;
}

export function PhoneInput(props: Omit<InputProps, 'variant'>) {
  return <Input variant="phone" {...props} />;
}

export function CurrencyInput(props: Omit<InputProps, 'variant'>) {
  return <Input variant="currency" {...props} />;
}

export function CardInput(props: Omit<InputProps, 'variant'>) {
  return <Input variant="card" {...props} />;
}

// Size variants
export function InputSmall(props: Omit<InputProps, 'size'>) {
  return <Input size="sm" {...props} />;
}

export function InputLarge(props: Omit<InputProps, 'size'>) {
  return <Input size="lg" {...props} />;
}

// Bottom border variant
export function BottomBorderInput(props: Omit<InputProps, 'variant'>) {
  return <Input variant="bottom-border" {...props} />;
}

// Step indicator variants
export function StepInput(props: Omit<InputProps, 'showStepIndicator'>) {
  return <Input showStepIndicator {...props} />;
}

export function ActiveStepInput(props: Omit<InputProps, 'showStepIndicator' | 'stepStatus'>) {
  return <Input showStepIndicator stepStatus="active" {...props} />;
}

export function ValidStepInput(props: Omit<InputProps, 'showStepIndicator' | 'stepStatus'>) {
  return <Input showStepIndicator stepStatus="valid" {...props} />;
}

export function ErrorStepInput(props: Omit<InputProps, 'showStepIndicator' | 'stepStatus'>) {
  return <Input showStepIndicator stepStatus="error" {...props} />;
}
