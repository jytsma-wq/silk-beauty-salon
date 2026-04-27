"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { format, isBefore, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SERVICES = [
  { key: "serviceConsultation", default: "Consultation" },
  { key: "serviceBotox", default: "Botox Treatment" },
  { key: "serviceFillers", default: "Dermal Fillers" },
  { key: "serviceLaser", default: "Laser Hair Removal" },
  { key: "serviceRejuvenation", default: "Skin Rejuvenation" },
  { key: "servicePeel", default: "Chemical Peel" },
  { key: "serviceMicroneedling", default: "Microneedling" },
  { key: "serviceHydrafacial", default: "Hydrafacial" },
];

const TIME_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
];

// Step indicator component
function StepIndicator({ step }: { step: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
              step === "datetime" && num === 1 && "bg-[#b5453a] text-white",
              step === "details" && num === 1 && "bg-emerald-600 text-white",
              step === "details" && num === 2 && "bg-[#b5453a] text-white",
              step === "confirmation" && num <= 2 && "bg-emerald-600 text-white",
              step === "confirmation" && num === 3 && "bg-[#b5453a] text-white",
              (step === "datetime" && num > 1) || (step === "details" && num === 3)
                ? "bg-gray-200 text-gray-500"
                : ""
            )}
          >
            {((step === "details" && num === 1) ||
              (step === "confirmation" && num <= 2)) && <CheckCircle2 className="w-5 h-5" />}
            {((step === "datetime" && num === 1) ||
              (step === "details" && num === 2) ||
              (step === "confirmation" && num === 3)) && num}
            {step === "datetime" && num > 1 && num}
            {step === "details" && num === 3 && num}
          </div>
          {num < 3 && (
            <div
              className={cn(
                "w-12 h-0.5 mx-2",
                (step === "details" && num === 1) || step === "confirmation"
                  ? "bg-emerald-600"
                  : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const t = useTranslations("booking");
  // Step state
  const [step, setStep] = useState<"datetime" | "details" | "confirmation">("datetime");

  // Form state
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      // Delay reset to allow close animation
      const timer = setTimeout(() => {
        setStep("datetime");
        setSelectedService("");
        setSelectedDate(undefined);
        setSelectedTime("");
        setBookedSlots([]);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setError("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Fetch booked slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      fetch(`/api/bookings?date=${dateStr}`)
        .then((res) => res.json())
        .then((data) => setBookedSlots(data.bookedSlots || []))
        .catch((err) => console.error("Error fetching booked slots:", err));
    }
  }, [selectedDate]);

  // Disable invalid dates (past dates and weekends)
  const isDateDisabled = (date: Date) => {
    if (isBefore(date, new Date()) && !isToday(date)) return true;
    const day = date.getDay();
    if (day === 0 || day === 6) return true; // weekends
    return false;
  };

  const handleNext = () => {
    if (step === "datetime" && selectedService && selectedDate && selectedTime) {
      setStep("details");
    } else if (step === "details" && name && email) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("datetime");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: selectedService,
          date: format(selectedDate!, "yyyy-MM-dd"),
          timeSlot: selectedTime,
          message,
        }),
      });

      if (response.status === 409) {
        setError(t('slotConflict'));
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || t('bookingFailed'));
        setIsLoading(false);
        return;
      }

      setStep("confirmation");
    } catch (_err) {
      setError(t('unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-serif">{t('dialogTitle')}</DialogTitle>
          <DialogDescription>
            {t('dialogDescription')}
          </DialogDescription>
        </DialogHeader>

        <StepIndicator step={step} />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Date & Time Selection */}
        {step === "datetime" && (
          <div className="space-y-6">
            {/* Service Selection */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-[#b5453a]" />
                {t('selectService')}
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder={t('servicePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((service) => (
                    <SelectItem key={service.key} value={t(service.key)}>
                      {t(service.key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Calendar */}
            <div>
              <Label className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-4 h-4 text-[#b5453a]" />
                {t('selectDate')}
              </Label>
              <div className="border rounded-sm p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="rounded-md border-0"
                />
              </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#b5453a]" />
                  {t('selectTimeSlot')}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        onClick={() => setSelectedTime(slot)}
                        className={cn(
                          "py-2 px-3 text-sm border rounded-sm transition-colors",
                          isSelected
                            ? "bg-[#b5453a] text-white border-[#b5453a]"
                            : isBooked
                            ? "bg-gray-100 text-gray-400 line-through cursor-not-allowed border-gray-200"
                            : "bg-white hover:border-[#b5453a] border-gray-200"
                        )}
                      >
                        {slot} {isBooked && t('booked')}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              onClick={handleNext}
              disabled={!selectedService || !selectedDate || !selectedTime}
              className="w-full bg-[#b5453a] hover:bg-[#8e3229] text-white"
            >
              {t('continue')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Contact Details */}
        {step === "details" && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-sm">
              <h4 className="font-medium text-gray-900 mb-2">{t('bookingSummary')}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">{t('service')}:</span> {selectedService}
                </p>
                <p>
                  <span className="font-medium">{t('date')}:</span>{" "}
                  {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                </p>
                <p>
                  <span className="font-medium">{t('time')}:</span> {selectedTime}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[#b5453a]" />
                  {t('fullName')}
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-[#b5453a]" />
                  {t('email')}
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-[#b5453a]" />
                  {t('phone')}
                </Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-[#b5453a]" />
                  {t('message')}
                </Label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('messagePlaceholder')}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t('back')}
              </Button>
              <Button
                onClick={handleNext}
                disabled={!name || !email || isLoading}
                className="flex-1 bg-[#b5453a] hover:bg-[#8e3229] text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('booking')}
                  </>
                ) : (
                  t('confirmBooking')
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === "confirmation" && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif mb-2">{t('bookingConfirmed')}</h3>
              <p className="text-gray-600">
                {t('thankYou', { name })}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-sm text-left">
              <h4 className="font-medium text-gray-900 mb-3">{t('bookingDetails')}</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-medium">{t('service')}:</span> {selectedService}
                </p>
                <p>
                  <span className="font-medium">{t('date')}:</span>{" "}
                  {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                </p>
                <p>
                  <span className="font-medium">{t('time')}:</span> {selectedTime}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {email}
                </p>
              </div>
            </div>

            <Button
              onClick={handleClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {t('done')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
