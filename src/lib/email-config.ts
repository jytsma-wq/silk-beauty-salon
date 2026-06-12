/**
 * Email Configuration - Single source of truth
 * Domain: silkbeautysalon.online
 * Provider: Hostinger Email via SMTP
 */
const fromAddress = process.env.SMTP_FROM || 'info@silkbeautysalon.online';

export const emailConfig = {
  /** Sender address for transactional emails */
  from: fromAddress,
  /** Admin inbox that receives booking/contact notifications */
  adminTo: process.env.CONTACT_EMAIL || 'info@silkbeautysalon.online',
  /** Public reply-to address */
  replyTo: 'info@silkbeautysalon.online',
  /** Domain used for sender */
  domain: 'silkbeautysalon.online' as const,
  /** Clinic display name */
  clinicName: 'Silk Beauty Salon' as const,
  /** SMTP is configured when the mailbox password exists */
  isConfigured: !!process.env.SMTP_PASSWORD,
} as const;

/** Helper: create a branded sender string for SMTP mail. */
export function senderAddress(name?: string): string {
  return `${name || emailConfig.clinicName} <${emailConfig.from}>`;
}
