/**
 * GDPR Compliance Utilities
 * Implements data privacy requirements
 */

import { cookies } from 'next/headers';

// Cookie consent types
export type CookieConsentType = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean; // Always true, cannot be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

// Default consent (only necessary allowed)
export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  timestamp: new Date().toISOString(),
  version: '1.0',
};

const CONSENT_COOKIE_NAME = 'cookie-consent';
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Get user cookie consent
 * Server-side only
 */
export async function getCookieConsent(): Promise<CookieConsent> {
  try {
    const cookieStore = await cookies();
    const consentValue = cookieStore.get(CONSENT_COOKIE_NAME)?.value;
    
    if (consentValue) {
      return JSON.parse(consentValue) as CookieConsent;
    }
  } catch {
    // Cookie not available or invalid
  }
  
  return DEFAULT_CONSENT;
}

/**
 * Save user cookie consent
 * Server action
 */
export async function saveCookieConsent(consent: Partial<CookieConsent>): Promise<void> {
  'use server';
  
  const fullConsent: CookieConsent = {
    ...DEFAULT_CONSENT,
    ...consent,
    necessary: true, // Always true
    timestamp: new Date().toISOString(),
  };
  
  const cookieStore = await cookies();
  cookieStore.set(CONSENT_COOKIE_NAME, JSON.stringify(fullConsent), {
    maxAge: CONSENT_COOKIE_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Check if specific cookie type is allowed
 */
export async function isCookieAllowed(type: CookieConsentType): Promise<boolean> {
  const consent = await getCookieConsent();
  return consent[type];
}

/**
 * Data retention policy configuration
 */
export const DATA_RETENTION_DAYS = {
  contactForm: 365, // 1 year
  booking: 365, // 1 year
  newsletter: 2555, // 7 years
  analytics: 730, // 2 years
} as const;

/**
 * Check if data should be retained based on retention policy
 */
export function shouldRetainData(
  dataType: keyof typeof DATA_RETENTION_DAYS,
  createdAt: Date
): boolean {
  const retentionDays = DATA_RETENTION_DAYS[dataType];
  const retentionDate = new Date(createdAt);
  retentionDate.setDate(retentionDate.getDate() + retentionDays);
  
  return new Date() <= retentionDate;
}

/**
 * Get data retention expiration date
 */
export function getDataRetentionDate(
  dataType: keyof typeof DATA_RETENTION_DAYS,
  createdAt: Date
): Date {
  const retentionDays = DATA_RETENTION_DAYS[dataType];
  const expirationDate = new Date(createdAt);
  expirationDate.setDate(expirationDate.getDate() + retentionDays);
  return expirationDate;
}

/**
 * PII (Personally Identifiable Information) field definitions
 */
export const PII_FIELDS = [
  'email',
  'phone',
  'name',
  'firstName',
  'lastName',
  'address',
  'ipAddress',
  'userAgent',
] as const;

export type PIIField = typeof PII_FIELDS[number];

/**
 * Check if a field contains PII
 */
export function isPIIField(field: string): field is PIIField {
  return PII_FIELDS.includes(field as PIIField);
}

/**
 * Data subject rights request types (GDPR Article 15-22)
 */
export type DataSubjectRequestType = 
  | 'access'      // Article 15 - Right of access
  | 'rectification' // Article 16 - Right to rectification
  | 'erasure'     // Article 17 - Right to erasure (right to be forgotten)
  | 'restriction' // Article 18 - Right to restriction of processing
  | 'portability' // Article 20 - Right to data portability
  | 'objection';  // Article 21 - Right to object

export interface DataSubjectRequest {
  id: string;
  type: DataSubjectRequestType;
  email: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestedAt: Date;
  completedAt?: Date;
  data?: unknown;
  rejectionReason?: string;
}

/**
 * Validate data subject request
 */
export function validateDataSubjectRequest(
  request: Partial<DataSubjectRequest>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!request.type) {
    errors.push('Request type is required');
  }
  
  if (!request.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(request.email)) {
    errors.push('Invalid email format');
  }
  
  const validTypes: DataSubjectRequestType[] = [
    'access', 'rectification', 'erasure', 'restriction', 'portability', 'objection'
  ];
  if (request.type && !validTypes.includes(request.type)) {
    errors.push('Invalid request type');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * GDPR compliance checklist for auditing
 */
export const GDPR_CHECKLIST = {
  dataProcessing: [
    'Lawful basis for processing documented',
    'Consent records maintained',
    'Privacy notice up to date',
    'Data minimization implemented',
  ],
  dataSubjectRights: [
    'Access request process documented',
    'Rectification process implemented',
    'Erasure process implemented',
    'Portability process implemented',
    'Objection handling process documented',
  ],
  security: [
    'Encryption at rest implemented',
    'Encryption in transit enforced',
    'Access controls in place',
    'Security incident response plan',
  ],
  thirdParties: [
    'Data processing agreements signed',
    'International transfers documented',
    'Sub-processor list maintained',
  ],
  documentation: [
    'Records of processing activities',
    'Privacy impact assessments',
    'Data retention schedule',
    'Breach notification procedure',
  ],
} as const;

/**
 * Check GDPR compliance status
 */
export function checkComplianceStatus(
  completedItems: Record<string, string[]>
): { score: number; missing: string[] } {
  let total = 0;
  let completed = 0;
  const missing: string[] = [];
  
  for (const [category, items] of Object.entries(GDPR_CHECKLIST)) {
    total += items.length;
    const categoryCompleted = completedItems[category] || [];
    completed += categoryCompleted.length;
    
    for (const item of items) {
      if (!categoryCompleted.includes(item)) {
        missing.push(`${category}: ${item}`);
      }
    }
  }
  
  const score = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { score, missing };
}

/**
 * Generate privacy notice content
 */
export function generatePrivacyNotice(
  companyName: string,
  contactEmail: string,
  dataTypes: string[]
): string {
  return `
# Privacy Notice

## Who We Are
${companyName} is committed to protecting your personal data.

## Data We Collect
We collect the following types of data:
${dataTypes.map(type => `- ${type}`).join('\n')}

## How We Use Your Data
- To provide our services
- To communicate with you
- To improve our services
- To comply with legal obligations

## Your Rights
Under GDPR, you have the right to:
- Access your personal data
- Rectify inaccurate data
- Erase your data (right to be forgotten)
- Restrict processing
- Data portability
- Object to processing

## Contact Us
For data protection inquiries: ${contactEmail}
`;
}
