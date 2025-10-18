'use client';
import React from 'react';
import { Input, type BaseInputProps } from '@/components/Input';

export function CardInput(props: Omit<BaseInputProps, 'type' | 'inputMode' | 'onChange' | 'value'>) {
  const [val, setVal] = React.useState('');
  const format = (d: string) => d.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

  return (
    <Input
      {...props}
      inputMode="numeric"
      placeholder={props.placeholder ?? '1234 5678 9012 3456'}
      value={val}
      onChange={(e) => setVal(format(e.target.value))}
      leftIcon={props.leftIcon ?? <span className="text-gray-500">💳</span>}
    />
  );
}
