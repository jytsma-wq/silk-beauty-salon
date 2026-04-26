import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'FAQ | Silk Beauty Salon',
  description: 'Find answers to frequently asked questions about our treatments, booking, and clinic.',
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tSite = await getTranslations({ locale, namespace: 'siteConfig' });
  
  const faqKeys = [
    'consultation',
    'pain',
    'results',
    'downtime',
    'booking',
    'virtual',
    'brands',
    'qualified'
  ];
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1c1c1c] py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
                      >
            {t('title')}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">{t('breadcrumb')}</span>
          </nav>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqKeys.map((key, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-left py-6 hover:text-gold">
                    {tSite(`faqs.${key}Question`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {tSite(`faqs.${key}Answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Additional Questions */}
            <div className="mt-12 border-t border-[#e8e4df] py-12 text-center">
              <h2 
                className="text-xl font-serif font-semibold text-primary mb-4"
                              >
                {t('stillHaveQuestions')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('cantFindAnswer')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-gold">
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    {t('bookConsultation')}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact-us">
                    {t('contactUs')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
