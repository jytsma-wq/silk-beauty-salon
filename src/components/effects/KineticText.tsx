'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** 'word' | 'char' — word is faster to render, char is more dramatic */
  splitBy?: 'word' | 'char';
}

export function KineticText({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  splitBy = 'word',
}: KineticTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const units = splitBy === 'char'
    ? text.split('')
    : text.split(' ');

  return (
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1], // expo ease-out
            }}
          >
            {unit}{splitBy === 'word' ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
