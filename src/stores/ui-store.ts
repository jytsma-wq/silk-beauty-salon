/**
 * UI Store - Zustand
 * Manages UI state like modals, drawers, notifications, and global UI flags
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Modal state interface
 */
interface ModalState {
  /** Modal unique identifier */
  id: string;
  /** Modal is open */
  isOpen: boolean;
  /** Modal data/payload */
  data?: Record<string, unknown>;
}

/**
 * Drawer state interface
 */
interface DrawerState {
  /** Drawer unique identifier */
  id: string;
  /** Drawer is open */
  isOpen: boolean;
  /** Drawer data/payload */
  data?: Record<string, unknown>;
}

/**
 * Notification interface
 */
interface Notification {
  /** Unique ID */
  id: string;
  /** Notification type */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration: number;
  /** Action button configuration */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Created timestamp */
  createdAt: number;
}

/**
 * UI Store state interface
 */
interface UIState {
  /** Active modals */
  modals: ModalState[];
  /** Active drawers */
  drawers: DrawerState[];
  /** Active notifications */
  notifications: Notification[];
  /** Mobile menu open state */
  isMobileMenuOpen: boolean;
  /** Search drawer open state */
  isSearchOpen: boolean;
  /** Current toast being displayed */
  toast: Notification | null;
  /** Loading states by key */
  loadingStates: Record<string, boolean>;
  
  // Modal actions
  /** Open a modal */
  openModal: (id: string, data?: Record<string, unknown>) => void;
  /** Close a modal */
  closeModal: (id: string) => void;
  /** Toggle modal state */
  toggleModal: (id: string, data?: Record<string, unknown>) => void;
  /** Close all modals */
  closeAllModals: () => void;
  
  // Drawer actions
  /** Open a drawer */
  openDrawer: (id: string, data?: Record<string, unknown>) => void;
  /** Close a drawer */
  closeDrawer: (id: string) => void;
  /** Toggle drawer state */
  toggleDrawer: (id: string, data?: Record<string, unknown>) => void;
  /** Close all drawers */
  closeAllDrawers: () => void;
  
  // Notification actions
  /** Add a notification */
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => string;
  /** Remove a notification */
  removeNotification: (id: string) => void;
  /** Show a toast notification */
  showToast: (type: Notification['type'], title: string, message: string, duration?: number) => void;
  /** Hide current toast */
  hideToast: () => void;
  /** Clear all notifications */
  clearAllNotifications: () => void;
  
  // UI actions
  /** Toggle mobile menu */
  toggleMobileMenu: () => void;
  /** Set mobile menu state */
  setMobileMenuOpen: (isOpen: boolean) => void;
  /** Toggle search */
  toggleSearch: () => void;
  /** Set search open state */
  setSearchOpen: (isOpen: boolean) => void;
  /** Set loading state */
  setLoading: (key: string, isLoading: boolean) => void;
  /** Check if loading */
  isLoading: (key: string) => boolean;
  /** Reset all UI state */
  resetUI: () => void;
}

/**
 * Generate unique ID for notifications
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * UI Store with DevTools integration
 * Does not persist - UI state should reset on page reload
 */
export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // Initial state
      modals: [],
      drawers: [],
      notifications: [],
      isMobileMenuOpen: false,
      isSearchOpen: false,
      toast: null,
      loadingStates: {},
      
      // Modal actions
      openModal: (id, data) =>
        set((state) => ({
          modals: [...state.modals.filter((m) => m.id !== id), { id, isOpen: true, data }],
        })),
      
      closeModal: (id) =>
        set((state) => ({
          modals: state.modals.map((m) =>
            m.id === id ? { ...m, isOpen: false } : m
          ),
        })),
      
      toggleModal: (id, data) => {
        const { modals } = get();
        const existing = modals.find((m) => m.id === id);
        if (existing?.isOpen) {
          get().closeModal(id);
        } else {
          get().openModal(id, data);
        }
      },
      
      closeAllModals: () =>
        set((state) => ({
          modals: state.modals.map((m) => ({ ...m, isOpen: false })),
        })),
      
      // Drawer actions
      openDrawer: (id, data) =>
        set((state) => ({
          drawers: [...state.drawers.filter((d) => d.id !== id), { id, isOpen: true, data }],
        })),
      
      closeDrawer: (id) =>
        set((state) => ({
          drawers: state.drawers.map((d) =>
            d.id === id ? { ...d, isOpen: false } : d
          ),
        })),
      
      toggleDrawer: (id, data) => {
        const { drawers } = get();
        const existing = drawers.find((d) => d.id === id);
        if (existing?.isOpen) {
          get().closeDrawer(id);
        } else {
          get().openDrawer(id, data);
        }
      },
      
      closeAllDrawers: () =>
        set((state) => ({
          drawers: state.drawers.map((d) => ({ ...d, isOpen: false })),
        })),
      
      // Notification actions
      addNotification: (notification) => {
        const id = generateId();
        const newNotification: Notification = {
          ...notification,
          id,
          createdAt: Date.now(),
        };
        
        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }));
        
        // Auto-dismiss if duration > 0
        if (notification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration);
        }
        
        return id;
      },
      
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      
      showToast: (type, title, message, duration = 5000) => {
        const id = generateId();
        const toast: Notification = {
          id,
          type,
          title,
          message,
          duration,
          createdAt: Date.now(),
        };
        
        set({ toast });
        
        // Auto-hide toast
        if (duration > 0) {
          setTimeout(() => {
            const current = get().toast;
            if (current?.id === id) {
              get().hideToast();
            }
          }, duration);
        }
      },
      
      hideToast: () => set({ toast: null }),
      
      clearAllNotifications: () => set({ notifications: [] }),
      
      // UI actions
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      
      toggleSearch: () =>
        set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      
      setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
      
      setLoading: (key, isLoading) =>
        set((state) => ({
          loadingStates: { ...state.loadingStates, [key]: isLoading },
        })),
      
      isLoading: (key) => !!get().loadingStates[key],
      
      resetUI: () =>
        set({
          modals: [],
          drawers: [],
          notifications: [],
          isMobileMenuOpen: false,
          isSearchOpen: false,
          toast: null,
          loadingStates: {},
        }),
    }),
    {
      name: 'silk-ui-store',
    }
  )
);

/**
 * Selector hooks for common UI patterns
 */
export const useIsModalOpen = (id: string) => 
  useUIStore((state) => state.modals.find((m) => m.id === id)?.isOpen ?? false);

export const useModalData = (id: string) =>
  useUIStore((state) => state.modals.find((m) => m.id === id)?.data);

export const useIsDrawerOpen = (id: string) =>
  useUIStore((state) => state.drawers.find((d) => d.id === id)?.isOpen ?? false);

export const useDrawerData = (id: string) =>
  useUIStore((state) => state.drawers.find((d) => d.id === id)?.data);

/**
 * Shorthand for common toast notifications
 */
export function useToast() {
  const showToast = useUIStore((state) => state.showToast);
  const hideToast = useUIStore((state) => state.hideToast);
  const toast = useUIStore((state) => state.toast);
  
  return {
    toast,
    hideToast,
    success: (title: string, message: string, duration?: number) =>
      showToast('success', title, message, duration),
    error: (title: string, message: string, duration?: number) =>
      showToast('error', title, message, duration),
    warning: (title: string, message: string, duration?: number) =>
      showToast('warning', title, message, duration),
    info: (title: string, message: string, duration?: number) =>
      showToast('info', title, message, duration),
  };
}

// Selector hooks use the locally defined useUIStore
