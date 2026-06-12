import { describe, it, expect } from 'vitest'
import { serverEnvSchema, publicEnvSchema, fullEnvSchema } from '../env'

describe('Environment Validation', () => {
  describe('validateEnv - Production', () => {
    it('validates full env schema structure', () => {
      // Test that the schema is properly defined
      expect(fullEnvSchema).toBeDefined()
      expect(fullEnvSchema.shape.DATABASE_URL).toBeDefined()
      expect(fullEnvSchema.shape.SMTP_USER).toBeDefined()
    })

    it('serverEnvSchema requires all server variables', () => {
      const invalid = {
        NODE_ENV: 'production',
        // Missing required fields
      }
      const result = serverEnvSchema.safeParse(invalid)
      expect(result.success).toBe(false)
    })

    it('publicEnvSchema has optional analytics fields', () => {
      const minimal = {
        NODE_ENV: 'development',
      }
      const result = publicEnvSchema.safeParse(minimal)
      expect(result.success).toBe(true)
    })

    it('validates email format in schema', () => {
      const invalidEmail = {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://user:pass@localhost/db',
        CONTACT_EMAIL: 'invalid-email',
        SMTP_USER: 'info@silkbeautysalon.online',
        SMTP_PASSWORD: 'hostinger-mailbox-password',
        API_SECRET_KEY: 'secret123456789012345678901234567890',
      }
      const result = serverEnvSchema.safeParse(invalidEmail)
      expect(result.success).toBe(false)
    })

    it('validates URL format', () => {
      const invalidUrl = {
        NODE_ENV: 'production',
        DATABASE_URL: 'not-a-url',
        CONTACT_EMAIL: 'test@silkbeautysalon.online',
        SMTP_USER: 'info@silkbeautysalon.online',
        SMTP_PASSWORD: 'hostinger-mailbox-password',
        API_SECRET_KEY: 'secret123456789012345678901234567890',
      }
      const result = serverEnvSchema.safeParse(invalidUrl)
      expect(result.success).toBe(false)
    })
  })

  describe('Schema Exports', () => {
    it('exports serverEnvSchema', () => {
      expect(serverEnvSchema).toBeDefined()
      expect(serverEnvSchema.shape.DATABASE_URL).toBeDefined()
    })

    it('exports publicEnvSchema', () => {
      expect(publicEnvSchema).toBeDefined()
      expect(publicEnvSchema.shape.NEXT_PUBLIC_SITE_URL).toBeDefined()
    })

    it('exports fullEnvSchema', () => {
      expect(fullEnvSchema).toBeDefined()
      expect(fullEnvSchema.shape.NODE_ENV).toBeDefined()
    })
  })
})
