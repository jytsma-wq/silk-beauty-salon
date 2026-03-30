'use client';

import { motion } from 'framer-motion';

// ============================================================================
// HERO COMPONENT - Minimalist French Beauty Salon Aesthetic
// ============================================================================
//
// Design Principles:
// - Pure white or silk-50 background for cleanliness
// - Elegant typography with refined proportions
// - Soft, subtle image edges (rounded-sm, not playful large radii)
// - Generous whitespace using pt-section
// - Dark charcoal text (text-gray-900) instead of absolute black
//
// Typography Scale:
// - Headline: font-display text-hero-md (clamp 2rem-3.5rem)
// - Subheadline: font-sans text-body-lg (1.0625rem, line-height 1.8)
// - Maximum width constraint (max-w-4xl) for optimal reading
//
// ============================================================================

interface HeroProps {
  headline: string;
  subheadline: string;
  className?: string;
  alignment?: 'left' | 'center';
  showImage?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export default function Hero({
  headline,
  subheadline,
  className = '',
  alignment = 'left',
  showImage = false,
  imageSrc,
  imageAlt = '',
}: HeroProps) {
  const alignmentClasses = alignment === 'center' 
    ? 'text-center items-center' 
    : 'text-left items-start';

  return (
    <section className={`bg-surface-0 pt-section pb-16 lg:pb-24 ${className}`}>
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className={`flex flex-col ${alignmentClasses} max-w-4xl`}>
          {/* 
            Headline: 
            - font-display for elegance
            - text-hero-md for refined sizing (not oversized)
            - text-gray-900 (dark charcoal) instead of black for softness
            - tracking-tight for sophistication
          */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-hero-md text-gray-900 tracking-tight leading-tight"
          >
            {headline}
          </motion.h1>

          {/* 
            Subheadline:
            - font-sans for readability
            - text-body-lg for comfortable reading (1.0625rem, line-height 1.8)
            - text-stone-500 for soft secondary text
            - mt-6 for breathing room after headline
          */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-body-lg text-stone-500 mt-6 leading-relaxed max-w-2xl"
          >
            {subheadline}
          </motion.p>
        </div>

        {/* Optional Image with subtle, refined edges */}
        {showImage && imageSrc && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-12 lg:mt-16 ${alignment === 'center' ? 'mx-auto' : ''}`}
          >
            {/* 
              Image Container:
              - rounded-sm for subtle, calculated edges (not playful large radii)
              - No heavy shadows - use shadow-soft if any
              - Aspect ratio container for consistent proportions
            */}
            <div className="relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-sm">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// TYPOGRAPHY BEST PRACTICES - French Sophistication
// ============================================================================
//
// 1. DEFAULT TEXT COLOR:
//    Always use text-gray-900 (dark charcoal #111827) instead of text-black.
//    This maintains visual softness and prevents harsh contrast that feels
//    cheap or clinical rather than luxurious.
//
//    ❌ Avoid: <h1 className="text-black">
//    ✅ Use:   <h1 className="text-gray-900">
//
// 2. HEADLINE HIERARCHY:
//    - Page Hero:    text-hero-lg (clamp 2.5rem-4.5rem)
//    - Section Hero: text-hero-md (clamp 2rem-3.5rem)
//    - Page Title:   text-hero-sm (clamp 1.75rem-2.75rem)
//    - Display 1:    text-display-1 (clamp 1.875rem-2.5rem)
//    - Display 2:    text-display-2 (clamp 1.5rem-2rem)
//
// 3. BODY TEXT:
//    - Primary:   text-body-md (1rem, line-height 1.75) - font-sans
//    - Secondary: text-body-sm (0.875rem, line-height 1.7) - font-sans
//    - Large:     text-body-lg (1.0625rem, line-height 1.8) - font-sans
//
// 4. SPACING SECTION (Custom Tailwind Value):
//    Defined in tailwind.config.ts as:
//    spacing: {
//      'section': 'clamp(4rem, 8vw, 8rem)'
//    }
//
//    Usage:
//    - py-section: padding-top and padding-bottom
//    - pt-section: padding-top only
//    - pb-section: padding-bottom only
//
//    This creates responsive, dramatic whitespace that scales elegantly
//    from mobile (4rem) to desktop (8rem).
//
// 5. COLOR PALETTE FOR TEXT:
//    - Primary:   text-gray-900 (headings, important text)
//    - Secondary: text-stone-500 (body text, descriptions)
//    - Tertiary:  text-stone-400 (captions, metadata)
//    - Accent:    text-gold-500 (hover states, highlights)
//
// 6. IMAGE TREATMENT:
//    - Use rounded-sm (2px) for subtle refinement
//    - Avoid rounded-lg, rounded-xl, or rounded-2xl (too playful)
//    - No border-radius (sharp edges) can work for editorial looks
//    - Prefer object-cover for consistent aspect ratios
//
// ============================================================================
