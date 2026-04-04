import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Tag, Percent } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Special Offers | Harley Street Injectables',
  description: 'Discover our latest special offers and promotions on premium aesthetic treatments.',
};

export default function OffersPage() {
  const offers = [
    {
      title: 'New Client Special',
      description: 'Book your first consultation and receive 20% off your first treatment.',
      discount: '20% OFF',
      terms: 'Valid for new clients only. Cannot be combined with other offers.',
      highlight: true,
    },
    {
      title: 'Anti-Wrinkle Package',
      description: 'Book 3 areas of anti-wrinkle treatment and save.',
      discount: 'Save £100',
      terms: 'Valid for 3 areas treated in the same session.',
      highlight: false,
    },
    {
      title: 'Dermal Filler Bundle',
      description: 'Book 2ml or more of dermal filler and receive complimentary skin booster.',
      discount: 'Free Skin Booster',
      terms: 'Limited time offer. Subject to availability.',
      highlight: false,
    },
    {
      title: 'Referral Reward',
      description: 'Refer a friend and you both receive £50 credit towards your next treatment.',
      discount: '£50 Credit',
      terms: 'Referred friend must complete a treatment.',
      highlight: false,
    },
    {
      title: 'Seasonal Skin Refresh',
      description: 'Combine any laser treatment with a medical facial for 15% off both.',
      discount: '15% OFF',
      terms: 'Both treatments must be booked in the same month.',
      highlight: false,
    },
    {
      title: 'Loyalty Programme',
      description: 'Join our loyalty programme and earn points on every treatment.',
      discount: 'Earn Points',
      terms: 'Points can be redeemed towards future treatments.',
      highlight: false,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Special Offers
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Take advantage of our exclusive promotions and special offers
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
            <span className="text-primary font-medium">Offers</span>
          </nav>
        </div>
      </div>

      {/* Offers Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`relative bg-white border rounded-lg overflow-hidden card-hover ${
                  offer.highlight ? 'border-gold' : 'border-border'
                }`}
              >
                {offer.highlight && (
                  <div className="absolute top-4 right-4">
                    <Tag className="w-6 h-6 text-gold" />
                  </div>
                )}
                <div className={`p-6 ${offer.highlight ? 'bg-gold/5' : ''}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <Percent className={`w-5 h-5 ${offer.highlight ? 'text-gold' : 'text-primary'}`} />
                    <span className="text-sm font-medium text-gold">{offer.discount}</span>
                  </div>
                  <h3 
                    className="text-xl font-serif font-semibold text-primary mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {offer.description}
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    {offer.terms}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary rounded-lg p-8 text-center">
            <h2 
              className="text-2xl font-serif font-semibold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book Your Treatment Today
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Contact us to book your consultation and take advantage of these exclusive offers
            </p>
            <Button asChild className="btn-gold">
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              All offers are subject to availability and may be withdrawn at any time. 
              Offers cannot be combined unless otherwise stated. 
              Please mention the offer when booking.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
