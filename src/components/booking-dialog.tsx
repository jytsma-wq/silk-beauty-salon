"use client";

import { useEffect } from "react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useBookingForm, type BookingServiceGroup } from "@/hooks/use-booking-form";
import { siteConfig } from "@/data/site-config";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";

interface BookingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderMode?: "dialog" | "inline";
  serviceGroups?: BookingServiceGroup[];
}

function StepIndicator({ step }: { step: string }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-2 sm:mb-8 sm:gap-4">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors sm:h-10 sm:w-10 sm:text-base",
              step === "datetime" && num === 1 && "bg-[#b5453a] text-white",
              step === "details" && num === 1 && "bg-emerald-600 text-white",
              step === "details" && num === 2 && "bg-[#b5453a] text-white",
              step === "confirmation" && num <= 2 && "bg-emerald-600 text-white",
              step === "confirmation" && num === 3 && "bg-[#b5453a] text-white",
              ((step === "datetime" && num > 1) || (step === "details" && num === 3)) &&
                "bg-gray-200 text-gray-500"
            )}
          >
            {((step === "details" && num === 1) || (step === "confirmation" && num <= 2)) && (
              <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
            {((step === "datetime" && num === 1) ||
              (step === "details" && num === 2) ||
              (step === "confirmation" && num === 3) ||
              (step === "datetime" && num > 1) ||
              (step === "details" && num === 3)) &&
              num}
          </div>
          {num < 3 && (
            <div
              className={cn(
                "mx-1 h-0.5 w-8 sm:mx-2 sm:w-12",
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

function useFallbackServiceGroups(): BookingServiceGroup[] {
  const t = useTranslations("bookingPage");

  return [
    {
      label: t("serviceGroups.consultations"),
      services: [
        {
          label: t("consultations.facial.title"),
          value: t("consultations.facial.title"),
          duration: t("consultations.facial.duration"),
        },
        {
          label: t("consultations.skin.title"),
          value: t("consultations.skin.title"),
          duration: t("consultations.skin.duration"),
        },
        {
          label: t("consultations.body.title"),
          value: t("consultations.body.title"),
          duration: t("consultations.body.duration"),
        },
        {
          label: t("consultations.virtual.title"),
          value: t("consultations.virtual.title"),
          duration: t("consultations.virtual.duration"),
        },
      ],
    },
    {
      label: t("serviceGroups.skinTreatments"),
      services: [
        { label: t("serviceLaser"), value: t("serviceLaser") },
        { label: t("serviceRejuvenation"), value: t("serviceRejuvenation") },
        { label: t("servicePeel"), value: t("servicePeel") },
        { label: t("serviceMicroneedling"), value: t("serviceMicroneedling") },
        { label: t("serviceHydrafacial"), value: t("serviceHydrafacial") },
      ],
    },
    {
      label: t("serviceGroups.injectables"),
      services: [
        { label: t("serviceBotox"), value: t("serviceBotox") },
        { label: t("serviceFillers"), value: t("serviceFillers") },
      ],
    },
  ];
}

export function BookingDialog({
  open = false,
  onOpenChange,
  renderMode = "dialog",
  serviceGroups,
}: BookingDialogProps) {
  const t = useTranslations("bookingPage");
  const fallbackServiceGroups = useFallbackServiceGroups();
  const groups = serviceGroups?.length ? serviceGroups : fallbackServiceGroups;
  const {
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
  } = useBookingForm();

  const {
    step,
    selectedService,
    selectedDate,
    selectedTime,
    bookedSlots,
    name,
    email,
    phone,
    message,
  } = formState;

  useEffect(() => {
    if (renderMode !== "dialog" || open) return;
    const timer = window.setTimeout(reset, 300);
    return () => window.clearTimeout(timer);
  }, [open, renderMode, reset]);

  const handleDetailsSubmit = () => {
    if (name && email && phone) {
      void submit();
    }
  };

  const handleClose = () => {
    if (renderMode === "dialog") {
      onOpenChange?.(false);
      return;
    }
    reset();
  };

  const phoneNumber = siteConfig.contact.phone.replace(/\s/g, "").replace("+", "");
  const confirmationDate = selectedDate ? format(selectedDate, "MMMM d, yyyy") : "";
  const whatsappMessage = t("whatsappConfirm", {
    service: selectedService,
    date: confirmationDate,
    time: selectedTime,
    name,
  });
  const whatsappHref = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const content = (
    <div
      className={cn(
        "bg-white",
        renderMode === "inline" && "rounded-md border border-[#e8e4df] p-4 shadow-sm sm:p-6"
      )}
    >
      <div className="text-center">
        <h2 className="font-serif text-2xl text-[#241f1b]">{t("dialogTitle")}</h2>
        <p className="mt-2 text-sm text-stone-600">{t("dialogDescription")}</p>
      </div>

      <div className="mt-6">
        <StepIndicator step={step} />

        {error && (
          <div className="mb-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {step === "datetime" && (
          <div className="space-y-6">
            <div>
              <Label className="mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#b5453a]" />
                {t("selectService")}
              </Label>
              <Select
                value={selectedService}
                onValueChange={(value) => updateField("selectedService", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("servicePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group, groupIndex) => (
                    <SelectGroup key={group.label}>
                      {groupIndex > 0 && <SelectSeparator />}
                      <SelectLabel>{group.label}</SelectLabel>
                      {group.services.map((service) => (
                        <SelectItem key={`${group.label}-${service.value}`} value={service.value}>
                          {service.label}
                          {service.duration ? ` - ${service.duration}` : ""}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-[#b5453a]" />
                {t("selectDate")}
              </Label>
              <div className="flex justify-center rounded-sm border p-2 sm:p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={selectDate}
                  disabled={isDateDisabled}
                  className="rounded-md border-0"
                  classNames={{
                    day_button: "mx-auto h-12 w-12 rounded-md p-0 text-base font-medium text-[#2d2925] hover:bg-[#f3ece3] hover:text-[#241f1b] sm:h-10 sm:w-10",
                  }}
                />
              </div>
            </div>

            {selectedDate && (
              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#b5453a]" />
                  {t("selectTimeSlot")}
                </Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBooked}
                        onClick={() => updateField("selectedTime", slot)}
                        className={cn(
                          "rounded-sm border px-3 py-3 text-sm transition-colors",
                          isSelected
                            ? "border-[#b5453a] bg-[#b5453a] text-white"
                            : isBooked
                              ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 line-through"
                              : "border-gray-200 bg-white hover:border-[#b5453a]"
                        )}
                      >
                        {slot} {isBooked && t("booked")}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Button
              type="button"
              onClick={goToDetails}
              disabled={!selectedService || !selectedDate || !selectedTime}
              className="w-full bg-[#b5453a] text-white hover:bg-[#8e3229]"
            >
              {t("continue")}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-6">
            <div className="rounded-sm bg-gray-50 p-4">
              <h3 className="mb-2 font-medium text-gray-900">{t("bookingSummary")}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">{t("service")}:</span> {selectedService}
                </p>
                <p>
                  <span className="font-medium">{t("date")}:</span> {confirmationDate}
                </p>
                <p>
                  <span className="font-medium">{t("time")}:</span> {selectedTime}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-[#b5453a]" />
                  {t("fullName")}
                </Label>
                <Input
                  value={name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder={t("namePlaceholder")}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#b5453a]" />
                  {t("email")}
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#b5453a]" />
                  {t("phone")}
                </Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#b5453a]" />
                  {t("message")}
                </Label>
                <Textarea
                  value={message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={t("messagePlaceholder")}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={goBack} className="flex-1">
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t("back")}
              </Button>
              <Button
                type="button"
                onClick={handleDetailsSubmit}
                disabled={!name || !email || !phone || isLoading}
                className="flex-1 bg-[#b5453a] text-white hover:bg-[#8e3229]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("bookingStatus")}
                  </>
                ) : (
                  t("confirmBooking")
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "confirmation" && (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-serif text-xl">{t("bookingConfirmed")}</h3>
              <p className="text-gray-600">{t("thankYou", { name })}</p>
            </div>

            <div className="rounded-sm bg-gray-50 p-4 text-left">
              <h4 className="mb-3 font-medium text-gray-900">{t("bookingDetails")}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">{t("service")}:</span> {selectedService}
                </p>
                <p>
                  <span className="font-medium">{t("date")}:</span> {confirmationDate}
                </p>
                <p>
                  <span className="font-medium">{t("time")}:</span> {selectedTime}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {email}
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                asChild
                className="bg-[#25D366] text-white hover:bg-[#20BD5A]"
              >
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("confirmViaWhatsApp")}
                </a>
              </Button>
              <Button
                type="button"
                onClick={handleClose}
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {t("done")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (renderMode === "inline") {
    return content;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-screen max-h-none overflow-y-auto rounded-none sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
          <DialogDescription>{t("dialogDescription")}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
