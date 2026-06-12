# Database Documentation

Silk Beauty Salon uses PostgreSQL through Prisma. The app is intended to connect to a managed PostgreSQL database in production and to a locally installed PostgreSQL instance in development.

## Required Environment Variables

Set these values in `.env.local` for development and in the Hostinger app environment for production:

```env
DATABASE_URL="postgresql://user:password@host:5432/silkbeauty?schema=public"
DIRECT_DATABASE_URL="postgresql://user:password@host:5432/silkbeauty?schema=public"
```

`DATABASE_URL` is used by the app. `DIRECT_DATABASE_URL` is used by Prisma migrations.

## Local Setup

1. Install PostgreSQL 16 or use a managed PostgreSQL database.
2. Create the database:

```bash
createdb silkbeauty
```

3. Add the connection strings to `.env.local`.
4. Generate the Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate:dev
```

## Production Setup

Use the production database connection string provided by the hosting/database provider. In Hostinger, add the values as app environment variables before deploying:

```env
DATABASE_URL="postgresql://..."
DIRECT_DATABASE_URL="postgresql://..."
```

Run migrations during deployment or manually from a trusted environment:

```bash
npm run db:migrate
```

## Backup and Restore

The repository includes TypeScript backup helpers:

```bash
npm run db:backup
npm run db:backup:list
npm run db:backup:verify
npm run db:restore
```

The shell backup helper at `scripts/backup/backup.sh` uses direct PostgreSQL tools (`pg_dump`, `psql`, `createdb`, and `dropdb`) and reads `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` from the environment.

## Health Checks

Use these endpoints after deployment:

- `/api/health` for a lightweight application health check.
- `/api/health/db` for database connectivity and table checks.

## Useful Commands

```bash
npm run db:generate
npm run db:migrate:dev
npm run db:migrate
npm run db:studio
npx prisma migrate status
npx prisma validate
```
