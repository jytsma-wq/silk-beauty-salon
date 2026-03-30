import LegalPage from '../TermsPage';
import type { Locale } from '@/types/types';

export default function TermsOfUse(props: { params: Promise<{ locale: Locale }> }) {
  return <LegalPage {...props} pageType="terms" />;
}
