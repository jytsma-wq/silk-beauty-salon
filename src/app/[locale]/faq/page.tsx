import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tSite = await getTranslations({ locale, namespace: 'siteConfig' });

  const faqKeys = ['consultation', 'pain', 'results', 'downtime', 'booking', 'virtual', 'brands', 'qualified'];

  return (
    <>
      <section className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="container-custom py-16 md:py-20">
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{t('breadcrumb')}</span>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
              Support
            </p>
            <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.4vw,5.4rem)] font-light leading-[1.02] text-[#241f1b]">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqKeys.map((key, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left hover:text-[#8d6f58]">
                    {tSite(`faqs.${key}Question`)}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    {tSite(`faqs.${key}Answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 border-t border-[#e8e4df] py-12 text-center">
              <h2 className="mb-4 font-sans text-xl font-light text-[#241f1b] md:text-2xl">
                {t('stillHaveQuestions')}
              </h2>
              <p className="mb-6 text-muted-foreground">{t('cantFindAnswer')}</p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild className="btn-gold">
                  <Link href="/book">{t('bookConsultation')}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact-us">{t('contactUs')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
