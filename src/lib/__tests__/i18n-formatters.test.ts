import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  formatDate,
  formatNumber,
  formatRelativeTime,
} from '../i18n-formatters';

describe('i18n-formatters', () => {
  describe('formatPrice', () => {
    it('formats price in English locale', () => {
      const result = formatPrice(100, 'en', 'GEL');
      expect(result).toContain('100');
      expect(result).toContain('GEL');
    });

    it('formats price in Georgian locale', () => {
      const result = formatPrice(100, 'ka', 'GEL');
      expect(result).toContain('100');
    });

    it('formats price in Russian locale', () => {
      const result = formatPrice(100, 'ru', 'GEL');
      expect(result).toContain('100');
    });

    it('formats price in Arabic locale', () => {
      const result = formatPrice(100, 'ar', 'GEL');
      expect(result).toBeTruthy();
    });

    it('formats price in Hebrew locale', () => {
      const result = formatPrice(100, 'he', 'GEL');
      expect(result).toBeTruthy();
    });

    it('formats price in Turkish locale', () => {
      const result = formatPrice(100, 'tr', 'GEL');
      expect(result).toContain('100');
    });

    it('uses default GEL currency when not specified', () => {
      const result = formatPrice(100, 'en');
      expect(result).toContain('GEL');
    });

    it('removes decimal places for whole numbers', () => {
      const result = formatPrice(100.0, 'en', 'GEL');
      expect(result).not.toContain('.');
    });

    it('handles zero amount', () => {
      const result = formatPrice(0, 'en', 'GEL');
      expect(result).toContain('0');
    });

    it('handles fallback for invalid locale', () => {
      const result = formatPrice(100, 'invalid-locale', 'GEL');
      // Falls back to default locale formatting
      expect(result).toContain('100');
      expect(result).toContain('GEL');
    });
  });

  describe('formatDate', () => {
    it('formats date in English locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'en');
      expect(result).toContain('15');
      expect(result).toContain('January');
    });

    it('formats date in Georgian locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'ka');
      expect(result).toBeTruthy();
    });

    it('formats date in Russian locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'ru');
      expect(result).toBeTruthy();
    });

    it('accepts custom format options', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'en', { month: 'short', day: 'numeric' });
      expect(result).toContain('Jan');
      expect(result).toContain('15');
    });

    it('handles fallback for invalid locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'invalid-locale');
      // Falls back to default locale formatting (en)
      expect(result).toContain('2024');
      expect(result).toContain('15');
    });

    it('includes year by default', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'en');
      expect(result).toContain('2024');
    });
  });

  describe('formatNumber', () => {
    it('formats number in English locale', () => {
      const result = formatNumber(1234567.89, 'en');
      expect(result).toContain('1');
      expect(result).toContain('2');
    });

    it('formats number in Georgian locale', () => {
      const result = formatNumber(1234567.89, 'ka');
      expect(result).toBeTruthy();
    });

    it('formats number in Russian locale', () => {
      const result = formatNumber(1234567.89, 'ru');
      expect(result).toBeTruthy();
    });

    it('handles zero', () => {
      const result = formatNumber(0, 'en');
      expect(result).toBe('0');
    });

    it('handles negative numbers', () => {
      const result = formatNumber(-100, 'en');
      expect(result).toContain('-');
    });

    it('handles fallback for invalid locale', () => {
      const result = formatNumber(100, 'invalid-locale');
      expect(result).toBe('100');
    });
  });

  describe('formatRelativeTime', () => {
    it('formats minutes ago', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const result = formatRelativeTime(fiveMinutesAgo, 'en');
      expect(result.toLowerCase()).toContain('minute');
    });

    it('formats hours ago', () => {
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      const result = formatRelativeTime(twoHoursAgo, 'en');
      expect(result.toLowerCase()).toContain('hour');
    });

    it('formats days ago', () => {
      const now = new Date();
      const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(threeDaysAgo, 'en');
      expect(result.toLowerCase()).toContain('day');
    });

    it('formats months ago', () => {
      const now = new Date();
      const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(twoMonthsAgo, 'en');
      expect(result.toLowerCase()).toContain('month');
    });

    it('formats years ago', () => {
      const now = new Date();
      const twoYearsAgo = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
      const result = formatRelativeTime(twoYearsAgo, 'en');
      expect(result.toLowerCase()).toContain('year');
    });

    it('handles just now', () => {
      const now = new Date();
      const result = formatRelativeTime(now, 'en');
      expect(result.toLowerCase()).toContain('minute');
    });

    it('handles fallback for invalid locale', () => {
      const date = new Date('2024-01-15');
      const result = formatRelativeTime(date, 'invalid-locale');
      // Falls back to default locale, still produces valid relative time
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('formats in different locales', () => {
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const en = formatRelativeTime(oneDayAgo, 'en');
      const ka = formatRelativeTime(oneDayAgo, 'ka');
      const ru = formatRelativeTime(oneDayAgo, 'ru');

      expect(en).toBeTruthy();
      expect(ka).toBeTruthy();
      expect(ru).toBeTruthy();
    });
  });
});
