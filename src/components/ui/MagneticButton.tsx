'use client';

import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Attraction strength from 0 to 1. Default 0.4 */
  strength?: number;
  /** Radius in px within which magnetism activates. Default 80 */
  radius?: number;
  /** Whether to also shift the inner text/content. Default true */
  innerShift?: boolean;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 80,
  innerShift = true,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const innerX = useSpring(0, { stiffness: 300, damping: 25 });
  const innerY = useSpring(0, { stiffness: 300, damping: 25 });

  const resetPosition = useCallback(() => {
    x.set(0);
    y.set(0);
    innerX.set(0);
    innerY.set(0);
  }, [x, y, innerX, innerY]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist >= radius) {
      resetPosition();
      return;
    }

    const factor = (1 - dist / radius) * strength;
    x.set(dx * factor);
    y.set(dy * factor);

    if (innerShift) {
      innerX.set(dx * factor * 0.5);
      innerY.set(dy * factor * 0.5);
    }
  }, [innerShift, innerX, innerY, radius, resetPosition, strength, x, y]);

  if (prefersReduced) {
    return (
      <div className={`inline-block ${className}`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={`inline-block cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      <motion.span
        style={innerShift ? { x: innerX, y: innerY } : {}}
        className="block"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
