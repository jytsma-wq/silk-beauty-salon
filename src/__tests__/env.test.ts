/**
 * Environment Variable Validation Tests
 * Tests for comprehensive Zod env validation
 */

import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { serverEnvSchema, publicEnvSchema, fullEnvSchema } from '@/lib/env';

describe('Environment Variable Validation', () => {
  const validServerEnv = {
    NODE_ENV: 'production' as const,
    DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
    RESEND_API_KEY: 're_abcdefghijklmnopqrstuvwxyz123',
    RESEND_AUDIENCE_ID: '550e8400-e29b-41d4-a716-446655440000',
    CONTACT_EMAIL: 'info@silkbeautysalon.online',
    API_SECRET_KEY: 'a'.repeat(32),
    UPSTASH_REDIS_REST_URL: 'https://upstash-url.upstash.io',
    UPSTASH_REDIS_REST_TOKEN: 'token-with-at-least-20-chars',
  };

  const validPublicEnv = {
    NEXT_PUBLIC_SITE_URL: 'https://silkbeautysalon.online',
    NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',
    NEXT_PUBLIC_GTM_ID: 'GTM-XXXXXXX',
    NEXT_PUBLIC_FB_PIXEL_ID: '1234567890',
    NEXT_PUBLIC_CALCOM_USERNAME: 'silkbeauty',
  };

  const validFullEnv = { ...validServerEnv, ...validPublicEnv };

  describe('serverEnvSchema', () => {
    it('should validate a complete valid environment', () => {
      const result = serverEnvSchema.safeParse(validServerEnv);
      expect(result.success).toBe(true);
    });

    it('should throw when RESEND_API_KEY is missing', () => {
      const invalidEnv = { ...validServerEnv, RESEND_API_KEY: undefined };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorPaths = result.error.issues.map((issue: z.ZodIssue) => issue.path.join('.'));
        expect(errorPaths).toContain('RESEND_API_KEY');
      }
    });

    it('should throw when CONTACT_EMAIL is malformed', () => {
      const invalidEnv = { ...validServerEnv, CONTACT_EMAIL: 'not-an-email' };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorPaths = result.error.issues.map((issue: z.ZodIssue) => issue.path.join('.'));
        expect(errorPaths).toContain('CONTACT_EMAIL');
      }
    });

    it('should throw when DATABASE_URL is not a valid URL', () => {
      const invalidEnv = { ...validServerEnv, DATABASE_URL: 'not-a-url' };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorPaths = result.error.issues.map((issue: z.ZodIssue) => issue.path.join('.'));
        expect(errorPaths).toContain('DATABASE_URL');
      }
    });

    it('should throw when API_SECRET_KEY is less than 32 characters', () => {
      const invalidEnv = { ...validServerEnv, API_SECRET_KEY: 'short' };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue: z.ZodIssue) => issue.message).join(' ');
        expect(errorMessages).toContain('API_SECRET_KEY');
      }
    });

    it('should throw when RESEND_AUDIENCE_ID is not a valid UUID', () => {
      const invalidEnv = { ...validServerEnv, RESEND_AUDIENCE_ID: 'not-a-uuid' };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue: z.ZodIssue) => issue.message).join(' ');
        expect(errorMessages).toContain('RESEND_AUDIENCE_ID');
      }
    });

    it('should throw when UPSTASH_REDIS_REST_URL is not a valid URL', () => {
      const invalidEnv = { ...validServerEnv, UPSTASH_REDIS_REST_URL: 'invalid-url' };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorPaths = result.error.issues.map((issue: z.ZodIssue) => issue.path.join('.'));
        expect(errorPaths).toContain('UPSTASH_REDIS_REST_URL');
      }
    });

    it('should throw when UPSTASH_REDIS_REST_TOKEN is less than 20 characters', () => {
      const invalidEnv = { ...validServerEnv, UPSTASH_REDIS_REST_TOKEN: 'short' };
      const result = serverEnvSchema.safeParse(invalidEnv);

      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.issues.map((issue: z.ZodIssue) => issue.message).join(' ');
        expect(errorMessages).toContain('UPSTASH_REDIS_REST_TOKEN');
      }
    });

    it('should accept valid NODE_ENV values', () => {
      const envs = ['development', 'test', 'production'] as const;

      for (const nodeEnv of envs) {
        const env = { ...validServerEnv, NODE_ENV: nodeEnv };
        const result = serverEnvSchema.safeParse(env);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid NODE_ENV values', () => {
      const env = { ...validServerEnv, NODE_ENV: 'staging' };
      const result = serverEnvSchema.safeParse(env);
      expect(result.success).toBe(false);
    });
  });

  describe('publicEnvSchema', () => {
    it('should validate complete public env', () => {
      const result = publicEnvSchema.safeParse(validPublicEnv);
      expect(result.success).toBe(true);
    });

    it('should allow empty public env (all optional)', () => {
      const result = publicEnvSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should validate NEXT_PUBLIC_GA_MEASUREMENT_ID format', () => {
      const valid = { NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-ABC123XYZ0' };
      const result = publicEnvSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('should reject invalid NEXT_PUBLIC_GA_MEASUREMENT_ID format', () => {
      const invalid = { NEXT_PUBLIC_GA_MEASUREMENT_ID: 'invalid-id' };
      const result = publicEnvSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should validate NEXT_PUBLIC_GTM_ID format', () => {
      const valid = { NEXT_PUBLIC_GTM_ID: 'GTM-ABC1234' };
      const result = publicEnvSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('should validate NEXT_PUBLIC_FB_PIXEL_ID as numeric string', () => {
      const valid = { NEXT_PUBLIC_FB_PIXEL_ID: '1234567890' };
      const result = publicEnvSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('should reject NEXT_PUBLIC_FB_PIXEL_ID with non-numeric characters', () => {
      const invalid = { NEXT_PUBLIC_FB_PIXEL_ID: 'abc123' };
      const result = publicEnvSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });

    it('should set default NEXT_PUBLIC_SITE_URL', () => {
      const result = publicEnvSchema.parse({});
      expect(result.NEXT_PUBLIC_SITE_URL).toBe('https://silkbeautysalon.online');
    });
  });

  describe('fullEnvSchema', () => {
    it('should validate complete environment', () => {
      const result = fullEnvSchema.safeParse(validFullEnv);
      expect(result.success).toBe(true);
    });

    it('should report ALL errors, not just the first one', () => {
      const invalidEnv = {
        ...validFullEnv,
        RESEND_API_KEY: undefined,
        CONTACT_EMAIL: 'not-an-email',
        DATABASE_URL: 'not-a-url',
      };

      const result = fullEnvSchema.safeParse(invalidEnv);
      expect(result.success).toBe(false);

      if (!result.success) {
        // Should have multiple errors
        expect(result.error.issues.length).toBeGreaterThanOrEqual(3);

        const errorPaths = result.error.issues.map((issue: z.ZodIssue) => issue.path.join('.'));
        expect(errorPaths).toContain('RESEND_API_KEY');
        expect(errorPaths).toContain('CONTACT_EMAIL');
        expect(errorPaths).toContain('DATABASE_URL');
      }
    });

    it('should throw formatted error message with all issues', () => {
      const invalidEnv = {
        NODE_ENV: 'production',
        // Missing multiple required fields
      };

      const result = fullEnvSchema.safeParse(invalidEnv);
      expect(result.success).toBe(false);

      if (!result.success) {
        const formattedErrors = result.error.issues.map((issue: z.ZodIssue) => {
          const path = issue.path.join('.');
          return `  - ${path}: ${issue.message}`;
        }).join('\n');

        expect(formattedErrors).toContain('DATABASE_URL');
        expect(formattedErrors).toContain('RESEND_API_KEY');
        expect(formattedErrors).toContain('RESEND_AUDIENCE_ID');
        expect(formattedErrors).toContain('CONTACT_EMAIL');
        expect(formattedErrors).toContain('API_SECRET_KEY');
      }
    });
  });

  describe('Type exports', () => {
    it('should export ServerEnv type', () => {
      // TypeScript compilation test - if this compiles, types are correct
      const serverEnvCheck: {
        NODE_ENV: 'development' | 'test' | 'production';
        DATABASE_URL: string;
        RESEND_API_KEY: string;
        RESEND_AUDIENCE_ID: string;
        CONTACT_EMAIL: string;
        API_SECRET_KEY: string;
        UPSTASH_REDIS_REST_URL: string;
        UPSTASH_REDIS_REST_TOKEN: string;
      } = validServerEnv;

      expect(serverEnvCheck).toBeDefined();
    });

    it('should export PublicEnv type', () => {
      const publicEnvCheck: {
        NEXT_PUBLIC_SITE_URL: string;
        NEXT_PUBLIC_GA_MEASUREMENT_ID?: string;
        NEXT_PUBLIC_GTM_ID?: string;
        NEXT_PUBLIC_FB_PIXEL_ID?: string;
        NEXT_PUBLIC_CALCOM_USERNAME?: string;
      } = validPublicEnv;

      expect(publicEnvCheck).toBeDefined();
    });
  });
});
