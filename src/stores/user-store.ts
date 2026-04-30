/**
 * User Store - Zustand
 * Manages user preferences, session, and consent
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type Locale } from '@/i18n';

/**
 * User preferences interface
 */
interface UserPreferences {
  /** Selected language/locale */
  locale: Locale;
  /** UI theme preference */
  theme: 'light' | 'dark' | 'system';
  /** Accessibility settings */
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  /** Notification preferences */
  notifications: {
    email: boolean;
    sms: boolean;
    marketing: boolean;
  };
}

/**
 * Cookie consent interface
 */
interface CookieConsent {
  /** Whether user has made a choice */
  hasConsented: boolean;
  /** Consent timestamp */
  timestamp?: string;
  /** Accepted cookie categories */
  accepted: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
}

/**
 * User session interface
 */
interface UserSession {
  /** User ID if authenticated */
  userId?: string;
  /** User email */
  email?: string;
  /** User name */
  name?: string;
  /** Authentication token */
  token?: string;
  /** Session expiry */
  expiresAt?: string;
}

/**
 * User store state interface
 */
interface UserState {
  /** User preferences */
  preferences: UserPreferences;
  /** Cookie consent state */
  consent: CookieConsent;
  /** User session */
  session: UserSession;
  
  // Actions
  /** Update user locale */
  setLocale: (locale: Locale) => void;
  /** Update theme */
  setTheme: (theme: UserPreferences['theme']) => void;
  /** Update accessibility settings */
  setAccessibility: (settings: Partial<UserPreferences['accessibility']>) => void;
  /** Update notification preferences */
  setNotifications: (settings: Partial<UserPreferences['notifications']>) => void;
  /** Accept all cookies */
  acceptAllCookies: () => void;
  /** Reject non-essential cookies */
  rejectCookies: () => void;
  /** Update specific cookie consent */
  updateCookieConsent: (consent: Partial<CookieConsent['accepted']>) => void;
  /** Clear cookie consent */
  clearCookieConsent: () => void;
  /** Set user session */
  setSession: (session: UserSession) => void;
  /** Clear user session (logout) */
  clearSession: () => void;
  /** Reset store to defaults */
  reset: () => void;
}

/**
 * Default user preferences
 */
const defaultPreferences: UserPreferences = {
  locale: 'en',
  theme: 'system',
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium',
  },
  notifications: {
    email: true,
    sms: false,
    marketing: false,
  },
};

/**
 * Default cookie consent state
 */
const defaultConsent: CookieConsent = {
  hasConsented: false,
  accepted: {
    necessary: true,
    analytics: false,
    marketing: false,
  },
};

/**
 * Default session state
 */
const defaultSession: UserSession = {};

/**
 * User store with persistence
 * Persists to localStorage for cross-session state
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      preferences: defaultPreferences,
      consent: defaultConsent,
      session: defaultSession,
      
      // Actions
      setLocale: (locale) =>
        set((state) => ({
          preferences: { ...state.preferences, locale },
        })),
      
      setTheme: (theme) =>
        set((state) => ({
          preferences: { ...state.preferences, theme },
        })),
      
      setAccessibility: (settings) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            accessibility: { ...state.preferences.accessibility, ...settings },
          },
        })),
      
      setNotifications: (settings) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            notifications: { ...state.preferences.notifications, ...settings },
          },
        })),
      
      acceptAllCookies: () =>
        set({
          consent: {
            hasConsented: true,
            timestamp: new Date().toISOString(),
            accepted: {
              necessary: true,
              analytics: true,
              marketing: true,
            },
          },
        }),
      
      rejectCookies: () =>
        set({
          consent: {
            hasConsented: true,
            timestamp: new Date().toISOString(),
            accepted: {
              necessary: true,
              analytics: false,
              marketing: false,
            },
          },
        }),
      
      updateCookieConsent: (consent) =>
        set((state) => ({
          consent: {
            ...state.consent,
            hasConsented: true,
            timestamp: new Date().toISOString(),
            accepted: { ...state.consent.accepted, ...consent },
          },
        })),
      
      clearCookieConsent: () => set({ consent: defaultConsent }),
      
      setSession: (session) => set({ session }),
      
      clearSession: () => set({ session: defaultSession }),
      
      reset: () =>
        set({
          preferences: defaultPreferences,
          consent: defaultConsent,
          session: defaultSession,
        }),
    }),
    {
      name: 'silk-user-store',
      storage: createJSONStorage(() => localStorage),
      // Only persist certain parts of state
      partialize: (state) => ({
        preferences: state.preferences,
        consent: state.consent,
        // Don't persist session - use separate cookie/http-only
      }),
    }
  )
);

/**
 * Selector hooks for better performance
 * Use these instead of accessing state directly when possible
 */
export const useUserLocale = () => useUserStore((state) => state.preferences.locale);
export const useUserTheme = () => useUserStore((state) => state.preferences.theme);
export const useUserAccessibility = () => useUserStore((state) => state.preferences.accessibility);
export const useUserNotifications = () => useUserStore((state) => state.preferences.notifications);
export const useCookieConsent = () => useUserStore((state) => state.consent);
export const useUserSession = () => useUserStore((state) => state.session);
export const useIsAuthenticated = () => useUserStore((state) => !!state.session.userId);

// React hooks import for hydration helper
import { useSyncExternalStore } from 'react';

/**
 * Hydration helper for Next.js
 * Ensures store is properly hydrated on client
 */
export function useUserStoreHydration(): boolean {
  return useSyncExternalStore(
    () => () => {}, // no-op subscription
    () => true, // client value
    () => false // server value
  );
}
