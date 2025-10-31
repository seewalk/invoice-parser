/**
 * Stripe.js Client Loader
 * 
 * Loads Stripe.js with publishable key for client-side payment collection
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Singleton instance
let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Get Stripe.js instance
 * 
 * @returns Promise that resolves to Stripe instance
 * @throws Error if publishable key is not configured
 * 
 * @example
 * const stripe = await getStripe();
 * const { paymentMethod } = await stripe.createPaymentMethod({
 *   type: 'card',
 *   card: cardElement
 * });
 */
export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('[Stripe] Publishable key not configured');
      throw new Error(
        'Stripe publishable key is not configured. ' +
        'Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.'
      );
    }
    
    console.log('[Stripe] Loading Stripe.js...');
    stripePromise = loadStripe(publishableKey);
  }
  
  return stripePromise;
}

/**
 * Product configuration from Lambda API
 * Retrieved from getProductDetails endpoint
 */
export const STRIPE_PRODUCT_CONFIG = {
  productId: 'prod_TJWcvAuoPHlsNb',
  priceId: 'price_1SMtZjA1VvGHJ9Ci7ZW6folw',
  name: 'invoice ai monthly',
  amount: 2900, // $29.00 USD
  currency: 'usd',
  interval: 'month' as const,
} as const;

/**
 * Format amount for display
 * 
 * @param amountInCents - Amount in cents
 * @param currency - Currency code (default: 'usd')
 * @returns Formatted amount string
 * 
 * @example
 * formatAmount(2900, 'usd') // "$29.00"
 */
export function formatAmount(amountInCents: number, currency: string = 'usd'): string {
  const amount = amountInCents / 100;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  
  return formatter.format(amount);
}
