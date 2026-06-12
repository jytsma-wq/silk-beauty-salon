'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useConsent } from '@/components/providers/ConsentProvider';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
}

interface ChatbotResponse {
  reply: string;
  quickReplies: string[];
  links: Array<{
    label: string;
    href: string;
  }>;
}

const initialQuickReplies = [
  'Book an appointment',
  'View prices',
  'Opening hours',
  'Where are you located?',
];

export function ChatbotWidget() {
  const locale = useLocale();
  const pathname = usePathname();
  const { showBanner } = useConsent();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickReplies, setQuickReplies] = useState(initialQuickReplies);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hello, I am the Silk assistant. I can help with bookings, treatments, prices, hours, directions, and the Android app.',
      links: [{ label: 'Book online', href: '/book' }],
    },
  ]);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: trimmed },
    ]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, locale }),
      });
      const data = await response.json().catch(() => null) as Partial<ChatbotResponse> | null;

      const replyText = data?.reply;
      if (!response.ok || !replyText) {
        throw new Error(typeof data?.reply === 'string' ? data.reply : 'Chat unavailable');
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: replyText,
          links: data.links || [],
        },
      ]);
      setQuickReplies(data.quickReplies || initialQuickReplies);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: 'I could not answer right now. Please use the booking page or contact the salon directly.',
          links: [
            { label: 'Book online', href: '/book' },
            { label: 'Contact page', href: '/contact-us' },
          ],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const resolveHref = (href: string) => {
    if (href.startsWith('/')) {
      return href;
    }

    return `/${locale}${href}`;
  };

  return (
    <div
      className={cn(
        'fixed right-6 z-40 transition-all duration-300',
        showBanner ? 'bottom-52' : 'bottom-24'
      )}
    >
      {isOpen ? (
        <div className="absolute bottom-16 right-0 flex h-[32rem] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 border-b border-stone-200 bg-[#241f1b] px-4 py-3 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">Silk assistant</p>
              <p className="text-xs text-white/70">Self-made salon help</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={panelRef} className="flex-1 space-y-3 overflow-y-auto bg-[#faf8f5] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'max-w-[90%] rounded-md px-3 py-2 text-sm leading-relaxed',
                  message.role === 'user'
                    ? 'ml-auto bg-[#241f1b] text-white'
                    : 'mr-auto border border-stone-200 bg-white text-stone-800'
                )}
              >
                <p>{message.text}</p>
                {message.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.links.map((link) => (
                      <Link
                        key={`${message.id}-${link.href}`}
                        href={resolveHref(link.href)}
                        onClick={() => setIsOpen(false)}
                        className="rounded border border-[#8d6f58]/30 bg-[#f7f2eb] px-2.5 py-1 text-xs font-medium text-[#241f1b] transition hover:bg-[#241f1b] hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {isLoading ? (
              <div className="mr-auto rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-500">
                Typing...
              </div>
            ) : null}
          </div>

          <div className="border-t border-stone-200 bg-white p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => void sendMessage(reply)}
                  disabled={isLoading}
                  className="shrink-0 rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-700 transition hover:border-[#8d6f58] hover:text-[#241f1b] disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={1000}
                placeholder="Ask about bookings, prices, hours..."
                className="min-w-0 flex-1 rounded-md border border-stone-200 px-3 py-2 text-sm outline-none transition focus:border-[#8d6f58] focus:ring-2 focus:ring-[#8d6f58]/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#241f1b] text-white transition hover:bg-[#8d6f58] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#241f1b] text-white shadow-lg transition hover:scale-105 hover:bg-[#8d6f58] focus:outline-none focus:ring-4 focus:ring-[#241f1b]/20"
        aria-label="Open salon assistant chat"
        aria-expanded={isOpen}
      >
        <Bot className="h-6 w-6" />
        {!isOpen && !pathname?.includes('/book') ? (
          <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-stone-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 md:block">
            Ask Silk
          </span>
        ) : null}
      </button>
    </div>
  );
}
