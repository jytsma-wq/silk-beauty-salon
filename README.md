# Silk Beauty Salon

A modern, multilingual Next.js website for Silk Beauty Salon in Batumi, Georgia. Features cutting-edge aesthetic treatment information, a self-built booking agent, Hostinger mailbox email delivery, and full internationalization support.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Internationalization**: next-intl (6 locales: EN, KA, RU, TR, AR, HE)
- **Database**: Prisma ORM with PostgreSQL
- **Email**: Hostinger Email via SMTP
- **Deployment**: Hostinger managed Node.js hosting with Next.js standalone output

## Prerequisites

- Node.js 18+ or Bun
- Git

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd silk-beauty-salon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and fill in your values. See `.env.example` for detailed comments on each variable.

4. **Set up the database**
   Configure a PostgreSQL database and set `DATABASE_URL` plus `DIRECT_DATABASE_URL` in `.env.local`, then run:
   ```bash
   npm run db:migrate:dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
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

The project uses `output: 'standalone'` for optimized managed Node.js deployment.

```bash
npm run build
```

This creates a standalone build in `.next/standalone/` with:
- Server code and dependencies
- Static files copied to `standalone/public/`
- Next.js static assets in `standalone/.next/static/`

### Start Production Server

```bash
npm run start
```

Or manually with Node:
```bash
NODE_ENV=production node .next/standalone/server.js
```

### Hostinger Deployment

Use Hostinger managed Node.js hosting for production:

1. Connect the GitHub repository in Hostinger.
2. Set the app root to the repository root.
3. Use `npm install` as the install command.
4. Use `npm run build` as the build command.
5. Use `npm start` as the start command.
6. Point `silkbeautysalon.online` and `www.silkbeautysalon.online` at the Hostinger Node.js app.

### Performance Optimizations

- **Lazy loading**: Mobile menu (Sheet) is lazy-loaded to reduce initial bundle
- **Shared icons**: Social media icons are tree-shakeable from `src/components/icons.tsx`
- **Standalone output**: Minimal production image with only required dependencies

### Environment Variables for Production

Ensure all [REQUIRED] variables in `.env.example` are set:

- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_DATABASE_URL` - Direct PostgreSQL connection (for migrations, bypasses PgBouncer)
- `CONTACT_EMAIL` - Contact form recipient
- `SMTP_HOST` - SMTP server, defaults to `smtp.hostinger.com`
- `SMTP_PORT` - SMTP port, defaults to `465`
- `SMTP_SECURE` - Use SSL/TLS, defaults to `true`
- `SMTP_USER` - Full Hostinger mailbox address, e.g. `info@silkbeautysalon.online`
- `SMTP_PASSWORD` - Hostinger mailbox password
- `SMTP_FROM` - Sender mailbox, e.g. `info@silkbeautysalon.online`
- `API_SECRET_KEY` - Secure random string
- `NEXT_PUBLIC_ANDROID_APK_URL` - Optional Android APK URL override; defaults to `/apk/silk-beauty-salon.apk`

## Database Backup & Recovery

Backups run automatically daily at 03:00 UTC via GitHub Actions and are stored in S3. Locally:

- Create backup: `npm run db:backup`
- Verify latest backup: `npm run db:backup:verify`
- Restore from backup: `npm run db:restore`

Retention: 30 daily backups, 12 monthly backups (configure in S3 lifecycle rules).

## License

Copyright © Silk Beauty Salon. All rights reserved.
