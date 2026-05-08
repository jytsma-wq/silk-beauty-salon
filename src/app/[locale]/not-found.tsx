import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default async function NotFound() {
  // Use default locale for not-found since we don't have access to params
  const locale = routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'notFound' });

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
          {t('title', { defaultValue: 'Page Not Found' })}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t('description', { defaultValue: "Sorry, we couldn't find the page you're looking for. It might have been moved or deleted." })}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-gold">
            <Link href={`/${locale}`}>
              {t('goHome', { defaultValue: 'Go Home' })}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${locale}/contact-us`}>
              {t('contactUs', { defaultValue: 'Contact Us' })}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
