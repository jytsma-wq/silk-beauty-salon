import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getLocalizedConditions } from '@/data/conditions';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'conditionsPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'conditionsPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const conditions = await getLocalizedConditions(locale);

  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Image
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
          alt="Skin Care Treatment"
          fill
          className="object-cover rounded-sm shadow-sm"
          priority
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 
              className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4"
                          >
              {t('listingTitle')}
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg">
              {t('listingSubtitle')}
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
            <span className="text-primary font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* Conditions Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {conditions.map((condition) => (
              <Link
                key={condition.slug}
                href={`/conditions/${condition.slug}`}
                className="group bg-white border border-border rounded-lg overflow-hidden card-hover"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-3/4 w-full md:aspect-auto md:h-full overflow-hidden rounded-sm shadow-sm">
                    <Image
                      src={condition.image}
                      alt={condition.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h2 
                      className="text-xl font-serif font-semibold text-primary mb-3 group-hover:text-gold transition-colors"
                                          >
                      {condition.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {condition.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                      {tCommon('learnMore')}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h2 
            className="text-2xl md:text-3xl font-serif font-semibold text-white mb-4"
                      >
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <Button asChild className="btn-gold">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              {t('bookConsultation')}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
