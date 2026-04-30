import { describe, it, expect, vi } from 'vitest';
import {
  sanitizeHtml,
  sanitizeRichText,
  sanitizeText,
  isValidEmail,
  sanitizeEmail,
  sanitizePhone,
  isValidName,
  sanitizeName,
  sanitizeUrl,
  containsSqlInjection,
  containsNoSqlInjection,
  validateInput,
  sanitizeObject,
} from '../sanitize';

describe('sanitize', () => {
  describe('sanitizeHtml', () => {
    it('removes all HTML tags', () => {
      const input = '<script>alert("xss")</script><p>Hello</p>';
      expect(sanitizeHtml(input)).toBe('alert("xss")Hello');
    });

    it('handles empty string', () => {
      expect(sanitizeHtml('')).toBe('');
    });

    it('handles null/undefined', () => {
      expect(sanitizeHtml(null as unknown as string)).toBe('');
      expect(sanitizeHtml(undefined as unknown as string)).toBe('');
    });

    it('removes event handlers', () => {
      const input = '<img src=x onerror=alert(1)>';
      expect(sanitizeHtml(input)).not.toContain('onerror');
    });

    it('decodes HTML entities', () => {
      const input = '&lt;script&gt;alert(1)&lt;/script&gt;';
      expect(sanitizeHtml(input)).toBe('alert(1)');
    });
  });

  describe('sanitizeRichText', () => {
    it('allows basic formatting tags', () => {
      const input = '<p><b>Bold</b> and <i>italic</i></p>';
      expect(sanitizeRichText(input)).toContain('<b>');
      expect(sanitizeRichText(input)).toContain('<i>');
    });

    it('removes dangerous tags', () => {
      const input = '<script>alert(1)</script><b>Safe</b>';
      expect(sanitizeRichText(input)).not.toContain('<script>');
      expect(sanitizeRichText(input)).toContain('<b>');
    });

    it('removes all attributes', () => {
      const input = '<p class="dangerous" onclick="evil()">Text</p>';
      expect(sanitizeRichText(input)).not.toContain('class');
      expect(sanitizeRichText(input)).not.toContain('onclick');
    });
  });

  describe('sanitizeText', () => {
    it('removes all HTML', () => {
      const input = '<p>Hello <b>World</b></p>';
      expect(sanitizeText(input)).toBe('Hello World');
    });

    it('handles plain text', () => {
      expect(sanitizeText('Plain text')).toBe('Plain text');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user@.com')).toBe(false);
    });
  });

  describe('sanitizeEmail', () => {
    it('sanitizes and validates emails', () => {
      expect(sanitizeEmail('  Test@Example.COM  ')).toBe('test@example.com');
    });

    it('returns null for invalid emails', () => {
      expect(sanitizeEmail('not-an-email')).toBeNull();
    });

    it('sanitizes HTML in email', () => {
      expect(sanitizeEmail('<script>alert(1)</script>test@example.com')).toBeNull();
    });
  });

  describe('sanitizePhone', () => {
    it('removes non-numeric characters', () => {
      expect(sanitizePhone('(555) 123-4567')).toBe('5551234567');
      expect(sanitizePhone('+1-555-123-4567')).toBe('15551234567');
    });

    it('limits to 20 characters', () => {
      const longPhone = '1'.repeat(30);
      expect(sanitizePhone(longPhone).length).toBe(20);
    });

    it('handles empty string', () => {
      expect(sanitizePhone('')).toBe('');
    });
  });

  describe('isValidName', () => {
    it('validates correct names', () => {
      expect(isValidName('John Doe')).toBe(true);
      expect(isValidName('Mary-Jane')).toBe(true);
      expect(isValidName('O\'Connor')).toBe(true);
    });

    it('rejects names with numbers', () => {
      expect(isValidName('John123')).toBe(false);
    });

    it('rejects names with special chars', () => {
      expect(isValidName('John@Doe')).toBe(false);
    });

    it('rejects names over 100 chars', () => {
      expect(isValidName('A'.repeat(101))).toBe(false);
    });

    it('supports Unicode characters', () => {
      expect(isValidName('José García')).toBe(true);
      expect(isValidName('中文字符')).toBe(true);
    });
  });

  describe('sanitizeName', () => {
    it('sanitizes and trims name', () => {
      expect(sanitizeName('  John Doe  ')).toBe('John Doe');
    });

    it('removes HTML', () => {
      expect(sanitizeName('<b>John</b>')).toBe('John');
    });

    it('truncates to 100 chars', () => {
      expect(sanitizeName('A'.repeat(150)).length).toBe(100);
    });
  });

  describe('sanitizeUrl', () => {
    it('validates and returns proper URLs', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
      expect(sanitizeUrl('http://example.com/path')).toBe('http://example.com/path');
    });

    it('rejects non-http protocols', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
      expect(sanitizeUrl('file:///etc/passwd')).toBeNull();
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
    });

    it('rejects invalid URLs', () => {
      expect(sanitizeUrl('not-a-url')).toBeNull();
    });
  });

  describe('containsSqlInjection', () => {
    it('detects SQL injection patterns', () => {
      expect(containsSqlInjection("' OR 1=1 --")).toBe(true);
      expect(containsSqlInjection('1 UNION SELECT * FROM users')).toBe(true);
      expect(containsSqlInjection('DROP TABLE users')).toBe(true);
      expect(containsSqlInjection("'; DELETE FROM users WHERE '1'='1")).toBe(true);
    });

    it('allows safe input', () => {
      expect(containsSqlInjection('Normal text')).toBe(false);
      expect(containsSqlInjection("It's a nice day")).toBe(false);
    });
  });

  describe('containsNoSqlInjection', () => {
    it('detects NoSQL injection patterns', () => {
      expect(containsNoSqlInjection('{$gt: ""}')).toBe(true);
      expect(containsNoSqlInjection('{$where: "this.x == this.y"}')).toBe(true);
      expect(containsNoSqlInjection('{$regex: ".*"}')).toBe(true);
    });

    it('allows safe input', () => {
      expect(containsNoSqlInjection('Normal text')).toBe(false);
      expect(containsNoSqlInjection('Price: $50')).toBe(false);
    });
  });

  describe('validateInput', () => {
    it('validates email type', () => {
      expect(validateInput('test@example.com', 'email')).toBe('test@example.com');
      expect(validateInput('invalid', 'email')).toBeNull();
    });

    it('validates phone type', () => {
      expect(validateInput('(555) 123-4567', 'phone')).toBe('5551234567');
      expect(validateInput('123', 'phone')).toBeNull(); // Too short
    });

    it('validates name type', () => {
      expect(validateInput('John Doe', 'name')).toBe('John Doe');
      expect(validateInput('123Invalid', 'name')).toBeNull();
    });

    it('rejects injection attempts', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      expect(validateInput("' OR 1=1", 'text')).toBeNull();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('sanitizes HTML type', () => {
      const input = '<script>alert(1)</script>Hello';
      expect(validateInput(input, 'html')).toBe('alert(1)Hello');
    });

    it('sanitizes rich text type', () => {
      const input = '<b>Bold</b><script>evil()</script>';
      expect(validateInput(input, 'richtext')).toContain('<b>');
      expect(validateInput(input, 'richtext')).not.toContain('<script>');
    });

    it('defaults to text sanitization', () => {
      expect(validateInput('<b>Test</b>')).toBe('Test');
    });
  });

  describe('sanitizeObject', () => {
    it('sanitizes string values recursively', () => {
      const input = {
        name: '<b>John</b>',
        email: 'test@example.com',
        nested: {
          description: '<script>alert(1)</script>',
        },
      };

      const result = sanitizeObject(input);
      expect(result.name).toBe('John');
      expect(result.email).toBe('test@example.com');
      expect(result.nested.description).toBe('alert(1)');
    });

    it('preserves non-string values', () => {
      const input = {
        count: 42,
        active: true,
        data: null,
      };

      const result = sanitizeObject(input);
      expect(result.count).toBe(42);
      expect(result.active).toBe(true);
      expect(result.data).toBeNull();
    });

    it('handles empty object', () => {
      expect(sanitizeObject({})).toEqual({});
    });
  });
});
