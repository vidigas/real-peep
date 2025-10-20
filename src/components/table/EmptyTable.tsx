// components/table/EmptyTable.tsx
"use client";

import * as React from "react";
import { Text } from "@/components/Typography";

/* ----------------------------- Card + Header ----------------------------- */

export function TableCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#E0E0E0] bg-white overflow-hidden">
      {children}
    </section>
  );
}

export function TableCardHeader({
  title,
  onRefresh,
}: {
  title: string;
  onRefresh?: () => void;
}) {
  return (
    <header className="px-6 py-6 flex items-center justify-between">
      <Text as="h2" size="lg" weight="medium" color="heading">
        {title}
      </Text>

      {onRefresh && (
        <button
          type="button"
          aria-label="Refresh"
          onClick={onRefresh}
          className="h-8 w-8 grid place-items-center rounded-full text-gray-500 hover:bg-gray-50"
        >
          {/* rotate/refresh icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.6665 8.33333C1.6665 8.33333 1.7676 7.62563 4.69654 4.6967C7.62547 1.76777 12.3742 1.76777 15.3031 4.6967C16.3409 5.73443 17.0109 7.0006 17.3133 8.33333M1.6665 8.33333V3.33333M1.6665 8.33333H6.6665M18.3332 11.6667C18.3332 11.6667 18.2321 12.3744 15.3031 15.3033C12.3742 18.2322 7.62547 18.2322 4.69654 15.3033C3.65881 14.2656 2.98875 12.9994 2.68636 11.6667M18.3332 11.6667V16.6667M18.3332 11.6667H13.3332"
              stroke="#757575"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </header>
  );
}

/* ----------------------------- Column headers ---------------------------- */

export function TableHeaderRow() {
  return (
    <div className="grid grid-cols-4 gap-6 px-6 py-3 border-t border-[#E0E0E0] bg-[#FAFAFA]">
      <Text
        as="div"
        size="xs"
        weight="medium"
        color="muted"
        className="tracking-[0.6px] uppercase"
      >
        STATUS
      </Text>
      <Text
        as="div"
        size="xs"
        weight="medium"
        color="muted"
        className="tracking-[0.6px] uppercase"
      >
        LISTING
      </Text>
      <Text
        as="div"
        size="xs"
        weight="medium"
        color="muted"
        className="tracking-[0.6px] uppercase"
      >
        LIST DATE
      </Text>
      <Text
        as="div"
        size="xs"
        weight="medium"
        color="muted"
        className="tracking-[0.6px] uppercase"
      >
        LEAD SOURCE
      </Text>
    </div>
  );
}

/* --------------------------------- Empty --------------------------------- */

type EmptyStateTableProps = {
  /** Big line under the icon — defaults to “No Listings Yet” */
  title?: string;
  /** Kept for backward compatibility with your previous call signature */
  heading?: string;
  /** Small muted line under the title */
  subtitle: string;
  /** Optional custom icon; if omitted we render the clipboard */
  icon?: React.ReactNode;
  className?: string;
};

export function EmptyStateTable({
  title,
  heading,
  subtitle,
  icon,
  className,
}: EmptyStateTableProps) {
  const resolvedTitle =
    title ?? (heading ? `No ${heading.trim()} Yet` : "No Listings Yet");

  return (
    <div
      className={[
        "min-h-[200px] px-6 py-10",
        "grid place-items-center text-center",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-xl border border-[#BDBDBD] shadow-[0_1px_2px_rgba(10,12,18,0.05)] grid place-items-center">
          {icon ?? <ClipboardGlyph />}
        </div>

        <Text
          as="div"
          size="lg"
          weight="medium"
          color="heading"
          className="text-center"
        >
          {resolvedTitle}
        </Text>

        <Text
          as="div"
          size="sm"
          weight="medium"
          color="muted"
          className="text-center"
        >
          {subtitle}
        </Text>
      </div>
    </div>
  );
}

/* --------------------------------- Icon ---------------------------------- */

function ClipboardGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="7"
        y="7"
        width="10"
        height="12"
        rx="1.5"
        stroke="#424242"
        strokeWidth="2"
      />
      <rect
        x="9.5"
        y="5"
        width="5"
        height="3"
        rx="1"
        stroke="#424242"
        strokeWidth="2"
      />
    </svg>
  );
}
