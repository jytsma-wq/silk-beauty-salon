'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

interface ScrollProgressBarProps {
  /** 'top' | 'left'. Default 'top' */
  position?: 'top' | 'left';
  color?: string;
  thickness?: number;
}

export function ScrollProgressBar({
  position = 'top',
  color = '#b5453a',
  thickness = 2,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  if (position === 'top') {
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] origin-left pointer-events-none"
        style={{
          height: thickness,
          backgroundColor: color,
          scaleX,
        }}
      />
    );
  }

  return (
    <motion.div
      className="fixed left-0 top-0 bottom-0 z-[100] origin-top pointer-events-none"
      style={{
        width: thickness,
        backgroundColor: color,
        scaleY: scaleX,
      }}
    />
  );
}
