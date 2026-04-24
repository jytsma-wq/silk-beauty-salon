import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { JsonLd, generateBreadcrumbSchema } from '@/components/seo/JsonLd';
import { getBlogPostBySlug, getAllBlogSlugs, getRelatedBlogPosts } from '@/data/blog';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Silk Beauty Salon Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  
  const post = await getBlogPostBySlug(slug, locale);
  const relatedPosts = await getRelatedBlogPosts(slug, locale, 3);
  
  if (!post) {
    return (
      <div className="section-spacing text-center">
        <h1 className="text-2xl font-serif text-primary">Post not found</h1>
        <Link href="/blog" className="text-gold hover:underline mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tCommon('home'), url: siteConfig.url },
    { name: t('breadcrumb'), url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
  ]);

  // Parse FAQs from content if they exist (stored as JSON in a comment or separate field)
  // For now, we'll skip FAQ schema generation since FAQs are not in the database schema

  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="relative h-100 min-h-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-end pb-12">
          <div className="container-custom">
            <div className="max-w-3xl">
              <span className="bg-gold text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                {post.category}
              </span>
              <h1 
                className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4"
                              >
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              </div>
            </div>
          </div>
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
            <Link href="/blog" className="text-muted-foreground hover:text-gold">
              {t('breadcrumb')}
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium truncate max-w-50">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backToBlog')}
              </Link>
              
              <article 
                className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  {t('shareArticle')}
                </h3>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${siteConfig.url}/blog/${slug}`)}&title=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author */}
              <div className="bg-secondary rounded-lg p-6 mb-6">
                <h3 className="font-serif text-lg text-primary mb-4">{t('aboutAuthor')}</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Expert Practitioner</p>
                  </div>
                </div>
              </div>

              {/* Book CTA */}
              <div className="bg-primary rounded-lg p-6 text-white mb-6">
                <h3 className="font-serif text-lg mb-2">{t('readyToTransform')}</h3>
                <p className="text-sm text-gray-300 mb-4">{t('bookConsultationDesc')}</p>
                <Button asChild className="btn-gold w-full">
                  <Link href="/book">{tCommon('bookConsultation')}</Link>
                </Button>
              </div>

              {/* Related Posts */}
              <div className="bg-secondary rounded-lg p-6">
                <h3 className="font-serif text-lg text-primary mb-4">{t('relatedPosts')}</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <h4 className="font-medium text-primary group-hover:text-gold transition-colors text-sm">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(relatedPost.createdAt).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
