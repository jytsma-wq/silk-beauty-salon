import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacyPolicy' });
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
                {t('introTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('introText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('collectTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('collectIntro')}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>{t('collectItem1')}</li>
                <li>{t('collectItem2')}</li>
                <li>{t('collectItem3')}</li>
                <li>{t('collectItem4')}</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('useTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('useIntro')}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>{t('useItem1')}</li>
                <li>{t('useItem2')}</li>
                <li>{t('useItem3')}</li>
                <li>{t('useItem4')}</li>
                <li>{t('useItem5')}</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('sharingTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('sharingText')}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>{t('sharingItem1')}</li>
                <li>{t('sharingItem2')}</li>
                <li>{t('sharingItem3')}</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('securityTitle')}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t('securityText')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('rightsTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('rightsIntro')}
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>{t('rightsItem1')}</li>
                <li>{t('rightsItem2')}</li>
                <li>{t('rightsItem3')}</li>
                <li>{t('rightsItem4')}</li>
                <li>{t('rightsItem5')}</li>
              </ul>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('contactTitle')}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t('contactIntro')}
              </p>

              <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
                {t('changesTitle')}
              </h2>
              <p className="text-muted-foreground">
                {t('changesText')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
