import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next/static files
    // - _next/image files
    // - favicon.ico
    // - public folder files
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
