'use client';
import React from 'react';
import { Input, type BaseInputProps } from '@/components/Input';

export function EmailInput(props: Omit<BaseInputProps, 'type'>) {
  return <Input type="email" placeholder={props.placeholder ?? 'name@email.com'} {...props} />;
}
