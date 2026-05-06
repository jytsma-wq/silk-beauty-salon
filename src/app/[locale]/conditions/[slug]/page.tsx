import { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ChevronRight, Check, ArrowRight } from 'lucide-react';
import { getConditionBySlug, getAllConditions } from '@/data/conditions';
import { getTreatmentBySlug } from '@/data/treatments';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tCommon = await getTranslations({locale: resolvedParams.locale, namespace: 'common'});
  const condition = await getConditionBySlug(resolvedParams.slug, resolvedParams.locale);
  
  if (!condition) {
    return {
      title: `${tCommon('notFound')} | Silk Beauty Salon`,
    };
  }

  return {
    title: `${condition.name} | Silk Beauty Salon`,
    description: condition.shortDescription,
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  const conditions = await getAllConditions('en');

  const params = [];
  for (const locale of locales) {
    for (const condition of conditions) {
      params.push({ locale, slug: condition.slug });
    }
  }
  return params;
}

export default async function ConditionPage({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations({locale: resolvedParams.locale, namespace: 'conditionPage'});
  const tCommon = await getTranslations({locale: resolvedParams.locale, namespace: 'common'});
  const condition = await getConditionBySlug(resolvedParams.slug, resolvedParams.locale);

  if (!condition) {
    notFound();
  }

  // Get related treatments
  const relatedTreatments = condition.relatedTreatments
    ? await Promise.all(condition.relatedTreatments.map(async (slug) => {
        return await getTreatmentBySlug(slug, resolvedParams.locale);
      })).then(results => results.filter(Boolean))
    : [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="container-custom py-16 md:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/conditions" className="hover:text-[#241f1b]">
              {tCommon('conditions')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{condition.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
                Skin conditions
              </p>
              <h1 
                className="font-sans text-[clamp(2.9rem,5.6vw,5.8rem)] font-light leading-[1.02] text-[#241f1b] mb-6"
                              >
                {condition.name}
              </h1>
              <p className="text-lg text-stone-700 mb-6 leading-8">
                {condition.shortDescription}
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-md border border-[#241f1b] bg-transparent text-[#241f1b] hover:bg-[#241f1b] hover:text-white"
              >
                <Link href="/book">
                  {t('bookConsultation') || 'Book a Consultation'}
                </Link>
              </Button>
            </div>

            <div className="relative aspect-3/4 w-full overflow-hidden rounded-[8px]">
              <Image
                src={condition.image}
                alt={condition.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="mb-6 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                  {t('aboutCondition', {name: condition.name}) || `About ${condition.name}`}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {condition.description}
                </p>
              </div>

              {/* Symptoms */}
              {condition.symptoms && condition.symptoms.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-6 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                    {t('symptoms') || 'Common Signs & Symptoms'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {condition.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start gap-3 py-3 border-t border-[#e8e4df]">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#8d6f58]" />
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Causes */}
              {condition.causes && condition.causes.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-6 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                    {t('causes') || 'Common Causes'}
                  </h2>
                  <ul className="space-y-2">
                    {condition.causes.map((cause, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8d6f58]" />
                        <span className="text-muted-foreground">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatments */}
              {condition.treatments && condition.treatments.length > 0 && (
                <div className="mb-12">
                  <h2 className="mb-6 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
                    {t('treatments') || 'Treatment Options'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {condition.treatments.map((treatment, index) => (
                      <div key={index} className="flex items-start gap-3 py-3 border-t border-[#e8e4df]">
                        <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-[#8d6f58]" />
                        <span className="text-sm">{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Book CTA */}
              <div className="border-t border-[#e8e4df] py-8 text-center mb-8">
                <h3 className="mb-4 font-sans text-xl font-light text-[#241f1b]">
                  {t('needHelp') || 'Need Help?'}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t('bookConsultationDesc') || 'Book a consultation with one of our expert practitioners'}
                </p>
                <Button
                  asChild
                  className="w-full rounded-md border border-[#241f1b] bg-transparent text-[#241f1b] hover:bg-[#241f1b] hover:text-white"
                >
                  <Link href="/book">
                    {t('bookNow') || 'Book Now'}
                  </Link>
                </Button>
              </div>

              {/* Other Conditions */}
              <div className="border-t border-[#e8e4df] py-8">
                <h3 className="mb-4 font-sans text-lg font-light text-[#241f1b]">
                  {t('otherConditions') || 'Other Conditions'}
                </h3>
                <ul className="space-y-2">
                  {(await getAllConditions(resolvedParams.locale)).filter(c => c.slug !== condition.slug).slice(0, 5).map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/conditions/${other.slug}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-[#241f1b]"
                      >
                        {other.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/conditions"
                  className="mt-4 inline-block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8d6f58] transition-colors hover:text-[#241f1b]"
                >
                  {t('viewAllConditions') || 'View All Conditions'} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Treatments */}
      {relatedTreatments.length > 0 && (
        <section className="section-spacing bg-[#f7f4f0]">
          <div className="container-custom">
            <h2 className="mb-8 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
              {t('recommendedTreatments') || 'Recommended Treatments'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTreatments.map((item) => item && (
                <Link
                  key={item.slug}
                  href={`/treatments/${item.slug}`}
                  className="group block border-t border-[#e8e4df] py-6 transition-colors hover:border-[#8d6f58]"
                >
                  <h3 className="mb-2 font-sans text-xl font-light text-[#241f1b] transition-colors group-hover:text-[#8d6f58]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.shortDescription}
                  </p>
                  {item.price && (
                    <p className="mt-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8d6f58]">
                      {item.price}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
