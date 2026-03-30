'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import ImagePlaceholder from '@/components/shared/ImagePlaceholder';

const HERO_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80', alt: 'Silk Beauty Salon' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', alt: 'Beauty treatment' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', alt: 'Nail art' },
];

export default function HeroSection({ locale }: { locale: string }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Subtle champagne gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #FFFBF5 0%, #FDF6E9 50%, #FFFBF5 100%)',
        }}
      />

      {/* Elegant decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #14b8a6 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, #C9A96E 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Soft glow orbs - teal and gold */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
        style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
        style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }} />

      <div className="container mx-auto max-w-7xl px-6 relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-400/5 mb-8"
            >
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-400/80 text-xs tracking-widest uppercase font-medium">
                Luxury Beauty · Batumi, Georgia
              </span>
            </motion.div>

            <h1
              className="font-display font-bold mb-6 leading-none"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                background: 'linear-gradient(135deg, #f5e6d0 0%, #C9A96E 50%, #f5e6d0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Where Beauty
              <br />
              Meets Mastery
            </h1>

            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-md">
              World-class aesthetic medicine, lash artistry, hair colour, and nail design — performed by internationally certified specialists.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-stone-900 transition-all hover:scale-105 active:scale-100"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
              >
                Book Appointment
                <ArrowRight size={16} />
              </Link>
              <a
                href={buildWhatsAppLink('Hello! I\'d like to book an appointment at Silk Beauty.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-stone-300 border border-stone-700 hover:border-stone-500 hover:text-stone-100 transition-all"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Trust stats */}
            <div className="flex gap-10 mt-12 pt-10 border-t border-stone-800">
              {[
                { value: '200+', label: 'Happy Clients' },
                { value: '6+',   label: 'Specialists' },
                { value: '40+',  label: 'Treatments' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-display font-bold" style={{ color: '#C9A96E' }}>{s.value}</div>
                  <div className="text-stone-600 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[560px] hidden lg:block"
          >
            {/* Main image - top right */}
            <div className="absolute top-0 right-0 w-72 h-80 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
              <ImagePlaceholder
                alt={HERO_IMAGES[0].alt}
                aspectRatio="portrait"
                className="w-full h-full"
              />
            </div>
            
            {/* Second image - bottom left */}
            <div 
              className="absolute bottom-8 left-0 w-64 h-64 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl"
              style={{ zIndex: 2 }}
            >
              <ImagePlaceholder
                alt={HERO_IMAGES[1].alt}
                aspectRatio="square"
                className="w-full h-full"
              />
            </div>
            
            {/* Third image - middle */}
            <div 
              className="absolute top-36 left-20 w-52 h-52 rounded-2xl overflow-hidden border border-stone-800 shadow-xl"
              style={{ zIndex: 1 }}
            >
              <ImagePlaceholder
                alt={HERO_IMAGES[2].alt}
                aspectRatio="square"
                className="w-full h-full"
              />
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-28 right-4 p-4 rounded-2xl border border-amber-400/20 backdrop-blur-sm shadow-xl"
              style={{ background: 'rgba(13,10,8,0.85)', zIndex: 3 }}
            >
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-white text-xs font-medium">"Absolutely flawless results"</p>
              <p className="text-stone-500 text-xs mt-0.5">— Maria K., Tbilisi</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0d0a08)' }}
      />
    </section>
  );
}
