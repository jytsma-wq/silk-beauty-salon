import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { emailConfig } from '@/lib/email-config';

interface NewsletterWelcomeProps {
  email: string;
  locale: string;
}

const colors = {
  dark: '#241f1b',
  warm: '#f7f4f0',
  accent: '#8d6f58',
  red: '#b5453a',
  body: '#3a3430',
  border: '#e8e4df',
};

export function NewsletterWelcomeEmail({ email, locale }: NewsletterWelcomeProps) {
  const unsubscribeUrl = `https://${emailConfig.domain}/api/newsletter?unsubscribe=${encodeURIComponent(email)}`;

  return (
    <Html lang={locale || 'en'}>
      <Head />
      <Preview>Welcome to {emailConfig.clinicName}</Preview>
      <Body style={{ backgroundColor: colors.warm, fontFamily: 'Calibri, Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', border: `1px solid ${colors.border}` }}>
          <Section style={{ backgroundColor: colors.dark, padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: '24px', fontWeight: 300, margin: 0 }}>
              {emailConfig.clinicName}
            </Heading>
          </Section>

          <Section style={{ padding: '40px' }}>
            <Heading style={{ color: colors.dark, fontSize: '20px', fontWeight: 400, marginBottom: '24px' }}>
              Welcome to our newsletter
            </Heading>
            <Text style={{ color: colors.body, fontSize: '16px', lineHeight: '24px' }}>
              Thank you for joining {emailConfig.clinicName}. You will receive treatment updates, clinic news, and selected beauty insights from our team.
            </Text>
            <Section style={{ backgroundColor: colors.warm, padding: '24px', borderRadius: '4px', margin: '24px 0' }}>
              <Text style={{ color: colors.accent, fontSize: '14px', fontWeight: 'bold', margin: '0 0 12px' }}>
                What to expect
              </Text>
              <Text style={{ color: colors.body, fontSize: '14px', lineHeight: '22px', margin: 0 }}>
                New treatment notes, seasonal offers, skincare guidance, and occasional salon announcements.
              </Text>
            </Section>
            <Hr style={{ borderColor: colors.border, margin: '24px 0' }} />
            <Text style={{ color: '#6b5e52', fontSize: '12px', lineHeight: '18px' }}>
              You are receiving this because {email} subscribed on our website. You can unsubscribe here: <a href={unsubscribeUrl} style={{ color: colors.red }}>unsubscribe</a>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
