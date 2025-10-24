'use client';

/**
 * useQuota Hook
 * 
 * Manages user quotas for invoice parsing, template downloads, and generator uses.
 * Provides methods to check and decrement quotas.
 * 
 * Example:
 * ```tsx
 * const { checkQuota, decrementQuota, quotas } = useQuota();
 * 
 * const handleParse = async () => {
 *   if (!checkQuota('invoiceParses')) {
 *     alert('Quota exceeded!');
 *     return;
 *   }
 *   
 *   // ... do parsing ...
 *   
 *   await decrementQuota('invoiceParses');
 * };
 * ```
 */

import { useState, useCallback } from 'react';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { doc, updateDoc, increment, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/clientApp';

export type QuotaType = 'invoiceParses' | 'templateDownloads' | 'generatorUses';

interface UseQuotaReturn {
  checkQuota: (type: QuotaType) => boolean;
  decrementQuota: (type: QuotaType, metadata?: Record<string, any>) => Promise<boolean>;
  getRemaining: (type: QuotaType) => number;
  hasUnlimitedAccess: boolean;
  checking: boolean;
  quotas: ReturnType<typeof useAuth>['userQuotas'];
}

export function useQuota(): UseQuotaReturn {
  const { user, userQuotas, refreshQuotas } = useAuth();
  const [checking, setChecking] = useState(false);

  /**
   * Check if user has quota remaining for a specific action
   * 
   * Admin users always have unlimited access
   * Premium users (not on free plan) have unlimited access
   * Free users have limited quotas
   */
  const checkQuota = useCallback((type: QuotaType): boolean => {
    if (!user || !userQuotas) {
      console.warn('[Quota] No user or quotas available');
      return false;
    }
    
    // Admin users have unlimited access (highest priority)
    if (userQuotas.role === 'admin') {
      console.log('[Quota] Admin user - unlimited access granted');
      return true;
    }
    
    // Premium users (not on free plan) have unlimited access
    if (userQuotas.plan !== 'free') {
      console.log('[Quota] Premium user - unlimited access granted');
      return true;
    }
    
    // Check specific quota for free users
    const remaining = userQuotas[type] || 0;
    console.log(`[Quota] Free user - checking ${type}: ${remaining} remaining`);
    return remaining > 0;
  }, [user, userQuotas]);

  /**
   * Get remaining quota for a specific type
   * 
   * Returns actual quota for display purposes
   */
  const getRemaining = useCallback((type: QuotaType): number => {
    if (!userQuotas) return 0;
    
    // Admin users have unlimited (show as ∞ or very high number)
    if (userQuotas.role === 'admin') {
      return 999999;  // Effectively unlimited
    }
    
    // Premium users have "unlimited" (show as 999)
    if (userQuotas.plan !== 'free') {
      return 999;
    }
    
    return userQuotas[type] || 0;
  }, [userQuotas]);

  /**
   * Check if user has unlimited access
   * 
   * Returns true for:
   * - Admin users (role === 'admin')
   * - Premium users (plan !== 'free')
   */
  const hasUnlimitedAccess = useCallback((): boolean => {
    if (!userQuotas) return false;
    
    // Admin users have unlimited access
    if (userQuotas.role === 'admin') return true;
    
    // Premium users have unlimited access
    return userQuotas.plan !== 'free';
  }, [userQuotas]);

  /**
   * Decrement quota and log usage
   * 
   * Admin and premium users don't have quotas decremented
   * but usage is still logged for analytics
   */
  const decrementQuota = useCallback(async (
    type: QuotaType, 
    metadata?: Record<string, any>
  ): Promise<boolean> => {
    if (!user || !userQuotas || !db) {
      console.error('[Quota] No user, quotas, or database available for decrement');
      return false;
    }
    
    // Admin users don't decrement quotas (highest priority)
    if (userQuotas.role === 'admin') {
      console.log('[Quota] Admin user, no decrement needed');
      
      // Still log usage for analytics
      try {
        await addDoc(collection(db, 'users', user.uid, 'usage'), {
          type,
          timestamp: serverTimestamp(),
          metadata: metadata || {},
          plan: userQuotas.plan,
          role: 'admin'
        });
      } catch (error) {
        console.error('[Quota] Error logging admin usage:', error);
      }
      
      return true;
    }
    
    // Premium users don't decrement quotas
    if (userQuotas.plan !== 'free') {
      console.log('[Quota] Premium user, no decrement needed');
      
      // Still log usage for analytics
      try {
        await addDoc(collection(db, 'users', user.uid, 'usage'), {
          type,
          timestamp: serverTimestamp(),
          metadata: metadata || {},
          plan: userQuotas.plan
        });
      } catch (error) {
        console.error('[Quota] Error logging premium usage:', error);
      }
      
      return true;
    }
    
    // Check before decrement
    if ((userQuotas[type] || 0) <= 0) {
      console.warn(`[Quota] No ${type} quota remaining`);
      return false;
    }

    setChecking(true);
    try {
      // Decrement quota in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        [type]: increment(-1)
      });
      
      // Log usage in subcollection
      await addDoc(collection(db, 'users', user.uid, 'usage'), {
        type,
        timestamp: serverTimestamp(),
        metadata: metadata || {},
        quotaRemaining: (userQuotas[type] || 0) - 1
      });
      
      console.log(`[Quota] Successfully decremented ${type}`);
      
      // Refresh quotas to get updated values
      await refreshQuotas();
      
      return true;
    } catch (error) {
      console.error('[Quota] Error decrementing quota:', error);
      return false;
    } finally {
      setChecking(false);
    }
  }, [user, userQuotas, refreshQuotas]);

  return {
    checkQuota,
    decrementQuota,
    getRemaining,
    hasUnlimitedAccess: hasUnlimitedAccess(),
    checking,
    quotas: userQuotas
  };
}
