'use client';

interface PullQuoteProps {
  quote: string;
  author: string;
  className?: string;
}

export function PullQuote({ quote, author, className = '' }: PullQuoteProps) {
  return (
    <div className={`section-spacing ${className}`}>
      <div className="container-custom max-w-4xl mx-auto text-center">
        <div className="pull-quote">
          <blockquote className="font-serif text-2xl md:text-3xl font-normal leading-relaxed text-[#1c1c1c] mb-8">
            {quote}
          </blockquote>
          <cite className="text-xs tracking-[0.2em] uppercase text-[#9a9a9a] not-italic">
            {author}
          </cite>
        </div>
      </div>
    </div>
  );
}
