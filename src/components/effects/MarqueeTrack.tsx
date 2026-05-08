'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface MarqueeTrackProps {
  children: React.ReactNode;
  /** Duration of one full scroll cycle in seconds */
  duration?: number;
  /** true = right-to-left (default), false = left-to-right */
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function MarqueeTrack({
  children,
  duration = 30,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: MarqueeTrackProps) {
  const controls = useAnimationControls();
  const isRunning = useRef(true);

  useEffect(() => {
    controls.start({
      x: reverse ? ['0%', '50%'] : ['-50%', '0%'],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      },
    });
  }, [controls, duration, reverse]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isRunning.current = false;
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      isRunning.current = true;
      controls.start({
        x: reverse ? ['0%', '50%'] : ['-50%', '0%'],
        transition: {
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        },
      });
    }
  };

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={controls}
      >
        {/* Duplicate children for seamless loop */}
        <span className="flex">{children}</span>
        <span className="flex" aria-hidden="true">{children}</span>
      </motion.div>
    </div>
  );
}
