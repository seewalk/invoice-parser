'use client';

/**
 * useRequireAuth Hook
 * 
 * Redirects unauthenticated users to sign-in page with return URL.
 * Use this in protected pages/components.
 * 
 * Example:
 * ```tsx
 * const { user, loading } = useRequireAuth();
 * 
 * if (loading) return <LoadingSpinner />;
 * // User is guaranteed to be authenticated here
 * ```
 */

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/AuthContext';

export function useRequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Store current URL for redirect after sign-in
      const redirectUrl = encodeURIComponent(pathname);
      console.log(`[Auth Guard] Redirecting to sign-in with return URL: ${pathname}`);
      router.push(`/sign-in?redirect=${redirectUrl}`);
    }
  }, [user, loading, router, pathname]);

  return { user, loading };
}
