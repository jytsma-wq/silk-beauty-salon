import { describe, expect, it } from 'vitest';
import { createChatbotReply } from '../chatbot';

describe('createChatbotReply', () => {
  it('routes booking questions to the internal booking page', () => {
    const reply = createChatbotReply('Can I book an appointment tomorrow?');

    expect(reply.reply).toContain('internal booking system');
    expect(reply.links).toContainEqual({ label: 'Open booking page', href: '/book' });
  });

  it('answers opening hours from salon configuration', () => {
    const reply = createChatbotReply('What time are you open?');

    expect(reply.reply).toContain('Monday to Friday');
    expect(reply.reply).toContain('10:00 - 22:00');
  });

  it('returns contact details for human handoff requests', () => {
    const reply = createChatbotReply('I need to speak with a person');

    expect(reply.reply).toContain('info@silkbeautysalon.online');
    expect(reply.links).toContainEqual({ label: 'Contact page', href: '/contact-us' });
  });

  it('falls back safely without pretending to give medical advice', () => {
    const reply = createChatbotReply('Something unusual and specific');

    expect(reply.reply).toContain('For medical advice');
    expect(reply.links).toContainEqual({ label: 'Book online', href: '/book' });
  });
});
