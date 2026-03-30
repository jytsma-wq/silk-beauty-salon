'use client';

const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80', alt: 'Salon interior' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80', alt: 'Hair treatment' },
  { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80', alt: 'Skin treatment' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80', alt: 'Nail art' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80', alt: 'Makeup' },
  { src: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80', alt: 'Lash treatment' },
  { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80', alt: 'Facial treatment' },
  { src: 'https://images.unsplash.com/photo-1629425703571-61e5f2952beb?w=400&q=80', alt: 'Hair color' },
];

export default function LookbookMarquee() {
  // Duplicate images for seamless loop
  const doubled = [...IMAGES, ...IMAGES];

  return (
    <section className="py-20 overflow-hidden bg-white">
      <div className="text-center mb-10">
        <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-3">Lookbook</p>
        <h2
          className="font-display font-bold text-gray-900"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          }}
        >
          Our Work
        </h2>
      </div>

      {/* Marquee strip */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />

        <div
          className="flex gap-4"
          style={{
            animation: 'marquee 30s linear infinite',
            width: 'max-content',
          }}
        >
          {doubled.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
