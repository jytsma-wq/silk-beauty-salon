import { siteConfig } from '@/data/site-config';

export interface ChatbotReply {
  reply: string;
  quickReplies: string[];
  links: Array<{
    label: string;
    href: string;
  }>;
}

const DEFAULT_QUICK_REPLIES = [
  'Book an appointment',
  'View prices',
  'Opening hours',
  'Where are you located?',
];

function normalize(input: string): string {
  return input.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function businessHoursSummary(): string {
  return [
    `Monday to Friday: ${siteConfig.businessHours.monday}`,
    `Saturday: ${siteConfig.businessHours.saturday}`,
    `Sunday: ${siteConfig.businessHours.sunday}`,
  ].join('. ');
}

export function createChatbotReply(message: string): ChatbotReply {
  const text = normalize(message);

  if (!text) {
    return {
      reply: 'Please type your question and I will help with bookings, treatments, pricing, opening hours, or directions.',
      quickReplies: DEFAULT_QUICK_REPLIES,
      links: [],
    };
  }

  if (hasAny(text, ['book', 'appointment', 'reserve', 'schedule', 'consultation', 'visit'])) {
    return {
      reply: 'You can book directly through our internal booking system. Choose a consultation type, date, and available time slot; our team will confirm your appointment.',
      quickReplies: ['Opening hours', 'View prices', 'Contact the salon'],
      links: [{ label: 'Open booking page', href: '/book' }],
    };
  }

  if (hasAny(text, ['price', 'prices', 'pricing', 'cost', 'costs', 'gel', 'lari'])) {
    return {
      reply: 'Treatment prices depend on the service, product, and treatment area. The price list page has the current starting prices, and the team can confirm a final quote after consultation.',
      quickReplies: ['Book a consultation', 'Treatment options', 'Contact the salon'],
      links: [{ label: 'View price list', href: '/pricelist' }],
    };
  }

  if (hasAny(text, ['hour', 'hours', 'open', 'closed', 'closing', 'today', 'tomorrow'])) {
    return {
      reply: `Our opening hours are: ${businessHoursSummary()}.`,
      quickReplies: ['Book an appointment', 'Where are you located?', 'Contact the salon'],
      links: [{ label: 'Book a time', href: '/book' }],
    };
  }

  if (hasAny(text, ['where', 'location', 'address', 'directions', 'map', 'batumi'])) {
    return {
      reply: `Silk Beauty Salon is at ${siteConfig.contact.address}, ${siteConfig.contact.city}, ${siteConfig.contact.country}. You can call ${siteConfig.contact.phone} or email ${siteConfig.contact.email}.`,
      quickReplies: ['Opening hours', 'Book an appointment', 'International clients'],
      links: [{ label: 'Contact page', href: '/contact-us' }],
    };
  }

  if (hasAny(text, ['treatment', 'treatments', 'botox', 'filler', 'fillers', 'skin', 'facial', 'laser', 'peel', 'biostimulator'])) {
    return {
      reply: 'We can help with aesthetic consultations, anti-wrinkle treatments, dermal fillers, skin boosters, facials, body treatments, and skin concerns. A consultation is the best way to match treatment to your goals.',
      quickReplies: ['Book a consultation', 'View prices', 'Skin concerns'],
      links: [
        { label: 'Explore treatments', href: '/treatments' },
        { label: 'Skin conditions', href: '/conditions' },
      ],
    };
  }

  if (hasAny(text, ['app', 'android', 'apk', 'download'])) {
    return {
      reply: 'The Android app is available from our website download page. Download the APK on your Android phone and follow the installation instructions on that page.',
      quickReplies: ['Book an appointment', 'Contact the salon', 'Opening hours'],
      links: [{ label: 'Download Android app', href: '/download' }],
    };
  }

  if (hasAny(text, ['human', 'person', 'call', 'phone', 'email', 'contact', 'help'])) {
    return {
      reply: `You can reach the salon at ${siteConfig.contact.phone} or ${siteConfig.contact.email}. For appointments, the booking page is the fastest route.`,
      quickReplies: ['Book an appointment', 'Opening hours', 'Where are you located?'],
      links: [
        { label: 'Contact page', href: '/contact-us' },
        { label: 'Book online', href: '/book' },
      ],
    };
  }

  return {
    reply: 'I can help with bookings, treatments, prices, opening hours, directions, and the Android app. For medical advice or urgent treatment questions, please contact the salon team directly.',
    quickReplies: DEFAULT_QUICK_REPLIES,
    links: [
      { label: 'Book online', href: '/book' },
      { label: 'Contact page', href: '/contact-us' },
    ],
  };
}
