'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type ProfileMenuProps = {
  trigger: React.ReactNode;
  onOpenSettings?: () => void;
  onOpenBilling?: () => void;
  onOpenChecklists?: () => void;
};

export function ProfileMenu({
  trigger,
  onOpenSettings,
  onOpenBilling,
  onOpenChecklists,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  async function handleLogout() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      const before = await supabase.auth.getSession();
      console.log('session before signOut:', before.data.session?.user?.email);
  
      const { error } = await supabase.auth.signOut(); // client
      if (error) console.error('client signOut error:', error);
  
      const r = await fetch('/api/auth/signout', { method: 'POST' }); // server
      console.log('server signOut status:', r.status);
  
      const after = await supabase.auth.getSession();
      console.log('session after signOut:', after.data.session);
  
      router.replace('/sign-in');
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }
  

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-[320px] rounded-2xl bg-white 
                     shadow-[0_16px_32px_rgba(16,24,40,0.16)] ring-1 ring-gray-100 p-[6px]"
        >
          <MenuItem
            icon={<GearIcon />}
            label="Profile Settings"
            onClick={() => {
              if (onOpenSettings) {
                onOpenSettings();
              } else {
                console.log('Profile Settings pressed');
              }
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<CardIcon />}
            label="Billing"
            onClick={() => {
              if (onOpenBilling) {
                onOpenBilling();
              } else {
                console.log('Billing pressed');
              }
              setOpen(false);
            }}
          />
          <MenuItem
            icon={<ChecklistIcon />}
            label="Manage Checklists"
            onClick={() => {
              if (onOpenChecklists) {
                onOpenChecklists();
              } else {
                console.log('Manage Checklists pressed');
              }
              setOpen(false);
            }}
          />

          <MenuItem
            icon={<LogoutIcon />}
            label={signingOut ? 'Logging out…' : 'Log Out'}
            variant="danger"
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
}

/* --------------------------- Small subcomponents -------------------------- */

function MenuItem({
  icon,
  label,
  onClick,
  variant = 'default',
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}) {
  const base =
    'w-full flex items-center gap-[12px] px-[10px] py-[8px] rounded-[6px] transition-colors duration-100';
  const text =
    variant === 'danger'
      ? 'text-[#D92D20] hover:bg-[#FEF3F2]'
      : 'text-[#616161] hover:bg-gray-50 hover:text-[#1A1A1A]';

  return (
    <button
      role="menuitem"
      type="button"
      onClick={onClick}
      className={`${base} ${text}`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-[14px] leading-[20px] font-medium">{label}</span>
    </button>
  );
}

/* --------------------------------- Icons --------------------------------- */

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="#757575" strokeWidth="1.8" />
      <path
        d="M19.4 15a7.97 7.97 0 0 0 .2-2 7.97 7.97 0 0 0-.2-2l2.1-1.6-2-3.4-2.5 1a8.18 8.18 0 0 0-3.4-2l-.4-2.7h-4l-.4 2.7a8.18 8.18 0 0 0-3.4 2l-2.5-1-2 3.4 2.1 1.6a7.97 7.97 0 0 0-.2 2c0 .68.07 1.34.2 2l-2.1 1.6 2 3.4 2.5-1a8.18 8.18 0 0 0 3.4 2l.4 2.7h4l.4-2.7a8.18 8.18 0 0 0 3.4-2l2.5 1 2-3.4-2.1-1.6Z"
        stroke="#757575"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#757575" strokeWidth="1.8" />
      <path d="M3 9h18" stroke="#757575" strokeWidth="1.8" />
      <rect x="6" y="13" width="6" height="2.5" rx="1.25" fill="#757575" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 7h11M8 12h11M8 17h11" stroke="#757575" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4.5 7.5 6 9l3-3" stroke="#757575" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 12.5 6 14l3-3" stroke="#757575" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 17.5 6 19l3-3" stroke="#757575" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 17l4-5-4-5M20 12H10M14 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
        stroke="#D92D20"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
