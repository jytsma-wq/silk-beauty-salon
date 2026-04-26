'use client';

import { useEffect, useRef, useState } from 'react';
import { ParallaxImage } from '@/components/effects';

interface StickySplitSectionProps {
  imageSrc: string;
  imageAlt: string;
  children: React.ReactNode;
  reverse?: boolean;
  minHeight?: string;
}

export function StickySplitSection({
  imageSrc,
  imageAlt,
  children,
  reverse = false,
  minHeight = '100vh',
}: StickySplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate progress: 0 when section enters viewport, 1 when it leaves
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = windowHeight - start;
      const progress = Math.max(0, Math.min(1, current / total));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for image reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Clip-path based on reverse prop
  const clipPathStyle = {
    clipPath: isRevealed
      ? 'inset(0 0 0 0)'
      : reverse
        ? 'inset(0 0 0 100%)'
        : 'inset(0 100% 0 0)',
    transition: 'clip-path 1.2s ease-out',
  };

  return (
    <section
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-2 min-h-screen"
      style={{ minHeight }}
    >
      {/* Image Side - Sticky */}
      <div
        className={`h-screen sticky top-0 overflow-hidden ${
          reverse ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {/* Image with clip-path reveal and parallax */}
        <div className="absolute inset-0" style={clipPathStyle}>
          <ParallaxImage
            src={imageSrc}
            alt={imageAlt}
            fill
            parallaxSpeed={0.1}
            sizes="50vw"
            priority
          />
        </div>

        {/* Scroll Progress Indicator */}
        <div
          className="absolute left-8 top-1/2 -translate-y-1/2 w-px bg-[#b5453a]/20 z-10"
          style={{ height: '120px' }}
        >
          <div
            className="w-full bg-[#b5453a] transition-all duration-100"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Content Side - Scrollable */}
      <div
        className={`py-32 px-8 lg:px-20 flex flex-col justify-center ${
          reverse ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        {children}
      </div>
    </section>
  );
}
