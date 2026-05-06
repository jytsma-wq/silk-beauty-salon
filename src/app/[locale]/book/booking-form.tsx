'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BookingFormProps {
  consultationTypes: Array<{
    title: string;
    duration: string;
    description: string;
    bookingType: string;
  }>;
}

// Client-side CSRF token getter
function getCsrfToken(): string | null {
  if (typeof window === 'undefined') return null;
  const meta = document.querySelector('meta[name="csrf-token"]');
  return meta?.getAttribute('content') || null;
}

export function BookingForm({ consultationTypes }: BookingFormProps) {
  const t = useTranslations('bookingPage');
  const tCommon = useTranslations('common');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

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
  const timeSlots = [
    { value: '10:00', label: '10:00' },
    { value: '11:00', label: '11:00' },
    { value: '12:00', label: '12:00' },
    { value: '14:00', label: '14:00' },
    { value: '15:00', label: '15:00' },
    { value: '16:00', label: '16:00' },
    { value: '17:00', label: '17:00' },
    { value: '18:00', label: '18:00' },
  ];

  const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCsrfToken() || '',
        },
        body: JSON.stringify({
          ...formData,
          locale: document.documentElement.lang || 'en',
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
    handleChange('preferredDate', date ? formatDateValue(date) : '');
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[#b5453a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-[#b5453a]" />
        </div>
        <h3 className="font-serif text-2xl text-primary mb-4">
          {t('successTitle', { defaultValue: 'Booking Request Submitted' })}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {t('successMessage', { defaultValue: 'Thank you for your booking request. We will contact you shortly to confirm your appointment.' })}
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="bg-[#b5453a] hover:bg-[#8e3229] text-white rounded-none px-6 py-3 text-xs tracking-widest uppercase"
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

      {/* Service Selection */}
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

      {/* Personal Information */}
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

      {/* Email */}
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

      {/* Preferred Date & Time */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8d6f58]" />
            {t('preferredDate', { defaultValue: 'Preferred Date' })}
          </Label>
          <div className="rounded-md border border-[#e8e4df] bg-white p-3">
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
                day_selected:
                  'bg-[#241f1b] text-white hover:bg-[#241f1b] hover:text-white focus:bg-[#241f1b] focus:text-white',
                day_today: 'bg-[#f3ece3] text-[#241f1b]',
              }}
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {timeSlots.map((slot) => {
              const isSelected = formData.preferredTime === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => handleChange('preferredTime', slot.value)}
                  className={`inline-flex h-12 items-center justify-center rounded-md border text-sm transition-colors ${
                    isSelected
                      ? 'border-[#241f1b] bg-[#241f1b] text-white'
                      : 'border-[#d8cbbb] bg-[#f7f2eb] text-[#241f1b] hover:bg-[#ece3d7]'
                  }`}
                >
                  {slot.label}
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

      {/* Message */}
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

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#b5453a] hover:bg-[#8e3229] text-white rounded-none px-6 py-4 text-xs tracking-widest uppercase font-medium transition-colors disabled:opacity-50"
      >
        {isSubmitting ? tCommon('submitting', { defaultValue: 'Submitting...' }) : t('requestBooking', { defaultValue: 'Request Booking' })}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {t('bookingNote', { defaultValue: 'We will contact you to confirm your appointment within 24 hours.' })}
      </p>
    </form>
  );
}
