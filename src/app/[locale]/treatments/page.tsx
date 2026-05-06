import { Metadata } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { getLocalizedTreatmentCategories } from '@/data/treatments';

const localeMap: Record<string, string> = {
  en: 'en_US',
  ka: 'ka_GE',
  ru: 'ru_RU',
  tr: 'tr_TR',
  ar: 'ar_SA',
  he: 'he_IL',
};

function normalizeCopy(value: string) {
  return value
    .replaceAll('â‚¾', 'GEL ')
    .replaceAll('Ã©', 'e')
    .replaceAll('â€“', '-')
    .replaceAll('â€”', '-')
    .replaceAll('Â·', '·');
}

export async function generateStaticParams() {
  return ['en', 'ka', 'ru', 'ar', 'he', 'tr'].map((locale) => ({ locale }));
}

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'treatmentsPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      locale: localeMap[locale] || 'en_US',
    },
  };
}

export default async function TreatmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'treatmentsPage' });
  const categories = await getLocalizedTreatmentCategories(locale);

  return (
    <>
      <section className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="grid min-h-[70svh] grid-cols-1 lg:grid-cols-[44%_56%]">
          <div className="flex items-end px-6 py-14 md:px-12 lg:px-16 xl:px-24">
            <div className="max-w-xl">
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                Treatment portfolio
              </p>
              <h1 className="font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b]">
                {t('title')}
              </h1>
              <p className="mt-7 text-base leading-8 text-stone-700 md:text-lg">
                {t('subtitle')}
              </p>
            </div>
          </div>
          <div className="relative min-h-[44svh] overflow-hidden lg:min-h-0">
            <Image
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=2200&q=85"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 56vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white px-6 py-5 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="shrink-0 border border-stone-300 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:border-[#241f1b] hover:bg-[#241f1b] hover:text-white"
            >
              {normalizeCopy(category.name)}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 md:px-12 md:py-24 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-7xl space-y-24">
          {categories.map((category) => (
            <section
              key={category.slug}
              id={category.slug}
              className="scroll-mt-36 border-t border-stone-200 pt-10"
            >
              <div className="mb-10 grid gap-8 lg:grid-cols-[34%_66%] lg:items-end">
                <div>
                  <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                    Category
                  </p>
                  <h2 className="font-sans text-[clamp(2.1rem,4vw,4rem)] font-light leading-[1.02] text-[#241f1b]">
                    {normalizeCopy(category.name)}
                  </h2>
                </div>
                <p className="max-w-3xl text-base leading-8 text-stone-600 md:text-lg">
                  {normalizeCopy(category.description)}
                </p>
              </div>

              <div className="mb-10 grid gap-px bg-stone-200 lg:grid-cols-[32%_68%]">
                <div className="relative min-h-[320px] overflow-hidden bg-stone-100">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    unoptimized={category.image.startsWith('http')}
                  />
                </div>
                <div className="bg-[#f7f2eb] p-8 md:p-10">
                  <p className="max-w-2xl text-sm leading-7 text-stone-700">
                    Explore the treatments in this category below. Each option is planned
                    around anatomy, skin condition, and a consultation-first approach.
                  </p>
                </div>
              </div>

              <div className="grid gap-px bg-stone-200 md:grid-cols-2 xl:grid-cols-3">
                {category.treatments.map((treatment) => (
                  <NextLink
                    key={treatment.slug}
                    href={`/${locale}/treatments/${treatment.slug}`}
                    className="group bg-white p-7 transition-colors hover:bg-[#f7f2eb]"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <h3 className="font-sans text-2xl font-light leading-tight text-[#241f1b]">
                        {normalizeCopy(treatment.name)}
                      </h3>
                      {treatment.price ? (
                        <span className="shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#8d6f58]">
                          {normalizeCopy(treatment.price)}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-sm leading-7 text-stone-600">
                      {normalizeCopy(treatment.shortDescription)}
                    </p>

                    {treatment.duration ? (
                      <p className="mt-5 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
                        {normalizeCopy(treatment.duration)}
                      </p>
                    ) : null}

                    <span className="mt-6 inline-block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#241f1b]">
                      View treatment
                    </span>
                  </NextLink>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f2eb] px-6 py-24 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[55%_45%] lg:items-center">
          <div>
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
              Consultation
            </p>
            <h2 className="font-sans text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.98] text-[#241f1b]">
              {t('ctaTitle')}
            </h2>
          </div>
          <div>
            <p className="max-w-lg text-base leading-8 text-stone-700 md:text-lg">
              {t('ctaSubtitle')}
            </p>
            <NextLink
              href={`/${locale}/book`}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md border border-[#d9cec1] bg-white px-7 text-xs font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
            >
              {t('ctaButton')}
            </NextLink>
          </div>
        </div>
      </section>
    </>
  );
}
