'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/firebase/AuthContext';

/**
 * Subscription Data Interface
 * 
 * Represents the full subscription state for a user
 */
export interface SubscriptionData {
  // Subscription details
  subscriptionId: string | null;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'none';
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  currentPeriodEnd?: number; // Unix timestamp
  cancelAtPeriodEnd?: boolean;
  
  // Payment method
  paymentMethod: {
    last4: string;
    brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';
    expMonth: number;
    expYear: number;
  } | null;
  
  // Billing history
  billingHistory: Array<{
    id: string;
    date: Date;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
    description: string;
    invoiceUrl?: string;
  }>;
  
  // Loading states
  isLoading: boolean;
  error: string | null;
}

/**
 * useSubscription Hook
 * 
 * Custom hook for managing subscription data and polling.
 * 
 * Features:
 * - Fetches subscription status from Firestore
 * - Polls Stripe API every 60 seconds for updates
 * - Provides subscription, payment method, and billing history data
 * - Handles loading and error states
 * 
 * Phase 4: FRONTEND STRUCTURE ONLY
 * - Data interfaces defined
 * - Polling logic outlined but commented out
 * - Returns mock/Firestore data for now
 * - API integration will be implemented later
 * 
 * @returns {SubscriptionData} Subscription data and loading states
 */
export function useSubscription(): SubscriptionData {
  const { user, userQuotas } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({
    subscriptionId: null,
    status: 'none',
    plan: 'free',
    paymentMethod: null,
    billingHistory: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!user) {
      setSubscriptionData({
        subscriptionId: null,
        status: 'none',
        plan: 'free',
        paymentMethod: null,
        billingHistory: [],
        isLoading: false,
        error: null,
      });
      return;
    }

    // TODO: Implement subscription data fetching
    // This will involve:
    // 1. Reading subscription data from Firestore (userQuotas.stripe.subscription)
    // 2. Calling Lambda API to get latest status
    // 3. Merging Firestore and API data
    // 4. Setting up polling interval (60 seconds)
    
    const fetchSubscriptionData = async () => {
      try {
        // For now, use data from Firestore (via userQuotas)
        const stripeData = userQuotas?.stripe || {};
        
        // Mock data structure (replace with actual API call)
        const data: SubscriptionData = {
          subscriptionId: stripeData.subscriptionId || null,
          status: stripeData.subscriptionId ? 'active' : 'none',
          plan: userQuotas?.plan || 'free',
          currentPeriodEnd: stripeData.currentPeriodEnd,
          cancelAtPeriodEnd: stripeData.cancelAtPeriodEnd,
          
          // TODO: Fetch payment method from Stripe API
          paymentMethod: stripeData.paymentMethod || null,
          
          // TODO: Fetch billing history from Stripe API
          billingHistory: [],
          
          isLoading: false,
          error: null,
        };
        
        setSubscriptionData(data);
        
        // TODO: Implement API polling
        // Example polling logic (commented out):
        /*
        const pollInterval = setInterval(async () => {
          try {
            // Call Lambda API to get latest subscription status
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_STRIPE_API_URL}/getSubscriptionStatus`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  customerId: stripeData.customerId,
                  subscriptionId: stripeData.subscriptionId,
                }),
              }
            );
            
            const apiData = await response.json();
            
            // Update state with fresh data
            setSubscriptionData(prev => ({
              ...prev,
              status: apiData.status,
              currentPeriodEnd: apiData.currentPeriodEnd,
              cancelAtPeriodEnd: apiData.cancelAtPeriodEnd,
            }));
            
            // Also update Firestore to keep it in sync
            await updateDoc(doc(db, 'users', user.uid), {
              'stripe.subscription': apiData,
            });
          } catch (error) {
            console.error('Polling error:', error);
          }
        }, 60000); // Poll every 60 seconds
        
        // Cleanup interval on unmount
        return () => clearInterval(pollInterval);
        */
        
      } catch (error) {
        console.error('Error fetching subscription data:', error);
        setSubscriptionData(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        }));
      }
    };

    fetchSubscriptionData();
    
    // TODO: Add cleanup for polling interval when implemented
    
  }, [user, userQuotas]);

  return subscriptionData;
}

/**
 * Helper Functions for Subscription Management
 * 
 * These will be implemented when connecting to Lambda API
 */

// TODO: Implement these functions when ready for API integration

/**
 * Cancel subscription
 * 
 * @param subscriptionId - Stripe subscription ID
 * @returns Promise with cancellation result
 */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  // TODO: Implement cancellation
  // 1. Call Lambda API /cancelSubscription endpoint
  // 2. Update Firestore with cancelAtPeriodEnd flag
  // 3. Return result
  
  console.log('TODO: Cancel subscription', subscriptionId);
  throw new Error('Not implemented yet');
}

/**
 * Update payment method
 * 
 * @param customerId - Stripe customer ID
 * @param paymentMethodId - New payment method ID
 * @returns Promise with update result
 */
export async function updatePaymentMethod(
  customerId: string,
  paymentMethodId: string
): Promise<void> {
  // TODO: Implement payment method update
  // 1. Call Lambda API /updatePaymentMethod endpoint
  // 2. Update Firestore with new payment method details
  // 3. Return result
  
  console.log('TODO: Update payment method', customerId, paymentMethodId);
  throw new Error('Not implemented yet');
}

/**
 * Get billing history
 * 
 * @param customerId - Stripe customer ID
 * @param limit - Number of invoices to fetch (default: 12)
 * @returns Promise with billing history array
 */
export async function getBillingHistory(
  customerId: string,
  limit: number = 12
): Promise<SubscriptionData['billingHistory']> {
  // TODO: Implement billing history fetch
  // 1. Call Lambda API /getBillingHistory endpoint (or Stripe API directly)
  // 2. Transform data into BillingHistoryCard format
  // 3. Return array
  
  console.log('TODO: Get billing history', customerId, limit);
  return [];
}

/**
 * Download invoice PDF
 * 
 * @param invoiceId - Stripe invoice ID
 * @returns Promise with invoice PDF URL or Blob
 */
export async function downloadInvoice(invoiceId: string): Promise<string> {
  // TODO: Implement invoice download
  // 1. Call Lambda API to get invoice PDF URL
  // 2. Return URL for download or open in new tab
  
  console.log('TODO: Download invoice', invoiceId);
  throw new Error('Not implemented yet');
}
