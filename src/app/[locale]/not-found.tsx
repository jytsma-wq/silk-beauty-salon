import { Link } from '@/i18n/routing';
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
          <Link
            href={`/${locale}`}
            className="btn-gold inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {t('goHome', { defaultValue: 'Go Home' })}
          </Link>
          <Link
            href={`/${locale}/contact-us`}
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {t('contactUs', { defaultValue: 'Contact Us' })}
          </Link>
        </div>
      </div>
    </div>
  );
}
