'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function StatisticsStrip() {
  const t = useTranslations('statistics');

  const stats = [
    { number: '15+', label: t('years') },
    { number: '50K+', label: t('clients') },
    { number: '98%', label: t('satisfaction') },
    { number: '25', label: t('awards') },
  ];

  return (
    <section className="py-24 bg-[#f5f3ef]" style={{ background: '#f5f3ef' }}>
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="stat-display">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
