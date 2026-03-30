'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================================================
// VIEWPORT REVEAL COMPONENT - French Luxury Micro-interaction
// ============================================================================
//
// Purpose: Adds a subtle zoom animation to images when they enter the viewport.
//          This gives the feeling that the website "lives" as the user scrolls.
//
// Design Principle: French luxury is about details you only notice when they're
// missing. The animation should be barely perceptible - a whisper, not a shout.
//
// Usage:
//   <ViewportReveal>
//     <img src="/image.jpg" alt="Description" />
//   </ViewportReveal>
//
// Or with custom options:
//   <ViewportReveal 
//     scale={1.05} 
//     duration={1.2} 
//     delay={0.2}
//     className="rounded-sm"
//   >
//     <img src="/image.jpg" alt="Description" className="w-full h-full object-cover" />
//   </ViewportReveal>
//
// ============================================================================

interface ViewportRevealProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;        // Subtle zoom amount (default: 1.03 = 3% zoom)
  duration?: number;     // Animation duration in seconds (default: 1.2s for elegance)
  delay?: number;        // Delay before animation starts
  once?: boolean;        // Only animate once (default: true)
  amount?: number;       // Percentage of element visible to trigger (default: 0.3)
}

export default function ViewportReveal({
  children,
  className = '',
  scale = 1.03,
  duration = 1.2,
  delay = 0,
  once = true,
  amount = 0.3,
}: ViewportRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1 }}
        animate={isInView ? { scale } : { scale: 1 }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // Elegant cubic-bezier for French sophistication
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// VARIANT: ViewportRevealContainer
// ============================================================================
//
// For wrapping entire sections with fade + slide-up animation
// Use this for H1 and H2 headings as specified in the design requirements
//
// Usage:
//   <ViewportRevealContainer>
//     <h1 className="font-display text-hero-md">Elegant Heading</h1>
//   </ViewportRevealContainer>
//
// ============================================================================

interface ViewportRevealContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
  amount?: number;
}

export function ViewportRevealContainer({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
  amount = 0.3,
}: ViewportRevealContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  const offset = directionOffset[direction];

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...offset }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1], // Elegant easing
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// CSS CLASS UTILITIES
// ============================================================================
//
// Add these classes to tailwind.config.ts or use as standard Tailwind:
//
// animation: {
//   'fade-in': 'fadeIn 0.8s ease-out forwards',
//   'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
// }
//
// keyframes: {
//   fadeIn: {
//     from: { opacity: '0' },
//     to: { opacity: '1' },
//   },
//   slideUp: {
//     from: { opacity: '0', transform: 'translateY(30px)' },
//     to: { opacity: '1', transform: 'translateY(0)' },
//   },
// }
//
// Then use: className="animate-fade-in" or className="animate-slide-up"
//
// ============================================================================
