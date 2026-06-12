import nodemailer, { type Transporter } from 'nodemailer';
import { emailConfig, senderAddress } from './email-config';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  fromName?: string;
}

let transporter: Transporter | null = null;

function smtpPort(): number {
  const port = Number(process.env.SMTP_PORT || 465);
  return Number.isFinite(port) ? port : 465;
}

function smtpSecure(port: number): boolean {
  if (process.env.SMTP_SECURE !== undefined) {
    return process.env.SMTP_SECURE === 'true';
  }

  return port === 465;
}

function getTransporter(): Transporter | null {
  const user = process.env.SMTP_USER || emailConfig.replyTo;
  const pass = process.env.SMTP_PASSWORD;

  if (!pass) {
    return null;
  }

  if (!transporter) {
    const port = smtpPort();
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port,
      secure: smtpSecure(port),
      auth: {
        user,
        pass,
      },
    });
  }

  return transporter;
}

export async function sendMail(options: SendMailOptions): Promise<{ skipped: boolean }> {
  const smtpTransporter = getTransporter();

  if (!smtpTransporter) {
    console.warn('Hostinger SMTP is not configured; email was not sent.', {
      to: options.to,
      subject: options.subject,
    });
    return { skipped: true };
  }

  await smtpTransporter.sendMail({
    from: senderAddress(options.fromName),
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    replyTo: options.replyTo || emailConfig.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  return { skipped: false };
}
