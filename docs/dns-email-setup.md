# Hostinger Email Configuration for silkbeautysalon.online

The website sends contact, booking, and newsletter emails through the Hostinger mailbox `info@silkbeautysalon.online`.

## Hostinger Mailbox

1. In Hostinger hPanel, open Email for `silkbeautysalon.online`.
2. Create or confirm the mailbox `info@silkbeautysalon.online`.
3. Confirm the mailbox password works in Hostinger Webmail.

## DNS Records

Use Hostinger's email DNS records for the domain. Confirm the domain has the required MX, SPF, DKIM, and DMARC records in hPanel before production traffic is sent.

## Application Environment Variables

Set these in Hostinger's Node.js app environment:

```env
CONTACT_EMAIL=info@silkbeautysalon.online
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@silkbeautysalon.online
SMTP_PASSWORD=<hostinger-mailbox-password>
SMTP_FROM=info@silkbeautysalon.online
```

If SSL port `465` is blocked by the hosting environment, use:

```env
SMTP_PORT=587
SMTP_SECURE=false
```

## Test

1. Submit a contact request on the site.
2. Submit a booking request through the self-built booking page.
3. Check `info@silkbeautysalon.online` for admin notifications.
4. Check the customer email for the booking confirmation.
