/**
 * ============================================================================
 * STRIPE PROVIDER WRAPPER
 * ============================================================================
 * 
 * Wrapper component to initialize Stripe Elements with proper configuration
 * Loads Stripe.js and provides Elements context to child components
 * 
 * Usage:
 * ```tsx
 * <StripeProviderWrapper>
 *   <StripeCheckoutForm userId="..." email="..." customerId="..." />
 * </StripeProviderWrapper>
 * ```
 */

'use client';

import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe.js
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

// ============================================================================
// TYPES
// ============================================================================

interface StripeProviderWrapperProps {
  children: ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function StripeProviderWrapper({
  children,
}: StripeProviderWrapperProps) {
  // Elements options for setup mode with manual payment method creation
  const options = {
    mode: 'setup' as const,
    currency: 'usd',
    paymentMethodCreation: 'manual' as const,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#0284c7',
        colorBackground: '#ffffff',
        colorText: '#1e293b',
        colorDanger: '#ef4444',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        borderRadius: '12px',
        spacingUnit: '4px',
      },
      rules: {
        '.Input': {
          border: '2px solid #e2e8f0',
          boxShadow: 'none',
          padding: '12px',
        },
        '.Input:focus': {
          border: '2px solid #0284c7',
          boxShadow: '0 0 0 3px rgba(2, 132, 199, 0.1)',
        },
        '.Label': {
          fontSize: '14px',
          fontWeight: '600',
          color: '#475569',
          marginBottom: '8px',
        },
        '.Error': {
          fontSize: '13px',
          color: '#ef4444',
        },
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
