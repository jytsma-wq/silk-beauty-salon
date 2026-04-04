'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterSection() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-white border-t border-border">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 
            className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('title')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('description')}
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-700 font-medium">
                {t('success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="btn-gold whitespace-nowrap">
                {t('subscribe')}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            {t('privacy')}
          </p>
        </div>
      </div>
    </section>
  );
}
