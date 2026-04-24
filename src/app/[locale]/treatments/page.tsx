import { Metadata } from 'next';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { getTreatmentCategoriesByLocale, getAllCategorySlugs } from '@/lib/treatments-db';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

// Generate static params for all locales
export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  const categories = await getAllCategorySlugs();
  
  const params = [];
  for (const locale of locales) {
    params.push({ locale });
    // Also generate for each category slug
    for (const slug of categories) {
      params.push({ locale, category: slug });
    }
  }
  return params;
}

// Revalidate every 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'treatmentsPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function TreatmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'treatmentsPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const categories = await getTreatmentCategoriesByLocale(locale);

  return (
    <>
      {/* Full Screen Hero Image */}
      <section className="relative h-screen min-h-150">
        <Image
          src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1920&q=80"
          alt="Luxury Beauty Salon"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 
              className="text-4xl md:text-6xl font-serif font-semibold text-white mb-4"
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
            <span className="text-primary font-medium">{t('title')}</span>
          </nav>
        </div>
      </div>

      {/* All Treatments */}
      <section className="section-spacing">
        <div className="container-custom">
          {categories.map((category) => (
            <div key={category.slug} id={category.slug} className="mb-16 scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                <div>
                  <h2 
                    className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-2"
                                      >
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.treatments.map((treatment) => (
                  <Link
                    key={treatment.slug}
                    href={`/treatments/${treatment.slug}`}
                    className="group bg-white border border-border rounded-lg overflow-hidden card-hover"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={treatment.image}
                        alt={treatment.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary mb-2 group-hover:text-gold transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {treatment.shortDescription}
                      </p>
                      {treatment.price && (
                        <p className="text-sm font-medium text-gold mt-2">
                          {treatment.price}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
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
              {t('ctaButton')}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
