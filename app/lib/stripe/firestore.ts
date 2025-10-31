/**
 * Firestore Helpers for Stripe Data
 * 
 * Functions to sync Stripe data with Firestore user documents
 */

import { db } from '@/app/lib/firebase/clientApp';
import { 
  doc, 
  updateDoc, 
  serverTimestamp, 
  collection, 
  addDoc,
  getDoc 
} from 'firebase/firestore';
import { UserStripeData, SubscriptionStatus, PlanType } from './types';

/**
 * Save Stripe customer ID to Firestore
 * 
 * @param userId - Firebase user ID
 * @param customerId - Stripe customer ID
 */
export async function saveCustomerIdToFirestore(
  userId: string,
  customerId: string
): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  console.log('[Firestore] Saving customer ID:', customerId);

  await updateDoc(doc(db, 'users', userId), {
    'stripe.customerId': customerId,
    'stripe.createdAt': serverTimestamp(),
  });

  console.log('[Firestore] ✅ Customer ID saved');
}

/**
 * Save subscription data to Firestore and update plan
 * 
 * @param userId - Firebase user ID
 * @param subscriptionData - Subscription data from Lambda
 * @param plan - Plan tier to activate
 */
export async function saveSubscriptionToFirestore(
  userId: string,
  subscriptionData: {
    subscriptionId: string;
    status: SubscriptionStatus;
    paymentMethodId: string;
    priceId?: string;
  },
  plan: PlanType = 'premium'
): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  console.log('[Firestore] Saving subscription:', subscriptionData.subscriptionId);

  await updateDoc(doc(db, 'users', userId), {
    'stripe.subscriptionId': subscriptionData.subscriptionId,
    'stripe.subscriptionStatus': subscriptionData.status,
    'stripe.paymentMethodId': subscriptionData.paymentMethodId,
    'stripe.priceId': subscriptionData.priceId || 'price_1SMtZjA1VvGHJ9Ci7ZW6folw',
    'stripe.updatedAt': serverTimestamp(),
    'plan': plan,
    // Unlock unlimited access
    'invoiceParses': 999999,
    'templateDownloads': 999999,
    'generatorUses': 999999,
  });

  console.log('[Firestore] ✅ Subscription saved, plan updated to:', plan);
}

/**
 * Update subscription status in Firestore
 * 
 * @param userId - Firebase user ID
 * @param status - New subscription status
 * @param currentPeriodEnd - Unix timestamp of period end
 * @param cancelAtPeriodEnd - Whether subscription will cancel at period end
 */
export async function updateSubscriptionStatus(
  userId: string,
  status: SubscriptionStatus,
  currentPeriodEnd?: number,
  cancelAtPeriodEnd?: boolean
): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  console.log('[Firestore] Updating subscription status:', status);

  const updates: any = {
    'stripe.subscriptionStatus': status,
    'stripe.updatedAt': serverTimestamp(),
  };

  if (currentPeriodEnd !== undefined) {
    updates['stripe.currentPeriodEnd'] = currentPeriodEnd;
  }

  if (cancelAtPeriodEnd !== undefined) {
    updates['stripe.cancelAtPeriodEnd'] = cancelAtPeriodEnd;
  }

  // If subscription is canceled, downgrade to free
  if (status === 'canceled' || status === 'unpaid') {
    updates['plan'] = 'free';
    updates['invoiceParses'] = 10;
    updates['templateDownloads'] = 3;
    updates['generatorUses'] = 5;
    updates['stripe.canceledAt'] = serverTimestamp();
  }

  await updateDoc(doc(db, 'users', userId), updates);

  console.log('[Firestore] ✅ Subscription status updated');
}

/**
 * Get user's Stripe data from Firestore
 * 
 * @param userId - Firebase user ID
 * @returns User's Stripe data or null
 */
export async function getUserStripeData(
  userId: string
): Promise<UserStripeData | null> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  const userDoc = await getDoc(doc(db, 'users', userId));
  
  if (!userDoc.exists()) {
    return null;
  }

  const data = userDoc.data();
  return data.stripe || null;
}

/**
 * Log failed Firestore sync for recovery
 * 
 * @param userId - Firebase user ID
 * @param subscriptionData - Subscription data that failed to sync
 * @param error - Error that occurred
 */
export async function logFailedSync(
  userId: string,
  subscriptionData: any,
  error: Error
): Promise<void> {
  if (!db) {
    console.error('[Firestore] Cannot log failed sync - DB not initialized');
    return;
  }

  try {
    await addDoc(collection(db, 'syncFailures'), {
      userId,
      subscriptionData,
      error: {
        message: error.message,
        stack: error.stack,
      },
      timestamp: serverTimestamp(),
      resolved: false,
    });

    console.log('[Firestore] ⚠️ Logged failed sync for manual recovery');
  } catch (logError) {
    console.error('[Firestore] ❌ Could not log failed sync:', logError);
  }
}

/**
 * Cancel subscription in Firestore
 * 
 * @param userId - Firebase user ID
 */
export async function cancelSubscriptionInFirestore(
  userId: string
): Promise<void> {
  if (!db) {
    throw new Error('Firestore not initialized');
  }

  console.log('[Firestore] Canceling subscription');

  await updateDoc(doc(db, 'users', userId), {
    'stripe.subscriptionStatus': 'canceled',
    'stripe.canceledAt': serverTimestamp(),
    'stripe.updatedAt': serverTimestamp(),
    'plan': 'free',
    // Reset to free tier limits
    'invoiceParses': 10,
    'templateDownloads': 3,
    'generatorUses': 5,
  });

  console.log('[Firestore] ✅ Subscription canceled, downgraded to free');
}
