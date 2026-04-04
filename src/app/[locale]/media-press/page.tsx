import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Press & Media | Harley Street Injectables',
  description: 'Read our latest press coverage and media features.',
};

export default function MediaPressPage() {
  const pressFeatures = [
    {
      publication: 'Vogue',
      title: 'The Best Aesthetic Clinics in London',
      date: 'January 2024',
      excerpt: 'Harley Street Injectables is named as one of the top aesthetic clinics in London...',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80',
    },
    {
      publication: 'Grazia',
      title: 'The Ultimate Guide to Non-Surgical Treatments',
      date: 'December 2023',
      excerpt: 'Expert advice from the team at Harley Street Injectables on the latest treatments...',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    },
    {
      publication: 'Tatler',
      title: 'Top Beauty Clinics to Visit This Year',
      date: 'November 2023',
      excerpt: 'Discover why Harley Street Injectables continues to be a go-to destination...',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    },
    {
      publication: 'Vanity Fair',
      title: 'The Rise of Natural-Looking Aesthetics',
      date: 'October 2023',
      excerpt: 'How leading clinics like Harley Street Injectables are changing the approach...',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80',
    },
    {
      publication: 'Harper\'s Bazaar',
      title: 'Expert Tips for Your First Treatment',
      date: 'September 2023',
      excerpt: 'The experts at Harley Street Injectables share their advice for newcomers...',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    },
    {
      publication: 'Elle',
      title: 'The Treatments Everyone Is Talking About',
      date: 'August 2023',
      excerpt: 'From skin boosters to laser treatments, we explore the most popular procedures...',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80',
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
            Press & Media
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Read our latest press coverage and media features
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
            <span className="text-primary font-medium">Press & Media</span>
          </nav>
        </div>
      </div>

      {/* Press Features */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressFeatures.map((feature, index) => (
              <article key={index} className="group bg-white border border-border rounded-lg overflow-hidden card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-primary text-xs font-semibold px-3 py-1 rounded-full">
                      {feature.publication}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{feature.date}</p>
                  <h3 
                    className="text-lg font-serif font-semibold text-primary mb-2 group-hover:text-gold transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {feature.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                  >
                    Read Article
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Enquiries */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 
              className="text-2xl font-serif font-semibold text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Media Enquiries
            </h2>
            <p className="text-muted-foreground mb-6">
              For press and media enquiries, please contact our team at{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-gold hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
            <Button asChild variant="outline">
              <a href={`mailto:${siteConfig.contact.email}`}>
                Contact Press Team
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
