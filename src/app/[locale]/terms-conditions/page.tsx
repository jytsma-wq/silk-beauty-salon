import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsConditions' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export default async function TermsConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'termsConditions' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

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
              Legal information
            </p>
            <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.4vw,5.4rem)] font-light leading-[1.02] text-[#241f1b]">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl border-t border-[#e8e4df] pt-10">
            <div className="prose prose-slate max-w-none">
              <p className="mb-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-stone-500">
                {t('lastUpdated')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('acceptanceTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('acceptanceText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('servicesTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('servicesText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('bookingTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('bookingIntro')}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-8 text-stone-700 marker:text-[#8d6f58]">
                <li>{t('bookingItem1')}</li>
                <li>{t('bookingItem2')}</li>
                <li>{t('bookingItem3')}</li>
                <li>{t('bookingItem4')}</li>
              </ul>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('cancellationTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('cancellationText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('paymentTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('paymentIntro')}
              </p>
              <ul className="mb-6 list-disc space-y-2 pl-5 text-base leading-8 text-stone-700 marker:text-[#8d6f58]">
                <li>{t('paymentItem1')}</li>
                <li>{t('paymentItem2')}</li>
                <li>{t('paymentItem3')}</li>
                <li>{t('paymentItem4')}</li>
              </ul>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('refundTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('refundText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('medicalTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('medicalText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('intellectualTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('intellectualText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('liabilityTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('liabilityText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('governingTitle')}
              </h2>
              <p className="mb-6 text-base leading-8 text-stone-700">
                {t('governingText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('changesTitle')}
              </h2>
              <p className="mb-4 text-base leading-8 text-stone-700">
                {t('changesText')}
              </p>

              <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                {t('contactTitle')}
              </h2>
              <p className="text-base leading-8 text-stone-700">
                {t('contactText')} info@silkbeautysalon.online
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
