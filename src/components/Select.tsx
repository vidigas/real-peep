import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '../lib/utils';

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
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
}

export function Select({
  options,
  value,
  onChange,
  name,
  placeholder = 'Select option',
  label,
  hint,
  error,
  disabled = false,
  searchable = false,
  withAvatars = false,
  size = 'md',
  labelClassName,
}: SelectProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = !!error;
  const isDisabled = disabled;


  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Get selected option
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  return (
    <div className="space-y-spacing-xs">
      {label && (
        <label className={cn(
          'block font-medium text-gray-900',
          textSizeClasses[size],
          labelClassName
        )}>
          {label}
        </label>
      )}
      
      <div className="relative" ref={selectRef}>
        <button
          type="button"
          className="w-full rounded-lg border border-solid transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-50 flex items-center justify-between"
          onClick={handleToggle}
          disabled={isDisabled}
        >
          <div className="flex items-center gap-spacing-sm flex-1 min-w-0">
            {withAvatars && selectedOption && (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                {selectedOption.avatar ? (
                  <Image
                    src={selectedOption.avatar}
                    alt={selectedOption.label}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            )}
            
            <span className={cn(
              'truncate',
              !selectedOption && 'text-gray-500'
            )}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          
          <svg
            className={cn(
              iconSizeClasses[size],
              'transition-transform duration-200',
              isOpen && 'rotate-180',
              isDisabled ? 'text-gray-400' : 'text-gray-500'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {name ? <input type="hidden" name={name} value={value ?? ''} /> : null}
        {isOpen && (
          <div className="absolute z-50 w-full mt-spacing-xs bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-spacing-sm border-b border-gray-200">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-spacing-sm py-spacing-xs text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            )}

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-spacing-md py-spacing-sm text-sm text-gray-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      'w-full px-spacing-md py-spacing-sm text-left',
                      'hover:bg-gray-50 transition-colors duration-200',
                      'flex items-center gap-spacing-sm',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      option.disabled && 'opacity-50 cursor-not-allowed',
                      value === option.value && 'bg-primary-50 text-primary-500'
                    )}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                  >
                    {withAvatars && (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        {option.avatar ? (
                          <Image
                            src={option.avatar}
                            alt={option.label}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}
                    
                    <span className="flex-1 truncate text-sm">
                      {option.label}
                    </span>
                    
                    {value === option.value && (
                      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
        <p className={cn(
          textSizeClasses[size],
          hasError ? 'text-error-500' : 'text-gray-500'
        )}>
          {error || hint}
        </p>
      )}
    </div>
  );
}

// Convenience components
export function SelectWithAvatars(props: Omit<SelectProps, 'withAvatars'>) {
  return <Select withAvatars {...props} />;
}

export function SearchableSelect(props: Omit<SelectProps, 'searchable'>) {
  return <Select searchable {...props} />;
}

export function SelectSmall(props: Omit<SelectProps, 'size'>) {
  return <Select size="sm" {...props} />;
}

export function SelectLarge(props: Omit<SelectProps, 'size'>) {
  return <Select size="lg" {...props} />;
}
