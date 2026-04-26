'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import type { TreatmentCategory } from '@/data/treatments';
import type { Condition } from '@/data/conditions';

interface MobileNavProps {
  onClose: () => void;
  treatmentCategories: TreatmentCategory[];
  conditions: Condition[];
}

// Animation variants for stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  }
};

export function MobileNav({ onClose, treatmentCategories, conditions }: MobileNavProps) {
  const t = useTranslations('nav');
  const tInternational = useTranslations('internationalNav');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex flex-col">
          <span className="font-serif text-xl font-semibold text-primary">
            Silk Beauty
          </span>
          <span className="text-xs text-[#b5453a] tracking-[0.2em] uppercase">
            Salon
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Navigation Content with stagger animations */}
      <motion.div
        className="flex-1 overflow-y-auto custom-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Treatments Section */}
        <motion.div className="border-b" variants={itemVariants}>
          <button
            onClick={() => setExpandedCategory(expandedCategory === 'treatments' ? null : 'treatments')}
            className="w-full flex items-center justify-between p-4 font-medium hover:bg-stone-50 transition-colors"
          >
            {t('treatments')}
            <motion.div
              animate={{ rotate: expandedCategory === 'treatments' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedCategory === 'treatments' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-4 px-4">
                  {treatmentCategories.map((category) => (
                    <div key={category.slug} className="mb-4">
                      <h4 className="font-serif text-sm font-semibold text-[#b5453a] mb-2">
                        {category.name}
                      </h4>
                      <ul className="space-y-1">
                        {category.treatments.map((treatment) => (
                          <li key={treatment.slug}>
                            <Link
                              href={`/treatments/${treatment.slug}`}
                              onClick={onClose}
                              className="block py-1 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                            >
                              {treatment.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Conditions Section */}
        <motion.div className="border-b" variants={itemVariants}>
          <button
            onClick={() => setExpandedCategory(expandedCategory === 'conditions' ? null : 'conditions')}
            className="w-full flex items-center justify-between p-4 font-medium hover:bg-stone-50 transition-colors"
          >
            {t('conditions')}
            <motion.div
              animate={{ rotate: expandedCategory === 'conditions' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedCategory === 'conditions' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-4 px-4">
                  <ul className="space-y-1">
                    {conditions.map((condition) => (
                      <li key={condition.slug}>
                        <Link
                          href={`/conditions/${condition.slug}`}
                          onClick={onClose}
                          className="block py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          {condition.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* International Clients Section */}
        <motion.div className="border-b" variants={itemVariants}>
          <button
            onClick={() => setExpandedCategory(expandedCategory === 'international' ? null : 'international')}
            className="w-full flex items-center justify-between p-4 font-medium hover:bg-stone-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#b5453a]" />
              {tInternational('main')}
            </span>
            <motion.div
              animate={{ rotate: expandedCategory === 'international' ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedCategory === 'international' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-4 px-4">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/international-clients"
                        onClick={onClose}
                        className="block py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        {tInternational('main')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/international-clients#packages"
                        onClick={onClose}
                        className="block py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        {tInternational('packages')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/international-clients#pricing"
                        onClick={onClose}
                        className="block py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        {tInternational('pricing')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/international-clients#faq"
                        onClick={onClose}
                        className="block py-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        {tInternational('faq')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Simple Links */}
        <motion.div variants={itemVariants}>
          <Link
            href="/pricelist"
            onClick={onClose}
            className="block p-4 font-medium hover:bg-stone-50 transition-colors border-b"
          >
            {t('pricelist')}
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            href="/offers"
            onClick={onClose}
            className="block p-4 font-medium hover:bg-stone-50 transition-colors border-b"
          >
            {t('offers')}
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            href="/contact-us"
            onClick={onClose}
            className="block p-4 font-medium hover:bg-stone-50 transition-colors border-b"
          >
            {t('contact')}
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            href="/faq"
            onClick={onClose}
            className="block p-4 font-medium hover:bg-stone-50 transition-colors border-b"
          >
            {t('faq')}
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="p-4 border-t bg-secondary">
        <Button
          asChild
          className="w-full bg-[#b5453a] hover:bg-[#8e3229] text-white rounded-none px-6 py-3 font-medium transition-colors text-xs tracking-widest uppercase"
        >
          <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
            {t('bookAppointment')}
          </a>
        </Button>
        <div className="mt-4 text-center">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
            className="text-sm text-muted-foreground hover:text-[#b5453a] transition-colors"
          >
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
