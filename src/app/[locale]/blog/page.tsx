import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Blog | Silk Beauty Salon',
  description: 'Read our latest articles on aesthetic treatments, skincare tips, and industry insights.',
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const blogPosts = [
    {
      title: 'The Ultimate Guide to Anti-Wrinkle Treatments',
      slug: 'ultimate-guide-anti-wrinkle',
      excerpt: 'Everything you need to know about anti-wrinkle injections, from how they work to what to expect during your treatment.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
      category: 'Treatments',
      date: 'January 15, 2024',
      readTime: '5 min read',
    },
    {
      title: '5 Signs You Might Benefit from Dermal Fillers',
      slug: 'signs-you-need-dermal-fillers',
      excerpt: 'Dermal fillers can address various concerns. Here are the top signs that this treatment might be right for you.',
      image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
      category: 'Dermal Fillers',
      date: 'January 8, 2024',
      readTime: '4 min read',
    },
    {
      title: 'Winter Skincare: Protecting Your Skin This Season',
      slug: 'winter-skincare-tips',
      excerpt: 'Cold weather can be harsh on your skin. Discover our top tips for maintaining a healthy, glowing complexion all winter long.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      category: 'Skincare',
      date: 'December 20, 2023',
      readTime: '3 min read',
    },
    {
      title: 'What to Expect at Your First Consultation',
      slug: 'first-consultation-guide',
      excerpt: "Nervous about your first visit? Here's a complete guide to what happens during your initial consultation with us.",
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
      category: 'Patient Guide',
      date: 'December 12, 2023',
      readTime: '4 min read',
    },
    {
      title: 'The Benefits of Combining Treatments',
      slug: 'combining-treatments-benefits',
      excerpt: 'Learn how combining different treatments can enhance your results and help you achieve your aesthetic goals.',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80',
      category: 'Treatments',
      date: 'December 5, 2023',
      readTime: '5 min read',
    },
    {
      title: 'Understanding Laser Skin Treatments',
      slug: 'understanding-laser-treatments',
      excerpt: 'From IPL to fractional lasers, we break down the different types of laser treatments and their benefits.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      category: 'Laser',
      date: 'November 28, 2023',
      readTime: '6 min read',
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
            {t('title')}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold">
              {tCommon('home')}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">{t('breadcrumb')}</span>
          </nav>
        </div>
      </div>

      {/* Blog Posts */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group bg-white border border-border rounded-lg overflow-hidden card-hover">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-primary text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 
                    className="text-lg font-serif font-semibold text-primary mb-2 group-hover:text-gold transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                  >
                    {tCommon('readMore')}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom text-center">
          <h2 
            className="text-2xl font-serif font-semibold text-primary mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('stayUpdated')}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('newsletterDesc')}
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 btn-gold px-6 py-3 rounded-md text-primary font-medium hover:bg-gold/90 transition-colors"
          >
            {t('subscribeButton')}
          </Link>
        </div>
      </section>
    </>
  );
}
