import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MariamChatbot from '@/components/interactive/MariamChatbot';
import WhatsAppButton from '@/components/interactive/WhatsAppButton';
import CookieConsent from '@/components/shared/CookieConsent';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  // next-intl v3 infers locale from the request context via i18n/request.ts
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        
        {/* Floating Chatbots - Appear on every page */}
        <MariamChatbot locale={locale} />
        <WhatsAppButton locale={locale} />

        {/* Cookie Consent Banner */}
        <CookieConsent locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
