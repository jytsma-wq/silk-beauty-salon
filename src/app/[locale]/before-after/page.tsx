import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BeforeAfterGallery } from '@/components/gallery/BeforeAfterGallery';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beforeAfterPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function BeforeAfterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'beforeAfterPage' });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-[#1c1c1c] text-white py-16 md:py-24">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <BeforeAfterGallery locale={locale} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#f7f4f0]">
        <div className="container-custom text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
            {t('ctaTitle')}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('ctaText')}
          </p>
          <a
            href={`https://www.silkbeauty.ge/book`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-3"
          >
            {t('bookNow')}
          </a>
        </div>
      </section>
    </div>
  );
}
