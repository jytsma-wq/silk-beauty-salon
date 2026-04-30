# Database Documentation

This document provides comprehensive information about the PostgreSQL database setup for Silk Beauty Salon, including migration from SQLite, local development, production configuration, and maintenance procedures.

## Table of Contents

- [Overview](#overview)
- [Migration from SQLite](#migration-from-sqlite)
- [Local Development Setup](#local-development-setup)
- [Production Configuration](#production-configuration)
- [Database Schema](#database-schema)
- [Backup and Restore](#backup-and-restore)
- [Health Monitoring](#health-monitoring)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)

## Overview

The application has been migrated from SQLite to PostgreSQL for production scalability. Key features include:

- **PostgreSQL 16** as the primary database
- **UUID primary keys** (replacing CUIDs)
- **PostgreSQL Enums** for status fields
- **PgBouncer** for connection pooling
- **Health check endpoint** for monitoring
- **Backup/restore scripts** for data safety

## Migration from SQLite

### Prerequisites

- PostgreSQL 16+ installed locally or via Docker
- Node.js and npm/yarn
- Existing SQLite database (`prisma/dev.db`)

### Migration Steps

1. **Start PostgreSQL locally:**
   ```bash
   docker-compose up -d postgres
   ```

2. **Update environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your PostgreSQL connection strings
   ```

3. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init_postgres
   ```

4. **Migrate data from SQLite:**
   ```bash
   npx tsx scripts/migrate-to-postgres.ts
   ```

5. **Verify migration:**
   ```bash
   npx tsx scripts/migrate-to-postgres.ts list
   ```

### Migration Script Features

The migration script (`scripts/migrate-to-postgres.ts`) automatically:

- Creates a pre-migration backup of SQLite data
- Converts CUIDs to UUIDs
- Maps string status fields to PostgreSQL enums
- Preserves all relationships between tables
- Provides detailed migration statistics
- Supports rollback if needed

## Local Development Setup

### Docker Compose Stack

The `docker-compose.yml` includes:

| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL | 5432 | Main database |
| PgBouncer | 6432 | Connection pooler |
| Postgres Exporter | 9187 | Metrics for Prometheus |

### Starting Local Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f postgres

# Stop services
docker-compose down

# Reset database (WARNING: Destructive)
docker-compose down -v
docker-compose up -d postgres
```

### Environment Configuration

Update `.env.local` with development settings:

```env
# Direct connection for Prisma Client
DATABASE_URL="postgresql://silkbeauty:silkbeauty_dev_password@localhost:5432/silkbeauty?schema=public&connection_limit=20&pool_timeout=30"

# Direct connection for migrations (bypasses PgBouncer)
DIRECT_DATABASE_URL="postgresql://silkbeauty:silkbeauty_dev_password@localhost:5432/silkbeauty?schema=public"

# With PgBouncer (for testing)
# DATABASE_URL="postgresql://silkbeauty:silkbeauty_dev_password@localhost:6432/silkbeauty?schema=public&pgbouncer=true"
```

### PostgreSQL Configuration

Default PostgreSQL settings in `docker-compose.yml`:

| Setting | Value | Description |
|---------|-------|-------------|
| `max_connections` | 100 | Maximum concurrent connections |
| `shared_buffers` | 256MB | Memory for caching |
| `statement_timeout` | 30s | Maximum query duration |
| `log_min_duration_statement` | 1000ms | Log slow queries |

## Production Configuration

### Connection Pooling with PgBouncer

PgBouncer configuration for production:

```
POOL_MODE=transaction
MAX_CLIENT_CONN=1000
DEFAULT_POOL_SIZE=20
MIN_POOL_SIZE=5
SERVER_IDLE_TIMEOUT=600
```

### Database URLs

**For Prisma Client (with PgBouncer):**
```
postgresql://user:password@host:6432/db?schema=public&pgbouncer=true
```

**For Migrations (direct connection):**
```
postgresql://user:password@host:5432/db?schema=public
```

### Read Replicas (Optional)

To enable read replicas, add to `.env.local`:

```env
ENABLE_READ_REPLICAS=true
DATABASE_REPLICA_URLS="postgresql://readonly@replica1:5432/silkbeauty,postgresql://readonly@replica2:5432/silkbeauty"
```

## Database Schema

### Models

#### ContactSubmission
- Stores contact form submissions
- Status enum: `NEW`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

#### BookingRequest
- Stores booking requests
- Status enum: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `NO_SHOW`

#### NewsletterSubscriber
- Stores newsletter subscriptions
- Status enum: `ACTIVE`, `UNSUBSCRIBED`, `BOUNCED`

#### BlogPost
- Stores blog articles with i18n support

#### TreatmentCategory / Treatment
- Treatment catalog with translations
- Supports multiple languages (en, ka, ru, ar, he, tr)

#### Booking
- Calendar-based appointment system
- Same status enum as BookingRequest

### PostgreSQL Enums

```sql
-- Contact status
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- Booking status
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- Subscriber status
CREATE TYPE "SubscriberStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED');
```

### Indexes

Key indexes for performance:

- `@@index([status, createdAt])` - For admin filtering
- `@@index([email])` - For subscriber lookups
- `@@index([slug])` - For treatment/category lookups
- `@@index([published, createdAt])` - For blog post listings

## Backup and Restore

### Creating Backups

```bash
# Full backup (schema + data)
npx tsx scripts/db-backup.ts full

# Schema only
npx tsx scripts/db-backup.ts schema

# Data only
npx tsx scripts/db-backup.ts data

# List available backups
npx tsx scripts/db-backup.ts list
```

Backup files are stored in `/backups/` with:
- Automatic gzip compression
- SHA256 checksums
- JSON metadata
- 30-day retention policy

### Restoring from Backup

```bash
# Dry run (verify without restoring)
npx tsx scripts/db-restore.ts restore backup-file.sql.gz --dry-run

# Restore with existing database intact
npx tsx scripts/db-restore.ts restore backup-file.sql.gz

# Restore with database drop and recreate
npx tsx scripts/db-restore.ts restore backup-file.sql.gz --drop

# List available backups
npx tsx scripts/db-restore.ts list
```

### Automated Backups

For production, configure cron jobs:

```cron
# Daily full backup at 2 AM
0 2 * * * cd /app && npx tsx scripts/db-backup.ts full >> /var/log/db-backup.log 2>&1

# Hourly incremental backup
0 * * * * cd /app && npx tsx scripts/db-backup.ts data >> /var/log/db-backup.log 2>&1
```

## Health Monitoring

### Health Check Endpoint

**GET /api/health/db**

Returns comprehensive database health status:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "checks": {
    "database": {
      "status": "healthy",
      "responseTime": 45,
      "details": {
        "connectionPoolSize": 100,
        "activeConnections": 5,
        "idleConnections": 3
      }
    },
    "tables": {
      "status": "healthy",
      "counts": {
        "contactSubmissions": 150,
        "bookingRequests": 75,
        "newsletterSubscribers": 1200,
        "blogPosts": 12,
        "bookings": 45
      }
    },
    "performance": {
      "status": "healthy",
      "avgQueryTime": 12,
      "slowQueries": 0
    }
  }
}
```

### Lightweight Health Check

**HEAD /api/health/db**

For load balancers - returns:
- `200 OK` with `X-Health-Status: healthy`
- `503 Service Unavailable` with `X-Health-Status: unhealthy`

### Health Status Codes

| Status | HTTP Code | Description |
|--------|-----------|-------------|
| `healthy` | 200 | All checks passed |
| `degraded` | 200 | Some performance issues |
| `unhealthy` | 503 | Critical issues detected |

### Prometheus Metrics

When using the docker-compose stack, PostgreSQL metrics are available at:

```
http://localhost:9187/metrics
```

## Performance Optimization

### Query Optimization

1. **Use indexes effectively:**
   ```prisma
   @@index([status, createdAt])
   @@index([email])
   ```

2. **Limit query results:**
   ```typescript
   await prisma.blogPost.findMany({
     take: 10,
     skip: 0,
   });
   ```

3. **Select only needed fields:**
   ```typescript
   await prisma.treatment.findMany({
     select: { id: true, name: true }
   });
   ```

### Connection Pooling

Prisma connection pool settings:

```env
# Connection limit
DATABASE_URL="postgresql://...?connection_limit=20"

# Pool timeout
DATABASE_URL="postgresql://...?pool_timeout=30"
```

### Caching Strategy

For frequently accessed data:

```typescript
import { unstable_cache } from 'next/cache';

const getTreatments = unstable_cache(
  async () => prisma.treatment.findMany(),
  ['treatments'],
  { revalidate: 3600 } // 1 hour
);
```

## Troubleshooting

### Common Issues

#### Connection Pool Exhaustion

**Symptom:** `P1001: Can't reach database server`

**Solution:**
1. Check active connections:
   ```sql
   SELECT count(*) FROM pg_stat_activity;
   ```
2. Increase connection pool size
3. Check for connection leaks in application code

#### Slow Queries

**Symptom:** Queries taking > 1 second

**Solution:**
1. Enable query logging:
   ```env
   PRISMA_LOG_LEVEL=query,info,warn,error
   ```
2. Check for missing indexes
3. Use `EXPLAIN ANALYZE` to debug specific queries

#### Migration Failures

**Symptom:** `prisma migrate dev` fails

**Solution:**
1. Use direct URL for migrations:
   ```bash
   DIRECT_DATABASE_URL=postgresql://... npx prisma migrate dev
   ```
2. Check database permissions
3. Verify PostgreSQL version (16+ required)

### Useful Commands

```bash
# Check Prisma Client version
npx prisma --version

# Format schema
npx prisma format

# Validate schema
npx prisma validate

# Generate Prisma Client
npx prisma generate

# Database console
npx prisma studio

# View migrations
npx prisma migrate status
```

### Emergency Procedures

#### Database Recovery

1. Stop application:
   ```bash
   docker-compose down
   ```

2. Restore from backup:
   ```bash
   npx tsx scripts/db-restore.ts restore backup-file.sql.gz --drop
   ```

3. Verify restore:
   ```bash
   curl http://localhost:3000/api/health/db
   ```

#### Connection Reset

```bash
# Reset PgBouncer
PGPASSWORD=password psql -h localhost -p 6432 -U silkbeauty -c "RELOAD;" pgbouncer

# View PgBouncer stats
PGPASSWORD=password psql -h localhost -p 6432 -U silkbeauty -c "SHOW POOLS;" pgbouncer
```

---

## Support

For database issues:
1. Check `/api/health/db` endpoint
2. Review application logs
3. Contact the development team with health check output
