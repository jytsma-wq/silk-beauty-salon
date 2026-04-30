/**
 * Accessibility Utilities
 * Helper functions for WCAG 2.1 AA compliance
 */

import { useEffect, useRef, useCallback, useState, useSyncExternalStore } from 'react';

/**
 * Focusable elements selector
 */
export const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
  'audio[controls]',
  'video[controls]',
].join(', ');

/**
 * Generate unique ID for accessibility attributes
 */
export function generateId(prefix = 'a11y'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  return element.matches(FOCUSABLE_ELEMENTS) && !element.hasAttribute('disabled');
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));
  return elements.filter((el) => {
    // Check visibility
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    
    // Check dimensions
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    
    return true;
  });
}

/**
 * Get the first focusable element
 */
export function getFirstFocusableElement(container: HTMLElement): HTMLElement | null {
  return getFocusableElements(container)[0] ?? null;
}

/**
 * Get the last focusable element
 */
export function getLastFocusableElement(container: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container);
  return elements[elements.length - 1] ?? null;
}

/**
 * Focus trap for modals and dialogs
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store previously focused element
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Focus first element in container
    const firstElement = getFirstFocusableElement(containerRef.current);
    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !containerRef.current) return;

      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab - go backwards
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab - go forwards
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }
    document.addEventListener('keydown', handleEscape);

    return () => {
      if (container) {
        container.removeEventListener('keydown', handleKeyDown);
      }
      document.removeEventListener('keydown', handleEscape);
      previouslyFocusedElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}

/**
 * Roving tabindex for complex widgets (menus, lists, grids)
 */
export function useRovingTabIndex(itemCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        setActiveIndex((prev: number) => (prev + 1) % itemCount);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        setActiveIndex((prev: number) => (prev - 1 + itemCount) % itemCount);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(itemCount - 1);
        break;
    }
  }, [itemCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { containerRef, activeIndex, setActiveIndex };
}

/**
 * Announce messages to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hook for reduced motion preference
 * Uses useSyncExternalStore for SSR compatibility
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    () => false // Server snapshot
  );
}

/**
 * Check if high contrast mode is enabled
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Hook for high contrast preference
 * Uses useSyncExternalStore for SSR compatibility
 */
export function useHighContrast(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-contrast: high)').matches;
    },
    () => false // Server snapshot
  );
}

/**
 * Validate color contrast ratio (WCAG AA: 4.5:1 for text, 3:1 for large text/UI)
 * Uses relative luminance formula
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate relative luminance of a color
 */
function getRelativeLuminance(color: string): number {
  const rgb = parseColor(color);
  if (!rgb) return 0;

  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Parse color string to RGB array
 */
function parseColor(color: string): [number, number, number] | null {
  // Hex
  const hexMatch = color.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      const [r, g, b] = hex.split('').map((c) => parseInt(c + c, 16));
      return [r, g, b];
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b];
    }
  }

  // RGB
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
  }

  return null;
}

/**
 * Check if contrast meets WCAG AA standards
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Skip link targets
 */
export const SKIP_LINK_TARGETS = {
  main: 'main-content',
  navigation: 'main-navigation',
  search: 'search-form',
  footer: 'footer-content',
} as const;

/**
 * Set skip link target ID on page load
 */
export function setupSkipLinks(): void {
  if (typeof document === 'undefined') return;

  // Ensure main content has ID
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = SKIP_LINK_TARGETS.main;
    main.setAttribute('tabindex', '-1');
  }
}

/**
 * Keyboard shortcut definitions
 */
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  description: string;
}

export const KEYBOARD_SHORTCUTS: Record<string, KeyboardShortcut> = {
  search: { key: 'k', ctrlKey: true, description: 'Open search' },
  navigation: { key: 'n', ctrlKey: true, description: 'Focus navigation' },
  skipToMain: { key: 'Enter', description: 'Skip to main content' },
  closeModal: { key: 'Escape', description: 'Close modal/dialog' },
};

/**
 * Handle keyboard shortcuts
 */
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const [name, callback] of Object.entries(shortcuts)) {
        const shortcut = KEYBOARD_SHORTCUTS[name as keyof typeof KEYBOARD_SHORTCUTS];
        if (!shortcut) continue;

        const ctrlMatches = (shortcut.ctrlKey ?? false) === event.ctrlKey;
        const altMatches = (shortcut.altKey ?? false) === event.altKey;
        const shiftMatches = (shortcut.shiftKey ?? false) === event.shiftKey;

        if (
          event.key === shortcut.key &&
          ctrlMatches &&
          altMatches &&
          shiftMatches
        ) {
          event.preventDefault();
          callback();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

