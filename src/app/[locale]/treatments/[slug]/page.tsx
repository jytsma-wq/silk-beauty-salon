import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ChevronRight, Check } from 'lucide-react';
import {
  getTreatmentBySlug,
  getAllTreatments,
  getCategoryByTreatmentSlug,
} from '@/data/treatments';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';

export const revalidate = 86400;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tCommon = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'common',
  });
  const treatment = await getTreatmentBySlug(
    resolvedParams.slug,
    resolvedParams.locale
  );

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

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  const slugs = (await getAllTreatments('en')).map((treatment) => treatment.slug);

  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function TreatmentPage({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'treatmentPage',
  });
  const tCommon = await getTranslations({
    locale: resolvedParams.locale,
    namespace: 'common',
  });
  const treatment = await getTreatmentBySlug(
    resolvedParams.slug,
    resolvedParams.locale
  );

  if (!treatment) {
    notFound();
  }

  const category = await getCategoryByTreatmentSlug(
    treatment.slug,
    resolvedParams.locale
  );

  const relatedTreatments =
    category?.treatments
      .filter((item: { slug: string }) => item.slug !== treatment.slug)
      .slice(0, 3) || [];
  const stickyMeta = [treatment.duration, treatment.price].filter(Boolean).join(' • ');

  return (
    <article className="min-h-screen bg-white">
      <header className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="grid min-h-[70svh] grid-cols-1 lg:grid-cols-[44%_56%]">
          <div className="flex items-end px-6 py-14 md:px-12 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
                <Link href="/" className="hover:text-[#241f1b]">
                  {tCommon('home')}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/treatments" className="hover:text-[#241f1b]">
                  {tCommon('treatments')}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-[#241f1b]">{treatment.name}</span>
              </nav>

              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                {category?.name || 'Treatment'}
              </p>
              <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {treatment.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
                {treatment.shortDescription}
              </p>

              <div className="mt-10 flex flex-wrap gap-8 text-sm text-stone-600">
                {treatment.duration ? (
                  <div>
                    <span className="mb-1 block text-xs uppercase tracking-wider text-stone-500">
                      {t('duration') || 'Duration'}
                    </span>
                    <span className="text-[#241f1b]">{treatment.duration}</span>
                  </div>
                ) : null}
                {treatment.price ? (
                  <div>
                    <span className="mb-1 block text-xs uppercase tracking-wider text-stone-500">
                      {t('price') || 'Price from'}
                    </span>
                    <span className="text-[#241f1b]">{treatment.price}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="relative min-h-[44svh] overflow-hidden lg:min-h-0">
            <Image
              src={treatment.image}
              alt={treatment.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-8 py-16 md:px-16 md:py-24">
        <aside className="float-right ml-8 mb-8 w-full max-w-xs border-l-2 border-[#d8cbbb] bg-stone-50 p-6 md:p-8">
          <h3 className="mb-6 text-xs uppercase tracking-widest text-stone-400">
            {t('atAGlance') || 'At a Glance'}
          </h3>
          <dl className="space-y-4 text-sm">
            {treatment.duration ? (
              <div>
                <dt className="mb-1 text-stone-500">
                  {t('duration') || 'Procedure Time'}
                </dt>
                <dd className="font-serif text-stone-900">{treatment.duration}</dd>
              </div>
            ) : null}
            {treatment.price ? (
              <div>
                <dt className="mb-1 text-stone-500">
                  {t('price') || 'Price From'}
                </dt>
                <dd className="font-serif text-stone-900">{treatment.price}</dd>
              </div>
            ) : null}
            <div>
              <dt className="mb-1 text-stone-500">{t('results') || 'Results'}</dt>
              <dd className="font-serif text-stone-900">3-6 months</dd>
            </div>
            <div>
              <dt className="mb-1 text-stone-500">{t('downtime') || 'Downtime'}</dt>
              <dd className="font-serif text-stone-900">None to minimal</dd>
            </div>
          </dl>

          <Button
            asChild
            className="mt-8 w-full rounded-md border border-[#241f1b] bg-transparent text-xs uppercase tracking-wide text-[#241f1b] hover:bg-[#241f1b] hover:text-white"
          >
            <Link href="/book">{t('bookNow') || 'Book Now'}</Link>
          </Button>
        </aside>

        <p className="mb-8 text-lg leading-relaxed text-stone-700">
          <span className="float-left mr-4 mt-1 font-serif text-7xl leading-none text-[#8d6f58] md:text-8xl">
            {treatment.description.charAt(0)}
          </span>
          {treatment.description.slice(1)}
        </p>

        <div className="prose prose-stone max-w-none">
          {treatment.howItWorks ? (
            <div>
              <h2 className="mt-16 mb-6 font-serif text-2xl font-light text-stone-900 md:text-3xl">
                {t('howItWorks') || 'How It Works'}
              </h2>
              <p className="mb-6 text-base leading-relaxed text-stone-700">
                {treatment.howItWorks}
              </p>
            </div>
          ) : null}

          {treatment.benefits && treatment.benefits.length > 0 ? (
            <div>
              <h2 className="mt-16 mb-6 font-serif text-2xl font-light text-stone-900 md:text-3xl">
                {t('benefits') || 'Benefits'}
              </h2>
              <ul className="space-y-3">
                {treatment.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3 text-stone-700">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#8d6f58]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {treatment.aftercare ? (
            <div>
              <h2 className="mt-16 mb-6 font-serif text-2xl font-light text-stone-900 md:text-3xl">
                {t('aftercare') || 'Aftercare'}
              </h2>
              <div className="border border-stone-200 bg-stone-50 p-6">
                <p className="text-stone-700 leading-relaxed">{treatment.aftercare}</p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="clear-both" />
      </div>

      <section className="border-y border-stone-200 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-8 text-center md:px-16">
          <blockquote className="mx-auto max-w-3xl font-serif text-2xl italic leading-tight text-stone-800 md:text-3xl lg:text-4xl">
            &ldquo;The goal is not to erase expression, but to refine it and let your
            natural beauty read more clearly.&rdquo;
          </blockquote>
          <footer className="mt-8">
            <cite className="not-italic text-sm text-stone-500">
              Dr. Ana Beridze, Medical Director
            </cite>
          </footer>
        </div>
      </section>

      {treatment.faqs && treatment.faqs.length > 0 ? (
        <section className="mx-auto max-w-3xl px-8 py-16 md:px-16 md:py-24">
          <h2 className="mb-12 font-serif text-3xl font-light text-stone-900 md:text-4xl">
            {t('faqs') || 'Questions & Answers'}
          </h2>
          <div className="space-y-10">
            {treatment.faqs.map((faq, index) => (
              <article key={index} className="border-b border-stone-200 pb-10">
                <h3 className="mb-4 font-serif text-xl font-light text-stone-900">
                  {faq.question}
                </h3>
                <p className="text-base leading-relaxed text-stone-600">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {relatedTreatments.length > 0 ? (
        <section className="bg-stone-50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-8 md:px-16">
            <p className="mb-8 text-xs uppercase tracking-[0.3em] text-stone-400">
              {t('youMightAlsoLike') || 'You Might Also Like'}
            </p>
            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              {relatedTreatments.map(
                (related: {
                  slug: string;
                  image: string;
                  name: string;
                  shortDescription: string;
                }) => (
                  <article key={related.slug} className="group cursor-pointer">
                    <Link href={`/treatments/${related.slug}`}>
                      <div className="relative mb-6 aspect-4/5 overflow-hidden">
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mb-3 font-serif text-xl font-light text-stone-900 transition-colors group-hover:text-[#8d6f58] md:text-2xl">
                        {related.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-stone-600">
                        {related.shortDescription}
                      </p>
                      <span className="mt-4 inline-block text-sm text-stone-900 underline underline-offset-4">
                        {t('learnMore') || 'Learn more'}
                      </span>
                    </Link>
                  </article>
                )
              )}
            </div>
          </div>
        </section>
      ) : null}

      <div className="sticky bottom-0 z-40 border-t border-stone-200 bg-white px-8 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="hidden md:block">
            <p className="font-serif text-sm text-stone-900">{treatment.name}</p>
            {stickyMeta ? <p className="text-xs text-stone-500">{stickyMeta}</p> : null}
          </div>
          <Button
            asChild
            className="rounded-md border border-[#241f1b] bg-transparent px-8 py-3 text-sm uppercase tracking-wide text-[#241f1b] hover:bg-[#241f1b] hover:text-white"
          >
            <Link href="/book">{t('bookNow') || 'Book This Treatment'}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
