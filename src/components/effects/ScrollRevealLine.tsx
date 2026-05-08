'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ScrollRevealLine({
  className = '',
  delay = 0,
  color = '#b5453a',
}: {
  className?: string;
  delay?: number;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="h-px w-full origin-left"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
