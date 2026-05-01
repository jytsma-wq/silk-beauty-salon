import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { EnhancedBeforeAfter } from '@/components/gallery/EnhancedBeforeAfter';

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
    <div className="min-h-screen bg-stone-50">
      {/* Magazine Chapter Header */}
      <header className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Chapter marker */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-px bg-stone-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-stone-400">
              {t('sectionLabel', { defaultValue: 'Portfolio' })}
            </span>
          </div>

          {/* Magazine Headline */}
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-serif font-light leading-[0.95] text-stone-900 mb-8 max-w-4xl">
            {t('title', { defaultValue: 'Real Results,' })}
            <br />
            <em className="italic text-[#b5453a]">
              {t('realPeople', { defaultValue: 'Real People' })}
            </em>
          </h1>

          {/* Intro text */}
          <p className="text-lg md:text-xl leading-relaxed text-stone-600 max-w-2xl">
            {t('subtitle', { defaultValue: 'Every face tells a story. Browse our curated collection of treatment results, each representing a journey to renewed confidence.' })}
          </p>
        </div>
      </header>

      {/* Photo Essay Gallery Section */}
      <section className="py-12 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <EnhancedBeforeAfter showFilters={true} maxItems={8} />
        </div>
      </section>

      {/* Magazine-style CTA Section */}
      <section className="py-24 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-stone-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400">Start Your Journey</span>
            <div className="w-12 h-px bg-stone-300" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 mb-6">
            {t('ctaTitle', { defaultValue: 'Ready to Transform?' })}
          </h2>
          <p className="text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
            {t('ctaText', { defaultValue: 'Book a consultation with one of our expert practitioners to discuss your aesthetic goals.' })}
          </p>
          <a
            href={`https://www.silkbeauty.ge/book`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-stone-900 text-stone-50 text-sm uppercase tracking-widest hover:bg-[#b5453a] transition-colors duration-300"
          >
            {t('bookNow', { defaultValue: 'Book Now' })}
            <span className="text-lg">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
