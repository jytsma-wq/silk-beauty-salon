import LegalPage from '../TermsPage';
import type { Locale } from '@/types/types';

export default function PrivacyPolicy(props: { params: Promise<{ locale: Locale }> }) {
  return <LegalPage {...props} pageType="privacy" />;
}
