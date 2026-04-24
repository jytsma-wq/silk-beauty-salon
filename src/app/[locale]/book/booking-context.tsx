'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  isBookingSuccess: boolean;
  setBookingSuccess: (success: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingSuccess, setBookingSuccess] = useState(false);

  return (
    <BookingContext.Provider value={{ isBookingSuccess, setBookingSuccess }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
