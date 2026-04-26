'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold, rootMargin = '-50px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use threshold array for smooth progress tracking
    const thresholdArray = threshold ? [threshold] : [0, 0.1, 0.2, 0.3, 0.5, 0.8, 1.0];

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        // Calculate progress (0-1) based on intersection ratio
        const ratio = entry.intersectionRatio;
        setProgress(ratio);
        
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce && ratio > 0.5) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold: thresholdArray, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, progress };
}
