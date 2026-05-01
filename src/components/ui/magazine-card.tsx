'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface MagazineCardProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  href: string;
  label?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'video';
  className?: string;
}

function MagazineCard({
  image,
  title,
  subtitle,
  description,
  href,
  label,
  aspectRatio = 'portrait',
  className,
}: MagazineCardProps) {
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-4/5',
    landscape: 'aspect-16/9',
    video: 'aspect-video',
  };

  return (
    <article className={cn('group', className)}>
      <Link href={href} className="block">
        {/* Image Container */}
        <div className={cn('relative mb-6 overflow-hidden', aspectClasses[aspectRatio])}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating Label */}
          {label && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-stone-50/90 backdrop-blur-xs">
              <span className="text-xs uppercase tracking-widest text-stone-900">{label}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {subtitle && (
            <p className="text-xs uppercase tracking-widest text-stone-400">{subtitle}</p>
          )}
          <h3 className="text-xl md:text-2xl font-serif font-light text-stone-900 group-hover:text-[#b5453a] transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">{description}</p>
          )}
        </div>
      </Link>
    </article>
  );
}

// Magazine Article Card (for blog/content)
interface MagazineArticleCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
  href: string;
  date?: string;
  readTime?: string;
  className?: string;
}

function MagazineArticleCard({
  image,
  category,
  title,
  excerpt,
  href,
  date,
  readTime,
  className,
}: MagazineArticleCardProps) {
  return (
    <article className={cn('group grid md:grid-cols-2 gap-6 md:gap-10', className)}>
      <Link href={href} className="block relative aspect-4/5 md:aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>
      
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-widest text-[#b5453a] mb-3">{category}</p>
        <h3 className="text-2xl md:text-3xl font-serif font-light text-stone-900 mb-4 group-hover:text-stone-600 transition-colors">
          <Link href={href}>{title}</Link>
        </h3>
        <p className="text-stone-600 leading-relaxed mb-6">{excerpt}</p>
        
        <div className="flex items-center gap-4 text-xs text-stone-400 uppercase tracking-wider">
          {date && <span>{date}</span>}
          {date && readTime && <span className="w-1 h-1 bg-stone-300 rounded-full" />}
          {readTime && <span>{readTime}</span>}
        </div>
      </div>
    </article>
  );
}

export { MagazineCard, MagazineArticleCard };
export type { MagazineCardProps, MagazineArticleCardProps };
