/**
 * Custom Hooks Exports
 * Centralized exports for all custom React hooks
 */

// Data fetching hooks
export {
  useTreatments,
  useTreatment,
  useConditions,
  useTestimonials,
  useFaq,
  useAvailableSlots,
  useCreateBooking,
  useSubmitContact,
  useSubscribeNewsletter,
  useOptimisticToggle,
} from './use-query-hooks';

// Storage hooks
export {
  useLocalStorage,
  useSessionStorage,
  useDebouncedLocalStorage,
} from './use-local-storage';
