import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mb-8">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-gold">
            <Link href="/">
              {t('goHome')}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact-us">
              {t('contactUs')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
