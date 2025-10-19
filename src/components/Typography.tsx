'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

type ElementTag = keyof JSX.IntrinsicElements;

type CommonProps = {
  as?: ElementTag;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  /** added "inherit" so text can inherit parent color (e.g., buttons) */
  color?: 'default' | 'heading' | 'muted' | 'success' | 'danger' | 'warning' | 'inherit';
  className?: string;
  children: React.ReactNode;
};

type PolymorphicProps<TTag extends ElementTag> = CommonProps &
  Omit<React.ComponentPropsWithoutRef<TTag>, keyof CommonProps | 'as'> & {
    as?: TTag;
  };

const colorClass = (color: NonNullable<CommonProps['color']>) => {
  switch (color) {
    case 'inherit':
      return 'text-inherit';
    case 'heading':
      return 'text-[#1A1A1A]';
    case 'muted':
      return 'text-gray-500';
    case 'success':
      return 'text-green-700';
    case 'danger':
      return 'text-red-600';
    case 'warning':
      return 'text-amber-600';
    default:
      return 'text-gray-900';
  }
};

const weightClass = (w: NonNullable<CommonProps['weight']>) => {
  switch (w) {
    case 'medium': return 'font-medium';
    case 'semibold': return 'font-semibold';
    case 'bold': return 'font-bold';
    default: return 'font-normal';
  }
};

type DisplayProps<TTag extends ElementTag = 'div'> = PolymorphicProps<TTag>;
export function Display<TTag extends ElementTag = 'div'>({
  as, size = 'xs', weight = 'bold', color = 'heading', className, children, ...rest
}: DisplayProps<TTag>) {
  const Tag = (as ?? 'div') as ElementTag;
  const sizeClass =
    size === 'xs' ? 'text-[24px] leading-[32px]' :
    size === 'sm' ? 'text-[22px] leading-[30px]' :
    'text-[28px] leading-[36px]';
  return (
    <Tag {...(rest as Record<string, unknown>)}
      className={cn(sizeClass, weightClass(weight), colorClass(color), className)}>
      {children}
    </Tag>
  );
}

type TextProps<TTag extends ElementTag = 'p'> = PolymorphicProps<TTag>;
export function Text<TTag extends ElementTag = 'p'>({
  as, size = 'md', weight = 'normal', color = 'default', className, children, ...rest
}: TextProps<TTag>) {
  const Tag = (as ?? 'p') as ElementTag;
  const sizeClass =
    size === 'xl' ? 'text-[20px] leading-[30px]' :
    size === 'lg' ? 'text-[18px] leading-[28px]' :
    size === 'md' ? 'text-[16px] leading-[24px]' :
    size === 'sm' ? 'text-[14px] leading-[20px]' :
    'text-[12px] leading-[16px]';
  return (
    <Tag {...(rest as Record<string, unknown>)}
      className={cn(sizeClass, weightClass(weight), colorClass(color), className)}>
      {children}
    </Tag>
  );
}
