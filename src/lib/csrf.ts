import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const CSRF_COOKIE_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const TOKEN_LENGTH = 32;

/**
 * Generate cryptographically secure CSRF token using Web Crypto API
 */
export function generateCsrfToken(): string {
  const array = new Uint8Array(TOKEN_LENGTH);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Set CSRF token in cookie and return it
 * For use in server actions or API routes
 */
export async function setCsrfToken(): Promise<string> {
  const token = generateCsrfToken();
  const cookieStore = await cookies();
  
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  
  return token;
}

/**
 * Set CSRF token in a response cookie (for use in middleware)
 */
export function setCsrfTokenInResponse(response: NextResponse, token: string): void {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

/**
 * Get CSRF token from cookie
 */
export async function getCsrfToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CSRF_COOKIE_NAME)?.value;
}

/**
 * Verify CSRF token from request
 * Checks both header and body for token
 */
export async function verifyCsrfToken(request: NextRequest): Promise<boolean> {
  const cookieToken = await getCsrfToken();
  
  if (!cookieToken) {
    return false;
  }
  
  // Check header first
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  if (headerToken) {
    return await safeCompare(cookieToken, headerToken);
  }
  
  // Check form data for POST requests
  if (request.method === 'POST') {
    try {
      const formData = await request.clone().formData();
      const formToken = formData.get('_csrf');
      if (typeof formToken === 'string') {
        return await safeCompare(cookieToken, formToken);
      }
    } catch {
      // Not form data, ignore
    }
    
    // Check JSON body
    try {
      const json = await request.clone().json();
      if (json._csrf) {
        return await safeCompare(cookieToken, json._csrf);
      }
    } catch {
      // Not JSON, ignore
    }
  }
  
  return false;
}

/**
 * Timing-safe string comparison using Web Crypto API
 */
async function safeCompare(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  
  if (bufA.length !== bufB.length) {
    return false;
  }
  
  // Use subtle crypto for constant-time comparison
  const key = await crypto.subtle.importKey(
    'raw',
    new Uint8Array(32),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const sigA = await crypto.subtle.sign('HMAC', key, bufA);
  const sigB = await crypto.subtle.sign('HMAC', key, bufB);
  
  return sigA.byteLength === sigB.byteLength && 
    new Uint8Array(sigA).every((val, i) => val === new Uint8Array(sigB)[i]);
}

/**
 * Middleware to validate CSRF on state-changing requests
 * Apply to API routes that modify data
 */
export async function csrfMiddleware(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  // Only validate state-changing methods
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const valid = await verifyCsrfToken(request);
    
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid or missing CSRF token' },
        { status: 403 }
      );
    }
  }
  
  return handler();
}

/**
 * Hook for client-side CSRF token management
 * Returns token to include in requests
 */
export function useCsrfToken(): string | null {
  // Client-side only
  if (typeof window === 'undefined') {
    return null;
  }
  
  // Get from meta tag if available
  const metaToken = document.querySelector('meta[name="csrf-token"]');
  if (metaToken) {
    return metaToken.getAttribute('content') || null;
  }
  
  return null;
}
