import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Check, ArrowRight } from 'lucide-react';
import { getConditionBySlug, getAllConditions } from '@/data/conditions';
import { getTreatmentBySlug } from '@/data/treatments';
import { siteConfig } from '@/data/site-config';
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

export async function generateStaticParams() {
  const conditions = await getAllConditions('en');
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
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
      <section className="relative bg-primary py-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-gray-300">
            <Link href="/" className="hover:text-gold">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/conditions" className="hover:text-gold">
              {tCommon('conditions')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{condition.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 
                className="text-4xl md:text-5xl font-serif font-semibold text-white mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {condition.name}
              </h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {condition.shortDescription}
              </p>
              <Button asChild size="lg" className="btn-gold">
                <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                  {t('bookConsultation') || 'Book a Consultation'}
                </a>
              </Button>
            </div>

            <div className="relative aspect-4/3 rounded-lg overflow-hidden">
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
                <h2 
                  className="text-2xl font-serif font-semibold text-primary mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t('aboutCondition', {name: condition.name}) || `About ${condition.name}`}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {condition.description}
                </p>
              </div>

              {/* Symptoms */}
              {condition.symptoms && condition.symptoms.length > 0 && (
                <div className="mb-12">
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t('symptoms') || 'Common Signs & Symptoms'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {condition.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                        <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                        <span className="text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Causes */}
              {condition.causes && condition.causes.length > 0 && (
                <div className="mb-12">
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t('causes') || 'Common Causes'}
                  </h2>
                  <ul className="space-y-2">
                    {condition.causes.map((cause, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span className="text-muted-foreground">{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatments */}
              {condition.treatments && condition.treatments.length > 0 && (
                <div className="mb-12">
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t('treatments') || 'Treatment Options'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {condition.treatments.map((treatment, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <ArrowRight className="w-5 h-5 text-gold mt-0.5 shrink-0" />
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
              <div className="bg-primary rounded-lg p-6 text-center mb-8">
                <h3 className="font-serif text-xl text-white mb-4">
                  {t('needHelp') || 'Need Help?'}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {t('bookConsultationDesc') || 'Book a consultation with one of our expert practitioners'}
                </p>
                <Button asChild className="btn-gold w-full">
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    {t('bookNow') || 'Book Now'}
                  </a>
                </Button>
              </div>

              {/* Other Conditions */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-primary mb-4">
                  {t('otherConditions') || 'Other Conditions'}
                </h3>
                <ul className="space-y-2">
                  {(await getAllConditions(resolvedParams.locale)).filter(c => c.slug !== condition.slug).slice(0, 5).map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/conditions/${other.slug}`}
                        className="text-sm text-muted-foreground hover:text-gold transition-colors"
                      >
                        {other.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/conditions"
                  className="inline-block mt-4 text-sm font-medium text-gold hover:underline"
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
        <section className="section-spacing bg-secondary">
          <div className="container-custom">
            <h2 
              className="text-2xl font-serif font-semibold text-primary mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t('recommendedTreatments') || 'Recommended Treatments'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTreatments.map((item) => item && (
                <Link
                  key={item.slug}
                  href={`/treatments/${item.slug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-border card-hover"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {item.shortDescription}
                    </p>
                    {item.price && (
                      <p className="text-sm font-medium text-gold mt-2">
                        {item.price}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
