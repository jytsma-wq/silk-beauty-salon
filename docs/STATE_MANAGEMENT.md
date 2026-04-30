# State Management Guide

This document outlines the state management architecture and data fetching strategy for Silk Beauty Salon.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Zustand Stores](#zustand-stores)
- [TanStack Query](#tanstack-query)
- [React Hook Form](#react-hook-form)
- [Custom Hooks](#custom-hooks)
- [Best Practices](#best-practices)

## Architecture Overview

The application uses a layered state management approach:

| State Type | Tool | Use Case |
|------------|------|----------|
| Server State | TanStack Query | API data, caching, synchronization |
| Global Client State | Zustand | User preferences, UI state, booking flow |
| Local Component State | useState/useReducer | Component-specific state |
| Form State | React Hook Form | Form handling with validation |
| URL State | Next.js Router | Search params, query strings |

## Zustand Stores

### User Store

**File**: `src/stores/user-store.ts`

Manages user preferences, session, and cookie consent:

```tsx
import { useUserStore, useUserLocale, useUserTheme } from '@/stores';

// Access all state
const preferences = useUserStore((state) => state.preferences);

// Use selector hooks for better performance
const locale = useUserLocale();
const theme = useUserTheme();

// Update state
const setLocale = useUserStore((state) => state.setLocale);
setLocale('ka');
```

**Features**:
- Persisted to localStorage
- Type-safe with TypeScript
- Selector hooks for performance
- Hydration helper for SSR

**State Structure**:
- `preferences`: locale, theme, accessibility, notifications
- `consent`: cookie consent state
- `session`: user authentication

### UI Store

**File**: `src/stores/ui-store.ts`

Manages UI state like modals, drawers, and notifications:

```tsx
import { useUIStore, useToast, useIsModalOpen } from '@/stores';

// Modal management
const openModal = useUIStore((state) => state.openModal);
openModal('booking-modal', { treatmentId: '123' });

// Check if modal is open
const isOpen = useIsModalOpen('booking-modal');

// Toast notifications
const { success, error } = useToast();
success('Booking Confirmed', 'Your appointment has been scheduled');
```

**Features**:
- DevTools integration
- Auto-dismiss notifications
- Modal/Drawer state management
- Loading state tracking

### Booking Store

**File**: `src/stores/booking-store.ts`

Manages multi-step booking flow with persistence:

```tsx
import { useBookingStore, useBookingProgress } from '@/stores';

// Step navigation
const { nextStep, previousStep, canProceed } = useBookingStore();

// Form data
const formData = useBookingStore((state) => state.formData);
const selectTreatment = useBookingStore((state) => state.selectTreatment);

// Progress tracking
const { currentStep, currentStepNumber, totalSteps, percentComplete } = useBookingProgress();
```

**Features**:
- Draft persistence to localStorage
- Step validation
- Progress tracking
- Resume interrupted bookings

## TanStack Query

### Configuration

**File**: `src/lib/react-query.tsx`

```tsx
import { QueryProvider } from '@/lib/react-query';

export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
```

### Query Keys

Centralized query key management in `src/lib/react-query.tsx`:

```ts
import { queryKeys } from '@/lib/react-query';

// Treatments
queryKeys.treatments
queryKeys.treatment(id)

// Bookings
queryKeys.bookings
queryKeys.availableSlots(date, treatmentId)
```

### Custom Hooks

**File**: `src/hooks/use-query-hooks.ts`

Pre-built hooks for common data fetching patterns:

```tsx
import { 
  useTreatments, 
  useTreatment, 
  useCreateBooking,
  useAvailableSlots 
} from '@/hooks';

// Fetch all treatments
const { data: treatments, isLoading } = useTreatments();

// Fetch single treatment
const { data: treatment } = useTreatment('123');

// Fetch available slots
const { data: slots } = useAvailableSlots('2024-01-15', 'treatment-123');

// Create booking mutation
const createBooking = useCreateBooking();
createBooking.mutate(bookingData);
```

### Caching Strategy

Default cache configuration:

- **Stale Time**: 5 minutes (data considered fresh)
- **GC Time**: 10 minutes (garbage collection)
- **Retry**: 3 attempts with exponential backoff
- **Refetch**: On window focus (production only), on reconnect

### Optimistic Updates

```tsx
import { useOptimisticToggle } from '@/hooks';

const toggleFavorite = useOptimisticToggle<FavoriteItem>(
  queryKeys.favorites,
  (id, value) => api.toggleFavorite(id, value),
  'isFavorite'
);

toggleFavorite.mutate({ id: '123', value: true });
```

## React Hook Form

### Form Schemas

**File**: `src/schemas/booking-schema.ts`

Zod schemas for form validation:

```ts
import { contactFormSchema, type ContactFormInput } from '@/schemas';

const form = useForm<ContactFormInput>({
  resolver: zodResolver(contactFormSchema),
});
```

### Reusable Components

**File**: `src/components/forms/form-field.tsx`

```tsx
import { FormField, FormSection } from '@/components/forms/form-field';

<FormField label="Email" required error={errors.email?.message}>
  <Input {...register('email')} />
</FormField>

<FormSection title="Customer Details">
  {/* Form fields */}
</FormSection>
```

### Contact Form Example

**File**: `src/components/forms/contact-form.tsx`

```tsx
import { ContactForm } from '@/components/forms/contact-form';

<ContactForm onSuccess={() => router.push('/thank-you')} />
```

## Custom Hooks

### Local Storage

**File**: `src/hooks/use-local-storage.ts`

```tsx
import { useLocalStorage, useDebouncedLocalStorage } from '@/hooks';

// Sync with localStorage
const [value, setValue, removeValue] = useLocalStorage('key', defaultValue);

// Debounced updates (useful for form drafts)
const [value, setValue] = useDebouncedLocalStorage('draft', '', 1000);
```

## Best Practices

### 1. Server State vs Client State

**Use TanStack Query for**:
- API data that needs caching
- Data shared across components
- Real-time synchronization

**Use Zustand for**:
- User preferences
- UI state (modals, drawers)
- Multi-step form state
- Authentication state

### 2. Selector Hooks

Always use selector hooks to prevent unnecessary re-renders:

```tsx
// Good - only re-renders when locale changes
const locale = useUserLocale();

// Avoid - re-renders when any user state changes
const { locale } = useUserStore();
```

### 3. Form Validation

Define schemas in `src/schemas/` and use with React Hook Form:

```tsx
const form = useForm<FormInput>({
  resolver: zodResolver(schema),
  defaultValues: {
    // Provide defaults for all fields
  },
});
```

### 4. Query Invalidation

Invalidate queries after mutations:

```tsx
const queryClient = useQueryClient();

useMutation({
  mutationFn: createBooking,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.bookings });
  },
});
```

### 5. Error Handling

Use error boundaries and toast notifications:

```tsx
const { error } = useToast();

try {
  await mutation.mutateAsync(data);
} catch (err) {
  error('Error', err.message);
}
```

### 6. Performance

- Use `staleTime` to reduce unnecessary fetches
- Use `select` to transform data
- Use `keepPreviousData` for pagination
- Profile with React Query DevTools

## File Structure

```
src/
├── stores/
│   ├── index.ts           # Store exports
│   ├── user-store.ts      # User preferences
│   ├── ui-store.ts        # UI state
│   └── booking-store.ts   # Booking flow
├── hooks/
│   ├── index.ts           # Hook exports
│   ├── use-query-hooks.ts # Data fetching
│   └── use-local-storage.ts
├── schemas/
│   ├── index.ts           # Schema exports
│   └── booking-schema.ts  # Zod schemas
├── components/forms/
│   ├── form-field.tsx     # Reusable field
│   └── contact-form.tsx   # Form components
└── lib/
    └── react-query.tsx    # Query configuration
```

## Environment Variables

```env
# React Query
NEXT_PUBLIC_QUERY_STALE_TIME=300000
NEXT_PUBLIC_QUERY_CACHE_TIME=600000

# Development
NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS=true
```

## Additional Resources

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
