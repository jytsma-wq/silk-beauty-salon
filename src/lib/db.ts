import { PrismaClient } from '@prisma/client'
import { env } from './env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
    log: [], // Suppress Prisma logs - errors are handled gracefully in application code
  })

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db