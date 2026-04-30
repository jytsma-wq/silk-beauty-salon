/**
 * TanStack Query (React Query) Configuration
 * Centralized query client setup with caching strategies
 */

import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';

/**
 * Default query client configuration
 */
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Stale-while-revalidate pattern
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      
      // Retry configuration
      retry: (failureCount, error) => {
        // Don't retry on 404s or 401s
        if (error instanceof Error) {
          const message = error.message;
          if (message.includes('404') || message.includes('401')) {
            return false;
          }
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Background refetching
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      refetchOnReconnect: true,
      refetchOnMount: 'always',
      
      // Error handling
      throwOnError: false,
      
      // Pagination - use previous data while fetching new data
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      // Retry mutations only on network errors
      retry: (failureCount, error) => {
        if (error instanceof Error && error.message.includes('network')) {
          return failureCount < 2;
        }
        return false;
      },
    },
  },
};

/**
 * Create a new QueryClient instance
 * Use this for SSR or when you need a fresh client
 */
export function createQueryClient(): QueryClient {
  return new QueryClient(queryClientConfig);
}

/**
 * Singleton query client for client-side usage
 * This ensures data persists across navigation
 */
let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === 'undefined') {
    // Server - always create a new client
    return createQueryClient();
  }
  
  // Browser - create once
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  
  return browserQueryClient;
}

/**
 * Query keys for consistent cache management
 */
export const queryKeys = {
  // Treatments
  treatments: ['treatments'] as const,
  treatment: (id: string) => ['treatments', id] as const,
  treatmentCategories: ['treatmentCategories'] as const,
  
  // Conditions
  conditions: ['conditions'] as const,
  condition: (id: string) => ['conditions', id] as const,
  
  // Bookings
  bookings: ['bookings'] as const,
  booking: (id: string) => ['bookings', id] as const,
  userBookings: (userId: string) => ['bookings', 'user', userId] as const,
  availableSlots: (date: string, treatmentId?: string) => 
    ['slots', date, treatmentId] as const,
  
  // User
  user: ['user'] as const,
  userPreferences: ['user', 'preferences'] as const,
  
  // Content
  testimonials: ['testimonials'] as const,
  faq: ['faq'] as const,
  blogPosts: ['blogPosts'] as const,
  blogPost: (slug: string) => ['blogPosts', slug] as const,
  
  // Meta
  siteSettings: ['siteSettings'] as const,
};

/**
 * Prefetch strategies for common patterns
 */
export const prefetchStrategies = {
  // Prefetch on hover
  onHover: { staleTime: 60 * 1000 },
  
  // Prefetch on viewport entry
  onViewport: { staleTime: 5 * 60 * 1000 },
  
  // Always fresh data
  fresh: { staleTime: 0, gcTime: 0 },
  
  // Static data that rarely changes
  static: { staleTime: 24 * 60 * 60 * 1000, gcTime: 7 * 24 * 60 * 60 * 1000 },
};

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Query Provider component
 * Wraps the app with QueryClientProvider and DevTools
 */
export function QueryProvider({ children }: QueryProviderProps): React.JSX.Element {
  const queryClient = getQueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

/**
 * Utility to invalidate multiple queries
 */
export function invalidateQueries(
  queryClient: QueryClient,
  patterns: (readonly string[])[]
): Promise<void> {
  return Promise.all(
    patterns.map((pattern) => 
      queryClient.invalidateQueries({ queryKey: pattern })
    )
  ).then(() => undefined);
}

/**
 * Utility for optimistic updates
 */
export function optimisticUpdate<T>(
  queryClient: QueryClient,
  queryKey: readonly string[],
  updater: (old: T | undefined) => T
): void {
  queryClient.setQueryData<T>(queryKey, (old) => updater(old));
}
