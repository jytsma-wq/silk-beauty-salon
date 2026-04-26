import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { ChevronRight, Clock, User } from 'lucide-react';
import { getBlogPosts } from '@/data/blog';

interface SkinTrendsSectionProps {
  locale: string;
  showAllLink?: boolean;
  maxItems?: number;
}

export async function SkinTrendsSection({
  locale,
  showAllLink = true,
  maxItems = 3
}: SkinTrendsSectionProps) {
  const t = await getTranslations('skinTrends');

  // Fetch real blog posts from database
  const blogPosts = await getBlogPosts(locale);
  const displayArticles = blogPosts.slice(0, maxItems);

  return (
    <section className="section-spacing section-warm">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left">
            <h2 className="heading-underline text-3xl md:text-4xl font-serif font-semibold text-primary tracking-tight mb-4">
              {t('title', { defaultValue: 'Skin Trends' })}
            </h2>
            <p className="font-sans text-muted-foreground max-w-2xl">
              {t('subtitle', { 
                defaultValue: 'Expert insights, treatment guides, and the latest in aesthetic medicine.' 
              })}
            </p>
          </div>
          {showAllLink && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#b5453a] font-medium hover:underline mt-4 md:mt-0"
            >
              {t('viewAll', { defaultValue: 'More skin trends' })}
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArticles.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden transition-opacity hover:opacity-80"
            >
              {/* Image */}
              <Link href={`/blog/${article.slug}`} className="block relative aspect-4/3 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="category-pill bg-[#b5453a] text-white text-xs px-3 py-1 rounded-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-primary mb-3 line-clamp-2 group-hover:text-[#b5453a] transition-colors">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {article.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </div>
                </div>

                {/* Hover line reveal */}
                <div className="w-0 group-hover:w-full h-px bg-[#b5453a] transition-all duration-500 mt-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
