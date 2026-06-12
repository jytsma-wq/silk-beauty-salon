# DevOps Guide

Silk Beauty Salon is deployed as a managed Node.js Next.js app through Hostinger.

## Deployment Target

Use Hostinger managed Node.js hosting:

1. Connect the GitHub repository to the Hostinger app.
2. Set the app root to the repository root.
3. Set the install command to `npm install`.
4. Set the build command to `npm run build`.
5. Set the start command to `npm start`.
6. Set the production domain to `silkbeautysalon.online`.
7. Add required environment variables in Hostinger before deploying.

## Required Environment Variables

```env
DATABASE_URL="postgresql://..."
DIRECT_DATABASE_URL="postgresql://..."
CONTACT_EMAIL="info@silkbeautysalon.online"
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="info@silkbeautysalon.online"
SMTP_PASSWORD="..."
SMTP_FROM="info@silkbeautysalon.online"
API_SECRET_KEY="..."
NEXT_PUBLIC_SITE_URL="https://silkbeautysalon.online"
NEXT_PUBLIC_ANDROID_APK_URL="/apk/silk-beauty-salon.apk"
```

`NEXT_PUBLIC_ANDROID_APK_URL` can be left unset when the APK is hosted at `public/apk/silk-beauty-salon.apk`.

## CI

The repository keeps GitHub Actions for linting, type checking, tests, translation validation, and build verification. Deployment should be handled by Hostinger's GitHub integration or Hostinger app dashboard.

## Release Checklist

1. Merge changes to `main`.
2. Confirm GitHub checks pass.
3. Trigger or wait for Hostinger deployment.
4. Verify:

```bash
curl -I https://silkbeautysalon.online/api/health
curl -I https://silkbeautysalon.online/en/download
curl -I https://silkbeautysalon.online/apk/silk-beauty-salon.apk
```

5. Install the APK on a physical Android device and confirm the app opens without Metro.

## Rollback

Use Hostinger's deployment history or redeploy the last known good Git commit from the Hostinger dashboard.
