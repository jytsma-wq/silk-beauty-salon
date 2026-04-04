import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { treatmentCategories } from '@/data/treatments';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Price List | Harley Street Injectables',
  description: 'View our comprehensive treatment price list for all our aesthetic services.',
};

export default function PriceListPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Price List
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Transparent pricing for all our premium aesthetic treatments
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
            <span className="text-primary font-medium">Price List</span>
          </nav>
        </div>
      </div>

      {/* Price List Content */}
      <section className="section-spacing">
        <div className="container-custom">
          {/* Note */}
          <div className="bg-secondary rounded-lg p-6 mb-12">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Note:</strong> Prices are starting prices and may vary based on individual requirements. 
              A consultation is required to determine the exact treatment plan and cost. 
              All consultations include a comprehensive skin analysis and personalized treatment recommendations.
            </p>
          </div>

          {/* Categories */}
          {treatmentCategories.map((category) => (
            <div key={category.slug} className="mb-12">
              <h2 
                className="text-2xl font-serif font-semibold text-primary mb-6 pb-2 border-b border-border"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {category.name}
              </h2>
              <div className="bg-white rounded-lg border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-secondary">
                      <th className="text-left p-4 font-semibold">Treatment</th>
                      <th className="text-left p-4 font-semibold hidden sm:table-cell">Duration</th>
                      <th className="text-right p-4 font-semibold">Price From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.treatments.map((treatment, index) => (
                      <tr 
                        key={treatment.slug} 
                        className={`border-t border-border hover:bg-secondary/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="p-4">
                          <Link 
                            href={`/treatments/${treatment.slug}`}
                            className="text-primary hover:text-gold transition-colors font-medium"
                          >
                            {treatment.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {treatment.shortDescription}
                          </p>
                        </td>
                        <td className="p-4 text-muted-foreground hidden sm:table-cell">
                          {treatment.duration || '-'}
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-semibold text-gold">
                            {treatment.price || 'Enquire'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-primary rounded-lg p-8 text-center">
            <h2 
              className="text-2xl font-serif font-semibold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to Book?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Book a consultation to discuss your treatment goals and receive a personalized quote
            </p>
            <Button asChild className="btn-gold">
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
