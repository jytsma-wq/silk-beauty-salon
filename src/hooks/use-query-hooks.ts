/**
 * Custom React Query Hooks
 * Pre-built hooks for common data fetching patterns
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/react-query';

/**
 * Hook for fetching treatments
 */
export function useTreatments() {
  return useQuery({
    queryKey: queryKeys.treatments,
    queryFn: async () => {
      const response = await fetch('/api/treatments');
      if (!response.ok) {
        throw new Error('Failed to fetch treatments');
      }
      return response.json();
    },
  });
}

/**
 * Hook for fetching a single treatment
 */
export function useTreatment(id: string) {
  return useQuery({
    queryKey: queryKeys.treatment(id),
    queryFn: async () => {
      const response = await fetch(`/api/treatments/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch treatment');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

/**
 * Hook for fetching conditions
 */
export function useConditions() {
  return useQuery({
    queryKey: queryKeys.conditions,
    queryFn: async () => {
      const response = await fetch('/api/conditions');
      if (!response.ok) {
        throw new Error('Failed to fetch conditions');
      }
      return response.json();
    },
  });
}

/**
 * Hook for fetching testimonials
 */
export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: async () => {
      const response = await fetch('/api/testimonials');
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      return response.json();
    },
  });
}

/**
 * Hook for fetching FAQ
 */
export function useFaq() {
  return useQuery({
    queryKey: queryKeys.faq,
    queryFn: async () => {
      const response = await fetch('/api/faq');
      if (!response.ok) {
        throw new Error('Failed to fetch FAQ');
      }
      return response.json();
    },
  });
}

/**
 * Hook for fetching available booking slots
 */
export function useAvailableSlots(date: string, treatmentId?: string) {
  return useQuery({
    queryKey: queryKeys.availableSlots(date, treatmentId),
    queryFn: async () => {
      const params = new URLSearchParams({ date });
      if (treatmentId) {
        params.append('treatmentId', treatmentId);
      }
      const response = await fetch(`/api/booking/slots?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      return response.json();
    },
    enabled: !!date,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook for submitting a booking
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: unknown) => {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
    },
  });
}

/**
 * Hook for submitting contact form
 */
export function useSubmitContact() {
  return useMutation({
    mutationFn: async (formData: unknown) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }
      
      return response.json();
    },
  });
}

/**
 * Hook for newsletter subscription
 */
export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to subscribe');
      }
      
      return response.json();
    },
  });
}

/**
 * Hook for optimistic updates
 * Useful for toggling favorites, likes, etc.
 */
interface ToggableItem {
  id: string;
  [key: string]: unknown;
}

export function useOptimisticToggle<T extends ToggableItem>(
  queryKey: readonly string[],
  toggleFn: (id: string, value: boolean) => Promise<unknown>,
  toggleKey: keyof T
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) => toggleFn(id, value),
    onMutate: async ({ id, value }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot previous value
      const previousData = queryClient.getQueryData<T[]>(queryKey);
      
      // Optimistically update
      queryClient.setQueryData<T[]>(queryKey, (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === id ? { ...item, [toggleKey]: value } : item
        );
      });
      
      return { previousData };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
