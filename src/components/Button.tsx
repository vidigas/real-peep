'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { Text } from './Typography';

type ButtonHierarchy =
  | 'primary'
  | 'secondary-color'
  | 'link-color'
  | 'link-gray'
  | 'tertiary-color'
  | 'tertiary-gray'
  | 'secondary-gray';

type ButtonSize = 'sm' | 'md' | 'lg';
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

function ButtonLabel({ children }: { children: React.ReactNode }) {
  if (typeof children === 'string' || typeof children === 'number') {
    // Figma: Text md / Semibold / 24px; INHERIT color from button
    return (
      <Text as="span" size="md" weight="semibold" color="inherit" className="leading-[24px]">
        {children}
      </Text>
    );
  }
  return <>{children}</>;
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

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-spacing-md py-spacing-sm',
    md: 'px-spacing-lg py-spacing-md',
    lg: 'px-spacing-xl py-spacing-lg',
  };

  const iconClasses: Record<ButtonSize, string> = {
    sm: 'w-4 h-4',
    md: 'w-[14px] h-[14px]', // match your 14x14 plus
    lg: 'w-6 h-6',
  };

  const hierarchyClasses: Record<ButtonHierarchy, string> = {
    primary: destructive
      ? 'bg-error-600 text-white border-error-600 hover:bg-error-700 active:bg-error-800'
      : 'bg-primary-700 text-white border-primary-700 hover:bg-primary-800 active:bg-primary-900',
    'secondary-color': destructive
      ? 'bg-white text-error-700 border-error-700 hover:bg-error-50 active:bg-error-100'
      : 'bg-white text-primary-700 border-primary-700 hover:bg-primary-75 active:bg-primary-100',
    'link-color': destructive
      ? 'bg-transparent text-error-700 border-transparent hover:bg-error-50 active:bg-error-100'
      : 'bg-transparent text-primary-700 border-transparent hover:bg-primary-75 active:bg-primary-100',
    'link-gray': 'bg-transparent text-gray-600 border-transparent hover:bg-gray-50 active:bg-gray-100',
    'tertiary-color': destructive
      ? 'bg-error-50 text-error-700 border-error-50 hover:bg-error-100 active:bg-error-200'
      : 'bg-primary-50 text-primary-700 border-primary-50 hover:bg-primary-100 active:bg-primary-200',
    'tertiary-gray': 'bg-gray-50 text-gray-600 border-gray-50 hover:bg-gray-100 active:bg-gray-200',
    'secondary-gray': 'bg-gray-100 text-gray-900 border-gray-100 hover:bg-gray-200 active:bg-gray-300',
  };

  const disabledClasses =
    'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed';

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-spacing-sm',
        'border border-solid rounded-lg',
        'font-semibold', // baseline if custom nodes are used
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed',
        sizeClasses[size],
        isDisabled ? disabledClasses : hierarchyClasses[hierarchy],
        !isDisabled && (destructive ? 'focus:ring-error-600' : 'focus:ring-primary-700'),
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span aria-hidden className={cn(iconClasses[size])}>{icon}</span>
      )}
      <ButtonLabel>{children}</ButtonLabel>
      {icon && iconPosition === 'right' && (
        <span aria-hidden className={cn(iconClasses[size])}>{icon}</span>
      )}
    </button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, 'hierarchy'>) {
  return <Button hierarchy="primary" {...props} />;
}
export function SecondaryButton(props: Omit<ButtonProps, 'hierarchy'>) {
  return <Button hierarchy="secondary-color" {...props} />;
}
export function LinkButton(props: Omit<ButtonProps, 'hierarchy'>) {
  return <Button hierarchy="link-color" {...props} />;
}
export function TertiaryButton(props: Omit<ButtonProps, 'hierarchy'>) {
  return <Button hierarchy="tertiary-color" {...props} />;
}

export function ButtonIcon({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <span className={cn('inline-flex items-center justify-center w-5 h-5 rounded-full border border-current', className)}>
      {children}
    </span>
  );
}
export function DefaultIcon({ className }: { className?: string }) {
  return (
    <ButtonIcon className={className}>
      <span className="w-2 h-2 bg-current rounded-full" />
    </ButtonIcon>
  );
}
