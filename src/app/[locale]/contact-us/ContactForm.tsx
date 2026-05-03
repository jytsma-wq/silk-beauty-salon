'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
  const t = useTranslations('contactPage');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [csrfToken, setCsrfToken] = useState<string>('');

  // Fetch CSRF token on mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        if (response.ok) {
          const data = await response.json();
          setCsrfToken(data.token);
        }
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    // Client-side validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = t('nameRequired');
    if (!formData.email.trim()) {
      errors.email = t('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t('emailInvalid');
    }
    if (!formData.message.trim()) errors.message = t('messageRequired');

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({ ...formData, locale, _csrf: csrfToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      // Announce error to screen readers
      const errorAnnouncement = document.getElementById('form-error-announcement');
      if (errorAnnouncement) {
        errorAnnouncement.textContent = err instanceof Error ? err.message : 'Failed to send message';
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 text-center border-t border-[#e8e4df]">
        <h3 className="text-xl font-semibold text-[#1c1c1c] mb-2">{t('thankYou')}</h3>
        <p className="text-[#6b6b6b]">
          {t('messageSent')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Global error announcement for screen readers */}
                  <div id="form-error-announcement" role="alert" aria-live="assertive" className="sr-only" />
                  
                  {error && (
                    <div 
                      className="p-4 border-t border-[#b5453a]"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="text-[#b5453a] text-sm" id="form-global-error">{error}</p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('fullName')} <span aria-label="required">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      placeholder={t('namePlaceholder')}
                    />
                    {fieldErrors.name && (
                      <span id="name-error" role="alert" aria-live="polite" className="text-red-600 text-sm mt-1 block">
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t('emailAddress')} <span aria-label="required">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                        }}
                        required
                        aria-required="true"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        placeholder={t('emailPlaceholder')}
                      />
                      {fieldErrors.email && (
                        <span id="email-error" role="alert" aria-live="polite" className="text-red-600 text-sm mt-1 block">
                          {fieldErrors.email}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {t('phoneNumber')}
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('phonePlaceholder')}
                        aria-describedby="phone-hint"
                      />
                      <span id="phone-hint" className="text-muted-foreground text-xs mt-1 block">
                        {t('phoneOptional')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('message')} <span aria-label="required">*</span>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                      }}
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      placeholder={t('messagePlaceholder')}
                      rows={5}
                    />
                    {fieldErrors.message && (
                      <span id="message-error" role="alert" aria-live="polite" className="text-red-600 text-sm mt-1 block">
                        {fieldErrors.message}
                      </span>
                    )}
                  </div>
                  <Button type="submit" className="btn-gold w-full sm:w-auto" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('sending')}
                      </>
                    ) : (
                      t('sendMessage')
                    )}
                  </Button>
                </form>
  );
}
