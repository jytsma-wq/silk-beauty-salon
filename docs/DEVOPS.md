# DevOps Guide

Complete CI/CD pipeline, infrastructure, and deployment documentation for Silk Beauty Salon.

## Table of Contents

- [Pipeline Overview](#pipeline-overview)
- [CI/CD Workflows](#cicd-workflows)
- [Docker Configuration](#docker-configuration)
- [Infrastructure](#infrastructure)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Backup & Recovery](#backup--recovery)

## Pipeline Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Commit    │───▶│    Lint     │───▶│    Build    │───▶│    Test     │───▶│   Deploy    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                         │                  │                  │
                         ▼                  ▼                  ▼
                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                   │  Type Check │    │  Security   │    │    E2E      │
                   │  Unit Tests │    │    Scan     │    │  Lighthouse │
                   │   Format    │    │   Build     │    │    A11y     │
                   └─────────────┘    └─────────────┘    └─────────────┘
```

## CI/CD Workflows

### Continuous Integration (`.github/workflows/ci.yml`)

**Triggers:** Push to main/develop, Pull Requests

**Jobs:**

| Job | Description | Duration |
|-----|-------------|----------|
| lint | ESLint, Prettier, TypeScript | ~2 min |
| unit-tests | Vitest with coverage | ~3 min |
| build | Next.js build verification | ~4 min |
| security | npm audit, secret scanning | ~2 min |
| e2e-tests | Playwright E2E tests | ~6 min |
| lighthouse | Performance audit | ~3 min |
| accessibility | axe-core automated tests | ~2 min |

**Key Features:**
- Parallel job execution for speed
- Artifact upload for build reuse
- Codecov integration for coverage reports
- Trivy container scanning
- Slack notifications on failure

### Continuous Deployment (`.github/workflows/cd.yml`)

**Triggers:** Push to main, Manual workflow dispatch

**Pipeline Stages:**

1. **Build Image**
   - Multi-arch Docker build (AMD64, ARM64)
   - Push to GitHub Container Registry
   - Security scan with Trivy

2. **Deploy to Staging** (Automatic)
   - Blue-green deployment
   - Database migrations
   - Health checks
   - Smoke tests
   - Slack notifications

3. **Production Approval** (Manual Gate)
   - Requires code owner approval
   - Review staging deployment

4. **Deploy to Production**
   - Blue-green deployment with zero downtime
   - Automatic rollback on failure
   - Post-deployment smoke tests
   - Create GitHub release

## Docker Configuration

### Dockerfile

Multi-stage build optimized for production:

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
# Install libc6-compat for Prisma
# Install production dependencies only

# Stage 2: Builder
FROM node:20-alpine AS builder
# Copy deps and source code
# Generate Prisma client
# Build Next.js application

# Stage 3: Production Runner
FROM node:20-alpine AS runner
# Non-root user (nextjs:1001)
# Copy standalone build
# Health check endpoint
# Minimal image size (~150MB)
```

**Build:**
```bash
docker build -t silk-beauty-salon:latest .
```

**Run:**
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=... \
  -e RESEND_API_KEY=... \
  silk-beauty-salon:latest
```

### Docker Compose

Services included:
- `app`: Next.js application
- `postgres`: PostgreSQL database
- `pgbouncer`: Connection pooling
- `redis`: Caching layer
- `postgres-exporter`: Metrics

**Usage:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Run migrations
docker-compose run --rm app npx prisma migrate deploy

# Scale app instances
docker-compose up -d --scale app=3
```

## Infrastructure

### Terraform Configuration (`infrastructure/`)

**AWS Resources:**

```hcl
# VPC with public/private subnets
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

# RDS PostgreSQL
resource "aws_db_instance" "main" {
  engine         = "postgres"
  instance_class = "db.t3.medium"
  # Multi-AZ in production
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "main" {
  engine = "redis"
  node_type = "cache.t3.micro"
}

# Application Load Balancer
resource "aws_lb" "main" {
  load_balancer_type = "application"
  # SSL termination
  # Health checks
}
```

**Deploy Infrastructure:**
```bash
cd infrastructure

terraform init
terraform plan
terraform apply
```

### Environment Management

**Development:**
```bash
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

**Staging/Production:**
- Environment variables in GitHub Secrets
- Secrets encrypted at rest
- Automatic injection during deployment

## Deployment

### Automated Deployment (CI/CD)

Deployments happen automatically on merge to main:

1. Staging deployment (immediate)
2. Manual approval gate
3. Production deployment

### Manual Deployment

**Using deploy script:**
```bash
# Deploy to staging
./scripts/deploy/deploy.sh -e staging -t v1.2.3

# Deploy to production
./scripts/deploy/deploy.sh -e production -t $(git rev-parse --short HEAD)

# Skip migrations
./scripts/deploy/deploy.sh -e staging -s
```

**Blue-Green Strategy:**
- Green environment receives new deployment
- Health checks validate green
- Load balancer switches traffic
- Blue environment kept for rollback

### Rollback

**Automatic:**
- Health check failures trigger automatic rollback
- Previous container image restored
- Database migrations not rolled back (forward-only)

**Manual:**
```bash
# Quick rollback
docker-compose up -d --no-deps app

# Or specific version
./scripts/deploy/deploy.sh -e production -t previous-stable-tag
```

## Monitoring

### Health Checks

**Endpoint:** `GET /api/health`

**Docker Healthcheck:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "checks": {
    "database": "ok",
    "redis": "ok"
  }
}
```

### Logging

**Structured JSON logging:**
```json
{
  "level": "info",
  "timestamp": "2024-01-15T10:30:00Z",
  "message": "Request processed",
  "requestId": "uuid",
  "duration": 150
}
```

**Log aggregation:**
- Development: Console output
- Staging/Production: CloudWatch Logs / ELK Stack

### Metrics

**Prometheus exporters:**
- PostgreSQL metrics (postgres_exporter)
- Application metrics (custom)
- Infrastructure metrics (CloudWatch)

**Grafana dashboards:**
- Request latency
- Error rates
- Database performance
- Cache hit rates

## Backup & Recovery

### Automated Backups

**Database:**
```bash
# Automated daily backups
./scripts/backup/backup.sh database

# Upload to S3
./scripts/backup/backup.sh database --s3-bucket silk-backups
```

**Retention:**
- Daily backups: 7 days
- Weekly backups: 4 weeks
- Monthly backups: 12 months

### Restore Procedure

**Database Restore:**
```bash
# List available backups
ls -la backups/

# Restore from backup
./scripts/backup/backup.sh restore --file backups/silkbeauty_20240115_120000.sql.gz

# Verify restoration
npm run db:verify
```

**Disaster Recovery:**
1. **RTO (Recovery Time Objective):** 30 minutes
2. **RPO (Recovery Point Objective):** 24 hours (daily backups)
3. **Procedure:**
   - Provision new infrastructure with Terraform
   - Restore database from latest backup
   - Deploy application
   - Verify health checks
   - Update DNS if needed

## Security

### Scanning

**Dependency scanning:**
```bash
npm audit
```

**Container scanning:**
```bash
trivy image silk-beauty-salon:latest
```

**Secret scanning:**
```bash
trufflehog filesystem .
```

### Secrets Management

- GitHub Secrets for CI/CD
- AWS Secrets Manager for production
- Environment-specific .env files
- Never commit secrets to repository

### Network Security

- VPC isolation
- Security groups restrict access
- Private subnets for databases
- SSL/TLS for all connections
- WAF protection on ALB

## Troubleshooting

### Common Issues

**Build failures:**
```bash
# Clear caches
rm -rf node_modules .next
npm ci
npm run build
```

**Database connection issues:**
```bash
# Check connection
docker-compose exec postgres pg_isready

# View logs
docker-compose logs postgres
```

**Deployment failures:**
```bash
# Check deployment logs
ssh user@server "docker-compose logs --tail=100 app"

# Verify health
curl https://your-domain.com/api/health
```

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
