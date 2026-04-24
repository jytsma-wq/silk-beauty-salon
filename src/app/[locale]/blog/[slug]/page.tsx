import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { JsonLd, generateFAQSchema, generateBreadcrumbSchema } from '@/components/seo/JsonLd';

// Blog post data (in production, this would come from a CMS)
const blogPosts: Record<string, {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  faqs?: Array<{ question: string; answer: string }>;
}> = {
  'ultimate-guide-anti-wrinkle': {
    title: 'The Ultimate Guide to Anti-Wrinkle Treatments',
    excerpt: 'Everything you need to know about anti-wrinkle injections, from how they work to what to expect during your treatment.',
    content: `
      <p>Anti-wrinkle treatments have become one of the most popular cosmetic procedures worldwide. At Silk Beauty Salon, we specialize in providing natural-looking results that help you look like the best version of yourself.</p>
      
      <h2>What Are Anti-Wrinkle Injections?</h2>
      <p>Anti-wrinkle injections use botulinum toxin type A to temporarily relax the muscles that cause wrinkles. When injected by a skilled practitioner, these treatments can smooth fine lines and prevent new wrinkles from forming.</p>
      
      <h2>Areas We Treat</h2>
      <ul>
        <li><strong>Forehead lines</strong> - Horizontal lines that appear when raising your eyebrows</li>
        <li><strong>Frown lines</strong> - Vertical lines between the eyebrows (glabella)</li>
        <li><strong>Crow's feet</strong> - Lines at the corners of the eyes</li>
        <li><strong>Bunny lines</strong> - Lines on the nose when scrunching</li>
        <li><strong>Chin dimpling</strong> - Orange peel texture on the chin</li>
        <li><strong>Masseter reduction</strong> - Jaw slimming and teeth grinding treatment</li>
      </ul>
      
      <h2>What to Expect During Your Treatment</h2>
      <p>Your treatment begins with a thorough consultation where we discuss your goals and assess your facial anatomy. The actual injection process takes only 10-15 minutes and involves minimal discomfort.</p>
      
      <h2>Results and Aftercare</h2>
      <p>You'll start to see results within 3-7 days, with full effects visible after 2 weeks. Results typically last 3-6 months. After your treatment, you should:</p>
      <ul>
        <li>Avoid lying flat for 4 hours</li>
        <li>Avoid strenuous exercise for 24 hours</li>
        <li>Avoid facials or massages for 48 hours</li>
        <li>Stay upright and avoid pressure on treated areas</li>
      </ul>
      
      <h2>Why Choose Silk Beauty Salon?</h2>
      <p>Our practitioners have extensive experience in anti-wrinkle treatments. We use only premium products and focus on achieving natural results that enhance your appearance without changing who you are.</p>
    `,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    category: 'Treatments',
    date: 'January 15, 2024',
    readTime: '5 min read',
    author: 'Dr. Nino Beridze',
    faqs: [
      { question: 'How long do anti-wrinkle injections last?', answer: 'Results typically last 3-6 months, depending on the individual and the area treated.' },
      { question: 'Is the treatment painful?', answer: 'Most patients describe the sensation as a small pinch. We can use numbing cream if preferred.' },
      { question: 'When will I see results?', answer: 'Initial results appear in 3-7 days, with full effects visible after 2 weeks.' },
    ],
  },
  'signs-you-need-dermal-fillers': {
    title: '5 Signs You Might Benefit from Dermal Fillers',
    excerpt: 'Dermal fillers can address various concerns. Here are the top signs that this treatment might be right for you.',
    content: `
      <p>Dermal fillers are one of the most versatile aesthetic treatments available. They can restore volume, smooth lines, and enhance your features with natural-looking results.</p>
      
      <h2>1. You\'ve Noticed Volume Loss in Your Cheeks</h2>
      <p>As we age, we lose fat and collagen in our cheeks, leading to a hollow or sunken appearance. Dermal fillers can restore this lost volume, creating a more youthful contour.</p>
      
      <h2>2. You Have Deep Nasolabial Folds</h2>
      <p>The lines that run from your nose to your mouth (nasolabial folds) become more pronounced with age. Fillers can soften these lines for a smoother appearance.</p>
      
      <h2>3. Your Lips Have Lost Definition</h2>
      <p>Whether you want to restore lost volume or enhance your natural lip shape, dermal fillers can create beautiful, natural-looking results.</p>
      
      <h2>4. You Have Marionette Lines</h2>
      <p>The lines running from the corners of your mouth to your chin can create a downturned expression. Fillers can lift these areas for a more refreshed look.</p>
      
      <h2>5. You Want Non-Surgical Facial Contouring</h2>
      <p>Fillers can enhance your jawline, chin, or cheekbones without surgery, providing definition and structure to your face.</p>
      
      <h2>Book a Consultation</h2>
      <p>The best way to determine if dermal fillers are right for you is to book a consultation with one of our expert practitioners.</p>
    `,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80',
    category: 'Dermal Fillers',
    date: 'January 8, 2024',
    readTime: '4 min read',
    author: 'Dr. Ketevan Maisuradze',
  },
  'winter-skincare-tips': {
    title: 'Winter Skincare: Protecting Your Skin This Season',
    excerpt: 'Cold weather can be harsh on your skin. Discover our top tips for maintaining a healthy, glowing complexion all winter long.',
    content: `
      <p>Winter can be challenging for your skin. Cold temperatures, low humidity, and indoor heating all contribute to dryness, irritation, and dullness.</p>
      
      <h2>1. Switch to a Gentler Cleanser</h2>
      <p>Winter skin needs more hydration. Switch from foaming cleansers to cream or oil-based formulas that won\'t strip your skin\'s natural oils.</p>
      
      <h2>2. Layer Your Hydration</h2>
      <p>Apply products from thinnest to thickest consistency: toner, serum, moisturizer, and finally, facial oil to seal everything in.</p>
      
      <h2>3. Don\'t Skip Sunscreen</h2>
      <p>UV rays are present year-round. Continue using SPF 30+ daily, even on cloudy winter days.</p>
      
      <h2>4. Consider Professional Treatments</h2>
      <p>Winter is the perfect time for treatments like HydraFacial, skin boosters, or chemical peels, as there\'s less sun exposure.</p>
      
      <h2>5. Use a Humidifier</h2>
      <p>Indoor heating dries out the air. A humidifier can help maintain moisture levels in your skin.</p>
      
      <h2>Professional Winter Treatments</h2>
      <p>At Silk Beauty Salon, we offer specialized winter skincare treatments including hydrating facials, skin boosters, and medical-grade skincare products.</p>
    `,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    category: 'Skincare',
    date: 'December 20, 2023',
    readTime: '3 min read',
    author: 'Mariam Gogia',
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
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
      publishedTime: post.date,
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
  
  const post = blogPosts[slug];
  
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

  const faqSchema = post.faqs ? generateFAQSchema(post.faqs) : null;

  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
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
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
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
            <span className="text-primary font-medium truncate max-w-[200px]">{post.title}</span>
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

              {/* FAQs */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="font-serif text-xl text-primary mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {post.faqs.map((faq, index) => (
                      <div key={index} className="bg-secondary rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  {Object.entries(blogPosts)
                    .filter(([s]) => s !== slug)
                    .slice(0, 3)
                    .map(([s, p]) => (
                      <Link
                        key={s}
                        href={`/blog/${s}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-primary group-hover:text-gold transition-colors text-sm">
                          {p.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{p.date}</p>
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
