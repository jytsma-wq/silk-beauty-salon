'use client';

import Image from 'next/image';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { format, isBefore, isToday } from 'date-fns';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Mail,
  MessageSquare,
  Phone,
  Search,
  User,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { useClientCsrfToken } from '@/lib/csrf-client';
import { useBookingStore } from '@/stores/booking-store';
import { bookingCopy, bookingText } from './booking-copy';

export interface BookingService {
  title: string;
  duration: string;
  description: string;
  price: string;
  bookingType: string;
}

export interface BookingServiceGroup {
  id: string;
  title: string;
  services: BookingService[];
}

interface BookingFormProps {
  serviceGroups: BookingServiceGroup[];
}

type BookingStage = 'services' | 'staff' | 'datetime';

type StaffOption = {
  id: string;
  name: string;
  role: string;
  image?: string;
  noPreference?: boolean;
};

const DEFAULT_ERROR = 'Please complete the required booking details.';

function normalizePrice(price?: string) {
  if (!price) return 'Consultation required';
  return price.replace(/^From\b/, 'from');
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function BookingForm({ serviceGroups }: BookingFormProps) {
  const t = useTranslations('bookingPage');
  const tCommon = useTranslations('common');
  const csrfToken = useClientCsrfToken();
  const {
    draft: formData,
    bookedSlots,
    lastSaved,
    updateField,
    setBookedSlots,
    setLoadingSlots,
    completeBooking,
    clearDraft,
  } = useBookingStore();

  const [stage, setStage] = useState<BookingStage>('services');
  const [serviceSearch, setServiceSearch] = useState('');
  const [staffSearch, setStaffSearch] = useState('');
  const [openGroupId, setOpenGroupId] = useState(serviceGroups[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allServices = useMemo(
    () => serviceGroups.flatMap((group) => group.services.map((service) => ({ ...service, groupTitle: group.title }))),
    [serviceGroups],
  );

  const selectedService =
    allServices.find((service) => service.bookingType === selectedServiceId) ||
    allServices.find((service) => service.title === formData.service) ||
    null;

  const staffOptions = useMemo<StaffOption[]>(
    () => [
      {
        id: 'no-preference',
        name: 'No preference',
        role: 'First available Silk Beauty specialist',
        noPreference: true,
      },
      ...siteConfig.team.map((member) => ({
        id: member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        name: member.name,
        role: member.role,
        image: member.image,
      })),
    ],
    [],
  );

  const selectedStaff =
    staffOptions.find((staff) => staff.id === selectedStaffId) || staffOptions[0];

  const filteredGroups = useMemo(() => {
    const query = serviceSearch.trim().toLowerCase();
    if (!query) return serviceGroups;

    return serviceGroups
      .map((group) => ({
        ...group,
        services: group.services.filter((service) => {
          const haystack = `${group.title} ${service.title} ${service.description}`.toLowerCase();
          return haystack.includes(query);
        }),
      }))
      .filter((group) => group.services.length > 0);
  }, [serviceGroups, serviceSearch]);

  const filteredStaff = useMemo(() => {
    const query = staffSearch.trim().toLowerCase();
    if (!query) return staffOptions;

    return staffOptions.filter((staff) =>
      `${staff.name} ${staff.role}`.toLowerCase().includes(query),
    );
  }, [staffOptions, staffSearch]);

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
      const slotStart = startHour + index;
      const slotEnd = slotStart + 1;
      const hour = `${slotStart}`.padStart(2, '0');
      const nextHour = `${slotEnd}`.padStart(2, '0');
      return {
        value: `${hour}:00`,
        label: `${hour}:00 - ${nextHour}:00`,
        startHour: slotStart,
      };
    });
  };

  const formatDateValue = (date: Date) => format(date, 'yyyy-MM-dd');

  const selectedDate = useMemo(() => {
    if (!formData.preferredDate) return undefined;
    const restoredDate = new Date(`${formData.preferredDate}T00:00:00`);
    return Number.isNaN(restoredDate.getTime()) ? undefined : restoredDate;
  }, [formData.preferredDate]);

  const timeSlots = buildTimeSlots(selectedDate);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const dateStr = formatDateValue(selectedDate);
    const controller = new AbortController();
    setLoadingSlots(true);

    fetch(`/api/bookings?date=${dateStr}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { bookedSlots?: string[] }) => {
        const nextBookedSlots = data.bookedSlots || [];
        setBookedSlots(nextBookedSlots);
        if (
          formData.preferredTime &&
          nextBookedSlots.some((slot) => slot.startsWith(formData.preferredTime))
        ) {
          updateField('preferredTime', '');
        }
      })
      .catch((err) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        console.error('Error fetching slots:', err);
      })
      .finally(() => {
        setLoadingSlots(false);
      });

    return () => controller.abort();
  }, [formData.preferredTime, selectedDate, setBookedSlots, setLoadingSlots, updateField]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    updateField(field, value);
  };

  const handleServiceSelect = (service: BookingService) => {
    setSelectedServiceId(service.bookingType);
    setError(null);
    handleChange('service', service.title);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setBookedSlots([]);
    handleChange('preferredDate', date ? formatDateValue(date) : '');
    const nextSlots = buildTimeSlots(date);
    if (!nextSlots.some((slot) => slot.value === formData.preferredTime)) {
      handleChange('preferredTime', '');
    }
  };

  const scrollBookingIntoView = () => {
    window.requestAnimationFrame(() => {
      document.getElementById('booking-embed')?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    });
  };

  const goToStaff = () => {
    if (!selectedService) {
      setError('Choose a service before selecting staff.');
      return;
    }

    setError(null);
    setStage('staff');
    scrollBookingIntoView();
  };

  const goToDateTime = (staffId: string) => {
    setSelectedStaffId(staffId);
    setError(null);
    setStage('datetime');
    scrollBookingIntoView();
  };

  const formatDateLabel = (date: Date) => format(date, 'EEEE, MMMM d, yyyy');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!selectedService || !formData.preferredDate || !formData.preferredTime) {
      setError(DEFAULT_ERROR);
      return;
    }

    setIsSubmitting(true);

    try {
      const startHour = formData.preferredTime;
      const endHour = `${Number.parseInt(startHour, 10) + 1}:00`.padStart(5, '0');
      const timeSlot = `${startHour} - ${endHour}`;
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 30000);
      const staffLine = `Staff preference: ${selectedStaff.name}`;
      const message = [staffLine, formData.message.trim()].filter(Boolean).join('\n\n');

      let response: Response;
      try {
        response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken || '',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: selectedService.title,
            date: formData.preferredDate,
            timeSlot,
            message,
          }),
          signal: controller.signal,
        });
      } finally {
        window.clearTimeout(timeoutId);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking request');
      }

      completeBooking(typeof data.id === 'string' ? data.id : undefined);
      setIsSuccess(true);
      setBookedSlots([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    clearDraft();
    setSelectedServiceId('');
    setSelectedStaffId('');
    setDetailsOpen(false);
    setStage('services');
    setIsSuccess(false);
    setError(null);
  };

  const summaryPrice = normalizePrice(selectedService?.price);

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-[1040px] overflow-hidden rounded-md bg-white shadow-[0_10px_30px_rgba(27,31,35,0.08)]">
        <PortalHeader />
        <div className="px-5 py-16 text-center md:px-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f5f7]">
            <CheckCircle className="h-8 w-8 text-[#1b1f23]" />
          </div>
          <h1 className="mb-4 text-3xl font-semibold text-[#1b1f23]">
            {bookingText(t, 'successTitle', bookingCopy.successTitle)}
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-[#546176]">
            {bookingText(t, 'successMessage', bookingCopy.successMessage)}
          </p>
          <Button
            type="button"
            onClick={resetBooking}
            className="h-12 rounded-md bg-[#17191b] px-8 text-sm font-semibold text-white hover:bg-[#2a2d30]"
          >
            {bookingText(t, 'bookAnother', bookingCopy.bookAnother)}
          </Button>
        </div>
        <PortalFooter />
      </div>
    );
  }

  return (
    <div
      id="booking-embed"
      className="mx-auto max-w-[1040px] overflow-hidden rounded-md bg-white shadow-[0_10px_30px_rgba(27,31,35,0.08)]"
    >
      <PortalHeader />

      {error ? (
        <div className="mx-5 mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 md:mx-8">
          {error}
        </div>
      ) : null}

      {stage === 'services' ? (
        <ServicesStage
          filteredGroups={filteredGroups}
          openGroupId={openGroupId}
          serviceSearch={serviceSearch}
          selectedService={selectedService}
          detailsOpen={detailsOpen}
          summaryPrice={summaryPrice}
          onSearch={setServiceSearch}
          onOpenGroup={setOpenGroupId}
          onServiceSelect={handleServiceSelect}
          onToggleDetails={() => setDetailsOpen((value) => !value)}
          onBook={goToStaff}
        />
      ) : null}

      {stage === 'staff' ? (
        <StaffStage
          staff={filteredStaff}
          staffSearch={staffSearch}
          selectedService={selectedService}
          summaryPrice={summaryPrice}
          onBack={() => setStage('services')}
          onSearch={setStaffSearch}
          onSelectStaff={goToDateTime}
        />
      ) : null}

      {stage === 'datetime' ? (
        <DateTimeStage
          csrfReady={Boolean(csrfToken)}
          bookedSlots={bookedSlots}
          formData={formData}
          isSubmitting={isSubmitting}
          lastSaved={lastSaved}
          selectedDate={selectedDate}
          selectedService={selectedService}
          selectedStaff={selectedStaff}
          timeSlots={timeSlots}
          t={t}
          tCommon={tCommon}
          onBack={() => setStage('staff')}
          onChange={handleChange}
          onDateSelect={handleDateSelect}
          onSubmit={handleSubmit}
          formatDateLabel={formatDateLabel}
        />
      ) : null}

      <PortalFooter />
    </div>
  );
}

function PortalHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-[#e1e5ea] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
      <Link href="/" className="text-2xl font-semibold tracking-normal text-[#06080a]">
        Silk Beauty Salon
      </Link>
      <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-[#20262d]">
        <Link href="/about" className="hover:text-[#8d6f58]">
          About us
        </Link>
        <Link href="/contact-us" className="hover:text-[#8d6f58]">
          Contact
        </Link>
        <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-[#8d6f58]">
          {siteConfig.contact.phone}
        </a>
      </nav>
    </header>
  );
}

function PortalFooter() {
  return (
    <footer className="flex flex-col gap-3 bg-[#dfe4ea] px-5 py-5 text-xs font-medium text-[#354254] md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Link href="/terms-conditions" className="hover:text-[#17191b]">
          Terms and Conditions
        </Link>
        <span>|</span>
        <Link href="/privacy-policy" className="hover:text-[#17191b]">
          Privacy Policy
        </Link>
      </div>
      <span>{siteConfig.contact.address}, {siteConfig.contact.city}</span>
    </footer>
  );
}

function SegmentTabs({
  active,
  onServices,
  onStaff,
}: {
  active: 'services' | 'staff';
  onServices: () => void;
  onStaff: () => void;
}) {
  return (
    <div className="rounded-full border border-[#b9c0ca] bg-white p-0.5">
      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={onServices}
          className={`h-11 rounded-full text-sm font-semibold transition-colors ${
            active === 'services' ? 'bg-[#17191b] text-white' : 'text-[#2b313a] hover:bg-[#f3f5f7]'
          }`}
        >
          Services
        </button>
        <button
          type="button"
          onClick={onStaff}
          className={`h-11 rounded-full text-sm font-semibold transition-colors ${
            active === 'staff' ? 'bg-[#17191b] text-white' : 'text-[#2b313a] hover:bg-[#f3f5f7]'
          }`}
        >
          Staff
        </button>
      </div>
    </div>
  );
}

function ServicesStage({
  filteredGroups,
  openGroupId,
  serviceSearch,
  selectedService,
  detailsOpen,
  summaryPrice,
  onSearch,
  onOpenGroup,
  onServiceSelect,
  onToggleDetails,
  onBook,
}: {
  filteredGroups: BookingServiceGroup[];
  openGroupId: string;
  serviceSearch: string;
  selectedService: (BookingService & { groupTitle: string }) | null;
  detailsOpen: boolean;
  summaryPrice: string;
  onSearch: (value: string) => void;
  onOpenGroup: (value: string) => void;
  onServiceSelect: (service: BookingService) => void;
  onToggleDetails: () => void;
  onBook: () => void;
}) {
  return (
    <main className="bg-[#f3f5f7] px-4 py-5 md:px-8 md:py-7">
      <div className="mb-5 bg-white p-3 shadow-[0_3px_10px_rgba(27,31,35,0.06)]">
        <SegmentTabs active="services" onServices={() => undefined} onStaff={onBook} />
      </div>

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-[#667893]" />
        <Input
          value={serviceSearch}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search for service"
          className="h-14 rounded-md border-[#d5dbe4] bg-white pl-16 text-base text-[#20262d] shadow-none placeholder:text-[#c4ccd8] focus-visible:ring-[#17191b]/20 dark:bg-white dark:text-[#20262d] dark:placeholder:text-[#c4ccd8]"
        />
      </div>

      <div className="overflow-hidden border border-[#dfe4eb] bg-white">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => {
            const isOpen = group.id === openGroupId || serviceSearch.trim().length > 0;
            return (
              <div key={group.id} className="border-b border-[#dfe4eb] last:border-b-0">
                <button
                  type="button"
                  onClick={() => onOpenGroup(isOpen ? '' : group.id)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-4 text-left text-base font-semibold text-[#2b313a] transition-colors hover:bg-[#f8fafc]"
                >
                  <span>{group.title}</span>
                  <span className="flex items-center gap-3 text-sm text-[#6a7484]">
                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-[#aeb7c4] px-1.5 text-xs">
                      {group.services.length}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>

                {isOpen ? (
                  <div className="border-t border-[#edf0f4] bg-[#fbfcfd]">
                    {group.services.map((service) => {
                      const isSelected = selectedService?.bookingType === service.bookingType;
                      return (
                        <button
                          type="button"
                          key={service.bookingType}
                          onClick={() => onServiceSelect(service)}
                          className={`grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-[#edf0f4] px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-white ${
                            isSelected ? 'bg-white ring-1 ring-inset ring-[#17191b]' : ''
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block text-base font-semibold text-[#20262d]">
                              {service.title}
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-[#5f6d7e]">
                              {service.duration}
                            </span>
                          </span>
                          <span className="flex items-center gap-3 text-right text-sm text-[#526176]">
                            <span className="hidden sm:inline">{normalizePrice(service.price)}</span>
                            <ChevronRight className="h-5 w-5" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="px-4 py-10 text-center text-sm text-[#657386]">No services found.</div>
        )}
      </div>

      {selectedService ? (
        <div className="sticky bottom-4 z-20 mt-6 rounded-md border border-[#aeb7c4] bg-white p-4 shadow-[0_12px_30px_rgba(27,31,35,0.18)]">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-[#20262d]">1 service selected</p>
              <p className="text-sm text-[#657386]">{summaryPrice}</p>
            </div>
            <button
              type="button"
              onClick={onToggleDetails}
              className="flex items-center gap-1 text-sm font-semibold text-[#00789a]"
            >
              Details
              <ChevronDown className={`h-4 w-4 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {detailsOpen ? (
            <div className="mb-4 rounded-md border border-[#e0e5ec] bg-[#f8fafc] p-3 text-sm leading-6 text-[#4f5c6d]">
              <p className="font-semibold text-[#20262d]">{selectedService.title}</p>
              <p>{selectedService.description}</p>
              <p className="mt-2 text-[#657386]">{selectedService.duration}</p>
            </div>
          ) : null}

          <Button
            type="button"
            onClick={onBook}
            className="h-12 w-full rounded-md bg-[#17191b] text-base font-semibold text-white hover:bg-[#2a2d30]"
          >
            Book
          </Button>
        </div>
      ) : null}
    </main>
  );
}

function StaffStage({
  staff,
  staffSearch,
  selectedService,
  summaryPrice,
  onBack,
  onSearch,
  onSelectStaff,
}: {
  staff: StaffOption[];
  staffSearch: string;
  selectedService: (BookingService & { groupTitle: string }) | null;
  summaryPrice: string;
  onBack: () => void;
  onSearch: (value: string) => void;
  onSelectStaff: (staffId: string) => void;
}) {
  return (
    <main className="bg-[#f3f5f7] px-4 py-5 md:px-8 md:py-7">
      <div className="mb-5 bg-white px-4 py-3 shadow-[0_3px_10px_rgba(27,31,35,0.06)]">
        <div className="grid grid-cols-[44px_1fr_44px] items-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to services"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#20262d] hover:bg-[#f3f5f7]"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-center text-xl font-semibold text-[#20262d]">Select Staff</h1>
          <span aria-hidden />
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-7 w-7 -translate-y-1/2 text-[#667893]" />
        <Input
          value={staffSearch}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search for staff member"
          className="h-16 rounded-md border-[#d5dbe4] bg-white pl-16 text-base text-[#20262d] shadow-none placeholder:text-[#c4ccd8] focus-visible:ring-[#17191b]/20 dark:bg-white dark:text-[#20262d] dark:placeholder:text-[#c4ccd8]"
        />
      </div>

      <div className="space-y-3">
        {staff.map((member) => (
          <button
            type="button"
            key={member.id}
            onClick={() => onSelectStaff(member.id)}
            className="grid min-h-20 w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md bg-white px-5 py-4 text-left shadow-[0_3px_10px_rgba(27,31,35,0.12)] transition-transform hover:-translate-y-0.5"
          >
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#eef2f6] text-sm font-semibold text-[#4b5868]">
              {member.noPreference ? (
                <Users className="h-6 w-6" />
              ) : member.image ? (
                <Image
                  src={member.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                initials(member.name)
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-semibold text-[#20262d]">{member.name}</span>
              <span className="block truncate text-sm text-[#526176]">{member.role}</span>
            </span>
            <span className="flex items-center gap-3 text-right text-sm text-[#526176]">
              <span className="hidden sm:inline">{selectedService ? summaryPrice : 'from GEL 50'}</span>
              <ChevronRight className="h-5 w-5" />
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}

function DateTimeStage({
  csrfReady,
  bookedSlots,
  formData,
  isSubmitting,
  lastSaved,
  selectedDate,
  selectedService,
  selectedStaff,
  timeSlots,
  t,
  tCommon,
  onBack,
  onChange,
  onDateSelect,
  onSubmit,
  formatDateLabel,
}: {
  csrfReady: boolean;
  bookedSlots: string[];
  formData: ReturnType<typeof useBookingStore.getState>['draft'];
  isSubmitting: boolean;
  lastSaved: string | undefined;
  selectedDate: Date | undefined;
  selectedService: (BookingService & { groupTitle: string }) | null;
  selectedStaff: StaffOption;
  timeSlots: Array<{ value: string; label: string; startHour: number }>;
  t: ReturnType<typeof useTranslations>;
  tCommon: ReturnType<typeof useTranslations>;
  onBack: () => void;
  onChange: (field: keyof ReturnType<typeof useBookingStore.getState>['draft'], value: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formatDateLabel: (date: Date) => string;
}) {
  return (
    <main className="bg-[#f3f5f7] px-4 py-5 md:px-8 md:py-7">
      <div className="mb-5 bg-white px-4 py-3 shadow-[0_3px_10px_rgba(27,31,35,0.06)]">
        <div className="grid grid-cols-[44px_1fr_44px] items-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to staff"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#20262d] hover:bg-[#f3f5f7]"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-center text-xl font-semibold text-[#20262d]">Select Date & Time</h1>
          <span aria-hidden />
        </div>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#657386]">Service</p>
          <p className="mt-1 text-base font-semibold text-[#20262d]">{selectedService?.title}</p>
          <p className="text-sm text-[#657386]">{selectedService?.duration}</p>
        </div>
        <div className="rounded-md bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#657386]">Staff</p>
          <p className="mt-1 text-base font-semibold text-[#20262d]">{selectedStaff.name}</p>
          <p className="text-sm text-[#657386]">{selectedStaff.role}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
          <div className="space-y-3 rounded-md bg-white p-4">
            <Label className="flex items-center gap-2 text-sm font-semibold text-[#20262d]">
              <Calendar className="h-4 w-4 text-[#657386]" />
              {bookingText(t, 'preferredDate', bookingCopy.preferredDate)}
            </Label>
            <div className="aspect-square w-full max-w-[420px] rounded-md border border-[#e1e5ea] bg-white p-2">
              <DatePicker
                mode="single"
                selected={selectedDate}
                onSelect={onDateSelect}
                disabled={(date) => isBefore(date, new Date()) && !isToday(date)}
                classNames={{
                  selected:
                    'bg-[#17191b] text-white hover:bg-[#17191b] hover:text-white focus:bg-[#17191b] focus:text-white',
                  today: 'bg-[#eef2f6] text-[#17191b]',
                }}
                className="w-full"
              />
            </div>
            <input type="hidden" name="preferredDate" value={formData.preferredDate} />
            <p className="text-sm text-[#657386]">
              {selectedDate
                ? formatDateLabel(selectedDate)
                : bookingText(t, 'selectDateTime', bookingCopy.selectDateTime)}
            </p>
          </div>

          <div className="space-y-3 rounded-md bg-white p-4">
            <Label className="flex items-center gap-2 text-sm font-semibold text-[#20262d]">
              <Clock className="h-4 w-4 text-[#657386]" />
              {bookingText(t, 'preferredTime', bookingCopy.preferredTime)}
            </Label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {timeSlots.map((slot) => {
                const isSelected = formData.preferredTime === slot.value;
                const isBooked = bookedSlots.some((bookedSlot) => bookedSlot.startsWith(slot.value));
                const isPastToday = selectedDate ? isToday(selectedDate) && slot.startHour <= new Date().getHours() : false;
                const disabled = isBooked || isPastToday;
                return (
                  <button
                    key={slot.value}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange('preferredTime', slot.value)}
                    className={`inline-flex h-12 w-full min-w-0 items-center justify-center rounded-md border px-2 text-sm font-semibold transition-colors ${
                      isSelected
                        ? 'border-[#17191b] bg-[#17191b] text-white'
                        : disabled
                          ? 'cursor-not-allowed border-[#d8dee8] bg-[#eef2f6] text-[#8b96a6] line-through opacity-60'
                          : 'border-[#d8dee8] bg-white text-[#20262d] hover:bg-[#f3f5f7]'
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="preferredTime" value={formData.preferredTime} />
          </div>
        </div>

        <div className="rounded-md bg-white p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-[#20262d]">
                <User className="h-4 w-4 text-[#657386]" />
                {bookingText(t, 'fullName', bookingCopy.fullName)}
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(event) => onChange('name', event.target.value)}
                required
                minLength={2}
                className="h-12 rounded-md border-[#d5dbe4] bg-white text-[#20262d] dark:bg-white dark:text-[#20262d]"
                placeholder={bookingText(t, 'namePlaceholder', bookingCopy.namePlaceholder)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-[#20262d]">
                <Phone className="h-4 w-4 text-[#657386]" />
                {bookingText(t, 'phoneNumber', bookingCopy.phoneNumber)}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => onChange('phone', event.target.value)}
                required
                minLength={5}
                className="h-12 rounded-md border-[#d5dbe4] bg-white text-[#20262d] dark:bg-white dark:text-[#20262d]"
                placeholder={bookingText(t, 'phonePlaceholder', bookingCopy.phonePlaceholder)}
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-[#20262d]">
              <Mail className="h-4 w-4 text-[#657386]" />
              {bookingText(t, 'emailAddress', bookingCopy.emailAddress)}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) => onChange('email', event.target.value)}
              required
              className="h-12 rounded-md border-[#d5dbe4] bg-white text-[#20262d] dark:bg-white dark:text-[#20262d]"
              placeholder={bookingText(t, 'emailPlaceholder', bookingCopy.emailPlaceholder)}
            />
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-[#20262d]">
              <MessageSquare className="h-4 w-4 text-[#657386]" />
              {bookingText(t, 'additionalNotes', bookingCopy.additionalNotes)}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(event) => onChange('message', event.target.value)}
              rows={4}
              className="resize-none rounded-md border-[#d5dbe4] bg-white text-[#20262d] dark:bg-white dark:text-[#20262d]"
              placeholder={bookingText(t, 'notesPlaceholder', bookingCopy.notesPlaceholder)}
            />
          </div>
        </div>

        {lastSaved && !isSubmitting ? (
          <p className="text-xs text-[#657386]">
            Draft saved {format(new Date(lastSaved), 'MMM d, HH:mm')}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            !csrfReady ||
            !selectedService ||
            !formData.preferredDate ||
            !formData.preferredTime
          }
          className="h-13 w-full rounded-md bg-[#17191b] text-base font-semibold text-white hover:bg-[#2a2d30] disabled:opacity-50"
        >
          {isSubmitting
            ? tCommon.has('submitting') ? tCommon('submitting') : bookingCopy.submitting
            : bookingText(t, 'requestBooking', bookingCopy.requestBooking)}
        </Button>
      </form>
    </main>
  );
}
