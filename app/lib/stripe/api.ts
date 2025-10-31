/**
 * Lambda API Client for Stripe Operations
 * 
 * Wrapper for calling AWS Lambda Stripe API endpoints
 * Base URL: https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/
 */

import {
  CreateCustomerResponse,
  CreateSubscriptionResponse,
  GetSubscriptionStatusResponse,
  CancelSubscriptionResponse,
  GetProductDetailsResponse,
  LambdaErrorResponse,
} from './types';

// Lambda API base URL
const LAMBDA_BASE_URL = 
  process.env.NEXT_PUBLIC_STRIPE_API_URL || 
  'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage';

/**
 * Generic Lambda API call with retry logic
 */
async function callLambdaAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  maxRetries = 3
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Lambda API] Calling ${endpoint} (attempt ${attempt}/${maxRetries})`);
      
      const response = await fetch(`${LAMBDA_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      // Read response text first
      const responseText = await response.text();
      
      if (!response.ok) {
        console.error(`[Lambda API] Error ${response.status}:`, responseText);
        
        // Try to parse error response
        let errorData: LambdaErrorResponse;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText, statusCode: response.status };
        }
        
        throw new Error(
          errorData.message || 
          errorData.error || 
          `Lambda API error: ${response.status}`
        );
      }

      // Parse successful response
      let data: T;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('[Lambda API] Failed to parse response:', responseText);
        throw new Error('Invalid JSON response from Lambda');
      }

      console.log(`[Lambda API] Success:`, data);
      return data;

    } catch (error) {
      lastError = error as Error;
      console.error(`[Lambda API] Attempt ${attempt} failed:`, error);

      // Don't retry on last attempt
      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt - 1) * 1000;
        console.log(`[Lambda API] Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // All retries failed
  throw lastError || new Error('All Lambda API retries failed');
}

/**
 * Create a Stripe customer
 * 
 * @param email - User email
 * @param name - User name
 * @param userId - Firebase user ID
 * @returns Customer data including customerId
 * 
 * @example
 * const customer = await createStripeCustomer('user@example.com', 'John Doe', 'firebase_uid');
 * console.log(customer.customerId); // "cus_ABC123"
 */
export async function createStripeCustomer(
  email: string,
  name: string,
  userId: string
): Promise<CreateCustomerResponse> {
  return callLambdaAPI<CreateCustomerResponse>('/createCustomer', {
    method: 'POST',
    body: JSON.stringify({
      email,
      name,
      metadata: { userId },
    }),
  });
}

/**
 * Create a Stripe subscription
 * 
 * @param customerId - Stripe customer ID
 * @param paymentMethodId - Payment method ID from Stripe Elements
 * @returns Subscription data including subscriptionId and clientSecret
 * 
 * @example
 * const subscription = await createStripeSubscription('cus_ABC123', 'pm_1234567890');
 * if (subscription.clientSecret) {
 *   // Handle 3D Secure confirmation
 *   await stripe.confirmCardPayment(subscription.clientSecret);
 * }
 */
export async function createStripeSubscription(
  customerId: string,
  paymentMethodId: string
): Promise<CreateSubscriptionResponse> {
  return callLambdaAPI<CreateSubscriptionResponse>('/createSubscription', {
    method: 'POST',
    body: JSON.stringify({
      customerId,
      paymentMethodId,
    }),
  });
}

/**
 * Get subscription status
 * 
 * @param subscriptionId - Stripe subscription ID
 * @returns Current subscription status
 * 
 * @example
 * const status = await getSubscriptionStatus('sub_12345');
 * console.log(status.status); // "active"
 */
export async function getSubscriptionStatus(
  subscriptionId: string
): Promise<GetSubscriptionStatusResponse> {
  return callLambdaAPI<GetSubscriptionStatusResponse>('/getSubscriptionStatus', {
    method: 'POST',
    body: JSON.stringify({
      subscriptionId,
    }),
  });
}

/**
 * Cancel a subscription
 * 
 * @param subscriptionId - Stripe subscription ID
 * @returns Canceled subscription data
 * 
 * @example
 * const result = await cancelSubscription('sub_12345');
 * console.log(result.status); // "canceled"
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<CancelSubscriptionResponse> {
  return callLambdaAPI<CancelSubscriptionResponse>('/cancelSubscription', {
    method: 'POST',
    body: JSON.stringify({
      subscriptionId,
    }),
  });
}

/**
 * Get product details
 * 
 * @returns Product and price information
 * 
 * @example
 * const product = await getProductDetails();
 * console.log(product.price.amount); // 2900 (cents)
 */
export async function getProductDetails(): Promise<GetProductDetailsResponse> {
  return callLambdaAPI<GetProductDetailsResponse>('/getProductDetails', {
    method: 'GET',
  });
}

/**
 * Get subscription list for a customer
 * 
 * @param customerId - Stripe customer ID
 * @returns List of subscriptions
 */
export async function getSubscriptionList(customerId: string): Promise<any> {
  return callLambdaAPI<any>('/getSubscriptionList', {
    method: 'POST',
    body: JSON.stringify({
      customerId,
    }),
  });
}
