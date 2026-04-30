/**
 * Booking Form Schemas - Zod
 * Validation schemas for booking flow
 */

import { z } from 'zod';

/**
 * Phone number validation helper
 * Supports international formats
 */
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

/**
 * Customer details schema (Step 4)
 */
export const customerDetailsSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Please enter a valid phone number'),
});

export type CustomerDetailsInput = z.infer<typeof customerDetailsSchema>;

/**
 * Booking details schema (Step 4 extended)
 */
export const bookingDetailsSchema = customerDetailsSchema.extend({
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
  
  preferredContact: z
    .enum(['email', 'phone'])
    .default('email'),
  
  smsReminders: z
    .boolean()
    .default(false),
});

export type BookingDetailsInput = z.infer<typeof bookingDetailsSchema>;

/**
 * Complete booking schema (all steps)
 */
export const completeBookingSchema = z.object({
  treatmentId: z.string().min(1, 'Please select a treatment'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Please select a time slot'),
  customer: customerDetailsSchema,
  notes: z.string().optional(),
  preferredContact: z.enum(['email', 'phone']).default('email'),
  smsReminders: z.boolean().default(false),
});

export type CompleteBookingInput = z.infer<typeof completeBookingSchema>;

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  
  subject: z
    .string()
    .min(1, 'Please select a subject')
    .max(100),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to our privacy policy',
    }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must consent to receive emails',
    }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/**
 * User preferences schema
 */
export const userPreferencesSchema = z.object({
  locale: z.enum(['en', 'ka', 'ru', 'tr', 'ar', 'he']).default('en'),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  notifications: z.object({
    email: z.boolean().default(true),
    sms: z.boolean().default(false),
    marketing: z.boolean().default(false),
  }),
});

export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
