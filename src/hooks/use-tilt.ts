import { useRef, useCallback } from 'react';
import { useSpring } from 'framer-motion';

interface TiltOptions {
  maxTilt?: number;      // degrees. Default 8
  perspective?: number;  // px. Default 800
  scale?: number;        // Default 1.02
}

export function useTilt({
  maxTilt = 8,
  perspective = 800,
  scale = 1.02,
}: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });
  const scaleSpring = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);  // –1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2); // –1 to 1
    rotateY.set(dx * maxTilt);
    rotateX.set(-dy * maxTilt);
    scaleSpring.set(scale);
  }, [maxTilt, scale, rotateX, rotateY, scaleSpring]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scaleSpring.set(1);
  }, [rotateX, rotateY, scaleSpring]);

  return {
    ref,
    rotateX,
    rotateY,
    scale: scaleSpring,
    perspective,
    handleMouseMove,
    handleMouseLeave,
  };
}
