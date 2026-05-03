import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ChevronRight, Check } from 'lucide-react';
import { getTreatmentBySlug, getAllTreatmentSlugs, getCategoryByTreatmentSlug } from '@/lib/treatments-db';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

// Revalidate every 24 hours
export const revalidate = 86400;

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tCommon = await getTranslations({locale: resolvedParams.locale, namespace: 'common'});
  const treatment = await getTreatmentBySlug(resolvedParams.slug, resolvedParams.locale);
  
  if (!treatment) {
    return {
      title: `${tCommon('notFound')} | Silk Beauty Salon`,
    };
  }

  return {
    title: `${treatment.name} | Silk Beauty Salon`,
    description: treatment.shortDescription,
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  const slugs = await getAllTreatmentSlugs();

  const params = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function TreatmentPage({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({locale: resolvedParams.locale, namespace: 'treatmentPage'});
  const tCommon = await getTranslations({locale: resolvedParams.locale, namespace: 'common'});
  const treatment = await getTreatmentBySlug(resolvedParams.slug, resolvedParams.locale);

  if (!treatment) {
    notFound();
  }

  // Find the category this treatment belongs to
  const category = await getCategoryByTreatmentSlug(treatment?.slug || '', resolvedParams.locale);

  // Find related treatments
  const relatedTreatments = category?.treatments
    .filter((t: { slug: string }) => t.slug !== treatment?.slug)
    .slice(0, 3) || [];

  return (
    <article className="min-h-screen bg-white">
      {/* Magazine Article Hero - Full Immersive */}
      <header className="relative h-[70vh] md:h-[85vh] flex items-end">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={treatment.image}
            alt={treatment.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
        </div>
        
        {/* Breadcrumb */}
        <nav className="absolute top-32 left-8 md:left-16 z-10 flex items-center gap-3 text-xs uppercase tracking-widest text-stone-300">
          <Link href="/" className="hover:text-stone-50 transition-colors">
            {tCommon('home')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/treatments" className="hover:text-stone-50 transition-colors">
            {tCommon('treatments')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-stone-400">{treatment.name}</span>
        </nav>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 pb-16 md:pb-24">
          {/* Treatment Type */}
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-4">
            {category?.name || 'Treatment'}
          </p>
          
          {/* Title */}
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-serif font-light leading-[0.95] text-stone-50 mb-6">
            {treatment.name}
          </h1>
          
          {/* Deck/Subtitle */}
          <p className="text-lg md:text-xl leading-relaxed text-stone-200 max-w-2xl">
            {treatment.shortDescription}
          </p>
          
          {/* Meta Stats */}
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-stone-400">
            {treatment.duration && (
              <div>
                <span className="block text-xs uppercase tracking-wider text-stone-500 mb-1">{t('duration') || 'Duration'}</span>
                <span className="text-stone-200">{treatment.duration}</span>
              </div>
            )}
            {treatment.price && (
              <div>
                <span className="block text-xs uppercase tracking-wider text-stone-500 mb-1">{t('price') || 'Price from'}</span>
                <span className="text-stone-200">{treatment.price}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-linear-to-b from-stone-300 to-transparent animate-pulse" />
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-8 md:px-16 py-16 md:py-24">
        
        {/* Quick Facts Sidebar - Float Right */}
        <aside className="float-right ml-8 mb-8 w-full max-w-xs p-6 md:p-8 bg-stone-50 border-l-2 border-[#b5453a]">
          <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-6">
            {t('atAGlance') || 'At a Glance'}
          </h3>
          <dl className="space-y-4 text-sm">
            {treatment.duration && (
              <div>
                <dt className="text-stone-500 mb-1">{t('duration') || 'Procedure Time'}</dt>
                <dd className="font-serif text-stone-900">{treatment.duration}</dd>
              </div>
            )}
            {treatment.price && (
              <div>
                <dt className="text-stone-500 mb-1">{t('price') || 'Price From'}</dt>
                <dd className="font-serif text-stone-900">{treatment.price}</dd>
              </div>
            )}
            <div>
              <dt className="text-stone-500 mb-1">{t('results') || 'Results'}</dt>
              <dd className="font-serif text-stone-900">3-6 months</dd>
            </div>
            <div>
              <dt className="text-stone-500 mb-1">{t('downtime') || 'Downtime'}</dt>
              <dd className="font-serif text-stone-900">None to minimal</dd>
            </div>
          </dl>
          
          <Button asChild className="mt-8 w-full bg-stone-900 text-stone-50 hover:bg-[#b5453a] text-xs uppercase tracking-wide">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              {t('bookNow') || 'Book Now'}
            </a>
          </Button>
        </aside>
        
        {/* Drop Cap First Paragraph */}
        <p className="text-lg leading-relaxed text-stone-700 mb-8">
          <span className="float-left text-7xl md:text-8xl font-serif leading-none mr-4 mt-1 text-[#b5453a]">
            {treatment.description.charAt(0)}
          </span>
          {treatment.description.slice(1)}
        </p>
        
        {/* Main Description */}
        <div className="prose prose-stone max-w-none">
          {treatment.howItWorks && (
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mt-16 mb-6">
                {t('howItWorks') || 'How It Works'}
              </h2>
              <p className="text-base leading-relaxed text-stone-700 mb-6">
                {treatment.howItWorks}
              </p>
            </div>
          )}
          
          {/* Benefits Section */}
          {treatment.benefits && treatment.benefits.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mt-16 mb-6">
                {t('benefits') || 'Benefits'}
              </h2>
              <ul className="space-y-3">
                {treatment.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-stone-700">
                    <Check className="w-5 h-5 text-[#b5453a] mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Aftercare */}
          {treatment.aftercare && (
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mt-16 mb-6">
                {t('aftercare') || 'Aftercare'}
              </h2>
              <div className="p-6 bg-stone-50 border border-stone-200">
                <p className="text-stone-700 leading-relaxed">
                  {treatment.aftercare}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Clear float */}
        <div className="clear-both" />
      </div>

      {/* Pull Quote Section */}
      <section className="py-16 md:py-24 border-t border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic leading-tight text-stone-800 max-w-3xl mx-auto">
            &ldquo;The goal is not to erase expression, but to refine it&mdash;to let your natural beauty shine through without the interference of unwanted lines.&rdquo;
          </blockquote>
          <footer className="mt-8">
            <cite className="not-italic text-sm text-stone-500">
              &mdash; Dr. Ana Beridze, Medical Director
            </cite>
          </footer>
        </div>
      </section>

      {/* FAQ Section - Magazine Q&A Format */}
      {treatment.faqs && treatment.faqs.length > 0 && (
        <section className="py-16 md:py-24 max-w-3xl mx-auto px-8 md:px-16">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 mb-12">
            {t('faqs') || 'Questions & Answers'}
          </h2>
          
          <div className="space-y-10">
            {treatment.faqs.map((faq, index) => (
              <article key={index} className="border-b border-stone-200 pb-10">
                <h3 className="text-xl font-serif font-light text-stone-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-base leading-relaxed text-stone-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Related Treatments - Magazine "You Might Also Like" */}
      {relatedTreatments.length > 0 && (
        <section className="py-16 md:py-24 bg-stone-50">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-8">
              {t('youMightAlsoLike') || 'You Might Also Like'}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {relatedTreatments.map((related: { slug: string; image: string; name: string; shortDescription: string }) => (
                <article key={related.slug} className="group cursor-pointer">
                  <Link href={`/treatments/${related.slug}`}>
                    <div className="relative aspect-4/5 mb-6 overflow-hidden">
                      <Image
                        src={related.image}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-serif font-light mb-3 text-stone-900 group-hover:text-[#b5453a] transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {related.shortDescription}
                    </p>
                    <span className="inline-block mt-4 text-sm text-stone-900 underline underline-offset-4">
                      {t('learnMore') || 'Learn more'}
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky CTA Footer */}
      <div className="sticky bottom-0 bg-white border-t border-stone-200 py-4 px-8 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-sm font-serif text-stone-900">{treatment.name}</p>
            <p className="text-xs text-stone-500">{treatment.duration} • {treatment.price}</p>
          </div>
          <Button asChild className="bg-stone-900 text-stone-50 hover:bg-[#b5453a] px-8 py-3 text-sm uppercase tracking-wide">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              {t('bookNow') || 'Book This Treatment'}
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
