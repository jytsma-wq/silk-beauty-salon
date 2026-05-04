'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Initial slider position as percent (0–100). Default 50. */
  initialPosition?: number;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updatePosition]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    };
    const handleTouchEnd = () => setIsDragging(false);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, updatePosition]);

  // Auto-demo drag animation on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start: number | null = null;
      const demo = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        if (elapsed < 800) {
          setPosition(50 - (elapsed / 800) * 20); // 50 → 30
        } else if (elapsed < 1500) {
          setPosition(30 + ((elapsed - 800) / 700) * 25); // 30 → 55
        } else {
          setPosition(55);
          return; // stop
        }
        requestAnimationFrame(demo);
      };
      requestAnimationFrame(demo);
    }, 600); // delay so user sees the initial state first
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden"
      style={{ cursor: isDragging ? 'col-resize' : 'ew-resize' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="img"
      aria-label={`Before/After comparison — ${beforeAlt}`}
    >
      {/* After image (bottom layer — full width) */}
      <div className="absolute inset-0">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />
        {/* "AFTER" label */}
        <div className="absolute bottom-4 right-4 text-[0.55rem] tracking-[0.2em] uppercase
                        text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1">
          After
        </div>
      </div>

      {/* Before image (top layer — clipped to slider position) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />
        {/* "BEFORE" label */}
        <div className="absolute bottom-4 left-4 text-[0.55rem] tracking-[0.2em] uppercase
                        text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1">
          Before
        </div>
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none z-10"
        style={{ left: `${position}%` }}
      >
        {/* Drag handle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                     w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center
                     pointer-events-none"
          animate={{ scale: isDragging ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {/* Double chevron icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 6L4 10L8 14" stroke="#b5453a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6L16 10L12 14" stroke="#b5453a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
