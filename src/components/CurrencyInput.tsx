'use client';

import * as React from 'react';
import { Input, type BaseInputProps } from '@/components/Input';

type Props = Omit<BaseInputProps, 'type' | 'inputMode' | 'pattern' | 'onChange' | 'value'> & {
  value?: number | null;
  onChange?: (value: number | null) => void;
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
};

export function CurrencyInput({
  value,
  onChange,
  currency = 'USD',
  locale = 'en-US',
  min,
  max,
  leftIcon,
  ...rest
}: Props) {
  const nf = React.useMemo(() => new Intl.NumberFormat(locale, { style: 'currency', currency }), [locale, currency]);
  const [display, setDisplay] = React.useState(value == null ? '' : nf.format(value));

  React.useEffect(() => {
    setDisplay(value == null ? '' : nf.format(value));
  }, [value, nf]);

  const symbol = React.useMemo(() => nf.formatToParts(0).find((p) => p.type === 'currency')?.value ?? '$', [nf]);

  const parse = (raw: string): number | null => {
    const normalized = raw.replace(/[^\d.,-]/g, '').replace(/\.(?=.*\.)/g, '').replace(',', '.');
    if (normalized === '' || normalized === '-' || normalized === '.' || normalized === '-.') return null;
    const n = Number(normalized);
    return Number.isFinite(n) ? n : null;
  };

  return (
    <Input
      {...rest}
      inputMode="decimal"
      value={display}
      onChange={(e) => {
        const raw = e.target.value;
        setDisplay(raw);
        const parsed = parse(raw);
        if (!onChange) return;
        if (parsed == null) {
          onChange(null);
          return;
        }
        let v = parsed;
        if (min != null && v < min) v = min;
        if (max != null && v > max) v = max;
        onChange(v);
      }}
      onBlur={(e) => {
        const parsed = parse(e.target.value);
        setDisplay(parsed == null ? '' : nf.format(parsed));
      }}
      leftIcon={leftIcon ?? <span className="text-gray-500">{symbol}</span>}
    />
  );
}
