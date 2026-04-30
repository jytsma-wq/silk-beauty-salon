/**
 * Visually Hidden Component
 * Content hidden visually but accessible to screen readers
 */

import { cn } from '@/lib/utils';

export interface VisuallyHiddenProps {
  /** Content to hide visually */
  children: React.ReactNode;
  /** Additional classes */
  className?: string;
  /** Show element when focused (for skip links) */
  focusable?: boolean;
}

/**
 * Visually Hidden Component
 * 
 * Hides content visually while keeping it accessible to assistive technologies.
 * Useful for providing additional context to screen reader users without
 * cluttering the visual UI.
 * 
 * @example
 * ```tsx
 * <button>
 *   <Icon name="close" />
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 * 
 * <label>
 *   Search
 *   <VisuallyHidden>(Press / to focus)</VisuallyHidden>
 *   <input type="search" />
 * </label>
 * ```
 */
export function VisuallyHidden({
  children,
  className,
  focusable = false,
}: VisuallyHiddenProps): React.JSX.Element {
  return (
    <span
      className={cn(
        // Base sr-only styles
        'absolute',
        'w-px',
        'h-px',
        '-m-px',
        '-m-px',
        'overflow-hidden',
        'whitespace-nowrap',
        'border-0',
        // Conditionally show on focus
        focusable && 'focus:static focus:w-auto focus:h-auto focus:m-0 focus:overflow-visible focus:whitespace-normal',
        className
      )}
      style={{
        clip: 'rect(0, 0, 0, 0)',
        clipPath: 'inset(50%)',
      }}
    >
      {children}
    </span>
  );
}

/**
 * Screen Reader Only Text
 * Shorthand component for sr-only text
 */
interface SROnlyProps {
  children: React.ReactNode;
}

export function SROnly({ children }: SROnlyProps): React.JSX.Element {
  return <VisuallyHidden>{children}</VisuallyHidden>;
}

/**
 * Accessible Icon Button Helper
 * Wraps an icon with proper screen reader label
 */
export interface AccessibleIconProps {
  /** Icon component or element */
  icon: React.ReactNode;
  /** Accessible label describing the action */
  label: string;
  /** Additional classes for the wrapper */
  className?: string;
}

export function AccessibleIcon({
  icon,
  label,
  className,
}: AccessibleIconProps): React.JSX.Element {
  return (
    <span className={cn('inline-flex items-center', className)}>
      {icon}
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}

/**
 * Decorative Icon
 * Marks an icon as purely decorative (hidden from screen readers)
 */
export interface DecorativeIconProps {
  icon: React.ReactNode;
  className?: string;
}

export function DecorativeIcon({
  icon,
  className,
}: DecorativeIconProps): React.JSX.Element {
  return (
    <span className={className} aria-hidden="true">
      {icon}
    </span>
  );
}

/**
 * Status Announcer
 * Announces status changes to screen readers
 */
export interface StatusAnnouncerProps {
  /** Message to announce */
  message: string;
  /** Announcement priority */
  priority?: 'polite' | 'assertive';
  /** Unique ID for the announcer */
  id?: string;
}

export function StatusAnnouncer({
  message,
  priority = 'polite',
  id = 'status-announcer',
}: StatusAnnouncerProps): React.JSX.Element {
  return (
    <div
      id={id}
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

/**
 * Live Region
 * Container for dynamic content that should be announced
 */
export interface LiveRegionProps {
  children: React.ReactNode;
  priority?: 'polite' | 'assertive';
  atomic?: boolean;
  className?: string;
}

export function LiveRegion({
  children,
  priority = 'polite',
  atomic = true,
  className,
}: LiveRegionProps): React.JSX.Element {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic={atomic}
      className={cn('sr-only', className)}
    >
      {children}
    </div>
  );
}
