import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn() utility', () => {
  it('should merge tailwind classes correctly', () => {
    const result = cn('bg-red-500', 'text-white');
    expect(result).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('should filter out falsy values', () => {
    const result = cn('base', false && 'hidden', null, undefined, 'visible');
    expect(result).toBe('base visible');
  });

  it('should merge conflicting tailwind classes (last wins)', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-blue-500');
  });

  it('should handle array of classes', () => {
    const result = cn(['class-1', 'class-2'], 'class-3');
    expect(result).toBe('class-1 class-2 class-3');
  });

  it('should handle nested arrays', () => {
    const result = cn(['class-1', ['class-2', 'class-3']]);
    expect(result).toBe('class-1 class-2 class-3');
  });

  it('should handle object syntax', () => {
    const result = cn({ 'text-red-500': true, 'text-blue-500': false });
    expect(result).toBe('text-red-500');
  });

  it('should handle complex real-world example', () => {
    const isScrolled = true;
    const isOpen = false;
    const result = cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
        : 'bg-white py-3',
      isOpen && 'open-class'
    );
    expect(result).toBe('sticky top-0 z-50 w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-md py-2');
  });
});

describe('Date formatters', () => {
  it('placeholder for date formatter tests', () => {
    // Date formatting functions can be added to utils.ts
    expect(true).toBe(true);
  });
});

describe('Price parsers', () => {
  it('placeholder for price parser tests', () => {
    // Price parsing functions can be added to utils.ts
    expect(true).toBe(true);
  });
});
