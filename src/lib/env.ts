import { z } from 'zod'

const isProduction = process.env.NODE_ENV === 'production'

// Production schema - all required fields must be present
const productionSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  RESEND_AUDIENCE_ID: z.string().min(1, 'RESEND_AUDIENCE_ID is required'),
  CONTACT_EMAIL: z.string().email('CONTACT_EMAIL must be a valid email'),
  API_SECRET_KEY: z.string().min(1, 'API_SECRET_KEY is required'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_FB_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_CALCOM_USERNAME: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Development schema - optional fields that are ok to skip
const developmentSchema = z.object({
  DATABASE_URL: z.string().optional().default('file:./dev.db'),
  RESEND_API_KEY: z.string().optional().default(''),
  RESEND_AUDIENCE_ID: z.string().optional().default(''),
  CONTACT_EMAIL: z.string().email().optional().default('info@silkbeauty.ge'),
  API_SECRET_KEY: z.string().optional().default('dev-secret-key'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_FB_PIXEL_ID: z.string().optional(),
  NEXT_PUBLIC_CALCOM_USERNAME: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

const schema = isProduction ? productionSchema : developmentSchema
const parsed = schema.safeParse(process.env)

if (!parsed.success) {
  console.error('Environment validation failed:')
  console.error(parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment configuration')
}

// Warn about missing optional variables in development
if (!isProduction) {
  const optionalVars = ['DATABASE_URL', 'RESEND_API_KEY', 'RESEND_AUDIENCE_ID', 'API_SECRET_KEY']
  const missing = optionalVars.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing optional environment variables (using defaults):')
    missing.forEach(key => console.warn(`   - ${key}`))
    console.warn('   Set these in .env.local for full functionality.\n')
  }
}

export const env = parsed.data
