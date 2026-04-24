import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Tag, Percent } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Special Offers | Silk Beauty Salon',
  description: 'Discover our latest special offers and promotions on premium aesthetic treatments.',
};

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'offersPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const offers = [
    {
      titleKey: 'newClient',
      discount: '20% OFF',
      highlight: true,
    },
    {
      titleKey: 'antiWrinkle',
      discount: 'Save £100',
      highlight: false,
    },
    {
      titleKey: 'dermalFiller',
      discount: 'Free Skin Booster',
      highlight: false,
    },
    {
      titleKey: 'referral',
      discount: '£50 Credit',
      highlight: false,
    },
    {
      titleKey: 'seasonal',
      discount: '15% OFF',
      highlight: false,
    },
    {
      titleKey: 'loyalty',
      discount: 'Earn Points',
      highlight: false,
    },
  ];

  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative h-screen min-h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
          alt="Special Offers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 
              className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('title')}
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              {t('subtitle')}
            </p>
          </div>
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

      {/* Offers Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`relative bg-white border rounded-lg overflow-hidden card-hover ${
                  offer.highlight ? 'border-gold' : 'border-border'
                }`}
              >
                {offer.highlight && (
                  <div className="absolute top-4 right-4">
                    <Tag className="w-6 h-6 text-gold" />
                  </div>
                )}
                <div className={`p-6 ${offer.highlight ? 'bg-gold/5' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Percent className={`w-5 h-5 ${offer.highlight ? 'text-gold' : 'text-primary'}`} />
                    <span className="text-sm font-medium text-gold">{offer.discount}</span>
                  </div>
                  <h3 
                    className="text-xl font-serif font-semibold text-primary mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t(`offers.${offer.titleKey}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t(`offers.${offer.titleKey}.description`)}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {t(`offers.${offer.titleKey}.terms`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary rounded-lg p-8 text-center">
            <h2 
              className="text-2xl font-serif font-semibold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('ctaTitle')}
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Button asChild className="btn-gold">
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                {t('ctaButton')}
              </a>
            </Button>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t('termsText')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
