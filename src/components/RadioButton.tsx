"use client";
import React, { useId, useRef } from "react";
import { cn } from "../lib/utils";
import { Text } from "./Typography";

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card" | "compact";
  className?: string;
  labelClassName?: string;
}

/** Figma-aligned tokens */
const BORDER_DEFAULT = "#E5E7EB"; // neutral border
const BORDER_SELECTED = "#5599D4"; // blue (Secondary 400)
const HOVER_BG = "#F9FAFB";
const DOT_ACCENT = "#2E7D32"; // green brand dot

export function RadioButton({
  label,
  description,
  size = "md",
  variant = "default",
  className,
  labelClassName,
  checked,
  disabled,
  onChange,
  ...props
}: RadioButtonProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { ...inputProps } = props;

  const sizeClasses = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  const spacing = { sm: "gap-2", md: "gap-3", lg: "gap-4" };

  const Dot = () => (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border",
        sizeClasses[size],
        checked ? "border-[color:var(--dot-border)]" : "border-gray-400"
      )}
      style={{ ["--dot-border" as string]: BORDER_SELECTED }}
      aria-hidden
    >
      {checked && (
        <span
          className={cn(
            "block rounded-full",
            size === "sm"
              ? "w-2 h-2"
              : size === "lg"
              ? "w-[10px] h-[10px]"
              : "w-2.5 h-2.5"
          )}
          style={{ backgroundColor: DOT_ACCENT }}
        />
      )}
    </span>
  );

  /** CARD variant — fills available width evenly (parent decides columns) */
  if (variant === "card") {
    return (
      <div
        className={cn(
          "min-w-0 w-full",
          "h-[56px] px-4 py-4",
          "rounded-xl border-[2px]",
          "bg-white flex items-center select-none",
          disabled ? "pointer-events-none opacity-60" : "cursor-pointer",
          !disabled &&
            "transition-colors duration-150 hover:[background-color:var(--hover-bg)]",
          className
        )}
        style={{
          ["--hover-bg" as string]: HOVER_BG,
          borderColor: checked ? BORDER_SELECTED : BORDER_DEFAULT,
        }}
        onClick={() => {
          if (disabled) return;
          inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="radio"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
        <Dot />
        {label && (
          <label htmlFor={id} className={cn("ml-3", labelClassName)}>
            <Text
              as="span"
              size="md"
              weight="medium"
              color="heading"
              className="leading-[24px] text-[#1A1A1A]"
            >
              {label}
            </Text>
          </label>
        )}
      </div>
    );
  }

  /** COMPACT */
  if (variant === "compact") {
    return (
      <label
        htmlFor={id}
        className={cn(
          "flex items-center",
          spacing[size],
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          className
        )}
      >
        <input
          id={id}
          ref={inputRef}
          type="radio"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
        <Dot />
        {(label || description) && (
          <span className="min-w-0">
            {label && (
              <Text
                as="span"
                size="md"
                weight="medium"
                color="heading"
                className="leading-[24px]"
              >
                {label}
              </Text>
            )}
            {description && (
              <Text
                as="div"
                size="sm"
                weight="normal"
                color="muted"
                className="mt-1"
              >
                {description}
              </Text>
            )}
          </span>
        )}
      </label>
    );
  }

  /** DEFAULT */
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start",
        spacing[size],
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
    >
      <input
        ref={inputRef}
        id={id}
        type="radio"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...inputProps}
      />
      <Dot />
      {(label || description) && (
        <span className="min-w-0">
          {label && (
            <Text
              as="span"
              size="md"
              weight="medium"
              color="heading"
              className="leading-[24px]"
            >
              {label}
            </Text>
          )}
          {description && (
            <Text
              as="div"
              size="sm"
              weight="normal"
              color="muted"
              className="mt-1"
            >
              {description}
            </Text>
          )}
        </span>
      )}
    </label>
  );
}

/* Convenience exports */
export function RadioCard(props: RadioButtonProps) {
  return <RadioButton variant="card" {...props} />;
}
export function RadioCompact(props: RadioButtonProps) {
  return <RadioButton variant="compact" {...props} />;
}
export function RadioSmall(props: RadioButtonProps) {
  return <RadioButton size="sm" {...props} />;
}
export function RadioLarge(props: RadioButtonProps) {
  return <RadioButton size="lg" {...props} />;
}
