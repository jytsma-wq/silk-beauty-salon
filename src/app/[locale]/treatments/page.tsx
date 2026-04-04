import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { treatmentCategories } from '@/data/treatments';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Treatments | Harley Street Injectables',
  description: 'Explore our comprehensive range of premium aesthetic treatments.',
};

export default function TreatmentsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Treatments
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our comprehensive range of premium aesthetic treatments designed to enhance your natural beauty
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">Treatments</span>
          </nav>
        </div>
      </div>

      {/* All Treatments */}
      <section className="section-spacing">
        <div className="container-custom">
          {treatmentCategories.map((category) => (
            <div key={category.slug} id={category.slug} className="mb-16 scroll-mt-24">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                <div>
                  <h2 
                    className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {category.name}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.treatments.map((treatment) => (
                  <Link
                    key={treatment.slug}
                    href={`/treatments/${treatment.slug}`}
                    className="group bg-white border border-border rounded-lg overflow-hidden card-hover"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-primary mb-2 group-hover:text-gold transition-colors">
                        {treatment.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
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
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h2 
            className="text-2xl md:text-3xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Book a consultation with one of our expert practitioners to discuss your aesthetic goals
          </p>
          <Button asChild className="btn-gold">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a Consultation
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
