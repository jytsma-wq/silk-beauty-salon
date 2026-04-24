'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseFocusTrapOptions {
  isActive: boolean;
  onEscape?: () => void;
  onClose?: () => void;
  returnFocusTo?: HTMLElement | string | null;
}

interface UseFocusTrapReturn {
  containerRef: React.RefObject<HTMLElement | null>;
}

/**
 * Traps focus within a modal/drawer container.
 * Handles Tab, Shift+Tab cycling, Escape key, and returns focus to trigger on close.
 * Disables body scroll when active.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: UseFocusTrapOptions
): UseFocusTrapReturn {
  const { isActive, onEscape, onClose, returnFocusTo } = options;
  const containerRef = useRef<T>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Store the element that had focus before opening
  useEffect(() => {
    if (isActive) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
    }
  }, [isActive]);

  // Get all focusable elements within container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    const container = containerRef.current;
    if (!container) return [];

    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll(selector)).filter(
      (el): el is HTMLElement => {
        // Filter out hidden elements
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }
    );
  }, []);

  // Handle focus trap
  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Disable body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Focus first focusable element or container itself
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      // Focus the first element, or if there's a close button, skip to next
      const firstElement = focusableElements[0];
      const closeButton = container.querySelector('[data-close-button]') as HTMLElement;
      
      if (closeButton && focusableElements.length > 1) {
        focusableElements[1].focus();
      } else {
        firstElement.focus();
      }
    } else {
      container.tabIndex = -1;
      container.focus();
    }

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key
      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
        onClose?.();
        return;
      }

      // Tab key handling
      if (e.key === 'Tab') {
        const elements = getFocusableElements();
        if (elements.length === 0) return;

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        // Shift+Tab: If at first element, wrap to last
        if (e.shiftKey) {
          if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: If at last element, wrap to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Handle click outside to close
    const handleClickOutside = (e: MouseEvent) => {
      if (container && !container.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Use capture for click outside to ensure it fires before other handlers
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside, true);

      // Restore body scroll
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isActive, onEscape, onClose, getFocusableElements]);

  // Return focus to trigger element when closing
  useEffect(() => {
    if (!isActive && previouslyFocusedElement.current) {
      // Small delay to allow transition/animation to complete
      const timer = setTimeout(() => {
        let elementToFocus: HTMLElement | null = null;

        if (returnFocusTo) {
          if (typeof returnFocusTo === 'string') {
            elementToFocus = document.querySelector(returnFocusTo) as HTMLElement;
          } else {
            elementToFocus = returnFocusTo;
          }
        }

        // Fallback to previously focused element
        if (!elementToFocus && previouslyFocusedElement.current) {
          elementToFocus = previouslyFocusedElement.current;
        }

        elementToFocus?.focus();
        previouslyFocusedElement.current = null;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isActive, returnFocusTo]);

  return { containerRef };
}
