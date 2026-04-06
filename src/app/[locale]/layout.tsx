import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ConsentProvider } from "@/components/providers/ConsentProvider";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
  variable: "--font-display",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Premier Beauty Salon in Batumi | Silk Beauty Salon",
  description: "Batumi's premier beauty salon on Zurab Gorgiladze Street.",
  keywords: ["beauty salon", "botox", "dermal fillers", "laser treatments", "skin treatments", "Batumi", "Georgia", "cosmetic clinic"],
  authors: [{ name: "Silk Beauty Salon" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure valid locale
  const validLocale = (routing.locales as readonly string[]).includes(locale) ? locale : routing.defaultLocale;
  
  setRequestLocale(validLocale);
  
  const messages = await getMessages();

  // Check if RTL language
  const rtlLocales = ['ar', 'he'];
  const isRtl = rtlLocales.includes(validLocale);

  return (
    <html lang={validLocale} suppressHydrationWarning className="scroll-smooth" dir={isRtl ? 'rtl' : 'ltr'}>
      <body
        className={`${display.variable} ${body.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-body), sans-serif" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ConsentProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <main>{children}</main>
              <Footer />
              <WhatsAppWidget />
              <Toaster />
            </NextIntlClientProvider>
          </ConsentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
