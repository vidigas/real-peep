'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { cn } from '../lib/utils';
import { RadioButton, type RadioButtonProps } from './RadioButton';

interface Ctx {
  name: string;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'compact';
}
const RadioGroupContext = createContext<Ctx | null>(null);

type Layout = 'flex' | 'grid';

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string | number;
  onChange: (value: string | number) => void;
  name?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card' | 'compact';
  orientation?: 'horizontal' | 'vertical'; // kept for back-compat with flex layout
  /** NEW: grid layout to stretch full width */
  layout?: Layout;
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const colClass: Record<NonNullable<RadioGroupProps['columns']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

export function RadioGroup({
  children,
  value,
  onChange,
  name,
  disabled = false,
  size = 'md',
  variant = 'default',
  orientation = 'vertical',
  layout = 'grid',          // default to grid so cards stretch
  columns = 4,
  className,
}: RadioGroupProps) {
  const groupName = useMemo(
    () => name || `radio-group-${Math.random().toString(36).slice(2, 9)}`,
    [name]
  );

  const ctx: Ctx = { name: groupName, value, onChange, disabled, size, variant };

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        role="radiogroup"
        className={cn(
          layout === 'grid'
            ? cn('grid w-full gap-[12px]', colClass[columns])
            : cn(
                'flex',
                orientation === 'horizontal' ? 'flex-row gap-[12px] w-full' : 'flex-col gap-2'
              ),
          className
        )}
        onKeyDown={(e) => {
          const items = React.Children.toArray(children) as React.ReactElement[];
          const idx = items.findIndex(
            (c) => (c?.props as Record<string, unknown>)?.value === value
          );
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = items[(idx + 1) % items.length];
            onChange((next.props as { value: string | number }).value);
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = items[(idx - 1 + items.length) % items.length];
            onChange((prev.props as { value: string | number }).value);
          }
        }}
      >
        {/* children become equal-width columns because cards don't fix width */}
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps
  extends Omit<
    RadioButtonProps,
    'name' | 'checked' | 'onChange' | 'disabled' | 'size' | 'variant'
  > {
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
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('RadioGroupItem must be used within a RadioGroup');

  const { name, value: selected, onChange, disabled, size, variant } = ctx;

  return (
    <RadioButton
      name={name}
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
      disabled={disabled || (props as { disabled?: boolean }).disabled}
      size={size}
      variant={variant}
      label={label}
      description={description}
      className={className}
      {...props}
    />
  );
}

/* Convenience */
export function HorizontalRadioGroup(props: Omit<RadioGroupProps, 'orientation' | 'layout'>) {
  return <RadioGroup layout="flex" orientation="horizontal" {...props} />;
}
export function VerticalRadioGroup(props: Omit<RadioGroupProps, 'orientation' | 'layout'>) {
  return <RadioGroup layout="flex" orientation="vertical" {...props} />;
}
export function RadioGroupCard(props: Omit<RadioGroupProps, 'variant'>) {
  return <RadioGroup variant="card" {...props} />;
}
export function RadioGroupCompact(props: Omit<RadioGroupProps, 'variant'>) {
  return <RadioGroup variant="compact" {...props} />;
}
