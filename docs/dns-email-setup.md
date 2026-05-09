# Email DNS Configuration for silkbeautysalon.online

## Step 1: Resend Domain Verification

1. Go to https://resend.com/domains
2. Click "Add Domain" and enter `silkbeautysalon.online`
3. Resend will show you DNS records to add:

| Type | Name | Value |
| --- | --- | --- |
| TXT | resend._domainkey | Provided by Resend, usually a long DKIM value |
| TXT | @ | v=spf1 include:resend.com ~all |
| MX | send | feedback-smtp.resend.com |

4. Add these records at your DNS registrar.
5. Click "Verify" in the Resend dashboard. Verification usually takes 5-30 minutes.

## Step 2: Inbox Setup

Option A: Zoho Mail Free

1. Go to https://mail.zoho.com and sign up for the free plan.
2. Add the domain `silkbeautysalon.online`.
3. Add Zoho MX records at your DNS registrar:

| Type | Priority | Value |
| --- | --- | --- |
| MX | 10 | mx.zohomail.com |
| MX | 20 | mx2.zohomail.com |

4. Create the inbox `info@silkbeautysalon.online`.

Option B: Google Workspace

Follow the Google Workspace setup wizard at https://workspace.google.com. Google provides MX records during setup.

## Step 3: Environment Variables

Set these in your deployment platform:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CONTACT_EMAIL=info@silkbeautysalon.online
```

## Step 4: Test

After DNS propagation:

1. Submit a booking request on the site.
2. Check `info@silkbeautysalon.online` for the admin notification.
3. Check the patient email for the confirmation email.
4. If emails land in spam, add a DMARC record:

| Type | Name | Value |
| --- | --- | --- |
| TXT | _dmarc | v=DMARC1; p=none; rua=mailto:info@silkbeautysalon.online |

Start with `p=none`. After two weeks of monitoring, upgrade to `p=quarantine`.
