'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type BookingStep = 'service' | 'datetime' | 'details' | 'confirmation';

export interface BookingDraft {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

interface BookingState {
  currentStep: BookingStep;
  draft: BookingDraft;
  bookedSlots: string[];
  isLoadingSlots: boolean;
  lastSaved?: string;
  completedBookingId?: string;
  updateField: <TField extends keyof BookingDraft>(
    field: TField,
    value: BookingDraft[TField]
  ) => void;
  setBookedSlots: (slots: string[]) => void;
  setLoadingSlots: (isLoading: boolean) => void;
  completeBooking: (bookingId?: string) => void;
  resetBooking: () => void;
  clearDraft: () => void;
}

const emptyDraft: BookingDraft = {
  name: '',
  email: '',
  phone: '',
  service: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      currentStep: 'service',
      draft: emptyDraft,
      bookedSlots: [],
      isLoadingSlots: false,

      updateField: (field, value) =>
        set((state) => ({
          draft: {
            ...state.draft,
            [field]: value,
          },
          lastSaved: new Date().toISOString(),
        })),

      setBookedSlots: (slots) => set({ bookedSlots: slots }),
      setLoadingSlots: (isLoading) => set({ isLoadingSlots: isLoading }),

      completeBooking: (bookingId) =>
        set({
          currentStep: 'confirmation',
          draft: emptyDraft,
          bookedSlots: [],
          isLoadingSlots: false,
          completedBookingId: bookingId,
          lastSaved: undefined,
        }),

      resetBooking: () =>
        set({
          currentStep: 'service',
          draft: emptyDraft,
          bookedSlots: [],
          isLoadingSlots: false,
          completedBookingId: undefined,
          lastSaved: undefined,
        }),

      clearDraft: () =>
        set({
          draft: emptyDraft,
          bookedSlots: [],
          isLoadingSlots: false,
          lastSaved: undefined,
        }),
    }),
    {
      name: 'silk-appointment-draft',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        draft: state.draft,
        lastSaved: state.lastSaved,
      }),
    }
  )
);

export const useBookingDraft = () => useBookingStore((state) => state.draft);
export const useBookingProgress = () => {
  const draft = useBookingStore((state) => state.draft);
  const completedFields = [
    draft.service,
    draft.preferredDate,
    draft.preferredTime,
    draft.name,
    draft.email,
    draft.phone,
  ].filter(Boolean).length;

  return {
    completedFields,
    totalFields: 6,
    percentComplete: Math.round((completedFields / 6) * 100),
  };
};
