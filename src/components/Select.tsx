"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Text } from "@/components/Typography";

interface SelectOption {
  value: string;
  label: string;
  avatar?: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  withAvatars?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  labelClassName?: string;
  required?: boolean; // if you need an asterisk next to label
}

export function Select({
  options,
  value,
  onChange,
  name,
  placeholder = "Select option",
  label,
  hint,
  error,
  disabled = false,
  searchable = false,
  withAvatars = false,
  size = "md",
  className,
  labelClassName,
  required,
}: SelectProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = !!error;
  const isDisabled = disabled;

  const id = useId();
  const selectId = `select-${id}`;

  // Size tokens
  const controlSize = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-3 text-base",
    lg: "h-12 px-4 text-lg",
  }[size];

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  const textSm =
    size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  // Filtering
  const filteredOptions = searchable
    ? options.filter((o) =>
        o.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find((o) => o.value === value);

  // Outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen((o) => !o);
      if (!isOpen) setSearchTerm("");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={selectId}
          className={cn("inline-flex items-center gap-1", labelClassName)}
        >
          <Text
            as="span"
            size="sm"
            weight="medium"
            color="inherit"
            className="text-gray-700"
          >
            {label}
          </Text>
          {required && (
            <Text
              as="span"
              size="sm"
              weight="medium"
              color="inherit"
              className="text-primary-600"
            >
              *
            </Text>
          )}
        </label>
      )}

      <div className="relative" ref={selectRef}>
        <button
          id={selectId}
          type="button"
          className={cn(
            "w-full rounded-lg border border-solid transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-inset ring-offset-0",
            "disabled:cursor-not-allowed disabled:bg-gray-50",
            "flex items-center justify-between",
            controlSize,
            hasError
              ? "border-error-500 focus:ring-error-600"
              : "border-gray-300 focus:border-primary-700 focus:ring-primary-700"
          )}
          onClick={handleToggle}
          disabled={isDisabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {withAvatars && selectedOption && (
              <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {selectedOption.avatar ? (
                  <Image
                    src={selectedOption.avatar}
                    alt={selectedOption.label}
                    width={24}
                    height={24}
                  />
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            )}

            <span
              className={cn(
                "truncate",
                !selectedOption && "text-gray-400",
                textSm
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>

          <svg
            className={cn(
              iconSize,
              "transition-transform duration-200",
              isOpen && "rotate-180",
              isDisabled ? "text-gray-400" : "text-gray-500"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}

        {isOpen && (
          <div className="absolute z-[9999] w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-700"
                />
              </div>
            )}

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={value === option.value}
                    className={cn(
                      "w-full px-3 py-2 text-left",
                      "hover:bg-gray-50 transition-colors duration-200",
                      "flex items-center gap-2",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      option.disabled && "opacity-50 cursor-not-allowed",
                      value === option.value && "bg-primary-50 text-primary-700"
                    )}
                    onClick={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    disabled={option.disabled}
                  >
                    {withAvatars && (
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {option.avatar ? (
                          <Image
                            src={option.avatar}
                            alt={option.label}
                            width={24}
                            height={24}
                          />
                        ) : (
                          <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    )}

                    <span className="flex-1 truncate text-sm">
                      {option.label}
                    </span>

                    {value === option.value && (
                      <svg
                        className="w-4 h-4 text-primary-700 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {(hint || error) && (
        <Text
          as="p"
          size="sm"
          color="inherit"
          className={cn(error ? "text-error-600" : "text-gray-600")}
        >
          {error || hint}
        </Text>
      )}
    </div>
  );
}
