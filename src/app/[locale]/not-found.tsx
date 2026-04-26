import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl font-serif font-semibold text-primary mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-gold">
            <Link href="/">
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact-us">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
