type TranslationFunction = {
  (key: string): string;
  has(key: string): boolean;
};

export const bookingCopy = {
  metadata: {
    title: 'Book an Appointment | Silk Beauty Salon',
    description: 'Request a consultation at Silk Beauty Salon and choose a preferred date and time.',
  },
  personalInfo: 'Personalized appointment',
  title: 'Book an appointment',
  subtitle: 'Choose the consultation that fits your goals, then request a preferred date and time.',
  salonInterior: 'Silk Beauty Salon treatment room',
  selectDateTime: 'Select Date & Time',
  consultationTypes: 'Consultation Types',
  needHelp: 'Need help?',
  phone: 'Phone',
  email: 'Email',
  address: 'Address',
  consultations: {
    facial: {
      title: 'Facial Consultation',
      duration: '60 minutes',
      description: 'A detailed skin review and facial treatment recommendation.',
    },
    skin: {
      title: 'Skin Consultation',
      duration: '60 minutes',
      description: 'Personalized guidance for acne, pigmentation, sensitivity, and texture.',
    },
    body: {
      title: 'Body Treatment Consultation',
      duration: '45 minutes',
      description: 'Plan body care, sculpting, or targeted treatment options.',
    },
    virtual: {
      title: 'Virtual Consultation',
      duration: '30 minutes',
      description: 'Remote advice for skincare planning before an in-salon visit.',
    },
  },
  whatToExpect: {
    title: 'What to Expect',
    step1: 'Share your goals and current routine.',
    step2: 'Review treatment options with a specialist.',
    step3: 'Receive a tailored recommendation.',
    step4: 'Confirm the best appointment plan.',
  },
  faq: {
    title: 'Booking FAQ',
    q1: 'How quickly will my appointment be confirmed?',
    a1: 'Our team will contact you within 24 hours to confirm availability.',
    q2: 'Can I change my requested time?',
    a2: 'Yes. Reply to our confirmation message or call the salon and we will help reschedule.',
    q3: 'Do I need to pay online?',
    a3: 'No. This form sends a request; payment is handled after confirmation.',
    q4: 'Can international clients book a consultation?',
    a4: 'Yes. We welcome international clients and can help coordinate visit details.',
  },
  successTitle: 'Booking Request Submitted',
  successMessage: 'Thank you for your booking request. We will contact you shortly to confirm your appointment.',
  bookAnother: 'Book Another Appointment',
  selectService: 'Select Service',
  selectServicePlaceholder: 'Choose a consultation type',
  fullName: 'Full Name',
  namePlaceholder: 'Enter your full name',
  phoneNumber: 'Phone Number',
  phonePlaceholder: '+995 599 123 456',
  emailAddress: 'Email Address',
  emailPlaceholder: 'your@email.com',
  preferredDate: 'Preferred Date',
  preferredTime: 'Preferred Time',
  booked: 'Booked',
  selectTime: 'Select time',
  additionalNotes: 'Additional Notes',
  notesPlaceholder: 'Any specific requirements or questions...',
  requestBooking: 'Request Booking',
  bookingNote: 'We will contact you to confirm your appointment within 24 hours.',
  submitting: 'Submitting...',
} as const;

export function bookingText(t: TranslationFunction, key: string, fallback: string) {
  return t.has(key) ? t(key) : fallback;
}
