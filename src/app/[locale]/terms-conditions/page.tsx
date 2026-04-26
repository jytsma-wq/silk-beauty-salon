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

      {/* Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-slate max-w-none">
              <p className="text-sm text-muted-foreground mb-8">
                {t('lastUpdated')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('acceptanceTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('acceptanceText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('servicesTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('servicesText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('bookingTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('bookingIntro')}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>{t('bookingItem1')}</li>
                <li>{t('bookingItem2')}</li>
                <li>{t('bookingItem3')}</li>
                <li>{t('bookingItem4')}</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('cancellationTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('cancellationText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('paymentTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('paymentIntro')}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>{t('paymentItem1')}</li>
                <li>{t('paymentItem2')}</li>
                <li>{t('paymentItem3')}</li>
                <li>{t('paymentItem4')}</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('refundTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('refundText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('medicalTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('medicalText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('intellectualTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('intellectualText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('liabilityTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('liabilityText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('governingTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('governingText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('changesTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('changesText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('contactTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('contactText')} info@silkbeautysalon.ge
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
