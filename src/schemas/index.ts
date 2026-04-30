/**
 * Schema Exports
 * Centralized exports for all Zod validation schemas
 */

// Booking schemas
export {
  customerDetailsSchema,
  bookingDetailsSchema,
  completeBookingSchema,
  contactFormSchema,
  newsletterSchema,
  userPreferencesSchema,
  type CustomerDetailsInput,
  type BookingDetailsInput,
  type CompleteBookingInput,
  type ContactFormInput,
  type NewsletterInput,
  type UserPreferencesInput,
} from './booking-schema';
