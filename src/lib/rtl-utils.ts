/**
 * RTL (Right-to-Left) Utilities for Silk Beauty Salon
 * Supports Arabic (ar) and Hebrew (he) languages
 */

import { Locale } from '@/i18n';

// RTL locales
export const RTL_LOCALES: readonly Locale[] = ['ar', 'he'];

/**
 * Check if a locale is RTL
 * @param locale - The locale code
 * @returns boolean
 */
export function isRTL(locale: Locale | string): boolean {
  return RTL_LOCALES.includes(locale as Locale);
}

/**
 * Get the text direction for a locale
 * @param locale - The locale code
 * @returns 'rtl' | 'ltr'
 */
export function getTextDirection(locale: Locale | string): 'rtl' | 'ltr' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}

/**
 * Get CSS direction properties for a locale
 * @param locale - The locale code
 * @returns Object with CSS direction properties
 */
export function getDirectionStyles(locale: Locale | string): {
  direction: 'rtl' | 'ltr';
  textAlign: 'left' | 'right';
} {
  const isRtl = isRTL(locale);
  return {
    direction: isRtl ? 'rtl' : 'ltr',
    textAlign: isRtl ? 'right' : 'left',
  };
}

/**
 * Mirror CSS property values for RTL layouts
 * Useful for margins, paddings, and positioning
 * @param value - CSS value string
 * @param locale - The locale code
 * @returns Mirrored value if RTL, original if LTR
 */
export function mirrorValueForRTL(value: string, locale: Locale | string): string {
  if (!isRTL(locale)) return value;

  // Handle common CSS property values
  const mappings: Record<string, string> = {
    'left': 'right',
    'right': 'left',
    'ltr': 'rtl',
    'rtl': 'ltr',
  };

  return mappings[value] || value;
}

/**
 * Get logical CSS property alternative
 * Replaces physical properties with logical ones for better RTL support
 * @param property - CSS property name
 * @returns Logical CSS property name
 */
export function getLogicalProperty(property: string): string {
  const logicalMap: Record<string, string> = {
    'margin-left': 'margin-inline-start',
    'margin-right': 'margin-inline-end',
    'padding-left': 'padding-inline-start',
    'padding-right': 'padding-inline-end',
    'border-left': 'border-inline-start',
    'border-right': 'border-inline-end',
    'left': 'inset-inline-start',
    'right': 'inset-inline-end',
  };

  return logicalMap[property] || property;
}

/**
 * Convert physical border-radius to logical for RTL
 * Handles asymmetrical border-radius values
 * @param radius - Border radius value or shorthand
 * @param locale - The locale code
 * @returns Adjusted radius for RTL if needed
 */
export function getLogicalBorderRadius(
  radius: string,
  locale: Locale | string
): string {
  if (!isRTL(locale)) return radius;

  // Parse border-radius shorthand (e.g., "10px 20px 30px 40px")
  const values = radius.trim().split(/\s+/);
  
  if (values.length === 4) {
    // [top-left, top-right, bottom-right, bottom-left]
    // For RTL: swap top-left↔top-right and bottom-left↔bottom-right
    const [tl, tr, br, bl] = values;
    return `${tr} ${tl} ${bl} ${br}`;
  }
  
  if (values.length === 3) {
    // [top-left, top-right/bottom-left, bottom-right]
    const [tl, trbl, br] = values;
    return `${trbl} ${tl} ${trbl} ${br}`;
  }

  return radius;
}

/**
 * Get transform value for RTL (flip horizontally)
 * @param transform - CSS transform string
 * @param locale - The locale code
 * @returns Transform adjusted for RTL
 */
export function getRTLTransform(
  transform: string,
  locale: Locale | string
): string {
  if (!isRTL(locale)) return transform;

  // Check if already has scaleX(-1) to avoid double-flipping
  if (transform.includes('scaleX(-1)')) {
    return transform;
  }

  // Prepend scaleX(-1) for horizontal flip
  return transform ? `scaleX(-1) ${transform}` : 'scaleX(-1)';
}

