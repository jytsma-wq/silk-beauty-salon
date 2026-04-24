'use client';

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

interface AnnouncerMessage {
  id: string;
  message: string;
  type: 'polite' | 'assertive';
  clearAfter?: number;
}

interface AnnouncerContextType {
  announce: (message: string, type?: 'polite' | 'assertive', clearAfter?: number) => void;
  announceSuccess: (message: string) => void;
  announceError: (message: string) => void;
  announceLoading: (message: string) => void;
}

const AnnouncerContext = createContext<AnnouncerContextType | undefined>(undefined);

/**
 * Hook to use the announcer for live region announcements
 * @returns Announcer functions for polite and assertive announcements
 */
export function useAnnouncer(): AnnouncerContextType {
  const context = useContext(AnnouncerContext);
  if (!context) {
    throw new Error('useAnnouncer must be used within an AnnouncerProvider');
  }
  return context;
}

interface AnnouncerProviderProps {
  children: ReactNode;
}

/**
 * Provider component for screen reader announcements
 * Creates aria-live regions for polite and assertive announcements
 */
export function AnnouncerProvider({ children }: AnnouncerProviderProps) {
  const [messages, setMessages] = useState<AnnouncerMessage[]>([]);

  const announce = useCallback((message: string, type: 'polite' | 'assertive' = 'polite', clearAfter = 5000) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMessage: AnnouncerMessage = { id, message, type, clearAfter };
    
    setMessages((prev) => [...prev, newMessage]);

    // Auto-clear after specified time
    if (clearAfter > 0) {
      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }, clearAfter);
    }
  }, []);

  const announceSuccess = useCallback((message: string) => {
    announce(message, 'polite', 5000);
  }, [announce]);

  const announceError = useCallback((message: string) => {
    announce(message, 'assertive', 10000);
  }, [announce]);

  const announceLoading = useCallback((message: string) => {
    announce(message, 'polite', 3000);
  }, [announce]);

  const politeMessages = messages.filter((m) => m.type === 'polite');
  const assertiveMessages = messages.filter((m) => m.type === 'assertive');

  return (
    <AnnouncerContext.Provider value={{ announce, announceSuccess, announceError, announceLoading }}>
      {children}
      
      {/* Live region for polite announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeMessages.map((m) => (
          <span key={m.id}>{m.message}</span>
        ))}
      </div>

      {/* Live region for assertive announcements */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveMessages.map((m) => (
          <span key={m.id}>{m.message}</span>
        ))}
      </div>
    </AnnouncerContext.Provider>
  );
}

/**
 * Standalone announcer component for use outside of provider
 * Can be placed directly in a component for simple use cases
 */
interface LiveAnnouncerProps {
  message?: string;
  type?: 'polite' | 'assertive';
  clearAfter?: number;
}

export function LiveAnnouncer({ message, type = 'polite', clearAfter = 5000 }: LiveAnnouncerProps) {
  const [currentMessage, setCurrentMessage] = useState(message);

  // Update message when prop changes
  if (message !== currentMessage) {
    setCurrentMessage(message);
  }

  // Auto-clear
  if (clearAfter > 0 && currentMessage) {
    setTimeout(() => setCurrentMessage(''), clearAfter);
  }

  return (
    <div
      role={type === 'assertive' ? 'alert' : 'status'}
      aria-live={type}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  );
}
