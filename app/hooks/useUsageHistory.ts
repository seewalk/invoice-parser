'use client';

/**
 * useUsageHistory Hook
 * 
 * Fetches and manages user usage history from Firestore
 * Provides filtering, sorting, and real-time updates
 * 
 * Usage:
 * ```tsx
 * const { history, loading, error, refresh } = useUsageHistory();
 * ```
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  getDocs,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/app/lib/firebase/clientApp';

export type UsageType = 'invoiceParses' | 'templateDownloads' | 'generatorUses';

export interface UsageRecord {
  id: string;
  type: UsageType;
  timestamp: Date;
  plan?: string;
  quotaRemaining?: number;
  metadata?: {
    // Parser metadata
    invoiceNumber?: string;
    supplier?: string;
    totalAmount?: number;
    
    // Template metadata
    templateName?: string;
    templateId?: string;
    
    // Generator metadata
    clientName?: string;
    
    // Common
    timestamp?: string;
  };
}

interface UseUsageHistoryReturn {
  history: UsageRecord[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  filterByType: (type: UsageType | 'all') => void;
  filterByDateRange: (startDate: Date | null, endDate: Date | null) => void;
  filteredHistory: UsageRecord[];
}

export function useUsageHistory(maxRecords: number = 100): UseUsageHistoryReturn {
  const { user } = useAuth();
  const [history, setHistory] = useState<UsageRecord[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<UsageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<UsageType | 'all'>('all');
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });

  /**
   * Fetch usage history from Firestore
   */
  const fetchHistory = useCallback(async () => {
    if (!user || !db) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('[Usage History] Fetching for user:', user.uid);
      
      const usageRef = collection(db, 'users', user.uid, 'usage');
      const q = query(
        usageRef,
        orderBy('timestamp', 'desc'),
        limit(maxRecords)
      );

      // Use onSnapshot for real-time updates
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const records: UsageRecord[] = [];
          
          snapshot.forEach((doc) => {
            const data = doc.data();
            records.push({
              id: doc.id,
              type: data.type,
              timestamp: data.timestamp?.toDate() || new Date(),
              plan: data.plan,
              quotaRemaining: data.quotaRemaining,
              metadata: data.metadata || {}
            });
          });

          console.log(`[Usage History] Loaded ${records.length} records`);
          setHistory(records);
          setFilteredHistory(records);
          setLoading(false);
        },
        (err) => {
          console.error('[Usage History] Error fetching history:', err);
          setError('Failed to load usage history');
          setLoading(false);
        }
      );

      // Return cleanup function
      return unsubscribe;
    } catch (err) {
      console.error('[Usage History] Error setting up listener:', err);
      setError('Failed to load usage history');
      setLoading(false);
    }
  }, [user, maxRecords]);

  /**
   * Apply filters to history
   */
  useEffect(() => {
    let filtered = [...history];

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(record => record.type === typeFilter);
    }

    // Filter by date range
    if (dateRange.start) {
      filtered = filtered.filter(record => 
        record.timestamp >= dateRange.start!
      );
    }
    if (dateRange.end) {
      const endOfDay = new Date(dateRange.end);
      endOfDay.setHours(23, 59, 59, 999);
      filtered = filtered.filter(record => 
        record.timestamp <= endOfDay
      );
    }

    setFilteredHistory(filtered);
  }, [history, typeFilter, dateRange]);

  /**
   * Set up real-time listener
   */
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    fetchHistory().then((unsub) => {
      unsubscribe = unsub;
    });
    
    // Cleanup on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [fetchHistory]);

  /**
   * Manual refresh
   */
  const refresh = async () => {
    await fetchHistory();
  };

  /**
   * Filter by usage type
   */
  const filterByType = (type: UsageType | 'all') => {
    setTypeFilter(type);
  };

  /**
   * Filter by date range
   */
  const filterByDateRange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ start: startDate, end: endDate });
  };

  return {
    history,
    loading,
    error,
    refresh,
    filterByType,
    filterByDateRange,
    filteredHistory
  };
}
