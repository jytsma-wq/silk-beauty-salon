/**
 * Skip Link Component
 * Allows keyboard users to skip to main content
 */

'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SKIP_LINK_TARGETS } from '@/lib/a11y';

export interface SkipLinkProps {
  /** Target element ID to skip to */
  targetId?: string;
  /** Link text */
  children?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/**
 * Skip Link Component
 * Hidden by default, visible on focus for keyboard navigation
 * 
 * @example
 * ```tsx
 * // In layout.tsx
 * <SkipLink />
 * 
 * // In page.tsx
 * <main id="main-content" tabIndex={-1}>
 *   [page content here]
 * </main>
 * ```
 */
export function SkipLink({
  targetId = SKIP_LINK_TARGETS.main,
  children = 'Skip to main content',
  className,
}: SkipLinkProps): React.JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={cn(
        // Base styles - hidden by default
        'sr-only focus:not-sr-only',
        // Focus styles - visible and styled
        'fixed top-4 left-4 z-100',
        'px-4 py-3',
        'bg-background text-foreground',
        'border-2 border-primary',
        'rounded-md',
        'font-medium text-sm',
        'shadow-lg',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * Skip Links Container
 * Multiple skip links for complex layouts
 */
export interface SkipLinksProps {
  links?: Array<{
    targetId: string;
    label: string;
  }>;
  className?: string;
}

const DEFAULT_SKIP_LINKS = [
  { targetId: SKIP_LINK_TARGETS.main, label: 'Skip to main content' },
  { targetId: SKIP_LINK_TARGETS.navigation, label: 'Skip to navigation' },
  { targetId: SKIP_LINK_TARGETS.search, label: 'Skip to search' },
];

export function SkipLinks({
  links = DEFAULT_SKIP_LINKS,
  className,
}: SkipLinksProps): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Setup skip link targets on mount
  useEffect(() => {
    // Ensure main has proper ID and tabindex
    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = SKIP_LINK_TARGETS.main;
    }
    if (main && !main.hasAttribute('tabindex')) {
      main.setAttribute('tabindex', '-1');
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
      // Announce to screen readers
      announceSkip(targetId);
    }
  };

  const announceSkip = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      // Get accessible name for the target
      const label = target.getAttribute('aria-label') ||
        target.querySelector('h1, h2')?.textContent ||
        'Main content';
      
      // Create announcement
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Skipped to ${label}`;
      
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  };

  return (
    <nav
      aria-label="Skip links"
      className={cn(
        // Container styles
        'fixed top-0 left-0 right-0 z-100',
        'flex flex-col sm:flex-row gap-2',
        'p-4',
        // Hidden until focused
        'sr-only focus-within:not-sr-only',
        'focus-within:bg-background/95 focus-within:backdrop-blur-sm',
        'focus-within:shadow-lg',
        className
      )}
    >
      {links.map((link, index) => (
        <a
          key={link.targetId}
          href={`#${link.targetId}`}
          onClick={(e) => handleClick(e, link.targetId)}
          onFocus={() => setActiveIndex(index)}
          onBlur={() => setActiveIndex(null)}
          className={cn(
            // Link styles
            'px-4 py-2',
            'bg-primary text-primary-foreground',
            'rounded-md',
            'font-medium text-sm',
            'text-center',
            'transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            // Active state
            activeIndex === index && 'ring-2 ring-primary ring-offset-2'
          )}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

/**
 * Skip Link Target
 * Wraps content that should be the target of skip links
 */
export interface SkipLinkTargetProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Accessible label for the region */
  label?: string;
}

export function SkipLinkTarget({
  id = SKIP_LINK_TARGETS.main,
  children,
  className,
  label,
}: SkipLinkTargetProps): React.JSX.Element {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-label={label}
      className={cn('outline-none focus:ring-2 focus:ring-primary/50', className)}
    >
      {children}
    </section>
  );
}
