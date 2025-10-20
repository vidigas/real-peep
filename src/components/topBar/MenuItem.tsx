'use client';

import React from 'react';
import { Text } from '@/components/Typography';

export type MenuItemHandle = { focus: () => void; click: () => void };

export const MenuItem = React.forwardRef<MenuItemHandle, {
  children: React.ReactNode;
  leading: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  role?: 'menuitem';
}>(({ children, leading, onClick, disabled, role = 'menuitem' }, ref) => {
  const btnRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(ref, () => ({
    focus: () => btnRef.current?.focus(),
    click: () => btnRef.current?.click(),
  }));

  return (
    <button
      ref={btnRef}
      role={role}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[
        'w-full flex items-center gap-3 rounded-xl px-3 py-2',
        disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50 active:bg-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-primary-700/40',
      ].join(' ')}
    >
      <span className="shrink-0">{leading}</span>
      {/* Typography tokens */}
      <Text as="span" size="md" weight="medium" color={disabled ? 'muted' : 'heading'}>
        {children}
      </Text>
    </button>
  );
});
MenuItem.displayName = 'MenuItem';

export function Divider() {
  return <div className="my-1 h-px bg-gray-200" />;
}
