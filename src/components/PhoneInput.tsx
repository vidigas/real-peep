'use client';
import React from 'react';
import { Input, type BaseInputProps } from '@/components/Input';

type Props = Omit<BaseInputProps, 'type' | 'inputMode' | 'onChange' | 'value'> & {
  value?: string;
  onChange?: (formatted: string) => void;
  onChangeRaw?: (digits: string) => void;
  format?: 'US' | 'BR' | 'RAW';
  placeholderByFormat?: boolean;
};

export function PhoneInput({
  value,
  onChange,
  onChangeRaw,
  format = 'BR',
  placeholderByFormat = true,
  leftIcon,
  ...rest
}: Props) {
  const fmt = (digits: string) => {
    if (format === 'RAW') return digits;
    if (format === 'US') {
      const d = digits.slice(0, 10);
      const a = d.slice(0, 3);
      const b = d.slice(3, 6);
      const c = d.slice(6, 10);
      if (d.length <= 3) return a;
      if (d.length <= 6) return `(${a}) ${b}`;
      return `(${a}) ${b}-${c}`;
    }
    // BR
    const d = digits.slice(0, 11);
    const a = d.slice(0, 2);
    const b = d.length > 10 ? d.slice(2, 7) : d.slice(2, 6);
    const c = d.length > 10 ? d.slice(7, 11) : d.slice(6, 10);
    if (d.length <= 2) return `(${a}`;
    if (d.length <= (d.length > 10 ? 7 : 6)) return `(${a}) ${b}`;
    return `(${a}) ${b}-${c}`;
  };

  const placeholder = placeholderByFormat
    ? format === 'US' ? '(555) 123-4567' : format === 'BR' ? '(11) 91234-5678' : 'Phone'
    : rest.placeholder;

  return (
    <Input
      {...rest}
      inputMode="tel"
      placeholder={placeholder}
      value={value ?? ''}
      onChange={(e) => {
        const digits = e.target.value.replace(/\D/g, '');
        onChangeRaw?.(digits);
        onChange?.(fmt(digits));
      }}
      leftIcon={leftIcon ?? <span className="text-gray-500">📞</span>}
    />
  );
}
