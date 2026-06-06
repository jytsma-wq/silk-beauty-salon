/**
 * Contact Form Component
 * React Hook Form with Zod validation
 */

'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactFormSchema, type ContactFormInput } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormSection, FormErrorSummary } from './form-field';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { apiPost, API_ENDPOINTS, ApiError } from '@/lib/api-client';
import { useClientCsrfToken } from '@/lib/csrf-client';

interface ContactFormProps {
  /** Optional callback on successful submission */
  onSuccess?: () => void;
}

/**
 * Contact Form Component
 * Uses React Hook Form with Zod validation
 */
export function ContactForm({ onSuccess }: ContactFormProps): React.JSX.Element {
  const t = useTranslations('contact');
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: '',
      consent: false,
    },
  });

  const consent = useWatch({ control, name: 'consent' });
  const subject = useWatch({ control, name: 'subject' });

  const csrfToken = useClientCsrfToken();

  async function onSubmit(data: ContactFormInput): Promise<void> {
    try {
      await apiPost(API_ENDPOINTS.contact, data, { csrfToken });
      toast({
        title: t('successTitle'),
        description: t('successMessage'),
      });
      reset();
      onSuccess?.();
    } catch (err) {
      const message = err instanceof ApiError
        ? err.isRateLimit()
          ? t('rateLimitMessage')
          : err.message
        : t('errorMessage');
      toast({
        title: t('errorTitle'),
        description: message,
        variant: 'destructive',
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormErrorSummary errors={errors} />
      
      <FormSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label={t('name')} required error={errors.name?.message}>
            <Input
              {...register('name')}
              placeholder={t('namePlaceholder')}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
            />
          </FormField>
          
          <FormField label={t('email')} required error={errors.email?.message}>
            <Input
              {...register('email')}
              type="email"
              placeholder={t('emailPlaceholder')}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label={t('phone')} error={errors.phone?.message}>
            <Input
              {...register('phone')}
              type="tel"
              placeholder={t('phonePlaceholder')}
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
            />
          </FormField>
          
          <FormField label={t('subject')} required error={errors.subject?.message}>
            <Select
              value={subject}
              onValueChange={(value) => setValue('subject', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger aria-invalid={!!errors.subject}>
                <SelectValue placeholder={t('subjectPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t('subjectGeneral')}</SelectItem>
                <SelectItem value="booking">{t('subjectBooking')}</SelectItem>
                <SelectItem value="treatment">{t('subjectTreatment')}</SelectItem>
                <SelectItem value="feedback">{t('subjectFeedback')}</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <FormField 
          label={t('message')} 
          required 
          error={errors.message?.message}
          description={t('messageDescription')}
        >
          <Textarea
            {...register('message')}
            placeholder={t('messagePlaceholder')}
            rows={5}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
          />
        </FormField>

        <FormField error={errors.consent?.message}>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked: boolean | 'indeterminate') => setValue('consent', checked === true)}
              disabled={isSubmitting}
            />
            <label
              htmlFor="consent"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              {t('consentText')}
            </label>
          </div>
        </FormField>
      </FormSection>

      <Button 
        type="submit" 
        disabled={isSubmitting || !consent || !csrfToken}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t('submit')}
          </>
        )}
      </Button>
    </form>
  );
}
