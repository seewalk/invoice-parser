/**
 * ============================================================================
 * STRIPE CHECKOUT FORM COMPONENT
 * ============================================================================
 * 
 * Complete checkout form for Pro subscription ($29/month)
 * Uses Stripe Elements for secure card input
 * 
 * Features:
 * - Stripe Elements CardElement integration
 * - Real-time validation
 * - 3D Secure (SCA) support
 * - Loading states
 * - Error handling with retry logic
 * - Firestore synchronization
 * - Success/error feedback
 * 
 * Usage:
 * ```tsx
 * <StripeCheckoutForm
 *   userId="firebase_uid"
 *   email="user@example.com"
 *   onSuccess={(subscriptionId) => console.log('Success!')}
 *   onError={(error) => console.error(error)}
 * />
 * ```
 */

'use client';

import { useState, FormEvent } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '../ui/Button';
import { CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { createStripeSubscription } from '@/app/lib/stripe/api';
import { saveSubscriptionToFirestore } from '@/app/lib/stripe/firestore';
import { STRIPE_PRODUCT_CONFIG } from '@/app/lib/stripe/client';

// ============================================================================
// TYPES
// ============================================================================

interface StripeCheckoutFormProps {
  userId: string;
  email: string;
  customerId: string;
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: Error) => void;
}

type CheckoutState = 'idle' | 'processing' | 'requires_action' | 'success' | 'error';

// ============================================================================
// COMPONENT
// ============================================================================

export default function StripeCheckoutForm({
  userId,
  email,
  customerId,
  onSuccess,
  onError,
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  // State
  const [state, setState] = useState<CheckoutState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [subscriptionId, setSubscriptionId] = useState<string>('');

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Stripe has not loaded yet. Please wait a moment and try again.');
      return;
    }

    setState('processing');
    setErrorMessage('');

    try {
      console.log('[Checkout] Creating payment method...');

      // Step 1: Get card element and create payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
        },
      });

      if (pmError || !paymentMethod) {
        throw new Error(pmError?.message || 'Failed to create payment method');
      }

      const paymentMethodId = paymentMethod.id;
      console.log('[Checkout] Payment method created:', paymentMethodId);

      // Step 2: Create subscription via Lambda API
      console.log('[Checkout] Creating subscription via Lambda API...');
      console.log('[Checkout] Request params:', { customerId, paymentMethodId });
      
      const subscriptionData = await createStripeSubscription(
        customerId,
        paymentMethodId
      );

      console.log('[Checkout] ✅ Subscription Response:', JSON.stringify(subscriptionData, null, 2));
      console.log('[Checkout] Response keys:', Object.keys(subscriptionData));
      console.log('[Checkout] subscriptionId:', subscriptionData.subscriptionId);
      console.log('[Checkout] status:', subscriptionData.status);
      console.log('[Checkout] paymentMethodId:', subscriptionData.paymentMethodId);
      // Note: Lambda backend handles 3D Secure (SCA) automatically on server side

      // Step 3: Save subscription to Firestore
      console.log('[Checkout] Saving subscription to Firestore...');
      await saveSubscriptionToFirestore(
        userId,
        {
          subscriptionId: subscriptionData.subscriptionId,
          status: subscriptionData.status,
          paymentMethodId: paymentMethodId,
          priceId: STRIPE_PRODUCT_CONFIG.priceId,
        },
        'pro' // Upgrade to Pro plan
      );

      console.log('[Checkout] Subscription saved successfully');

      // Step 4: Success!
      setState('success');
      setSubscriptionId(subscriptionData.subscriptionId);
      
      if (onSuccess) {
        onSuccess(subscriptionData.subscriptionId);
      }

    } catch (error) {
      console.error('[Checkout] Error:', error);
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
      setErrorMessage(errorMsg);
      setState('error');
      
      if (onError && error instanceof Error) {
        onError(error);
      }
    }
  };

  /**
   * Retry after error
   */
  const handleRetry = () => {
    setState('idle');
    setErrorMessage('');
  };

  // ============================================================================
  // RENDER STATES
  // ============================================================================

  // Success state
  if (state === 'success') {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-8 text-center border-2 border-success-200 shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="bg-success-500 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to Pro! 🎉
          </h3>
          <p className="text-gray-700 mb-6">
            Your subscription is now active. You have unlimited access to all features including AI parsing and API access.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Subscription ID</p>
            <p className="text-xs font-mono text-gray-900 break-all">{subscriptionId}</p>
          </div>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => window.location.href = '/parser'}
          >
            Start Using AI Parser
          </Button>
        </div>
      </div>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gradient-to-br from-error-50 to-error-100 rounded-2xl p-8 border-2 border-error-200 shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="bg-error-500 rounded-full p-4">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h3>
          <p className="text-gray-700 mb-6">
            {errorMessage}
          </p>
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleRetry}
            >
              Try Again
            </Button>
            <Button
              variant="ghost"
              size="md"
              fullWidth
              onClick={() => window.location.href = '/pricing'}
            >
              Back to Pricing
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // CHECKOUT FORM
  // ============================================================================

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Plan Summary */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border-2 border-primary-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {STRIPE_PRODUCT_CONFIG.name}
              </h3>
              <p className="text-sm text-gray-600">
                Billed monthly, cancel anytime
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary-600">
                ${(STRIPE_PRODUCT_CONFIG.amount / 100).toFixed(2)}
              </p>
              <p className="text-xs text-gray-600">per month</p>
            </div>
          </div>
          
          {/* Features List */}
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span>Unlimited AI invoice parsing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span>API access for automation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span>All Premium features included</span>
            </li>
          </ul>
        </div>

        {/* Payment Element */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Details
            </h3>
          </div>
          
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1e293b',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    '::placeholder': {
                      color: '#94a3b8',
                    },
                  },
                  invalid: {
                    color: '#ef4444',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && state === 'idle' && (
          <div className="bg-error-50 border border-error-200 rounded-xl p-4">
            <p className="text-sm text-error-700">{errorMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!stripe || state === 'processing' || state === 'requires_action'}
          loading={state === 'processing' || state === 'requires_action'}
        >
          {state === 'processing' && 'Processing Payment...'}
          {state === 'requires_action' && 'Authenticating...'}
          {state === 'idle' && `Subscribe for $${(STRIPE_PRODUCT_CONFIG.amount / 100).toFixed(2)}/month`}
        </Button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>Secured by Stripe. Your payment info is encrypted.</span>
        </div>
      </form>
    </div>
  );
}
