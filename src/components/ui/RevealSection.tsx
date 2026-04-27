'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

export function RevealSection({
  children, className = '', delay = 0, direction = 'up'
}: RevealSectionProps) {
  const variants = {
    up:    { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  };
  const v = variants[direction];
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={v}
    >
      {children}
    </motion.div>
  );
}
