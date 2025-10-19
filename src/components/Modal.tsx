"use client";
import * as React from "react";
import { X } from "lucide-react";
import clsx from "clsx";

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "w-[480px]",
  md: "w-[640px]",
  lg: "w-[720px]",
  xl: "w-[848px]", // Figma width
};

export function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  contentClassName,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  contentClassName?: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* dialog */}
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative z-[101]",
          sizeClasses[size],
          "h-[600px] w-[848px]", // fixed Figma size
          "flex flex-col rounded-[20px] bg-white",
          "shadow-[0_5px_20px_0_rgba(128,128,128,0.40)]",
          "overflow-hidden"
        )}
      >
        {/* header — 20px gutters */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 flex-shrink-0">
          {title ? (
            <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* scrollable body */}
        <div
          className={clsx(
            "flex-1 min-h-0 overflow-y-auto",
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("py-0", className)}>{children}</div>;
}

/** Full-bleed footer; fixed inside modal bottom */
export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 right-0",
        "px-5 py-4 border-t border-gray-200",
        "flex items-center justify-between",
        "bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
