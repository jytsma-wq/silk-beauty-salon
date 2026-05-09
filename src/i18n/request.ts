import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

function formatMissingMessage(key: string, namespace?: string) {
  const path = namespace ? `${namespace}.${key}` : key;
  const label = path.split('.').at(-1) ?? path;

  return label
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure valid locale
  const validLocales: readonly string[] = routing.locales;
  if (!locale || !validLocales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error: { code: string }) {
      if (error.code !== 'MISSING_MESSAGE') {
        console.error(error);
      }
    },
    getMessageFallback({
      key,
      namespace,
    }: {
      key: string;
      namespace?: string;
    }) {
      return formatMissingMessage(key, namespace);
    },
  };
});
