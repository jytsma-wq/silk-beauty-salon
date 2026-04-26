'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ParallaxImageProps extends Omit<ImageProps, 'fill'> {
  parallaxSpeed?: number;
  fill?: boolean;
}

export function ParallaxImage({
  parallaxSpeed = 0.15,
  fill = true,
  className = '',
  alt,
  ...props
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        if (containerRef.current && scrollY !== lastScrollY) {
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate parallax offset based on element position
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          
          const offset = distanceFromCenter * parallaxSpeed;
          setTranslateY(offset);
          lastScrollY = scrollY;
        }
        rafId = 0;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [parallaxSpeed]);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${fill ? 'absolute inset-0' : 'relative'}`}
    >
      <div
        className="will-change-transform"
        style={{
          transform: `translateY(${translateY}px) scale(1.1)`,
          height: fill ? '120%' : 'auto',
          width: '100%',
        }}
      >
        <Image
          alt={alt}
          fill={fill}
          className={`object-cover ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
