import React, { createContext, useContext } from 'react';
import { cn } from '../lib/utils';
import { RadioButton, RadioButtonProps } from './RadioButton';

interface RadioGroupContextValue {
  name: string;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'compact';
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string | number;
  onChange: (value: string | number) => void;
  name?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'compact';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  children,
  value,
  onChange,
  name,
  disabled = false,
  size = 'md',
  variant = 'default',
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

  const contextValue: RadioGroupContextValue = {
    name: groupName,
    value,
    onChange,
    disabled,
    size,
    variant,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row gap-spacing-md' : 'flex-col gap-spacing-sm',
          className
        )}
        role="radiogroup"
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends Omit<RadioButtonProps, 'name' | 'checked' | 'onChange' | 'disabled' | 'size' | 'variant'> {
  value: string | number;
  label?: string;
  description?: string;
}

export function RadioGroupItem({
  value,
  label,
  description,
  className,
  ...props
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);
  
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }

  const { name, value: selectedValue, onChange, disabled, size, variant } = context;
  const isChecked = selectedValue === value;
  const isDisabled = disabled || props.disabled;

  return (
    <RadioButton
      name={name}
      value={value}
      checked={isChecked}
      onChange={() => onChange(value)}
      disabled={isDisabled}
      size={size}
      variant={variant}
      label={label}
      description={description}
      className={className}
      {...props}
    />
  );
}

// Convenience components for different orientations
export function HorizontalRadioGroup({ children, ...props }: Omit<RadioGroupProps, 'orientation'>) {
  return <RadioGroup orientation="horizontal" {...props}>{children}</RadioGroup>;
}

export function VerticalRadioGroup({ children, ...props }: Omit<RadioGroupProps, 'orientation'>) {
  return <RadioGroup orientation="vertical" {...props}>{children}</RadioGroup>;
}

// Card variant for radio groups
export function RadioGroupCard({ children, ...props }: Omit<RadioGroupProps, 'variant'>) {
  return <RadioGroup variant="card" {...props}>{children}</RadioGroup>;
}

// Compact variant for radio groups
export function RadioGroupCompact({ children, ...props }: Omit<RadioGroupProps, 'variant'>) {
  return <RadioGroup variant="compact" {...props}>{children}</RadioGroup>;
}
