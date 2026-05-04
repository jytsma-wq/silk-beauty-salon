'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionDividerProps {
  /** 'light' for dark-on-light, 'dark' for light-on-dark */
  variant?: 'light' | 'dark';
  symbol?: '✦' | '×' | '—' | '◆';
}

export function SectionDivider({
  variant = 'light',
  symbol = '✦',
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  const lineColor = variant === 'light' ? '#e0e0e0' : 'rgba(255,255,255,0.12)';
  const textColor = variant === 'light' ? '#b5453a' : 'rgba(181,69,58,0.7)';

  return (
    <div
      ref={ref}
      className="flex items-center gap-6 px-8 lg:px-0 max-w-7xl mx-auto py-2"
      aria-hidden="true"
    >
      <motion.div
        className="h-px flex-1 origin-left"
        style={{ backgroundColor: lineColor }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="text-xs shrink-0"
        style={{ color: textColor }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {symbol}
      </motion.span>
      <motion.div
        className="h-px flex-1 origin-right"
        style={{ backgroundColor: lineColor }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
