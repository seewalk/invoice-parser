/**
 * ============================================================================
 * CHECKOUT PAGE
 * ============================================================================
 * 
 * Pro subscription checkout page with Stripe integration
 * Protected route - requires authentication
 * Redirects to sign-in if not authenticated
 * 
 * Flow:
 * 1. Check authentication
 * 2. Verify customer ID exists
 * 3. Display checkout form
 * 4. Process payment
 * 5. Redirect to success page
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/firebase/AuthContext';
import StripeProviderWrapper from '../components/stripe/StripeProviderWrapper';
import StripeCheckoutForm from '../components/stripe/StripeCheckoutForm';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading, userQuotas } = useAuth();
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  // Check authentication and customer ID
  useEffect(() => {
    if (authLoading) return;

    // Not logged in - redirect to sign-in
    if (!user) {
      router.push('/sign-in?redirect=/checkout');
      return;
    }

    // Check if user has customer ID in Firestore
    if (userQuotas) {
      // @ts-ignore - stripe field exists in Firestore but not in TypeScript interface
      const stripeCustomerId = userQuotas.stripe?.customerId;
      
      if (stripeCustomerId) {
        setCustomerId(stripeCustomerId);
      } else {
        setError('Stripe customer ID not found. Please try signing out and signing in again.');
      }
    }
  }, [user, authLoading, userQuotas, router]);

  // Handle successful subscription
  const handleSuccess = (subscriptionId: string) => {
    console.log('[Checkout Page] Subscription successful:', subscriptionId);
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      router.push('/checkout/success');
    }, 2000);
  };

  // Handle error
  const handleError = (err: Error) => {
    console.error('[Checkout Page] Checkout error:', err);
    setError(err.message);
  };

  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ERROR STATE
  // ============================================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-error-200">
            <div className="flex justify-center mb-4">
              <div className="bg-error-100 rounded-full p-4">
                <AlertCircle className="w-12 h-12 text-error-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Unable to Load Checkout
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              {error}
            </p>
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => router.push('/sign-in')}
              >
                Sign In Again
              </Button>
              <Button
                variant="ghost"
                size="md"
                fullWidth
                onClick={() => router.push('/pricing')}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // CHECKOUT PAGE
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/pricing')}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Complete Your <span className="gradient-text">Pro Subscription</span>
          </h1>
          <p className="text-lg text-gray-600">
            Unlock unlimited AI parsing and API access
          </p>
        </div>

        {/* Stripe Checkout Form */}
        {customerId ? (
          <StripeProviderWrapper>
            <StripeCheckoutForm
              userId={user!.uid}
              email={user!.email || ''}
              customerId={customerId}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </StripeProviderWrapper>
        ) : (
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Preparing checkout...</p>
          </div>
        )}

        {/* Trust Signals */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
            <p className="text-sm text-gray-600">
              PCI-compliant encryption
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">💳</div>
            <h3 className="font-semibold text-gray-900 mb-1">Cancel Anytime</h3>
            <p className="text-sm text-gray-600">
              No long-term commitment
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Instant Access</h3>
            <p className="text-sm text-gray-600">
              Start using immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}