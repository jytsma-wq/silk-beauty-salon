'use client';

import { useEffect, useState } from 'react';

/**
 * Detects if focus is from keyboard (shows focus ring) vs mouse/touch (hides focus ring).
 * Applies .focus-visible class polyfill behavior.
 * 
 * Usage:
 * const focusVisible = useFocusVisible();
 * <button className={focusVisible.isVisible ? 'ring-2' : 'outline-none'} />
 * 
 * Or with CSS:
 * [data-focus-visible] { outline: 2px solid; }
 * [data-focus-visible="false"] { outline: none; }
 */
export function useFocusVisible() {
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<'keyboard' | 'mouse' | 'touch'>('mouse');

  useEffect(() => {
    // Track the interaction type
    const handleMouseDown = () => setLastInteraction('mouse');
    const handlePointerDown = (e: PointerEvent) => {
      // Only mouse, not touch or pen
      if (e.pointerType === 'mouse') {
        setLastInteraction('mouse');
      }
    };
    const handleTouchStart = () => setLastInteraction('touch');
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only react to Tab key and navigation keys
      if (
        e.key === 'Tab' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Enter' ||
        e.key === ' ' ||
        e.key === 'Escape'
      ) {
        setLastInteraction('keyboard');
      }
    };

    // Handle focus events globally
    const handleFocusIn = () => {
      setHasKeyboardFocus(lastInteraction === 'keyboard');
    };

    const handleFocusOut = () => {
      setHasKeyboardFocus(false);
    };

    // Add listeners
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('touchstart', handleTouchStart, true);
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focusin', handleFocusIn, true);
    document.addEventListener('focusout', handleFocusOut, true);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, true);
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('touchstart', handleTouchStart, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focusin', handleFocusIn, true);
      document.removeEventListener('focusout', handleFocusOut, true);
    };
  }, [lastInteraction]);

  return {
    isVisible: hasKeyboardFocus,
    lastInteraction,
  };
}

/**
 * Hook to apply focus-visible class to a specific element
 */
export function useFocusVisibleClass(
  elementRef: React.RefObject<HTMLElement | null>
): { focusVisible: boolean } {
  const { isVisible } = useFocusVisible();
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleFocus = () => {
      if (isVisible) {
        element.setAttribute('data-focus-visible', 'true');
        setFocusVisible(true);
      }
    };

    const handleBlur = () => {
      element.setAttribute('data-focus-visible', 'false');
      setFocusVisible(false);
    };

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [elementRef, isVisible]);

  return { focusVisible };
}
