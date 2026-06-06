'use client';

import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';

function formatMissingMessage(key: string, namespace?: string) {
  const path = namespace ? `${namespace}.${key}` : key;
  const label = path.split('.').at(-1) ?? path;

  return label
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ClientIntlProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Tbilisi"
      onError={(error) => {
        if (error.code !== 'MISSING_MESSAGE') {
          console.error(error);
        }
      }}
      getMessageFallback={({ key, namespace }) => formatMissingMessage(key, namespace)}
    >
      {children}
    </NextIntlClientProvider>
  );
}
