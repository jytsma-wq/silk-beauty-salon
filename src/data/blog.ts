import { db } from '@/lib/db';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  locale: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostSummary {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  createdAt: Date;
}

/**
 * Fetch all published blog posts for a given locale
 */
export async function getBlogPosts(locale: string): Promise<BlogPostSummary[]> {
  const posts = await db.blogPost.findMany({
    where: {
      locale,
      published: true,
    },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      image: true,
      category: true,
      author: true,
      readTime: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts;
}

/**
 * Fetch a single blog post by slug and locale
 */
export async function getBlogPostBySlug(
  slug: string,
  locale: string
): Promise<BlogPost | null> {
  const post = await db.blogPost.findUnique({
    where: {
      slug,
    },
  });

  // Return post if found and matches locale (or is default 'en')
  if (post && (post.locale === locale || post.locale === 'en')) {
    return post;
  }

  return null;
}

/**
 * Fetch all blog post slugs for static generation
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await db.blogPost.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
    },
  });

  return posts.map((post: { slug: string }) => post.slug);
}

/**
 * Fetch related blog posts (excluding the current one)
 */
export async function getRelatedBlogPosts(
  currentSlug: string,
  locale: string,
  limit: number = 3
): Promise<BlogPostSummary[]> {
  const posts = await db.blogPost.findMany({
    where: {
      locale,
      published: true,
      slug: {
        not: currentSlug,
      },
    },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      image: true,
      category: true,
      author: true,
      readTime: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });

  return posts;
}
