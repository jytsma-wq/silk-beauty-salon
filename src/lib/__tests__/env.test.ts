import { describe, it, expect } from 'vitest'
import { parseEnv, productionSchema, developmentSchema } from '../env'

describe('Environment Validation', () => {
  describe('parseEnv - Production', () => {
    it('passes with valid production env', () => {
      const valid = {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://user:pass@localhost/db',
        RESEND_API_KEY: 're_test123',
        RESEND_AUDIENCE_ID: 'audience_123',
        CONTACT_EMAIL: 'test@silkbeauty.ge',
        API_SECRET_KEY: 'secret123',
      }
      expect(() => parseEnv(valid)).not.toThrow()
      const result = parseEnv(valid)
      expect(result.DATABASE_URL).toBe('postgresql://user:pass@localhost/db')
      expect(result.RESEND_API_KEY).toBe('re_test123')
      expect(result.CONTACT_EMAIL).toBe('test@silkbeauty.ge')
    })

    it('fails when DATABASE_URL is missing', () => {
      const invalid = {
        NODE_ENV: 'production',
        RESEND_API_KEY: 're_test123',
        RESEND_AUDIENCE_ID: 'audience_123',
        CONTACT_EMAIL: 'test@silkbeauty.ge',
        API_SECRET_KEY: 'secret123',
        // DATABASE_URL missing
      }
      expect(() => parseEnv(invalid)).toThrow(/DATABASE_URL/)
    })

    it('fails when CONTACT_EMAIL is invalid', () => {
      const invalid = {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://user:pass@localhost/db',
        RESEND_API_KEY: 're_test123',
        RESEND_AUDIENCE_ID: 'audience_123',
        CONTACT_EMAIL: 'invalid-email',
        API_SECRET_KEY: 'secret123',
      }
      expect(() => parseEnv(invalid)).toThrow(/CONTACT_EMAIL/)
    })
  })

  describe('parseEnv - Development', () => {
    it('uses defaults for missing optional variables', () => {
      const dev = {
        NODE_ENV: 'development',
        DATABASE_URL: 'file:./dev.db',
        RESEND_API_KEY: 're_test123',
        RESEND_AUDIENCE_ID: 'audience_123',
        CONTACT_EMAIL: 'test@silkbeauty.ge',
        API_SECRET_KEY: 'secret123',
      }
      const result = parseEnv(dev)
      expect(result.NODE_ENV).toBe('development')
      expect(result.DATABASE_URL).toBe('file:./dev.db')
    })

    it('uses defaults when optional fields omitted', () => {
      const dev = {
        NODE_ENV: 'development',
        // Using defaults for DATABASE_URL, RESEND_API_KEY, etc.
      }
      const result = parseEnv(dev)
      expect(result.DATABASE_URL).toBe('file:./dev.db')
      expect(result.CONTACT_EMAIL).toBe('info@silkbeauty.ge')
      expect(result.API_SECRET_KEY).toBe('dev-secret-key')
    })

    it('uses provided values when available', () => {
      const dev = {
        NODE_ENV: 'development',
        DATABASE_URL: 'postgresql://custom:5432/db',
        RESEND_API_KEY: 're_custom',
        RESEND_AUDIENCE_ID: 'custom_audience',
        CONTACT_EMAIL: 'custom@silkbeauty.ge',
        API_SECRET_KEY: 'custom-secret',
      }
      const result = parseEnv(dev)
      expect(result.DATABASE_URL).toBe('postgresql://custom:5432/db')
      expect(result.RESEND_API_KEY).toBe('re_custom')
      expect(result.CONTACT_EMAIL).toBe('custom@silkbeauty.ge')
      expect(result.API_SECRET_KEY).toBe('custom-secret')
    })

    it('accepts optional analytics variables', () => {
      const dev = {
        NODE_ENV: 'development',
        DATABASE_URL: 'file:./dev.db',
        NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-123456',
        NEXT_PUBLIC_FB_PIXEL_ID: '123456789',
        NEXT_PUBLIC_CALCOM_USERNAME: 'silksalon',
      }
      const result = parseEnv(dev)
      expect(result.NEXT_PUBLIC_GA_MEASUREMENT_ID).toBe('G-123456')
      expect(result.NEXT_PUBLIC_FB_PIXEL_ID).toBe('123456789')
      expect(result.NEXT_PUBLIC_CALCOM_USERNAME).toBe('silksalon')
    })
  })

  describe('parseEnv - Test Environment', () => {
    it('uses default values in test environment', () => {
      const testEnv = {
        NODE_ENV: 'test',
      }
      const result = parseEnv(testEnv)
      expect(result.NODE_ENV).toBe('test')
      expect(result.DATABASE_URL).toBe('file:./dev.db')
      expect(result.RESEND_API_KEY).toBe('')
    })
  })

  describe('Schema Exports', () => {
    it('exports productionSchema', () => {
      expect(productionSchema).toBeDefined()
      expect(productionSchema.shape.DATABASE_URL).toBeDefined()
    })

    it('exports developmentSchema', () => {
      expect(developmentSchema).toBeDefined()
      expect(developmentSchema.shape.DATABASE_URL).toBeDefined()
    })
  })
})