/**
 * Arrow direction classes for RTL
 * Maps arrow positions to their RTL equivalents
 */
export const ARROW_DIRECTIONS = {
  arrowLeft: {
    ltr: '←',
    rtl: '→',
    className: {
      ltr: 'arrow-left',
      rtl: 'arrow-right',
    },
  },
  arrowRight: {
    ltr: '→',
    rtl: '←',
    className: {
      ltr: 'arrow-right',
      rtl: 'arrow-left',
    },
  },
  chevronLeft: {
    ltr: '‹',
    rtl: '›',
    className: {
      ltr: 'chevron-left',
      rtl: 'chevron-right',
    },
  },
  chevronRight: {
    ltr: '›',
    rtl: '‹',
    className: {
      ltr: 'chevron-right',
      rtl: 'chevron-left',
    },
  },
} as const;

/**
 * Get arrow direction for current locale
 * @param direction - Arrow direction type
 * @param locale - The locale code
 * @returns Arrow symbol appropriate for locale
 */
export function getArrow(
  direction: keyof typeof ARROW_DIRECTIONS,
  locale: Locale | string
): string {
  const dir = isRTL(locale) ? 'rtl' : 'ltr';
  return ARROW_DIRECTIONS[direction][dir];
}

/**
 * Get arrow CSS class for current locale
 * @param direction - Arrow direction type
 * @param locale - The locale code
 * @returns CSS class name appropriate for locale
 */
export function getArrowClass(
  direction: keyof typeof ARROW_DIRECTIONS,
  locale: Locale | string
): string {
  const dir = isRTL(locale) ? 'rtl' : 'ltr';
  return ARROW_DIRECTIONS[direction].className[dir];
}

/**
 * Format number for RTL display
 * Ensures proper number formatting in RTL contexts
 * @param num - Number to format
 * @param locale - The locale code
 * @returns Formatted number string
 */
export function formatNumberForRTL(
  num: number,
  locale: Locale | string
): string {
  const formatter = new Intl.NumberFormat(locale, {
    useGrouping: true,
  });
  return formatter.format(num);
}

/**
 * Format currency for RTL display
 * @param amount - Amount to format
 * @param locale - The locale code
 * @param currency - Currency code (default: GEL)
 * @returns Formatted currency string
 */
export function formatCurrencyForRTL(
  amount: number,
  locale: Locale | string,
  currency: string = 'GEL'
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
}

/**
 * Props for RTL-aware components
 */
export interface RTLProps {
  dir?: 'rtl' | 'ltr';
  locale: Locale;
}

/**
 * Generate RTL class names
 * Combines base class with RTL variant if needed
 * @param baseClass - Base CSS class
 * @param locale - The locale code
 * @returns Combined class string
 */
export function getRTLClass(baseClass: string, locale: Locale | string): string {
  if (isRTL(locale)) {
    return `${baseClass} ${baseClass}-rtl`;
  }
  return baseClass;
}

/**
 * Hook-like utility to get RTL context
 * Can be used in both client and server components
 * @param locale - The locale code
 * @returns RTL context object
 */
export function getRTLContext(locale: Locale | string) {
  const rtl = isRTL(locale);
  
  return {
    isRTL: rtl,
    direction: rtl ? 'rtl' : 'ltr' as const,
    textAlign: rtl ? 'right' : 'left' as const,
    flip: (value: string) => rtl ? mirrorValueForRTL(value, locale) : value,
    getArrow: (direction: keyof typeof ARROW_DIRECTIONS) => getArrow(direction, locale),
    getArrowClass: (direction: keyof typeof ARROW_DIRECTIONS) => getArrowClass(direction, locale),
    getLogicalProperty,
    getLogicalBorderRadius: (radius: string) => getLogicalBorderRadius(radius, locale),
  };
}
