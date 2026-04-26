import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/data/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });
  return {
    title: t('metaTitle', { defaultValue: 'Blog | Silk Beauty Salon' }),
    description: t('metaDescription', { defaultValue: 'Read our latest articles on aesthetic treatments, skincare tips, and industry insights.' }),
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'ka', 'ru', 'ar', 'he', 'tr'];
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const blogPosts = await getBlogPosts(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1c1c1c] py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
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
              <article key={post.slug} className="group py-8 border-t border-[#e8e4df] hover:border-[#b5453a] transition-colors">
                <div className="mb-4">
                  <span className="text-gold text-xs tracking-[0.15em] uppercase">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 
                  className="text-lg font-serif font-semibold text-primary mb-2 group-hover:text-gold transition-colors"
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom text-center">
          <h2 
            className="text-2xl font-serif font-semibold text-primary mb-4"
                      >
            {t('stayUpdated')}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {t('newsletterDesc')}
          </p>
          <Link
            href="/#newsletter"
            className="inline-flex items-center gap-2 btn-gold px-6 py-3 text-primary font-medium hover:bg-gold/90 transition-colors"
          >
            {t('subscribeButton')}
          </Link>
        </div>
      </section>
    </>
  );
}
