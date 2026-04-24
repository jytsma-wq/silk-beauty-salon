import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, Check } from 'lucide-react';
import { getTreatmentBySlug, getCategoryByTreatmentSlug, getAllTreatments } from '@/data/treatments';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export async function generateStaticParams() {
  const treatments = await getAllTreatments('en');
  return treatments.map((treatment) => ({
    slug: treatment.slug,
  }));
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
    .filter(t => t.slug !== treatment.slug)
    .slice(0, 3) || [];

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
            <Link href="/treatments" className="hover:text-gold">
              {tCommon('treatments')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gold">{treatment.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {category && (
                <Link 
                  href={`/treatments#${category.slug}`}
                  className="text-gold text-sm font-medium hover:underline mb-4 inline-block"
                >
                  {category.name}
                </Link>
              )}
              <h1 
                className="text-4xl md:text-5xl font-serif font-semibold text-white mb-6"
                              >
                {treatment.name}
              </h1>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {treatment.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {treatment.price && (
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-300">{t('price') || 'Price from'}</span>
                    <p className="text-xl font-semibold text-gold">{treatment.price}</p>
                  </div>
                )}
                {treatment.duration && (
                  <div className="bg-white/10 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-300">{t('duration') || 'Duration'}</span>
                    <p className="text-xl font-semibold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gold" />
                      {treatment.duration}
                    </p>
                  </div>
                )}
              </div>

              <Button asChild size="lg" className="btn-gold">
                <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                  {t('bookConsultation') || 'Book Consultation'}
                </a>
              </Button>
            </div>

            <div className="relative aspect-4/3 rounded-lg overflow-hidden">
              <Image
                src={treatment.image}
                alt={treatment.name}
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
                                  >
                  {t('aboutTreatment') || 'About This Treatment'}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {treatment.description}
                </p>
              </div>

              {/* Benefits */}
              {treatment.benefits && treatment.benefits.length > 0 && (
                <div className="mb-12">
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                                      >
                    {t('benefits') || 'Benefits'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {treatment.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                        <Check className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* How It Works */}
              {treatment.howItWorks && (
                <div className="mb-12">
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                                      >
                    {t('howItWorks') || 'How It Works'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {treatment.howItWorks}
                  </p>
                </div>
              )}

              {/* Aftercare */}
              {treatment.aftercare && (
                <div className="mb-12">
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                                      >
                    {t('aftercare') || 'Aftercare'}
                  </h2>
                  <div className="bg-secondary rounded-lg p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {treatment.aftercare}
                    </p>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {treatment.faqs && treatment.faqs.length > 0 && (
                <div>
                  <h2 
                    className="text-2xl font-serif font-semibold text-primary mb-6"
                                      >
                    {t('faqs') || 'Frequently Asked Questions'}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {treatment.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Book CTA */}
              <div className="bg-primary rounded-lg p-6 text-center mb-8">
                <h3 className="font-serif text-xl text-white mb-4">
                  {t('readyToStart') || 'Ready to get started?'}
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

              {/* Contact Info */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-primary mb-4">
                  {t('contactUs') || 'Contact Us'}
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span className="text-muted-foreground">{t('phone') || 'Phone'}:</span>
                    <br />
                    <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="text-primary hover:text-gold">
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                  <li>
                    <span className="text-muted-foreground">{t('email') || 'Email'}:</span>
                    <br />
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:text-gold">
                      {siteConfig.contact.email}
                    </a>
                  </li>
                  <li>
                    <span className="text-muted-foreground">{t('address') || 'Address'}:</span>
                    <br />
                    <span className="text-primary">
                      {siteConfig.contact.address}<br />
                      {siteConfig.contact.city}, {siteConfig.contact.postcode}
                    </span>
                  </li>
                </ul>
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
                          >
              {t('relatedTreatments') || 'Related Treatments'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTreatments.map((related) => (
                <Link
                  key={related.slug}
                  href={`/treatments/${related.slug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-border card-hover"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary group-hover:text-gold transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {related.shortDescription}
                    </p>
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
