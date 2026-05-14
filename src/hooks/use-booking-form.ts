"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { format, isBefore, isToday } from "date-fns";
import { useTranslations } from "next-intl";
import { apiGet, apiPost, API_ENDPOINTS, ApiError } from "@/lib/api-client";
import { useClientCsrfToken } from "@/lib/csrf-client";
import { siteConfig } from "@/data/site-config";

export type BookingStep = "datetime" | "details" | "confirmation";

export interface BookingService {
  label: string;
  value: string;
  duration?: string | null;
}

export interface BookingServiceGroup {
  label: string;
  services: BookingService[];
}

interface BookingFormState {
  step: BookingStep;
  selectedService: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  bookedSlots: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM_STATE: BookingFormState = {
  step: "datetime",
  selectedService: "",
  selectedDate: undefined,
  selectedTime: "",
  bookedSlots: [],
  name: "",
  email: "",
  phone: "",
  message: "",
};

function getHoursForDate(date?: Date) {
  switch (date?.getDay()) {
    case 0:
      return siteConfig.businessHours.sunday;
    case 1:
      return siteConfig.businessHours.monday;
    case 2:
      return siteConfig.businessHours.tuesday;
    case 3:
      return siteConfig.businessHours.wednesday;
    case 4:
      return siteConfig.businessHours.thursday;
    case 5:
      return siteConfig.businessHours.friday;
    case 6:
      return siteConfig.businessHours.saturday;
    default:
      return siteConfig.businessHours.monday;
  }
}

function parseHour(value: string, fallback: number) {
  const hour = Number.parseInt(value.split(":")[0] ?? "", 10);
  return Number.isFinite(hour) ? hour : fallback;
}

function buildTimeSlots(date?: Date) {
  const [start = "10:00", end = "19:00"] = getHoursForDate(date).split(" - ");
  const startHour = parseHour(start, 10);
  const endHour = parseHour(end, 19);

  return Array.from({ length: Math.max(endHour - startHour, 0) }, (_, index) => {
    const hour = startHour + index;
    const nextHour = hour + 1;
    return `${`${hour}`.padStart(2, "0")}:00 - ${`${nextHour}`.padStart(2, "0")}:00`;
  });
}

export function useBookingForm() {
  const t = useTranslations("bookingPage");
  const csrfToken = useClientCsrfToken();
  const [formState, setFormState] = useState<BookingFormState>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = useMemo(
    () => buildTimeSlots(formState.selectedDate),
    [formState.selectedDate]
  );

  useEffect(() => {
    if (!formState.selectedDate) {
      return;
    }

    const controller = new AbortController();
    const dateStr = format(formState.selectedDate, "yyyy-MM-dd");

    apiGet<{ bookedSlots: string[] }>(`${API_ENDPOINTS.bookings}?date=${dateStr}`, {
      signal: controller.signal,
    })
      .then((data) => {
        const bookedSlots = data.bookedSlots || [];
        setFormState((prev) => {
          const availableSlots = buildTimeSlots(prev.selectedDate).filter(
            (slot) => !bookedSlots.includes(slot)
          );
          const selectedStillAvailable =
            prev.selectedTime && availableSlots.includes(prev.selectedTime);

          return {
            ...prev,
            bookedSlots,
            selectedTime: selectedStillAvailable ? prev.selectedTime : availableSlots[0] ?? "",
          };
        });
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        console.error("Error fetching booked slots:", err);
      });

    return () => controller.abort();
  }, [formState.selectedDate]);

  const isDateDisabled = (date: Date) => isBefore(date, new Date()) && !isToday(date);

  const updateField = useCallback(<K extends keyof BookingFormState>(
    field: K,
    value: BookingFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const selectDate = useCallback((date: Date | undefined) => {
    setFormState((prev) => ({
      ...prev,
      selectedDate: date,
      selectedTime: "",
      bookedSlots: [],
    }));
  }, []);

  const goToDetails = () => {
    if (formState.selectedService && formState.selectedDate && formState.selectedTime) {
      updateField("step", "details");
    }
  };

  const goBack = () => {
    if (formState.step === "details") {
      updateField("step", "datetime");
    }
  };

  const reset = useCallback(() => {
    setFormState(INITIAL_FORM_STATE);
    setError("");
    setIsLoading(false);
  }, []);

  const submit = async () => {
    const { selectedDate, selectedService, selectedTime, name, email, phone, message } = formState;
    if (!selectedDate || !selectedService || !selectedTime) return;

    setIsLoading(true);
    setError("");

    try {
      await apiPost(
        API_ENDPOINTS.bookings,
        {
          name,
          email,
          phone,
          service: selectedService,
          date: format(selectedDate, "yyyy-MM-dd"),
          timeSlot: selectedTime,
          message,
        },
        { csrfToken }
      );

      updateField("step", "confirmation");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setError(t("slotConflict"));
        } else if (err.isRateLimit()) {
          setError(t("rateLimitMessage"));
        } else {
          setError(err.message || t("bookingFailed"));
        }
      } else {
        setError(t("unexpectedError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    timeSlots,
    isLoading,
    error,
    isDateDisabled,
    updateField,
    selectDate,
    goToDetails,
    goBack,
    submit,
    reset,
  };
}
