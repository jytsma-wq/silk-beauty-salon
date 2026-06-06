/**
 * Accessibility Statement Page
 * WCAG 2.1 AA compliance statement
 */

import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'accessibility' });
  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function AccessibilityPage(): React.JSX.Element {
  const t = useTranslations('accessibility');

  return (
    <main id="main-content" className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>

      <section className="mb-10" aria-labelledby="commitment-heading">
        <h2 id="commitment-heading" className="text-2xl font-semibold mb-4">
          {t('commitmentTitle')}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t('commitmentText')}
        </p>
      </section>

      <section className="mb-10" aria-labelledby="standards-heading">
        <h2 id="standards-heading" className="text-2xl font-semibold mb-4">
          {t('standardsTitle')}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t('standardsText')}
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>{t('standardPerceivable')}</li>
          <li>{t('standardOperable')}</li>
          <li>{t('standardUnderstandable')}</li>
          <li>{t('standardRobust')}</li>
        </ul>
      </section>

      <section className="mb-10" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-2xl font-semibold mb-4">
          {t('featuresTitle')}
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{t('keyboardTitle')}</h3>
            <p className="text-muted-foreground">{t('keyboardText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t('screenReaderTitle')}</h3>
            <p className="text-muted-foreground">{t('screenReaderText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t('visualTitle')}</h3>
            <p className="text-muted-foreground">{t('visualText')}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t('motionTitle')}</h3>
            <p className="text-muted-foreground">{t('motionText')}</p>
          </div>
        </div>
      </section>

      <section className="mb-10" aria-labelledby="shortcuts-heading">
        <h2 id="shortcuts-heading" className="text-2xl font-semibold mb-4">
          {t('shortcutsTitle')}
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4">{t('shortcutAction')}</th>
              <th className="text-left py-2">{t('shortcutKeys')}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4">{t('shortcutSearch')}</td>
              <td className="py-2 font-mono">Ctrl + K</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">{t('shortcutNavigation')}</td>
              <td className="py-2 font-mono">Ctrl + N</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">{t('shortcutSkip')}</td>
              <td className="py-2 font-mono">Tab</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">{t('shortcutClose')}</td>
              <td className="py-2 font-mono">Escape</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-10" aria-labelledby="testing-heading">
        <h2 id="testing-heading" className="text-2xl font-semibold mb-4">
          {t('testingTitle')}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t('testingText')}
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>{t('testKeyboard')}</li>
          <li>{t('testScreenReader')}</li>
          <li>{t('testAutomated')}</li>
          <li>{t('testManual')}</li>
        </ul>
      </section>

      <section className="mb-10" aria-labelledby="feedback-heading">
        <h2 id="feedback-heading" className="text-2xl font-semibold mb-4">
          {t('feedbackTitle')}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {t('feedbackText')}
        </p>
        <a
          href="mailto:accessibility@silkbeautysalon.online"
          className="text-primary hover:underline font-medium"
        >
          accessibility@silkbeautysalon.online
        </a>
      </section>

      <section aria-labelledby="date-heading">
        <h2 id="date-heading" className="text-2xl font-semibold mb-4">
          {t('dateTitle')}
        </h2>
        <p className="text-muted-foreground">
          {t('dateText', { date: new Date().toLocaleDateString() })}
        </p>
      </section>
    </main>
  );
}
