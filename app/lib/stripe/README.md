# Stripe Integration - Lambda API

This directory contains the frontend integration with AWS Lambda Stripe API.

## Architecture

```
Frontend (Next.js) → Lambda API → Stripe SDK
                  ↓
              Firestore (Frontend updates)
```

## Files

- **`types.ts`** - TypeScript type definitions for API responses and Firestore data
- **`api.ts`** - Lambda API client with retry logic and error handling
- **`client.ts`** - Stripe.js loader and product configuration
- **`firestore.ts`** - Helpers to sync Stripe data with Firestore

## Lambda API Endpoints

**Base URL:** `https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/createCustomer` | POST | Create Stripe customer |
| `/createSubscription` | POST | Create subscription ($29/month) |
| `/getSubscriptionStatus` | POST | Check subscription status |
| `/cancelSubscription` | POST | Cancel subscription |
| `/getProductDetails` | GET | Get product info |

## Product Details (from Lambda)

- **Product ID:** `prod_TJWcvAuoPHlsNb`
- **Price ID:** `price_1SMtZjA1VvGHJ9Ci7ZW6folw`
- **Amount:** $29.00 USD (2900 cents)
- **Interval:** Monthly
- **Name:** "invoice ai monthly"

## Usage Examples

### 1. Get Stripe Instance

```typescript
import { getStripe } from '@/app/lib/stripe/client';

const stripe = await getStripe();
```

### 2. Create Customer

```typescript
import { createStripeCustomer } from '@/app/lib/stripe/api';
import { saveCustomerIdToFirestore } from '@/app/lib/stripe/firestore';

// Call Lambda API
const customer = await createStripeCustomer(
  user.email,
  user.displayName,
  user.uid
);

// Save to Firestore
await saveCustomerIdToFirestore(user.uid, customer.customerId);
```

### 3. Create Subscription

```typescript
import { createStripeSubscription } from '@/app/lib/stripe/api';
import { saveSubscriptionToFirestore } from '@/app/lib/stripe/firestore';

// Get payment method from Stripe Elements
const { paymentMethod } = await stripe.createPaymentMethod({
  type: 'card',
  card: cardElement
});

// Call Lambda API
const subscription = await createStripeSubscription(
  customerId,
  paymentMethod.id
);

// Handle 3D Secure if needed
if (subscription.clientSecret) {
  await stripe.confirmCardPayment(subscription.clientSecret);
}

// Save to Firestore
await saveSubscriptionToFirestore(
  user.uid,
  subscription,
  'premium' // or 'pro'
);
```

### 4. Check Subscription Status

```typescript
import { getSubscriptionStatus } from '@/app/lib/stripe/api';
import { updateSubscriptionStatus } from '@/app/lib/stripe/firestore';

const status = await getSubscriptionStatus(subscriptionId);

// Update Firestore
await updateSubscriptionStatus(
  user.uid,
  status.status,
  status.currentPeriodEnd,
  status.cancelAtPeriodEnd
);
```

### 5. Cancel Subscription

```typescript
import { cancelSubscription } from '@/app/lib/stripe/api';
import { cancelSubscriptionInFirestore } from '@/app/lib/stripe/firestore';

// Call Lambda API
await cancelSubscription(subscriptionId);

// Update Firestore (downgrade to free)
await cancelSubscriptionInFirestore(user.uid);
```

## Error Handling

All API functions include automatic retry logic (3 attempts with exponential backoff).

```typescript
try {
  const customer = await createStripeCustomer(email, name, userId);
  await saveCustomerIdToFirestore(userId, customer.customerId);
} catch (error) {
  console.error('Failed to create customer:', error);
  // Handle error (show message to user, etc.)
}
```

## Firestore Schema

```typescript
users/{uid}/
  stripe: {
    customerId: string;          // "cus_ABC123"
    subscriptionId?: string;     // "sub_12345"
    subscriptionStatus?: string; // "active", "canceled", etc.
    paymentMethodId?: string;    // "pm_1234567890"
    priceId?: string;            // "price_1SMtZjA1VvGHJ9Ci7ZW6folw"
    currentPeriodEnd?: number;   // Unix timestamp
    cancelAtPeriodEnd?: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    canceledAt?: Timestamp;
  }
  plan: "free" | "premium" | "pro" | "enterprise";
  invoiceParses: number;         // 10 for free, 999999 for paid
  templateDownloads: number;     // 3 for free, 999999 for paid
  generatorUses: number;         // 5 for free, 999999 for paid
```

## Testing

Use Stripe test cards:
- **Success:** 4242 4242 4242 4242
- **3D Secure:** 4000 0027 6000 3184
- **Declined:** 4000 0000 0000 0002

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_API_URL=https://jm1n4qxu69...
```

## Important Notes

⚠️ **No Webhooks:** Lambda doesn't handle webhooks, so subscription status must be polled periodically.

⚠️ **No Auth:** Lambda API has no authentication layer. Consider adding rate limiting.

⚠️ **Frontend-Managed State:** Frontend is responsible for ALL Firestore updates after Lambda calls.

⚠️ **Customer ID:** Lambda DOES return customer ID in response (confirmed working).

---

## 🐛 Current Issue - Checkout Flow (PAUSED)

**Last Error:** Checkout page loading but untested subscription creation flow

**Root Cause History:**
1. Initially tried `PaymentElement` - requires `clientSecret` from Setup Intent
2. Lambda backend has NO `/createSetupIntent` endpoint
3. Switched to `CardElement` approach (no client secret needed)

**Solution Applied (Commits c59d862 - c59d862):**
- Changed from `PaymentElement` to `CardElement`
- Removed `confirmSetup()` calls
- Using direct `createPaymentMethod({ type: 'card', card: cardElement })`
- Lambda receives payment method ID and creates subscription
- Backend handles 3D Secure (SCA) on server side

**Files Modified:**
- `app/components/stripe/StripeCheckoutForm.tsx` - CardElement implementation
- `app/components/stripe/StripeProviderWrapper.tsx` - Removed setup mode
- `app/checkout/layout.tsx` - Added Stripe test widget (dev mode only)

**What Works:** ✅
- Customer creation on signup
- Checkout page loads
- CardElement renders
- Firestore customer ID storage

**What's Untested:** ⚠️
- Full subscription creation (needs Lambda testing with test cards)
- 3D Secure flow (backend should handle automatically)
- Firestore subscription data sync after payment
- Success page redirect

**Test Cards for Later:**
- `4242 4242 4242 4242` - Success
- `4000 0027 6000 3184` - 3D Secure required
- `4000 0000 0000 0002` - Declined

**Debug Checklist:**
- [ ] Check browser console for Stripe.js errors
- [ ] Verify Network tab shows `/createSubscription` call
- [ ] Confirm Lambda returns subscription data
- [ ] Check Firestore updates after payment
- [ ] Test with all three test cards

---

## Next Steps

See `STRIPE_INTEGRATION_STRATEGY.md` in project root for complete implementation plan.

**Phase 4 In Progress:** Subscription management dashboard (frontend only, no API calls yet)
