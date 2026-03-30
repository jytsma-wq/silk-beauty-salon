import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Cinzel } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadataBase = new URL('https://silkbeautybatumi.ge');

export const metadata: Metadata = {
  metadataBase,
  title: {
    template: '%s | Silk Beauty Salon',
    default: 'Silk Beauty Salon | World-class Aesthetic Medicine, Lash Extensions, Hair & Nail Design in Batumi, Georgia',
  },
  description:
    'World-class aesthetic medicine, lash extensions, hair, and nail design in Batumi, Georgia. Silk Beauty Salon offers premium beauty services by certified international specialists.',
  keywords: [
    'beauty salon Batumi',
    'aesthetic clinic Batumi',
    'lip fillers Batumi',
    'botox Batumi',
    'dermal fillers Georgia',
    'Russian volume lashes Batumi',
    'microblading Batumi',
    'aesthetic medicine Georgia',
    'HydraFacial Batumi',
    'nail salon Batumi',
    'hair salon Batumi',
    'medical spa Batumi',
    'anti-aging treatments Georgia',
    'beauty tourism Batumi',
  ],
  authors: [{ name: 'Silk Beauty Salon' }],
  creator: 'Silk Beauty Salon',
  publisher: 'Silk Beauty Salon',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://silkbeautybatumi.ge',
    siteName: 'Silk Beauty Salon',
    title: 'Silk Beauty Salon | World-class Aesthetic Medicine in Batumi',
    description: 'World-class aesthetic medicine, lash extensions, hair, and nail design in Batumi, Georgia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silk Beauty Salon - World-class Aesthetic Medicine in Batumi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silk Beauty Salon | World-class Aesthetic Medicine in Batumi',
    description: 'World-class aesthetic medicine, lash extensions, hair, and nail design in Batumi, Georgia.',
    images: ['/og-image.jpg'],
    creator: '@silkbeautybatumi',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ka-GE': '/ka',
      'ru-RU': '/ru',
      'he-IL': '/he',
      'ar-SA': '/ar',
      'tr-TR': '/tr',
      'x-default': '/en',
    },
  },
  category: 'beauty_salon',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0a08' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${cormorant.variable} ${dmSans.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[#0d0a08] text-stone-400 font-sans">
        {children}
      </body>
    </html>
  );
}
