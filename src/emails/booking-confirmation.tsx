import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface BookingConfirmationProps {
  patientName: string;
  service: string;
  date: string;
  time: string;
  practitionerName?: string;
  clinicName?: string;
  clinicAddress?: string;
}

const colors = {
  dark: '#241f1b',
  warm: '#f7f4f0',
  accent: '#8d6f58',
  body: '#3a3430',
  border: '#e8e4df',
};

export function BookingConfirmationEmail({
  patientName,
  service,
  date,
  time,
  practitionerName = 'our team',
  clinicName = 'Silk Beauty Salon',
  clinicAddress = 'Zurab Gorgiladze 63, Batumi 6000, Georgia',
}: BookingConfirmationProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your appointment at {clinicName} is confirmed</Preview>
      <Body style={{ backgroundColor: colors.warm, fontFamily: 'Calibri, Arial, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', border: `1px solid ${colors.border}` }}>
          <Section style={{ backgroundColor: colors.dark, padding: '32px 40px' }}>
            <Heading style={{ color: '#ffffff', fontSize: '24px', fontWeight: 300, margin: 0 }}>
              {clinicName}
            </Heading>
          </Section>

          <Section style={{ padding: '40px' }}>
            <Heading style={{ color: colors.dark, fontSize: '20px', fontWeight: 400, marginBottom: '24px' }}>
              Appointment Confirmed
            </Heading>
            <Text style={{ color: colors.body, fontSize: '16px', lineHeight: '24px' }}>
              Dear {patientName},
            </Text>
            <Text style={{ color: colors.body, fontSize: '16px', lineHeight: '24px' }}>
              Your appointment has been confirmed. We look forward to seeing you.
            </Text>

            <Section style={{ backgroundColor: colors.warm, padding: '24px', borderRadius: '4px', margin: '24px 0' }}>
              <Row>
                <Column style={{ fontWeight: 'bold', width: '120px', color: colors.accent }}>Treatment</Column>
                <Column style={{ color: colors.dark }}>{service}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: 'bold', width: '120px', color: colors.accent, paddingTop: '12px' }}>Date</Column>
                <Column style={{ color: colors.dark, paddingTop: '12px' }}>{date}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: 'bold', width: '120px', color: colors.accent, paddingTop: '12px' }}>Time</Column>
                <Column style={{ color: colors.dark, paddingTop: '12px' }}>{time}</Column>
              </Row>
              <Row>
                <Column style={{ fontWeight: 'bold', width: '120px', color: colors.accent, paddingTop: '12px' }}>Practitioner</Column>
                <Column style={{ color: colors.dark, paddingTop: '12px' }}>{practitionerName}</Column>
              </Row>
            </Section>

            <Hr style={{ borderColor: colors.border, margin: '24px 0' }} />
            <Text style={{ color: '#6b5e52', fontSize: '14px', lineHeight: '20px' }}>
              If you need to reschedule or cancel, please contact us at least 48 hours in advance.
            </Text>
          </Section>

          <Section style={{ backgroundColor: colors.warm, padding: '24px 40px' }}>
            <Text style={{ color: colors.accent, fontSize: '12px', margin: 0 }}>
              {clinicName} | {clinicAddress}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
