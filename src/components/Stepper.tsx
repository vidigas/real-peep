'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export type StepStatus = 'completed' | 'active' | 'pending';
export type Step = { id: string; title?: string; description?: string; status: StepStatus };

type Props = {
  steps: Step[];
  current?: number;               // derive statuses if provided
  className?: string;
  orientation?: 'horizontal' | 'vertical';
};

const COLOR = {
  railDone:  '#227AC6',
  railIdle:  '#E0E0E0',
};
const PX = {
  rail: 3,
  gap: 0,
};

export default function Stepper({ steps, current, className, orientation = 'horizontal' }: Props) {
  const computed = React.useMemo(() => {
    if (typeof current !== 'number') return steps;
    return steps.map((s, i) => ({
      ...s,
      status: i < current ? 'completed' : i === current ? 'active' : 'pending',
    }));
  }, [steps, current]);

  const isH = orientation === 'horizontal';

  const Rail: React.FC<{ done: boolean }> = ({ done }) => (
    <div
      aria-hidden
      style={{
        [isH ? 'height' : 'width']: PX.rail,
        [isH ? 'width'  : 'height']: '100%',
        backgroundColor: done ? COLOR.railDone : COLOR.railIdle,
        borderRadius: 999,
      } as React.CSSProperties}
    />
  );

  return (
    <div
      className={cn('flex w-full items-center', isH ? 'flex-row' : 'flex-col', className)}
      role="list"
      aria-label="Progress"
    >
      {computed.map((s, i) => {
        const last = i === computed.length - 1;

        return (
          <React.Fragment key={s.id}>
            <div className="shrink-0 leading-none">
              {s.status === 'pending'   && <PendingIcon32 />}
              {s.status === 'active'    && <ActiveIcon32 />}
              {s.status === 'completed' && <CompletedIcon32 />}
            </div>
            {!last && <Rail done={s.status === 'completed'} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ───────────────── Icons (Figma-accurate, 32×32) ───────────────── */

function PendingIcon32() {
  // Figma ring: white fill, #E0E0E0 stroke 2px, inner dot #F5F5F5 (r=5)
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="block" aria-hidden>
      <path d="M16 1C24.2843 1 31 7.7157 31 16C31 24.2843 24.2843 31 16 31C7.7157 31 1 24.2843 1 16C1 7.7157 7.7157 1 16 1Z" fill="white"/>
      <path d="M16 1C24.2843 1 31 7.7157 31 16C31 24.2843 24.2843 31 16 31C7.7157 31 1 24.2843 1 16C1 7.7157 7.7157 1 16 1Z" stroke="#E0E0E0" strokeWidth="2"/>
      <circle cx="16" cy="16" r="5" fill="#F5F5F5"/>
    </svg>
  );
}

function ActiveIcon32() {
  // Same 32×32 size, with halo to echo Figma’s soft glow
  return (
    <div className="rounded-full shadow-[0_12px_24px_rgba(29,102,166,0.22)]">
      <svg width="32" height="32" viewBox="0 0 32 32" className="block" fill="none" aria-hidden>
        <circle cx="16" cy="16" r="16" fill="#1D66A6"/>
        <circle cx="16" cy="16" r="5" fill="white"/>
      </svg>
    </div>
  );
}

function CompletedIcon32() {
  // Solid blue disc + centered check sized to 16px (Figma)
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="block" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="16" fill="#227AC6" />
      <path d="M8.8 16.8L13.6 21.6L23.2 10.4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
