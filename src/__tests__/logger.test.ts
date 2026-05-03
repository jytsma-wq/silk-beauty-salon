/**
 * Logger Tests
 * Tests for structured logging functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { structuredLog, type StructuredLogEntry } from '@/lib/logger';

describe('structuredLog', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;
  let originalEnv: string | undefined;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.NODE_ENV = originalEnv;
  });

  describe('production mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should output valid JSON in production', () => {
      const entry: StructuredLogEntry = {
        timestamp: '2024-01-01T00:00:00.000Z',
        level: 'INFO',
        message: 'Test message',
        requestId: 'test-request-id-123',
        ip: '127.0.0.1',
        method: 'GET',
        path: '/api/test',
        status: 200,
        durationMs: 42,
      };

      structuredLog(entry);

      expect(consoleSpy).toHaveBeenCalledTimes(1);

      const loggedOutput = consoleSpy.mock.calls[0][0];

      // Should be valid JSON
      let parsed: StructuredLogEntry;
      expect(() => {
        parsed = JSON.parse(loggedOutput);
      }).not.toThrow();

      // Verify all fields are present
      parsed = JSON.parse(loggedOutput);
      expect(parsed.timestamp).toBe('2024-01-01T00:00:00.000Z');
      expect(parsed.level).toBe('INFO');
      expect(parsed.message).toBe('Test message');
      expect(parsed.requestId).toBe('test-request-id-123');
      expect(parsed.ip).toBe('127.0.0.1');
      expect(parsed.method).toBe('GET');
      expect(parsed.path).toBe('/api/test');
      expect(parsed.status).toBe(200);
      expect(parsed.durationMs).toBe(42);
    });

    it('should include all log levels as valid JSON', () => {
      const levels: Array<StructuredLogEntry['level']> = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

      levels.forEach((level) => {
        consoleSpy.mockClear();

        const entry: StructuredLogEntry = {
          timestamp: '2024-01-01T00:00:00.000Z',
          level,
          message: `Test ${level}`,
          requestId: `req-${level.toLowerCase()}`,
        };

        structuredLog(entry);

        const loggedOutput = consoleSpy.mock.calls[0][0];
        expect(() => JSON.parse(loggedOutput)).not.toThrow();

        const parsed = JSON.parse(loggedOutput);
        expect(parsed.level).toBe(level);
      });
    });

    it('should handle security log entries', () => {
      const entry: StructuredLogEntry = {
        timestamp: '2024-01-01T00:00:00.000Z',
        level: 'WARN',
        type: 'SECURITY',
        requestId: 'security-req-123',
        reason: 'BLOCKED_UA',
        ip: '192.168.1.100',
        path: '/wp-admin',
        method: 'GET',
        userAgent: 'Masscan/1.0',
      };

      structuredLog(entry);

      const loggedOutput = consoleSpy.mock.calls[0][0];
      const parsed = JSON.parse(loggedOutput);

      expect(parsed.type).toBe('SECURITY');
      expect(parsed.reason).toBe('BLOCKED_UA');
      expect(parsed.level).toBe('WARN');
    });

    it('should auto-generate timestamp if not provided', () => {
      const entry: StructuredLogEntry = {
        timestamp: '',
        level: 'INFO',
        message: 'No timestamp provided',
      };

      structuredLog(entry);

      const loggedOutput = consoleSpy.mock.calls[0][0];
      const parsed = JSON.parse(loggedOutput);

      // Should have an ISO timestamp
      expect(parsed.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should handle missing optional fields', () => {
      const entry: StructuredLogEntry = {
        timestamp: '2024-01-01T00:00:00.000Z',
        level: 'INFO',
        message: 'Minimal entry',
      };

      structuredLog(entry);

      const loggedOutput = consoleSpy.mock.calls[0][0];
      const parsed = JSON.parse(loggedOutput);

      expect(parsed.message).toBe('Minimal entry');
      expect(parsed.requestId).toBeUndefined();
      expect(parsed.ip).toBeUndefined();
      expect(parsed.status).toBeUndefined();
    });
  });

  describe('development mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should pretty-print in development', () => {
      const entry: StructuredLogEntry = {
        timestamp: '2024-01-01T00:00:00.000Z',
        level: 'INFO',
        message: 'Test message',
        requestId: 'dev-req-123',
      };

      structuredLog(entry);

      // In development, multiple arguments are passed to console.log
      expect(consoleSpy).toHaveBeenCalled();

      const firstArg = consoleSpy.mock.calls[0][0];
      // Should contain ANSI color codes and formatted output
      expect(firstArg).toContain('[2024-01-01T00:00:00.000Z]');
      expect(firstArg).toContain('INFO');
    });

    it('should use different colors for different log levels', () => {
      const levels: Array<{ level: StructuredLogEntry['level']; colorCode: string }> = [
        { level: 'DEBUG', colorCode: '\x1b[36m' }, // Cyan
        { level: 'INFO', colorCode: '\x1b[32m' },  // Green
        { level: 'WARN', colorCode: '\x1b[33m' },  // Yellow
        { level: 'ERROR', colorCode: '\x1b[31m' }, // Red
      ];

      levels.forEach(({ level, colorCode }) => {
        consoleSpy.mockClear();

        const entry: StructuredLogEntry = {
          timestamp: '2024-01-01T00:00:00.000Z',
          level,
          message: `Test ${level}`,
        };

        structuredLog(entry);

        const firstArg = consoleSpy.mock.calls[0][0];
        expect(firstArg).toContain(colorCode);
      });
    });
  });
});
