import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getBlogPosts } from '@/data/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });
  return {
    title: t('metaTitle', { defaultValue: 'Blog | Silk Beauty Salon' }),
    description: t('metaDescription', {
      defaultValue: 'Read our latest articles on aesthetic treatments, skincare tips, and industry insights.',
    }),
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
      <section className="bg-[#f7f2eb] pt-[170px] md:pt-[188px]">
        <div className="container-custom py-16 md:py-20">
          <nav className="mb-8 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-[#241f1b]">
              {tCommon('home')}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#241f1b]">{t('breadcrumb')}</span>
          </nav>

          <div className="max-w-4xl">
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8d6f58]">
              Journal
            </p>
            <h1 className="mb-6 font-sans text-[clamp(2.9rem,5.4vw,5.4rem)] font-light leading-[1.02] text-[#241f1b]">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-700">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group border-t border-[#e8e4df] py-8 transition-colors hover:border-[#8d6f58]"
              >
                <div className="mb-4">
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8d6f58]">
                    {post.category}
                  </span>
                </div>
                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mb-2 font-sans text-xl font-light text-[#241f1b] transition-colors group-hover:text-[#8d6f58]">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#8d6f58] hover:text-[#241f1b]"
                >
                  {tCommon('readMore')}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#f7f4f0]">
        <div className="container-custom text-center">
          <h2 className="mb-4 font-sans text-2xl font-light text-[#241f1b] md:text-3xl">
            {t('stayUpdated')}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">{t('newsletterDesc')}</p>
          <Link href="/#newsletter" className="btn-gold inline-flex items-center gap-2 px-6 py-3">
            {t('subscribeButton')}
          </Link>
        </div>
      </section>
    </>
  );
}
