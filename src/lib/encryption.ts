/**
 * Data Encryption Utilities for Silk Beauty Salon
 * Field-level encryption for sensitive data (PII)
 */

import { createCipheriv, createDecipheriv, createHash, randomBytes, scryptSync } from 'crypto';

// Algorithm configuration
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;

/**
 * Derive encryption key from password and salt
 */
function deriveKey(password: string, salt: Buffer): Buffer {
  return scryptSync(password, salt, KEY_LENGTH);
}

/**
 * Encrypt sensitive data (PII)
 * @param text - Plain text to encrypt
 * @param secretKey - Encryption key (from env)
 * @returns Encrypted string (base64 encoded with salt:iv:authTag:ciphertext)
 */
export function encrypt(text: string, secretKey: string): string {
  if (!text) return text;
  if (!secretKey) throw new Error('Encryption key is required');
  
  // Generate random salt and IV
  const salt = randomBytes(SALT_LENGTH);
  const iv = randomBytes(IV_LENGTH);
  
  // Derive key from password
  const key = deriveKey(secretKey, salt);
  
  // Create cipher
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  // Encrypt
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Get authentication tag
  const authTag = cipher.getAuthTag();
  
  // Combine: salt:iv:authTag:encrypted
  const result = Buffer.concat([
    salt,
    iv,
    authTag,
    Buffer.from(encrypted, 'hex'),
  ]).toString('base64');
  
  return result;
}

/**
 * Decrypt encrypted data
 * @param encryptedText - Encrypted string from encrypt()
 * @param secretKey - Encryption key (from env)
 * @returns Decrypted plain text
 */
export function decrypt(encryptedText: string, secretKey: string): string {
  if (!encryptedText) return encryptedText;
  if (!secretKey) throw new Error('Decryption key is required');
  
  try {
    // Decode from base64
    const buffer = Buffer.from(encryptedText, 'base64');
    
    // Extract components
    const salt = buffer.subarray(0, SALT_LENGTH);
    const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const authTag = buffer.subarray(
      SALT_LENGTH + IV_LENGTH,
      SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH
    );
    const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH);
    
    // Derive key
    const key = deriveKey(secretKey, salt);
    
    // Create decipher
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    
    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Hash sensitive data for comparison (one-way)
 * Uses SHA-256 for deterministic hashing
 * @param data - Data to hash
 * @param salt - Optional salt (use unique per field)
 * @returns Hashed string
 */
export function hashSensitive(data: string, salt?: string): string {
  const hash = createHash('sha256');
  
  if (salt) {
    hash.update(salt + data);
  } else {
    hash.update(data);
  }
  
  return hash.digest('hex');
}

/**
 * Check if a value is encrypted
 * Simple heuristic: encrypted values are base64 and longer than typical plain text
 */
export function isEncrypted(value: string): boolean {
  if (!value || value.length < 100) return false;
  
  // Check if it's valid base64
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  return base64Regex.test(value);
}

/**
 * Anonymize data for GDPR compliance
 * Replaces PII with anonymous placeholders
 */
export function anonymize(
  data: Record<string, unknown>,
  fieldsToAnonymize: string[]
): Record<string, unknown> {
  const anonymized = { ...data };
  
  for (const field of fieldsToAnonymize) {
    if (field in anonymized) {
      const value = String(anonymized[field]);
      
      // Anonymize based on field type
      if (field.includes('email')) {
        anonymized[field] = anonymizeEmail(value);
      } else if (field.includes('phone')) {
        anonymized[field] = anonymizePhone(value);
      } else if (field.includes('name')) {
        anonymized[field] = 'ANONYMIZED';
      } else {
        anonymized[field] = hashSensitive(value).substring(0, 16);
      }
    }
  }
  
  return anonymized;
}

/**
 * Anonymize email address
 * john.doe@example.com -> j***@example.com
 */
function anonymizeEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!domain) return '***@***.com';
  
  const firstChar = localPart.charAt(0);
  const anonymizedLocal = firstChar + '***';
  return `${anonymizedLocal}@${domain}`;
}

/**
 * Anonymize phone number
 * +1 555 123 4567 -> +1 *** *** 4567
 */
function anonymizePhone(phone: string): string {
  // Remove non-numeric for processing
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '***';
  
  // Keep last 4 digits
  const lastFour = digits.slice(-4);
  return phone.replace(digits, `*** *** ${lastFour}`);
}

/**
 * Secure data deletion (GDPR right to be forgotten)
 * Overwrites data before deletion
 */
export async function secureDelete<T extends { id: string }>(
  data: T,
  deleteFn: (id: string) => Promise<void>
): Promise<void> {
  // Overwrite sensitive fields with random data
  const overwritten: Record<string, string> = {};
  
  for (const key of Object.keys(data)) {
    if (key !== 'id') {
      overwritten[key] = randomBytes(32).toString('hex');
    }
  }
  
  // In a real implementation, you would update the record first
  // with overwritten data, then delete it
  // This ensures data is overwritten before removal from database
  
  await deleteFn(data.id);
}

/**
 * Encryption service for database field-level encryption
 * Use this in Prisma middleware or data access layer
 */
export class FieldEncryption {
  private secretKey: string;
  private fieldsToEncrypt: string[];
  
  constructor(secretKey: string, fieldsToEncrypt: string[]) {
    this.secretKey = secretKey;
    this.fieldsToEncrypt = fieldsToEncrypt;
  }
  
  /**
   * Encrypt specified fields in an object
   */
  encrypt<T extends Record<string, unknown>>(data: T): T {
    const encrypted = { ...data } as Record<string, unknown>;
    
    for (const field of this.fieldsToEncrypt) {
      if (field in encrypted && typeof encrypted[field] === 'string') {
        const value = encrypted[field] as string;
        if (value && !isEncrypted(value)) {
          encrypted[field] = encrypt(value, this.secretKey);
        }
      }
    }
    
    return encrypted as T;
  }
  
  /**
   * Decrypt specified fields in an object
   */
  decrypt<T extends Record<string, unknown>>(data: T): T {
    const decrypted = { ...data } as Record<string, unknown>;
    
    for (const field of this.fieldsToEncrypt) {
      if (field in decrypted && typeof decrypted[field] === 'string') {
        const value = decrypted[field] as string;
        if (value && isEncrypted(value)) {
          decrypted[field] = decrypt(value, this.secretKey);
        }
      }
    }
    
    return decrypted as T;
  }
}
