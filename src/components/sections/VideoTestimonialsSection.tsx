'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { VideoGallery } from '@/components/media/VideoGallery';
import { testimonialVideos } from '@/data/media';
import { Quote } from 'lucide-react';

export function VideoTestimonialsSection() {
  const t = useTranslations('testimonials');

  return (
    <section className="section-spacing bg-[#1c1c1c]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-2 mb-6"
          >
            <Quote className="w-6 h-6 text-[#b5453a]" />
            <span className="text-[0.625rem] tracking-[0.3em] uppercase text-white/60">
              {t('sectionLabel', { defaultValue: 'Client Stories' })}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6"
          >
            {t('title', { defaultValue: 'Hear from Our Clients' })}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            {t('description', { 
              defaultValue: 'Real stories from real clients who have transformed their look and confidence with us.' 
            })}
          </motion.p>
        </div>

        {/* Video Gallery */}
        <VideoGallery 
          videos={testimonialVideos} 
          columns={3}
          showCategory={false}
        />

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '5000+', label: t('stats.clients', { defaultValue: 'Happy Clients' }) },
            { number: '4.9/5', label: t('stats.rating', { defaultValue: 'Average Rating' }) },
            { number: '98%', label: t('stats.recommend', { defaultValue: 'Would Recommend' }) },
            { number: '15+', label: t('stats.years', { defaultValue: 'Years Experience' }) },
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="font-serif text-3xl md:text-4xl text-[#b5453a]">
                {stat.number}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
