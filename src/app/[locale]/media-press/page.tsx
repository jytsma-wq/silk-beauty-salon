import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mediaPress' });
  return {
    title: `${t('title')} | Silk Beauty Salon`,
    description: t('subtitle'),
  };
}

export default async function MediaPressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mediaPress' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const pressFeatures = [
    {
      publication: 'Vogue',
      title: t('feature1Title'),
      date: t('feature1Date'),
      excerpt: t('feature1Excerpt'),
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80',
    },
    {
      publication: 'Grazia',
      title: t('feature2Title'),
      date: t('feature2Date'),
      excerpt: t('feature2Excerpt'),
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    },
    {
      publication: 'Tatler',
      title: t('feature3Title'),
      date: t('feature3Date'),
      excerpt: t('feature3Excerpt'),
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    },
    {
      publication: 'Vanity Fair',
      title: t('feature4Title'),
      date: t('feature4Date'),
      excerpt: t('feature4Excerpt'),
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
    },
    {
      publication: "Harper's Bazaar",
      title: t('feature5Title'),
      date: t('feature5Date'),
      excerpt: t('feature5Excerpt'),
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    },
    {
      publication: 'Elle',
      title: t('feature6Title'),
      date: t('feature6Date'),
      excerpt: t('feature6Excerpt'),
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80',
    },
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

      {/* Press Features */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressFeatures.map((feature, index) => (
              <article key={index} className="group py-8 border-t border-[#e8e4df] hover:border-[#b5453a] transition-colors">
                <div className="mb-4">
                  <span className="text-gold text-xs tracking-[0.15em] uppercase">
                    {feature.publication}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{feature.date}</p>
                <h3 
                  className="text-lg font-serif font-semibold text-primary mb-2 group-hover:text-gold transition-colors"
                                  >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {feature.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                >
                  {t('readArticle')}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Enquiries */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 
              className="text-2xl font-serif font-semibold text-primary mb-4"
                          >
              {t('mediaEnquiries')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('mediaText')}{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-gold hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
            <Button asChild variant="outline">
              <a href={`mailto:${siteConfig.contact.email}`}>
                {t('contactPress')}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
