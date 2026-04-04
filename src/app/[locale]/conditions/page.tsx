import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { conditions } from '@/data/conditions';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Conditions We Treat | Harley Street Injectables',
  description: 'Learn about the various skin conditions we treat including ageing skin, acne scarring, pigmentation, and more.',
};

export default function ConditionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Conditions We Treat
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Whatever your skin concern, our expert practitioners can create a personalized treatment plan
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
            <span className="text-primary font-medium">Conditions</span>
          </nav>
        </div>
      </div>

      {/* Conditions Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {conditions.map((condition) => (
              <Link
                key={condition.slug}
                href={`/conditions/${condition.slug}`}
                className="group bg-white border border-border rounded-lg overflow-hidden card-hover"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <img
                      src={condition.image}
                      alt={condition.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h2 
                      className="text-xl font-serif font-semibold text-primary mb-3 group-hover:text-gold transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {condition.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {condition.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                      Learn More
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h2 
            className="text-2xl md:text-3xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Not Sure Which Treatment Is Right for You?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Book a consultation with one of our expert practitioners who will assess your concerns and recommend the best treatment options
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
