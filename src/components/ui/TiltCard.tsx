'use client';

import { motion } from 'framer-motion';
import { useTilt } from '@/hooks/use-tilt';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  disabled?: boolean; // pass true on mobile
}

export function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  disabled = false,
}: TiltCardProps) {
  const { ref, rotateX, rotateY, scale, perspective, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt });

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        perspective,
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
