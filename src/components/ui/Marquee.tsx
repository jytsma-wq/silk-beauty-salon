'use client';

interface MarqueeProps {
  items: string[];
  className?: string;
  separator?: string;
}

export function Marquee({ items, className = '', separator = '—' }: MarqueeProps) {
  const content = items.join(` ${separator} `);
  
  return (
    <div className={`bg-[#f7f4f0] py-4 overflow-hidden ${className}`}>
      <div className="marquee-track">
        <span className="text-xs tracking-[0.2em] uppercase text-[#9a9a9a] whitespace-nowrap px-8">
          {content} {separator} {content} {separator}
        </span>
        <span className="text-xs tracking-[0.2em] uppercase text-[#9a9a9a] whitespace-nowrap px-8">
          {content} {separator} {content} {separator}
        </span>
      </div>
    </div>
  );
}
