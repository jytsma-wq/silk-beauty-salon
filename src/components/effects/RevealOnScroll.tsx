'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: RevealOnScrollProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30, x: 0 };
      case 'down':
        return { opacity: 0, y: -30, x: 0 };
      case 'left':
        return { opacity: 0, x: 30, y: 0 };
      case 'right':
        return { opacity: 0, x: -30, y: 0 };
      default:
        return { opacity: 0, y: 30, x: 0 };
    }
  };

  const getFinalPosition = () => {
    return { opacity: 1, y: 0, x: 0 };
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // ease-out
      }}
    >
      {children}
    </motion.div>
  );
}
