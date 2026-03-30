'use client';

import { motion } from 'framer-motion';

interface FrenchSeparatorProps {
  variant?: 'simple' | 'ornate' | 'dots' | 'wave';
  className?: string;
}

export default function FrenchSeparator({ variant = 'simple', className = '' }: FrenchSeparatorProps) {
  if (variant === 'simple') {
    return (
      <div className={`flex items-center justify-center gap-4 ${className}`}>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-amber-400/30" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-2 h-2 rotate-45 bg-amber-400/60"
        />
        <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-amber-400/30" />
      </div>
    );
  }

  if (variant === 'ornate') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/40" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400/50">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        <div className="h-px w-8 bg-amber-400/30" />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-400/40">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        <div className="h-px w-8 bg-amber-400/30" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-amber-400/50">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="currentColor" strokeWidth="1" fill="none"/>
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/40" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-1 h-1 rounded-full bg-amber-400/50"
          />
        ))}
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <svg width="200" height="20" viewBox="0 0 200 20" className="text-amber-400/30">
          <path
            d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  }

  return null;
}
