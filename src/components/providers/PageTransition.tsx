'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence initial={false}>
      {/* Exit sweep overlay */}
      <motion.div
        key={`overlay-${pathname}`}
        className="fixed inset-0 z-200 pointer-events-none origin-left"
        style={{ backgroundColor: '#b5453a' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] }}
        transition={{ duration: 0.6, times: [0, 0.4, 0.6, 1] }}
      />

      {/* Page content */}
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
