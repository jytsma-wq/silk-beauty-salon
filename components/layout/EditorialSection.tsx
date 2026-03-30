'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

// ============================================================================
// EDITORIAL SECTION - French Luxury Magazine Layout Wrapper
// ============================================================================
//
// Purpose: Enforces strict vertical and horizontal whitespace constraints
//          inspired by French luxury magazine layouts.
//
// Design Philosophy:
// - Extreme vertical padding creates "breathability" between components
// - Constrained max-width ensures optimal reading line length
// - Typography hierarchy is enforced through consistent patterns
//
// Usage:
//   <EditorialSection>
//     <h1 className="font-display text-hero-md max-w-4xl text-surface-900">
//       Elegant Headline
//     </h1>
//   </EditorialSection>
//
//   <EditorialSection variant="hero" background="silk">
//     <h2 className="font-accent text-display-1 max-w-4xl text-surface-900 uppercase tracking-widest">
//       Uppercase Title
//     </h2>
//   </EditorialSection>
//
// ============================================================================

interface EditorialSectionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'compact';
  background?: 'white' | 'silk' | 'surface';
  animate?: boolean;
  delay?: number;
  id?: string;
  ariaLabel?: string;
}

export default function EditorialSection({
  children,
  className = '',
  variant = 'default',
  background = 'white',
  animate = true,
  delay = 0,
  id,
  ariaLabel,
}: EditorialSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Background color mapping
  const bgClasses = {
    white: 'bg-surface-0',
    silk: 'bg-silk-50',
    surface: 'bg-surface-1',
  };

  // Vertical padding based on variant
  // Using custom py-section (clamp 4rem-8rem) for breathing room
  const paddingClasses = {
    default: 'py-section',      // Standard section spacing
    hero: 'pt-32 pb-24',       // Hero: extra top for header clearance
    compact: 'py-16 lg:py-20', // Compact: reduced for tight groups
  };

  const bgClass = bgClasses[background];
  const paddingClass = paddingClasses[variant];

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={`${bgClass} ${paddingClass} ${className}`}
    >
      <motion.div
        initial={animate ? { opacity: 0, y: 30 } : false}
        animate={animate && isInView ? { opacity: 1, y: 0 } : false}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1], // Elegant cubic-bezier
        }}
        className="container mx-auto max-w-7xl px-6 lg:px-12"
      >
        {children}
      </motion.div>
    </section>
  );
}

// ============================================================================
// TYPOGRAPHY ENFORCER - Editorial Headline Component
// ============================================================================
//
// Usage:
//   <EditorialHeadline as="h1" variant="hero" font="display">
//     Elegant Serif Title
//   </EditorialHeadline>
//
//   <EditorialHeadline as="h2" variant="section" font="accent" uppercase>
//     UPPERCUSE CINZEL TITLE
//   </EditorialHeadline>
//
// ============================================================================

interface EditorialHeadlineProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  variant?: 'hero' | 'section' | 'subsection';
  font?: 'display' | 'accent';
  uppercase?: boolean;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function EditorialHeadline({
  children,
  as: Component = 'h2',
  variant = 'section',
  font = 'display',
  uppercase = false,
  className = '',
  animate = true,
  delay = 0,
}: EditorialHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Font family classes
  const fontClasses = {
    display: 'font-display',
    accent: 'font-accent',
  };

  // Size and style variants
  const variantClasses = {
    hero: 'text-hero-md lg:text-hero-lg',
    section: 'text-display-1 lg:text-hero-sm',
    subsection: 'text-display-2',
  };

  // Typography constraints per design spec
  const baseClasses = `
    ${fontClasses[font]}
    ${variantClasses[variant]}
    ${uppercase ? 'uppercase tracking-widest' : 'tracking-tight'}
    text-surface-900
    max-w-4xl
    leading-tight
  `;

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 30 } : false}
      animate={animate && isInView ? { opacity: 1, y: 0 } : false}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Component className={`${baseClasses} ${className}`}>
        {children}
      </Component>
    </motion.div>
  );
}

// ============================================================================
// EDITORIAL BEST PRACTICES
// ============================================================================
//
// 1. VERTICAL SPACING (Custom Tailwind Config):
//    spacing: {
//      'section': 'clamp(4rem, 8vw, 8rem)'
//    }
//
//    - py-section: Standard section padding (responsive 4rem-8rem)
//    - pt-32 pb-24: Hero sections (extra top for sticky header clearance)
//    - py-16: Compact sections (tight groups)
//
// 2. HORIZONTAL CONSTRAINTS:
//    - max-w-7xl: Maximum content width (1280px)
//    - mx-auto: Center alignment
//    - px-6: Mobile/tablet horizontal padding (24px)
//    - lg:px-12: Desktop horizontal padding (48px)
//
// 3. TYPOGRAPHY HIERARCHY:
//
//    For Serif Headlines (font-display):
//    - Page Hero:    text-hero-lg (clamp 2.5rem-4.5rem)
//    - Section Hero: text-hero-md (clamp 2rem-3.5rem)
//    - Page Title:   text-hero-sm (clamp 1.75rem-2.75rem)
//    - Display 1:    text-display-1 (clamp 1.875rem-2.5rem)
//    - Always: max-w-4xl, text-surface-900, tracking-tight
//
//    For Uppercase Titles (font-accent - Cinzel):
//    - text-display-1 or text-hero-sm
//    - Always: uppercase, tracking-widest, text-surface-900
//    - Use for section labels, decorative titles
//
// 4. ANIMATION PATTERNS:
//    - Default: fade-in + slide-up (y: 30 → 0)
//    - Duration: 0.8s
//    - Easing: cubic-bezier(0.16, 1, 0.3, 1) - elegant out-quint
//    - Stagger: delay prop for sequential reveals
//
// 5. COLOR USAGE:
//    - Headlines: text-surface-900 (deep charcoal, not pure black)
//    - Body: text-stone-500 or text-surface-700
//    - Backgrounds:
//      * bg-surface-0: Pure white (#ffffff)
//      * bg-silk-50: Warm white (#FEFBF9)
//      * bg-surface-1: Light grey (#fafafa)
//
// 6. SPACING BETWEEN SECTIONS:
//    - Avoid hard borders between sections
//    - Use background color transitions (white → silk-50) as natural dividers
//    - This creates the "editorial magazine" flow
//
// ============================================================================
