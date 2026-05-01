/**
 * Service Worker for Silk Beauty Salon
 * Provides offline support, caching, and performance optimizations
 */

const CACHE_NAME = 'silk-beauty-v1';
const STATIC_ASSETS = [
  '/',
  '/en',
  '/en/treatments',
  '/en/about',
  '/en/contact',
  '/en/blog',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

const STATIC_CACHE = `${CACHE_NAME}-static`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;
const API_CACHE = `${CACHE_NAME}-api`;

// Cache strategies
const CACHE_STRATEGIES = {
  // Cache first, network fallback for static assets
  static: async (request) => {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);

    if (cached) {
      // Return cached and update in background
      fetch(request).then((response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      });
      return cached;
    }

    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  },

  // Stale while revalidate for images
  image: async (request) => {
    const cache = await caches.open(IMAGE_CACHE);
    const cached = await cache.match(request);

    const fetchPromise = fetch(request).then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => cached);

    return cached || fetchPromise;
  },

  // Network first, cache fallback for API
  api: async (request) => {
    const cache = await caches.open(API_CACHE);

    try {
      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }
      throw error;
    }
  },

  // Network only for non-cacheable requests
  network: async (request) => {
    return fetch(request);
  },
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('silk-beauty-') && name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - apply caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Determine caching strategy based on request type
  let strategy = CACHE_STRATEGIES.network;

  // Static assets (JS, CSS, fonts)
  if (url.pathname.match(/\.(js|css|woff2?)$/)) {
    strategy = CACHE_STRATEGIES.static;
  }
  // Images
  else if (url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/)) {
    strategy = CACHE_STRATEGIES.image;
  }
  // API requests
  else if (url.pathname.startsWith('/api/')) {
    strategy = CACHE_STRATEGIES.api;
  }
  // HTML pages
  else if (url.pathname === '/' || url.pathname.startsWith('/en')) {
    strategy = CACHE_STRATEGIES.static;
  }

  event.respondWith(strategy(request));
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormSubmissions());
  }
});

async function syncFormSubmissions() {
  // Get pending form submissions from IndexedDB and retry
  // This would require additional implementation with IndexedDB
  console.warn('[SW] Syncing form submissions...');
}

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        data: data.url,
      })
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
