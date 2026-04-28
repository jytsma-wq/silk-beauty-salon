import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the modules before importing the route
vi.mock('@/lib/db', () => {
  const mockCreate = vi.fn();
  return {
    db: {
      contactSubmission: {
        create: mockCreate,
      },
    },
  };
});

vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'email-123' }),
    },
  })),
}));

vi.mock('@/lib/csrf', () => ({
  verifyCsrfToken: vi.fn().mockResolvedValue(true),
  setCsrfToken: vi.fn().mockResolvedValue('test-csrf-token'),
}));

vi.mock('@/lib/rate-limit', () => ({
  strictRateLimit: vi.fn().mockResolvedValue({ allowed: true, limit: 5, remaining: 4, resetTime: Date.now() + 60000 }),
  contactRateLimit: vi.fn().mockResolvedValue({ allowed: true, limit: 5, remaining: 4, resetTime: Date.now() + 60000 }),
}));

vi.mock('@/lib/security-logger', () => ({
  logSecurityEvent: vi.fn().mockResolvedValue(undefined),
}));

// Import after mocks
import { POST } from '../contact/route';
import { db } from '@/lib/db';

describe('Contact API', () => {
  // Get reference to the mocked function
  const mockCreate = db.contactSubmission.create as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    it('should successfully submit contact form with all fields', async () => {
      mockCreate.mockResolvedValue({ id: 'test-123' });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+995 599 123 456',
          message: 'I would like to book a consultation for Botox treatment.',
          locale: 'en',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Thank you');
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+995 599 123 456',
          message: 'I would like to book a consultation for Botox treatment.',
        },
      });
    });

    it('should submit without phone number (optional field)', async () => {
      mockCreate.mockResolvedValue({ id: 'test-456' });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'Question about pricing.',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: null,
          message: 'Question about pricing.',
        },
      });
    });

    it('should return 400 for invalid email', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'invalid-email',
          message: 'Test message.',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid input');
      expect(data.details).toBeDefined();
    });

    it('should return 400 for short name (less than 2 characters)', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'J',
          email: 'john@example.com',
          message: 'Test message.',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid input');
    });

    it('should return 400 for short message (less than 10 characters)', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hi',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid input');
    });

    it('should return 400 for missing required fields', async () => {
      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid input');
    });

    it('should trim and sanitize input data', async () => {
      mockCreate.mockResolvedValue({ id: 'test-789' });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '  John Doe  ',
          email: 'JOHN@EXAMPLE.COM',
          phone: '  +995 599 123 456  ',
          message: '  Test message with spaces.  ',
        }),
      });

      await POST(request);

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+995 599 123 456',
          message: 'Test message with spaces.',
        },
      });
    });

    it('should handle database errors gracefully', async () => {
      mockCreate.mockRejectedValue(new Error('Database error'));

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message for error handling.',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });

    it('should convert email to lowercase', async () => {
      mockCreate.mockResolvedValue({ id: 'test-lowercase' });

      const request = new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'JOHN.DOE@EXAMPLE.COM',
          message: 'Test message.',
        }),
      });

      await POST(request);

      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'john.doe@example.com',
        }),
      });
    });
  });
});
