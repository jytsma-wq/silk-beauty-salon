# Silk Beauty Salon

A modern, multilingual Next.js website for Silk Beauty Salon in Batumi, Georgia. Features cutting-edge aesthetic treatment information, online booking integration, and full internationalization support.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Internationalization**: next-intl (6 locales: EN, KA, RU, TR, AR, HE)
- **Database**: Prisma ORM with PostgreSQL
- **Email**: Resend API
- **Deployment**: Standalone output with Caddy reverse proxy

## Prerequisites

- Node.js 20+
- Git

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jytsma-wq/silk-beauty-salon.git
   cd silk-beauty-salon
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and fill in your values. See `.env.example` for detailed comments on each variable.

4. **Set up the database**
   ```bash
   # Start PostgreSQL with Docker
   docker-compose up -d postgres

   # Run migrations
   npm run db:migrate:dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:migrate:dev` | Run Prisma migrations in development |
| `npm run db:migrate` | Deploy Prisma migrations in production |
| `npm run db:studio` | Open Prisma Studio database GUI |
| `npm run db:docker:up` | Start PostgreSQL container |
| `npm run db:docker:down` | Stop PostgreSQL container |

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Localized routes (en, ka, ru, tr, ar, he)
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── treatments/    # Treatment pages
│   │   │   ├── conditions/    # Condition pages
│   │   │   └── ...
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── sections/          # Page sections (Hero, Treatments, etc.)
│   │   ├── ui/                # shadcn/ui components
│   │   └── providers/         # Context providers
│   ├── data/                  # Static data & data fetching
│   │   ├── treatments.ts      # Treatment categories & data
│   │   ├── conditions.ts      # Skin conditions data
│   │   └── site-config.ts     # Site configuration
│   ├── lib/                   # Utilities
│   │   ├── db.ts              # Prisma client
│   │   ├── env.ts             # Environment validation
│   │   └── utils.ts           # Helper functions
│   ├── i18n/                  # i18n configuration
│   └── components/
├── messages/                  # Translation files
│   ├── en.json               # English (default)
│   ├── ka.json               # Georgian
│   ├── ru.json               # Russian
│   ├── tr.json               # Turkish
│   ├── ar.json               # Arabic
│   └── he.json               # Hebrew
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── next.config.ts            # Next.js configuration
```

## Internationalization (i18n)

The site supports 6 languages with full RTL support for Arabic and Hebrew.

### Adding/Editing Translations

1. Translation files are in `/messages/*.json`
2. Each file follows the same structure with namespaced keys
3. Common namespaces:
   - `site` - Site metadata
   - `nav` - Navigation labels
   - `hero` - Hero section
   - `treatments` - Treatment content
   - `conditions` - Condition content
   - `footer` - Footer content
   - `consent` - Cookie consent banner

### Adding a New Language

1. Create a new file in `/messages/` (e.g., `fr.json`)
2. Copy the structure from `en.json`
3. Add the locale to `src/i18n/index.ts`
4. Update `next.config.ts` to include the new locale

## Deployment

### Build for Production

The project uses `output: 'standalone'` for optimized Docker/container deployment.

```bash
npm run build
```

This creates a standalone build in `.next/standalone/` with:
- Server code and dependencies
- Static files copied to `.next/standalone/public/`
- Next.js static assets in `.next/standalone/.next/static/`

### Start Production Server

```bash
npm run start
```

Or manually with Node:
```bash
NODE_ENV=production node .next/standalone/server.js
```

### Caddy Configuration

A sample `Caddyfile` is included for production deployment:

```caddyfile
silkbeautysalon.online {
    reverse_proxy localhost:3000
}
```

### Performance Optimizations

- **Lazy loading**: Mobile menu (Sheet) is lazy-loaded to reduce initial bundle
- **Shared icons**: Social media icons are tree-shakeable from `src/components/icons.tsx`
- **Standalone output**: Minimal production image with only required dependencies

### Environment Variables for Production

Ensure all [REQUIRED] variables in `.env.example` are set:

- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_DATABASE_URL` - Direct PostgreSQL connection (for migrations, bypasses PgBouncer)
- `RESEND_API_KEY` - For email functionality
- `RESEND_AUDIENCE_ID` - Newsletter audience
- `CONTACT_EMAIL` - Contact form recipient
- `API_SECRET_KEY` - Secure random string

## Database Backup & Recovery

Backups run automatically daily at 03:00 UTC via GitHub Actions and are stored in S3. Locally:

- Create backup: `npm run db:backup`
- Verify latest backup: `npm run db:backup:verify`
- Restore from backup: `npm run db:restore`

Retention: 30 daily backups, 12 monthly backups (configure in S3 lifecycle rules).

## License

Copyright © Silk Beauty Salon. All rights reserved.
