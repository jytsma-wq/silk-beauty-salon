'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface MagazineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const MagazineButton = forwardRef<HTMLButtonElement, MagazineButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'group relative overflow-hidden font-medium transition-all duration-500 ease-out';
    
    const variants = {
      primary: 'border border-stone-900 bg-stone-900 text-stone-50 hover:bg-[#b5453a] hover:border-[#b5453a]',
      secondary: 'border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900',
      outline: 'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-stone-50',
      ghost: 'text-stone-600 hover:text-stone-900 underline-offset-4 hover:underline',
    };
    
    const sizes = {
      sm: 'px-6 py-2 text-xs uppercase tracking-widest',
      md: 'px-8 py-3 text-sm uppercase tracking-wide',
      lg: 'px-12 py-5 text-sm uppercase tracking-widest',
    };
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant === 'outline' && (
          <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        )}
      </button>
    );
  }
);

MagazineButton.displayName = 'MagazineButton';

export { MagazineButton };
