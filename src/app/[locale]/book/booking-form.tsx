'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/data/site-config';
import { useClientCsrfToken } from '@/lib/csrf-client';

interface BookingFormProps {
  consultationTypes: Array<{
    title: string;
    duration: string;
    description: string;
    bookingType: string;
  }>;
}

export function BookingForm({ consultationTypes }: BookingFormProps) {
  const t = useTranslations('bookingPage');
  const tCommon = useTranslations('common');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const csrfToken = useClientCsrfToken();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getHoursForDate = (date?: Date) => {
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
  };

  const buildTimeSlots = (date?: Date) => {
    const [start, end] = getHoursForDate(date).split(' - ');
    const startHour = Number.parseInt(start.split(':')[0] ?? '10', 10);
    const endHour = Number.parseInt(end.split(':')[0] ?? '19', 10);

    return Array.from({ length: Math.max(endHour - startHour, 0) }, (_, index) => {
      const hour = `${startHour + index}`.padStart(2, '0');
      return {
        value: `${hour}:00`,
        label: `${hour}:00`,
      };
    });
  };

  const timeSlots = buildTimeSlots(selectedDate);

  const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const dateStr = formatDateValue(selectedDate);
    fetch(`/api/bookings?date=${dateStr}`)
      .then((res) => res.json())
      .then((data: { bookedSlots?: string[] }) => {
        const nextBookedSlots = data.bookedSlots || [];
        setBookedSlots(nextBookedSlots);
        setFormData((prev) =>
          prev.preferredTime && nextBookedSlots.some((slot) => slot.startsWith(prev.preferredTime))
            ? { ...prev, preferredTime: '' }
            : prev
        );
      })
      .catch((err) => console.error('Error fetching slots:', err));
  }, [selectedDate]);

  const formatDateLabel = (date: Date) =>
    new Intl.DateTimeFormat(document.documentElement.lang || 'en', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const dateStr = formData.preferredDate;
      const startHour = formData.preferredTime;
      const endHour = `${Number.parseInt(startHour, 10) + 1}:00`.padStart(5, '0');
      const timeSlot = `${startHour} - ${endHour}`;

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          date: dateStr,
          timeSlot,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking request');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
      });
      setSelectedDate(undefined);
      setBookedSlots([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setBookedSlots([]);
    handleChange('preferredDate', date ? formatDateValue(date) : '');
    const nextSlots = buildTimeSlots(date);
    if (!nextSlots.some((slot) => slot.value === formData.preferredTime)) {
      handleChange('preferredTime', '');
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#8d6f58]/10">
          <CheckCircle className="h-8 w-8 text-[#8d6f58]" />
        </div>
        <h3 className="font-serif text-2xl text-primary mb-4">
          {t('successTitle', { defaultValue: 'Booking Request Submitted' })}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {t('successMessage', { defaultValue: 'Thank you for your booking request. We will contact you shortly to confirm your appointment.' })}
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="rounded-md border border-[#d9cec1] bg-[#f7f2eb] px-6 py-3 text-xs uppercase tracking-widest text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
        >
          {t('bookAnother', { defaultValue: 'Book Another Appointment' })}
        </Button>
      </div>
    );
  }

  return (
    <form id="booking-embed" onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="service" className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#b5453a]" />
          {t('selectService', { defaultValue: 'Select Service' })}
        </Label>
        <select
          value={formData.service}
          onChange={(e) => handleChange('service', e.target.value)}
          required
          className="w-full h-10 px-3 py-2 bg-white border border-border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-[#b5453a]/20 focus:border-[#b5453a]"
        >
          <option value="">{t('selectServicePlaceholder', { defaultValue: 'Choose a consultation type' })}</option>
          {consultationTypes.map((type) => (
            <option key={type.bookingType} value={type.title}>
              {type.title} — {type.duration}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#b5453a]" />
            {t('fullName', { defaultValue: 'Full Name' })}
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            minLength={2}
            className="rounded-none border-border"
            placeholder={t('namePlaceholder', { defaultValue: 'Enter your full name' })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#b5453a]" />
            {t('phoneNumber', { defaultValue: 'Phone Number' })}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            minLength={5}
            className="rounded-none border-border"
            placeholder={t('phonePlaceholder', { defaultValue: '+995 599 123 456' })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#b5453a]" />
          {t('emailAddress', { defaultValue: 'Email Address' })}
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
          className="rounded-none border-border"
          placeholder={t('emailPlaceholder', { defaultValue: 'your@email.com' })}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-[520px_minmax(0,1fr)] md:items-start">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8d6f58]" />
            {t('preferredDate', { defaultValue: 'Preferred Date' })}
          </Label>
          <div className="aspect-square w-full max-w-[520px] rounded-md border border-[#e8e4df] bg-white p-3">
            <DatePicker
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              classNames={{
                selected:
                  'bg-[#241f1b] text-white hover:bg-[#241f1b] hover:text-white focus:bg-[#241f1b] focus:text-white',
                today: 'bg-[#f3ece3] text-[#241f1b]',
              }}
              className="w-full"
            />
          </div>
          <input type="hidden" name="preferredDate" value={formData.preferredDate} />
          {selectedDate ? (
            <p className="text-sm text-stone-600">{formatDateLabel(selectedDate)}</p>
          ) : (
            <p className="text-sm text-stone-500">
              {t('selectDateTime', { defaultValue: 'Select Date & Time' })}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8d6f58]" />
            {t('preferredTime', { defaultValue: 'Preferred Time' })}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => {
              const isSelected = formData.preferredTime === slot.value;
              const isBooked = bookedSlots.some((bookedSlot) => bookedSlot.startsWith(slot.value));
              return (
                <button
                  key={slot.value}
                  type="button"
                  disabled={isBooked}
                  onClick={() => handleChange('preferredTime', slot.value)}
                  className={`inline-flex h-12 w-full min-w-0 items-center justify-center rounded-md border text-sm transition-colors ${
                    isSelected
                      ? 'border-[#241f1b] bg-[#241f1b] text-white'
                      : isBooked
                        ? 'cursor-not-allowed border-[#d8cbbb] bg-[#f7f2eb] text-[#7b7269] line-through opacity-50'
                      : 'border-[#d8cbbb] bg-[#f7f2eb] text-[#241f1b] hover:bg-[#ece3d7]'
                  }`}
                >
                  {slot.label} {isBooked && t('booked')}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="preferredTime" value={formData.preferredTime} />
          <p className="text-sm text-stone-500">
            {formData.preferredTime
              ? `${t('preferredTime', { defaultValue: 'Preferred Time' })}: ${formData.preferredTime}`
              : t('selectTime', { defaultValue: 'Select time' })}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#b5453a]" />
          {t('additionalNotes', { defaultValue: 'Additional Notes' })}
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          className="rounded-none border-border resize-none"
          placeholder={t('notesPlaceholder', { defaultValue: 'Any specific requirements or questions...' })}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !formData.preferredDate || !formData.preferredTime}
        className="w-full rounded-md border border-[#d9cec1] bg-[#f7f2eb] px-6 py-4 text-xs font-medium uppercase tracking-widest text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white disabled:opacity-50"
      >
        {isSubmitting ? tCommon('submitting', { defaultValue: 'Submitting...' }) : t('requestBooking', { defaultValue: 'Request Booking' })}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {t('bookingNote', { defaultValue: 'We will contact you to confirm your appointment within 24 hours.' })}
      </p>
    </form>
  );
}
