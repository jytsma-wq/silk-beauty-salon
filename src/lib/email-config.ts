/**
 * Email Configuration - Single source of truth
 * Domain: silkbeautysalon.online
 * Provider: Resend (https://resend.com)
 */
export const emailConfig = {
  /** Sender address for transactional emails */
  from: 'Silk Beauty Salon <noreply@silkbeautysalon.online>' as const,
  /** Admin inbox that receives booking/contact notifications */
  adminTo: process.env.CONTACT_EMAIL || 'info@silkbeautysalon.online',
  /** Public reply-to address */
  replyTo: 'info@silkbeautysalon.online' as const,
  /** Domain used for sender */
  domain: 'silkbeautysalon.online' as const,
  /** Clinic display name */
  clinicName: 'Silk Beauty Salon' as const,
  /** Resend is configured when API key exists */
  isConfigured: !!process.env.RESEND_API_KEY,
} as const;

/** Helper: create a branded sender string for Resend */
export function senderAddress(name?: string): string {
  return `${name || emailConfig.clinicName} <noreply@${emailConfig.domain}>`;
}
