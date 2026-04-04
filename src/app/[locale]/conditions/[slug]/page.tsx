import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Check, ArrowRight } from 'lucide-react';
import { getConditionBySlug, conditions } from '@/data/conditions';
import { getTreatmentBySlug } from '@/data/treatments';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const condition = getConditionBySlug(resolvedParams.slug);
  
  if (!condition) {
    return {
      title: 'Condition Not Found | Harley Street Injectables',
    };
  }

  return {
    title: `${condition.name} | Harley Street Injectables`,
    description: condition.shortDescription,
  };
}

export async function generateStaticParams() {
  return conditions.map((condition) => ({
    slug: condition.slug,
  }));
}

export default async function ConditionPage({ params }: Props) {
  const resolvedParams = await params;
  const condition = getConditionBySlug(resolvedParams.slug);

  if (!condition) {
    notFound();
  }

  // Get related treatments
  const relatedTreatments = condition.relatedTreatments
    ? condition.relatedTreatments.map(slug => getTreatmentBySlug(slug)).filter(Boolean)
    : [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary py-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 text-gray-300">
            <Link href="/" className="hover:text-gold">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/conditions" className="hover:text-gold">
              Conditions
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
                  Book a Consultation
                </a>
              </Button>
            </div>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={condition.image}
                alt={condition.name}
                className="w-full h-full object-cover"
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
                  About {condition.name}
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
                    Common Signs & Symptoms
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {condition.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
                        <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
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
                    Common Causes
                  </h2>
                  <ul className="space-y-2">
                    {condition.causes.map((cause, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
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
                    Treatment Options
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {condition.treatments.map((treatment, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <ArrowRight className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
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
                  Need Help?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Book a consultation with one of our expert practitioners
                </p>
                <Button asChild className="btn-gold w-full">
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book Now
                  </a>
                </Button>
              </div>

              {/* Other Conditions */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="font-serif text-lg font-semibold text-primary mb-4">
                  Other Conditions
                </h3>
                <ul className="space-y-2">
                  {conditions.filter(c => c.slug !== condition.slug).slice(0, 5).map((other) => (
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
                  View All Conditions →
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
              Recommended Treatments
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTreatments.map((treatment) => treatment && (
                <Link
                  key={treatment.slug}
                  href={`/treatments/${treatment.slug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-border card-hover"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-primary group-hover:text-gold transition-colors">
                      {treatment.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
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
        </section>
      )}
    </>
  );
}
