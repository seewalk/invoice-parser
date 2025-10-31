/**
 * Stripe Integration Types
 * 
 * Type definitions for Lambda API responses and Firestore data structures
 */

/**
 * Stripe subscription statuses
 * @see https://stripe.com/docs/api/subscriptions/object#subscription_object-status
 */
export type SubscriptionStatus =
  | 'active'           // Subscription is active and paid
  | 'trialing'         // In trial period
  | 'past_due'         // Payment failed, retrying
  | 'canceled'         // Canceled by user or system
  | 'unpaid'           // Payment failed, no retry
  | 'incomplete'       // Initial payment not completed
  | 'incomplete_expired'; // Initial payment timeout

/**
 * Lambda API Response: Create Customer
 */
export interface CreateCustomerResponse {
  customerId: string;
  email: string;
  name: string;
}

/**
 * Lambda API Response: Create Subscription
 */
export interface CreateSubscriptionResponse {
  subscriptionId: string;
  status: SubscriptionStatus;
  paymentMethodId: string;
  clientSecret?: string; // For 3D Secure confirmation
}

/**
 * Lambda API Response: Get Subscription Status
 */
export interface GetSubscriptionStatusResponse {
  subscriptionId: string;
  status: SubscriptionStatus;
  currentPeriodEnd: number; // Unix timestamp
  cancelAtPeriodEnd: boolean;
}

/**
 * Lambda API Response: Cancel Subscription
 */
export interface CancelSubscriptionResponse {
  subscriptionId: string;
  status: SubscriptionStatus;
}

/**
 * Lambda API Response: Get Product Details
 */
export interface GetProductDetailsResponse {
  product: {
    id: string;
    name: string;
    description: string | null;
  };
  price: {
    id: string;
    amount: number; // in cents
    currency: string;
    interval: 'month' | 'year';
  };
}

/**
 * Firestore User Stripe Data
 */
export interface UserStripeData {
  customerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: SubscriptionStatus;
  paymentMethodId?: string;
  priceId?: string;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
  createdAt?: any; // Firestore Timestamp
  updatedAt?: any; // Firestore Timestamp
  canceledAt?: any; // Firestore Timestamp
}

/**
 * Lambda API Error Response
 */
export interface LambdaErrorResponse {
  error?: string;
  message?: string;
  statusCode?: number;
}

/**
 * Subscription with Firestore sync metadata
 */
export interface SyncedSubscription {
  subscriptionId: string;
  status: SubscriptionStatus;
  customerId: string;
  priceId: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  syncedAt: number; // Timestamp when last synced with Stripe
}

/**
 * Plan types matching pricing config
 */
export type PlanType = 'free' | 'premium' | 'pro' | 'enterprise';

/**
 * Stripe product configuration
 */
export interface StripeProductConfig {
  productId: string;
  priceId: string;
  name: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  plan: PlanType;
}
