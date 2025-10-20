'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Text, Button } from '@/components';

type DatePickerProps = {
  label?: string;
  placeholder?: string;
  /** ISO yyyy-mm-dd */
  value?: string | null;
  onChange?: (v: string | null) => void;
  min?: string;
  max?: string;
  error?: string;
  id?: string;
  className?: string;
  displayLocale?: string | string[];
  displayOptions?: Intl.DateTimeFormatOptions;
  /** omit for full width; pass a number (px) or css width for fixed chip (e.g. 136 / "136px") */
  width?: number | string;
};

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const CARD_W = 360;
const GAP = 8;

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}
function fmt(
  d?: Date | null,
  locale?: DatePickerProps['displayLocale'],
  opts?: DatePickerProps['displayOptions']
) {
  if (!d) return '';
  const o = opts ?? { month: 'short', day: 'numeric', year: 'numeric' };
  return new Intl.DateTimeFormat(locale ?? undefined, o).format(d);
}
const som = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const eom = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const addM = (d: Date, m: number) => new Date(d.getFullYear(), d.getMonth() + m, 1);

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="16.667" viewBox="0 0 17 19" fill="none" className="text-[#757575]" {...props}>
      <path
        d="M15.8333 7.50004H0.833252M11.6666 0.833374V4.16671M4.99992 0.833374V4.16671M4.83325 17.5H11.8333C13.2334 17.5 13.9334 17.5 14.4682 17.2276C14.9386 16.9879 15.3211 16.6054 15.5608 16.135C15.8333 15.6002 15.8333 14.9002 15.8333 13.5V6.50004C15.8333 5.09991 15.8333 4.39984 15.5608 3.86506C15.3211 3.39466 14.9386 3.01221 14.4682 2.77252C13.9334 2.50004 13.2334 2.50004 11.8333 2.50004H4.83325C3.43312 2.50004 2.73306 2.50004 2.19828 2.77252C1.72787 3.01221 1.34542 3.39466 1.10574 3.86506C0.833252 4.39984 0.833252 5.09991 0.833252 6.50004V13.5C0.833252 14.9002 0.833252 15.6002 1.10574 16.135C1.34542 16.6054 1.72787 16.9879 2.19828 17.2276C2.73306 17.5 3.43312 17.5 4.83325 17.5Z"
        stroke="currentColor"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DatePicker({
  label,
  placeholder = 'Select date',
  value,
  onChange,
  min,
  max,
  error,
  id,
  className,
  displayLocale,
  displayOptions,
  width,
}: DatePickerProps) {
  const parsed = value ? new Date(value) : null;

  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(parsed ? som(parsed) : som(new Date()));
  const [temp, setTemp] = React.useState<Date | null>(parsed);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const [coords, setCoords] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [maxBodyH, setMaxBodyH] = React.useState<number>(260);
  const [clampedW, setClampedW] = React.useState<number>(CARD_W);

  const compute = React.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    const cardW = Math.min(CARD_W, window.innerWidth - 16);
    setClampedW(cardW);

    const left = Math.min(r.left, Math.max(8, window.innerWidth - cardW - 8));
    let top = r.bottom + GAP;

    const spaceBelow = window.innerHeight - (r.bottom + GAP) - 8;
    const spaceAbove = r.top - 8;

    // open where we have more room
    if (spaceBelow < 280 && spaceAbove > spaceBelow) {
      top = Math.max(8, r.top - (360 /* rough card height */));
      setMaxBodyH(Math.max(200, spaceAbove - 120));
    } else {
      setMaxBodyH(Math.max(200, spaceBelow - 120));
    }

    setCoords({ top, left });
  }, []);

  // outside & esc
  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node) && open) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, compute]);

  React.useEffect(() => {
    const d = value ? new Date(value) : null;
    setTemp(d);
    setMonth(d ? som(d) : som(new Date()));
  }, [value]);

  const days = React.useMemo(() => {
    const start = som(month);
    const end = eom(month);
    const pre = (start.getDay() + 6) % 7;
    const post = (7 - ((end.getDay() + 6) % 7) - 1 + 7) % 7;

    const first = new Date(start);
    first.setDate(first.getDate() - pre);
    const total = pre + end.getDate() + post;

    return Array.from({ length: total }).map((_, i) => {
      const d = new Date(first);
      d.setDate(first.getDate() + i);
      return { d, inMonth: d.getMonth() === month.getMonth() };
    });
  }, [month]);

  const minD = min ? new Date(min) : undefined;
  const maxD = max ? new Date(max) : undefined;

  const commit = () => {
    onChange?.(temp ? iso(temp) : null);
    setOpen(false);
  };

  const styleWidth: React.CSSProperties =
    width == null ? { width: '100%' } : typeof width === 'number' ? { width: `${width}px` } : { width };

  return (
    <div
      ref={rootRef}
      className={cn(width == null ? 'relative w-full' : 'relative inline-block align-top', className)}
      style={styleWidth}
    >
      {label ? (
        <Text as="label" htmlFor={id} size="sm" className="mb-2 block">
          {label}
        </Text>
      ) : null}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'block w-full rounded-xl border border-gray-200 bg-white shadow-sm',
          'h-10 px-4 focus:outline-none focus:ring-2 focus:ring-green-600 hover:border-gray-300'
        )}
      >
        <span className="flex h-full w-full items-center gap-2 whitespace-nowrap">
          <CalendarIcon />
          <span className={cn('truncate text-[14px] leading-[20px] font-medium', value ? 'text-gray-900' : 'text-gray-500')}>
            {value ? fmt(parsed, displayLocale, displayOptions) : placeholder}
          </span>
        </span>
      </button>

      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" className="fixed z-[200]" style={{ top: coords.top, left: coords.left }}>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-xl" style={{ width: clampedW }}>
              {/* header */}
              <div className="px-6 pt-5 pb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Previous month"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-50"
                      onClick={() => setMonth((m) => addM(m, -1))}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      aria-label="Next month"
                      className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-50"
                      onClick={() => setMonth((m) => addM(m, +1))}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <Text as="div" size="md" weight="medium" className="select-none">
                    {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                  </Text>

                  <Button
                    hierarchy="secondary-gray"
                    size="sm"
                    onClick={() => {
                      const t = new Date();
                      const today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
                      setMonth(som(today));
                      setTemp(today);
                    }}
                  >
                    Today
                  </Button>
                </div>
              </div>

              {/* body (scrolls if needed) */}
              <div className="px-6" style={{ maxHeight: maxBodyH, overflowY: 'auto' }}>
                <div className="mt-1 mb-4 inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">
                  <CalendarIcon />
                  <span className={cn('text-[14px] leading-[20px] font-medium', !temp && 'text-gray-400')}>
                    {temp ? fmt(temp, displayLocale, displayOptions) : placeholder}
                  </span>
                </div>

                <div className="mb-2 grid grid-cols-7 select-none text-center text-[12px] text-gray-500">
                  {WEEKDAYS.map((w) => (
                    <div key={w} className="py-1">
                      {w}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1 pb-3">
                  {days.map(({ d, inMonth }) => {
                    const picked = temp && iso(d) === iso(temp);
                    const disabled = (!!minD && d < minD) || (!!maxD && d > maxD) || !inMonth;
                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => setTemp(new Date(d))}
                        className={cn(
                          'mx-auto my-[2px] h-9 w-9 rounded-full text-sm',
                          disabled ? 'text-gray-300' : 'text-gray-900 hover:bg-gray-100',
                          picked && 'bg-green-600 text-white hover:bg-green-600',
                          !inMonth && 'text-gray-300'
                        )}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* footer */}
              <div className="flex items-center justify-end gap-3 rounded-b-2xl border-t border-gray-200 px-6 py-5">
                <Button
                  hierarchy="secondary-gray"
                  onClick={() => {
                    setTemp(parsed);
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button hierarchy="primary" onClick={commit}>
                  Apply
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
