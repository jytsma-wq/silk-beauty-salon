import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  findMany: vi.fn(),
  findFirst: vi.fn(),
  create: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
    db: {
      booking: {
      findMany: mocks.findMany,
      findFirst: mocks.findFirst,
      create: mocks.create,
    },
  },
}));

vi.mock('@/lib/csrf', () => ({
  verifyCsrfToken: vi.fn().mockResolvedValue(true),
}));

vi.mock('@/lib/rate-limit', () => ({
  bookingsApiRateLimit: vi.fn().mockResolvedValue({
    allowed: true,
    limit: 10,
    remaining: 9,
    resetTime: Date.now() + 60000,
  }),
}));

vi.mock('@/lib/security-logger', () => ({
  logSecurityEvent: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/render-email', () => ({
  renderEmail: vi.fn().mockResolvedValue('<p>Email</p>'),
}));

vi.mock('@/lib/mailer', () => ({
  sendMail: mocks.sendMail,
}));

import { GET, POST } from '../bookings/route';

const validBookingPayload = {
  name: 'Jane Doe',
  email: 'JANE@example.com',
  phone: '+995 599 123 456',
  service: 'Skin Consultation',
  date: '2026-06-15',
  timeSlot: '10:00 - 11:00',
  message: 'First visit',
};

function request(
  method: 'GET' | 'POST',
  url: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Request {
  return new Request(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

describe('Bookings API', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-12T12:00:00.000Z'));
    vi.clearAllMocks();
    mocks.findMany.mockResolvedValue([]);
    mocks.findFirst.mockResolvedValue(null);
    mocks.create.mockResolvedValue({
      id: 'booking-1',
      ...validBookingPayload,
      email: 'jane@example.com',
      date: new Date('2026-06-15T00:00:00.000Z'),
      status: 'PENDING',
    });
    mocks.sendMail.mockResolvedValue({ skipped: false });
  });

  it('returns booked slots for a valid date', async () => {
    mocks.findMany.mockResolvedValue([
      { timeSlot: '10:00 - 11:00' },
      { timeSlot: '14:00 - 15:00' },
    ]);

    const response = await GET(request('GET', 'http://localhost/api/bookings?date=2026-06-15') as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.bookedSlots).toEqual(['10:00 - 11:00', '14:00 - 15:00']);
  });

  it('rejects impossible calendar dates', async () => {
    const response = await POST(
      request('POST', 'http://localhost/api/bookings', {
        ...validBookingPayload,
        date: '2026-02-31',
      }) as never
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid booking date');
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('rejects past booking dates', async () => {
    const response = await POST(
      request('POST', 'http://localhost/api/bookings', {
        ...validBookingPayload,
        date: '2026-06-11',
      }) as never
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Booking date must be today or later');
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('rejects time slots outside salon opening hours', async () => {
    const response = await POST(
      request('POST', 'http://localhost/api/bookings', {
        ...validBookingPayload,
        timeSlot: '22:00 - 23:00',
      }) as never
    );
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Selected time is outside salon opening hours');
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('returns 409 when the selected slot is already booked', async () => {
    mocks.findFirst.mockResolvedValue({ id: 'existing-booking' });

    const response = await POST(
      request('POST', 'http://localhost/api/bookings', validBookingPayload) as never
    );
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe('This time slot is already booked');
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('returns 409 when the database unique slot constraint is hit', async () => {
    const uniqueError = new Error('Unique constraint failed') as Error & { code: string };
    uniqueError.code = 'P2002';
    mocks.create.mockRejectedValue(uniqueError);

    const response = await POST(
      request('POST', 'http://localhost/api/bookings', validBookingPayload) as never
    );
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe('This time slot is already booked');
  });

  it('creates a pending booking and sends customer and admin emails', async () => {
    const response = await POST(
      request('POST', 'http://localhost/api/bookings', validBookingPayload) as never
    );
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.id).toBe('booking-1');
    expect(mocks.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: 'Jane Doe',
        email: 'jane@example.com',
        service: 'Skin Consultation',
        date: new Date('2026-06-15T00:00:00.000Z'),
        timeSlot: '10:00 - 11:00',
        status: 'PENDING',
      }),
    });
    expect(mocks.sendMail).toHaveBeenCalledTimes(2);
  });
});
