/**
 * API Validation Schemas
 * Zod schemas for API request/response validation
 */

import { z } from 'zod';

// ==========================================
// Common Schemas
// ==========================================

export const PaginationSchema = z.object({
  page: z.string().default('1').transform(Number).pipe(z.number().int().min(1)),
  limit: z.string().default('20').transform(Number).pipe(z.number().int().min(1).max(100)),
});

export const SortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// ==========================================
// Contact API Schemas
// ==========================================

export const ContactRequestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(2000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required',
  }),
});

export const ContactResponseSchema = z.object({
  success: z.boolean(),
  messageId: z.string().optional(),
  submittedAt: z.string().datetime(),
});

// ==========================================
// Booking API Schemas
// ==========================================

export const BookingRequestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(5).max(20),
  service: z.string().min(1),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/),
  message: z.string().max(500).optional(),
});

export const BookingStatusSchema = z.enum([
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
]);

export const BookingResponseSchema = z.object({
  id: z.string().uuid(),
  status: BookingStatusSchema,
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  service: z.string(),
  preferredDate: z.string(),
  preferredTime: z.string(),
  message: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ==========================================
// Newsletter API Schemas
// ==========================================

export const NewsletterSubscribeSchema = z.object({
  email: z.string().email(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Consent is required',
  }),
});

export const NewsletterUnsubscribeSchema = z.object({
  email: z.string().email(),
  token: z.string().min(32),
});

export const NewsletterResponseSchema = z.object({
  success: z.boolean(),
  email: z.string().email(),
  subscribedAt: z.string().datetime().optional(),
  message: z.string(),
});

// ==========================================
// Treatment API Schemas
// ==========================================

export const TreatmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.number().int().positive(),
  price: z.number().positive(),
  category: z.string(),
  image: z.string().url().optional(),
  isActive: z.boolean().default(true),
});

export const TreatmentsListSchema = z.object({
  data: z.array(TreatmentSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// ==========================================
// Health Check Schema
// ==========================================

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  timestamp: z.string().datetime(),
  version: z.string(),
  checks: z.object({
    database: z.enum(['ok', 'error']),
    redis: z.enum(['ok', 'error']).optional(),
  }),
});

// ==========================================
// Error Response Schema
// ==========================================

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
  }),
  meta: z.object({
    requestId: z.string(),
    timestamp: z.string().datetime(),
    version: z.string(),
  }),
});

// ==========================================
// Type Exports
// ==========================================

export type PaginationInput = z.infer<typeof PaginationSchema>;
export type ContactRequestInput = z.infer<typeof ContactRequestSchema>;
export type ContactResponseOutput = z.infer<typeof ContactResponseSchema>;
export type BookingRequestInput = z.infer<typeof BookingRequestSchema>;
export type BookingResponseOutput = z.infer<typeof BookingResponseSchema>;
export type NewsletterSubscribeInput = z.infer<typeof NewsletterSubscribeSchema>;
export type NewsletterResponseOutput = z.infer<typeof NewsletterResponseSchema>;
export type TreatmentOutput = z.infer<typeof TreatmentSchema>;
