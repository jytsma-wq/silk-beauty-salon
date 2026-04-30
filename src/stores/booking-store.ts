/**
 * Booking Store - Zustand
 * Manages multi-step booking flow state with persistence
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Booking step type
 */
type BookingStep = 'treatment' | 'date' | 'time' | 'details' | 'review' | 'confirmation';

/**
 * Booking form data interface
 */
interface BookingFormData {
  /** Selected treatment ID */
  treatmentId?: string;
  /** Selected treatment name (for display) */
  treatmentName?: string;
  /** Selected date */
  date?: string;
  /** Selected time slot */
  time?: string;
  /** Customer details */
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  /** Additional notes */
  notes: string;
  /** Preferred contact method */
  preferredContact: 'email' | 'phone';
  /** Whether user wants SMS reminders */
  smsReminders: boolean;
}

/**
 * Booking state interface
 */
interface BookingState {
  /** Current step in booking flow */
  currentStep: BookingStep;
  /** Form data collected so far */
  formData: BookingFormData;
  /** Available time slots for selected date */
  availableSlots: string[];
  /** Whether slots are loading */
  isLoadingSlots: boolean;
  /** Draft saved timestamp */
  lastSaved?: string;
  /** Completed booking ID (set after successful submission) */
  completedBookingId?: string;
  
  // Step navigation
  /** Go to next step */
  nextStep: () => void;
  /** Go to previous step */
  previousStep: () => void;
  /** Go to specific step */
  goToStep: (step: BookingStep) => void;
  /** Check if can go to next step */
  canProceed: () => boolean;
  /** Check if can go to previous step */
  canGoBack: () => boolean;
  
  // Form data actions
  /** Select treatment */
  selectTreatment: (id: string, name: string) => void;
  /** Select date */
  selectDate: (date: string) => void;
  /** Select time slot */
  selectTime: (time: string) => void;
  /** Update customer details */
  updateCustomerDetails: (details: Partial<BookingFormData['customer']>) => void;
  /** Update notes */
  updateNotes: (notes: string) => void;
  /** Update preferred contact */
  updatePreferredContact: (method: BookingFormData['preferredContact']) => void;
  /** Toggle SMS reminders */
  toggleSmsReminders: () => void;
  
  // Slot management
  /** Set available slots */
  setAvailableSlots: (slots: string[]) => void;
  /** Set loading state for slots */
  setLoadingSlots: (isLoading: boolean) => void;
  
  // Booking completion
  /** Mark booking as completed */
  completeBooking: (bookingId: string) => void;
  /** Reset booking flow */
  resetBooking: () => void;
  /** Clear saved draft */
  clearDraft: () => void;
}

/**
 * Step order for navigation
 */
const stepOrder: BookingStep[] = ['treatment', 'date', 'time', 'details', 'review', 'confirmation'];

/**
 * Default form data
 */
const defaultFormData: BookingFormData = {
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  notes: '',
  preferredContact: 'email',
  smsReminders: false,
};

/**
 * Booking store with persistence
 * Drafts are saved to localStorage so users can resume later
 */
export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 'treatment',
      formData: defaultFormData,
      availableSlots: [],
      isLoadingSlots: false,
      
      // Step navigation
      nextStep: () => {
        const { currentStep } = get();
        const currentIndex = stepOrder.indexOf(currentStep);
        const nextIndex = currentIndex + 1;
        
        if (nextIndex < stepOrder.length) {
          set({ 
            currentStep: stepOrder[nextIndex],
            lastSaved: new Date().toISOString(),
          });
        }
      },
      
      previousStep: () => {
        const { currentStep } = get();
        const currentIndex = stepOrder.indexOf(currentStep);
        const prevIndex = currentIndex - 1;
        
        if (prevIndex >= 0) {
          set({ currentStep: stepOrder[prevIndex] });
        }
      },
      
      goToStep: (step) => {
        // Only allow navigating to accessible steps
        const currentIndex = stepOrder.indexOf(get().currentStep);
        const targetIndex = stepOrder.indexOf(step);
        
        // Can go to current step, previous steps, or next step if form valid
        if (targetIndex <= currentIndex + 1) {
          set({ currentStep: step });
        }
      },
      
      canProceed: () => {
        const { currentStep, formData } = get();
        
        switch (currentStep) {
          case 'treatment':
            return !!formData.treatmentId;
          case 'date':
            return !!formData.date;
          case 'time':
            return !!formData.time;
          case 'details':
            return !!(
              formData.customer.firstName &&
              formData.customer.lastName &&
              formData.customer.email &&
              formData.customer.phone
            );
          case 'review':
            return true;
          default:
            return false;
        }
      },
      
      canGoBack: () => {
        const { currentStep } = get();
        return stepOrder.indexOf(currentStep) > 0;
      },
      
      // Form data actions
      selectTreatment: (id, name) =>
        set((state) => ({
          formData: { ...state.formData, treatmentId: id, treatmentName: name },
          // Reset date and time when treatment changes
          availableSlots: [],
        })),
      
      selectDate: (date) =>
        set((state) => ({
          formData: { ...state.formData, date, time: undefined },
          lastSaved: new Date().toISOString(),
        })),
      
      selectTime: (time) =>
        set((state) => ({
          formData: { ...state.formData, time },
          lastSaved: new Date().toISOString(),
        })),
      
      updateCustomerDetails: (details) =>
        set((state) => ({
          formData: {
            ...state.formData,
            customer: { ...state.formData.customer, ...details },
          },
          lastSaved: new Date().toISOString(),
        })),
      
      updateNotes: (notes) =>
        set((state) => ({
          formData: { ...state.formData, notes },
          lastSaved: new Date().toISOString(),
        })),
      
      updatePreferredContact: (method) =>
        set((state) => ({
          formData: { ...state.formData, preferredContact: method },
        })),
      
      toggleSmsReminders: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            smsReminders: !state.formData.smsReminders,
          },
        })),
      
      // Slot management
      setAvailableSlots: (slots) => set({ availableSlots: slots }),
      
      setLoadingSlots: (isLoading) => set({ isLoadingSlots: isLoading }),
      
      // Booking completion
      completeBooking: (bookingId) =>
        set({
          completedBookingId: bookingId,
          currentStep: 'confirmation',
          lastSaved: new Date().toISOString(),
        }),
      
      resetBooking: () =>
        set({
          currentStep: 'treatment',
          formData: defaultFormData,
          availableSlots: [],
          isLoadingSlots: false,
          completedBookingId: undefined,
          lastSaved: undefined,
        }),
      
      clearDraft: () =>
        set({
          currentStep: 'treatment',
          formData: defaultFormData,
          availableSlots: [],
          isLoadingSlots: false,
          lastSaved: undefined,
        }),
    }),
    {
      name: 'silk-booking-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist form data and step, not transient state
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: state.formData,
        lastSaved: state.lastSaved,
      }),
    }
  )
);

/**
 * Selector hooks for booking state
 */
export const useBookingStep = () => useBookingStore((state) => state.currentStep);
export const useBookingFormData = () => useBookingStore((state) => state.formData);
export const useBookingProgress = () => {
  const currentStep = useBookingStore((state) => state.currentStep);
  const currentIndex = stepOrder.indexOf(currentStep);
  return {
    currentStep,
    currentStepNumber: currentIndex + 1,
    totalSteps: stepOrder.length - 1, // Exclude confirmation
    percentComplete: (currentIndex / (stepOrder.length - 2)) * 100,
  };
};
export const useIsBookingComplete = () => useBookingStore((state) => !!state.completedBookingId);
