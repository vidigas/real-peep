import React from 'react';
import { cn } from '../lib/utils';

// Typography variant types
type DisplaySize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type TextSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TypographyColor = 'heading' | 'body' | 'muted' | 'placeholder' | 'disabled';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

interface DisplayProps extends TypographyProps {
  size: DisplaySize;
  weight?: FontWeight;
  color?: TypographyColor;
}

interface TextProps extends TypographyProps {
  size: TextSize;
  weight?: FontWeight;
  color?: TypographyColor;
}

// Display Typography Component
export function Display({ 
  children, 
  size, 
  weight = 'normal', 
  color = 'heading', 
  className, 
  as: Component = 'h1' 
}: DisplayProps) {
  const sizeClasses = {
    '2xl': 'text-6xl leading-[90px] tracking-[-0.02em]',
    'xl': 'text-5xl leading-[72px] tracking-[-0.02em]',
    'lg': 'text-4xl leading-[60px] tracking-[-0.02em]',
    'md': 'text-3xl leading-[44px] tracking-[-0.02em]',
    'sm': 'text-2xl leading-[38px] tracking-[-0.02em]',
    'xs': 'text-xl leading-[32px] tracking-[-0.02em]',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    heading: 'text-gray-900',
    body: 'text-gray-800',
    muted: 'text-gray-400',
    placeholder: 'text-gray-300',
    disabled: 'text-gray-300',
  };

  return (
    <Component
      className={cn(
        'font-display',
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
}

// Text Typography Component
export function Text({ 
  children, 
  size, 
  weight = 'normal', 
  color = 'body', 
  className, 
  as: Component = 'p' 
}: TextProps) {
  const sizeClasses = {
    'xl': 'text-xl leading-[30px]',
    'lg': 'text-lg leading-[28px]',
    'md': 'text-base leading-[24px]',
    'sm': 'text-sm leading-[20px]',
    'xs': 'text-xs leading-[18px]',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    heading: 'text-gray-900',
    body: 'text-gray-800',
    muted: 'text-gray-400',
    placeholder: 'text-gray-300',
    disabled: 'text-gray-300',
  };

  return (
    <Component
      className={cn(
        'font-body',
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  );
}

// Convenience components for common use cases
export function Heading({ children, className, ...props }: Omit<DisplayProps, 'size'>) {
  return (
    <Display size="lg" weight="bold" color="heading" className={className} {...props}>
      {children}
    </Display>
  );
}

export function Subheading({ children, className, ...props }: Omit<DisplayProps, 'size'>) {
  return (
    <Display size="md" weight="semibold" color="heading" className={className} {...props}>
      {children}
    </Display>
  );
}

export function Body({ children, className, ...props }: Omit<TextProps, 'size'>) {
  return (
    <Text size="md" weight="normal" color="body" className={className} {...props}>
      {children}
    </Text>
  );
}

export function Caption({ children, className, ...props }: Omit<TextProps, 'size'>) {
  return (
    <Text size="sm" weight="normal" color="muted" className={className} {...props}>
      {children}
    </Text>
  );
}

export function Label({ children, className, ...props }: Omit<TextProps, 'size'>) {
  return (
    <Text size="sm" weight="medium" color="body" className={className} {...props}>
      {children}
    </Text>
  );
}
