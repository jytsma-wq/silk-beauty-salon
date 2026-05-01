'use client';

import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Magazine Text Input
interface MagazineInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const MagazineInput = forwardRef<HTMLInputElement, MagazineInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs uppercase tracking-widest text-stone-500">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-0 py-4 border-0 border-b-2 border-stone-300',
            'focus:border-stone-900 bg-transparent text-base outline-none transition-colors',
            'placeholder:text-stone-400',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

MagazineInput.displayName = 'MagazineInput';

// Magazine Textarea
interface MagazineTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const MagazineTextarea = forwardRef<HTMLTextAreaElement, MagazineTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs uppercase tracking-widest text-stone-500">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full px-0 py-4 border-0 border-b-2 border-stone-300',
            'focus:border-stone-900 bg-transparent text-base outline-none resize-none transition-colors',
            'placeholder:text-stone-400',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

MagazineTextarea.displayName = 'MagazineTextarea';

// Magazine Select
interface MagazineSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

const MagazineSelect = forwardRef<HTMLSelectElement, MagazineSelectProps>(
  ({ className, label, options, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-xs uppercase tracking-widest text-stone-500">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-0 py-4 border-0 border-b-2 border-stone-300',
              'focus:border-stone-900 bg-transparent text-base outline-none transition-colors',
              'appearance-none cursor-pointer',
              error && 'border-red-500 focus:border-red-500',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

MagazineSelect.displayName = 'MagazineSelect';

export { MagazineInput, MagazineTextarea, MagazineSelect };
