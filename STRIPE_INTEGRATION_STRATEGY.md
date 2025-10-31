# 🎯 Stripe Payments Integration - Strategic Implementation Plan

**Document Version:** 1.2  
**Date:** 2025-10-31  
**Status:** Ready for Implementation  
**Architecture:** AWS Lambda Backend API (Frontend-Managed State)  
**Risk Level:** HIGH - Payment integration requires zero tolerance for errors

---

## ⚡ Quick Start Summary

### Lambda Team Answers Received ✅

| Question | Answer | Impact |
|----------|--------|--------|
| Firestore updates? | ❌ No | Frontend manages ALL Firestore writes |
| Customer ID returned? | ❌ No (logs only) | Need Lambda API update OR manual copy |
| Authentication? | ❌ No | Public API (no auth layer) |
| Webhooks? | ❌ No | Must implement polling for status |
| Error handling? | ❌ No retries | Frontend implements retry logic |
| Idempotency? | ❌ No | Frontend prevents duplicates |
| Currency config? | ❌ Not set | Must configure before launch |

### Implementation Approach

**Frontend Responsibilities:**
- ✅ Call Lambda API for Stripe operations
- ✅ Update Firestore after every successful Lambda call
- ✅ Implement retry logic and error handling
- ✅ Poll subscription status (no webhooks)
- ✅ Prevent duplicate requests (no idempotency keys)

**Lambda Responsibilities:**
- ✅ Stripe customer/subscription operations
- ✅ Return structured responses
- ❌ No Firestore updates
- ❌ No authentication
- ❌ No webhooks

### Critical Action Items

**Before Implementation:**
1. ❗ **Request Lambda team:** Return `customerId` in `/createCustomer` response
2. ❗ **Decide:** USD or GBP currency for Stripe product
3. ❗ **Create:** Stripe product with price ID
4. ❗ **Test:** Lambda API endpoints with real calls

**Timeline:** 4-6 weeks (simplified from original 6-8)

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current System Analysis](#current-system-analysis)
3. [Stripe API Analysis](#stripe-api-analysis)
4. [Integration Architecture](#integration-architecture)
5. [Database Schema Design](#database-schema-design)
6. [Implementation Phases](#implementation-phases)
7. [Security Considerations](#security-considerations)
8. [Testing Strategy](#testing-strategy)
9. [Rollout Plan](#rollout-plan)
10. [Risk Mitigation](#risk-mitigation)

---

## 1. Executive Summary

### Objective
Integrate Stripe subscription payments ($29/month Premium plan) into the existing Elektroluma invoice platform to monetize the service while maintaining the current free tier.

### Current State
- ✅ Firebase Authentication (email/password + Google OAuth)
- ✅ Firestore database with user quotas
- ✅ Quota system (free: 10 parses, paid: unlimited)
- ✅ Four-tier pricing structure defined (Free, Premium, Pro, Enterprise)
- ✅ **AWS Lambda Stripe API already deployed** at `https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/`
- ⏳ Frontend integration with Lambda API pending
- ⏳ Firestore synchronization with Stripe status pending

### Target State
- ✅ Stripe customer creation on user signup
- ✅ Subscription management (create, update, cancel)
- ✅ Automatic quota updates based on subscription status
- ✅ Webhook handling for subscription events
- ✅ Seamless user experience with secure payments

### Success Criteria
1. **Zero payment failures** - No lost transactions
2. **Zero unauthorized access** - All Stripe keys secured server-side
3. **100% quota sync** - Firestore quotas match Stripe subscription status
4. **Seamless UX** - Users can upgrade/downgrade without friction
5. **Webhook reliability** - All Stripe events processed correctly

---

## 2. Current System Analysis

### 2.1 Authentication System (`app/lib/firebase/AuthContext.tsx`)

**Key Features:**
- Firebase Authentication (email/password + Google OAuth)
- Automatic user document creation in Firestore
- Real-time quota synchronization via Firestore listeners
- Admin role detection (unlimited access)
- Initial quotas on signup: 10 parses, 3 downloads, 5 generator uses

**User Document Structure:**
```typescript
interface UserQuotas {
  invoiceParses: number;        // Default: 10 (free) or 999999 (paid)
  templateDownloads: number;    // Default: 3 (free) or 999999 (paid)
  generatorUses: number;        // Default: 5 (free) or 999999 (paid)
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  role?: 'user' | 'admin';
  subscriptionEnd?: Date;
  email?: string;
  name?: string;
  createdAt?: any;
  lastLoginAt?: any;
}
```

**Critical Integration Points:**
1. **User Creation** - Hook into `initializeNewUser()` to create Stripe customer
2. **Plan Updates** - Update `plan` field when subscription changes
3. **Quota Management** - Sync quotas with subscription status

### 2.2 Pricing Configuration (`app/lib/pricingConfig.ts`)

**Defined Tiers:**
| Tier | Price | Parser Limit | Key Features |
|------|-------|--------------|--------------|
| Free | £0 | 0 | 11 templates (watermark), no parser |
| Premium | £9.99/mo | 0 | No watermark, 30-day history |
| Pro | £29/mo | 100/month | AI parser, 1-year history, API access |
| Enterprise | Custom | Unlimited | White-label, custom ML |

**⚠️ IMPORTANT NOTES:**
- Stripe API doc: **$29/month** (USD) - Need to clarify currency
- Pricing config: **£29/month** (GBP) for Pro tier
- Pricing config: **£9.99/month** for Premium tier (not in Stripe doc)
- **Lambda API Base:** `https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/`

**ACTION REQUIRED:**
- Clarify which tier maps to Stripe's $29/month plan
- Determine if Premium (£9.99) is a separate Stripe product
- Convert USD to GBP or standardize currency
- **Confirm Lambda-Firestore integration status**

### 2.3 Quota System (`app/hooks/useQuota.ts`)

**Quota Logic:**
```typescript
// Admin users: Unlimited (999999)
if (userQuotas.role === 'admin') return true;

// Premium users (NOT free): Unlimited
if (userQuotas.plan !== 'free') return true;

// Free users: Check actual quota count
return userQuotas[type] > 0;
```

**Current Behavior:**
- ✅ Admin role bypasses all limits
- ✅ Any paid plan (`premium`, `pro`, `enterprise`) = unlimited
- ✅ Free plan checks actual quota numbers
- ✅ Usage logged for analytics (all tiers)

**Integration Points:**
1. After successful payment: Update `plan` field → auto-unlocks features
2. On subscription cancel: Revert to `plan: 'free'` → re-enable limits
3. On subscription renewal failure: Grace period or immediate downgrade?

### 2.4 Database Structure (Firestore)

**Current Collections:**
```
users/
  {uid}/
    - invoiceParses: number
    - templateDownloads: number
    - generatorUses: number
    - plan: string
    - role: string
    - email: string
    - name: string
    - createdAt: timestamp
    - lastLoginAt: timestamp
    
    usage/ (subcollection)
      {docId}/
        - type: string
        - timestamp: timestamp
        - metadata: object
        - quotaRemaining: number
```

**Missing Fields for Stripe:**
- ❌ `stripeCustomerId` - Link to Stripe customer
- ❌ `stripeSubscriptionId` - Link to active subscription
- ❌ `subscriptionStatus` - Current status (active, canceled, past_due)
- ❌ `subscriptionPeriodEnd` - When current period ends
- ❌ `cancelAtPeriodEnd` - User requested cancellation
- ❌ `paymentMethodId` - Default payment method

---

## 3. Stripe API Analysis

### 3.1 Available Lambda API Endpoints

**Base URL:** `https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/`

| Endpoint | Method | Full URL | Purpose | Required for MVP |
|----------|--------|----------|---------|------------------|
| `/createCustomer` | POST | `{base}/createCustomer` | Register Stripe customer | ✅ YES |
| `/createSubscription` | POST | `{base}/createSubscription` | Start $29/month subscription | ✅ YES |
| `/getProductDetails` | GET | `{base}/getProductDetails` | Fetch product/price info | ⚠️ OPTIONAL |
| `/getSubscriptionList` | POST | `{base}/getSubscriptionList` | List customer subscriptions | ⚠️ OPTIONAL |
| `/getSubscriptionStatus` | POST | `{base}/getSubscriptionStatus` | Check subscription state | ✅ YES |
| `/cancelSubscription` | POST | `{base}/cancelSubscription` | Cancel subscription | ✅ YES |

**Note:** Backend API is already deployed. Frontend needs to call these endpoints directly.

### 3.2 Request/Response Formats

**Create Customer:**
```typescript
// Request
{
  "email": "user@example.com",
  "name": "John Doe",
  "metadata": { "userId": "firebase_uid_here" }
}

// Response
{
  "customerId": "cus_ABC123",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Create Subscription:**
```typescript
// Request
{
  "customerId": "cus_ABC123",
  "paymentMethodId": "pm_1NABCxyz"  // From Stripe Elements
}

// Response
{
  "subscriptionId": "sub_12345",
  "status": "active",
  "paymentMethodId": "pm_1NABCxyz",
  "clientSecret": "pi_12345_secret_abc"  // For 3D Secure
}
```

**Cancel Subscription:**
```typescript
// Request
{ "subscriptionId": "sub_12345" }

// Response
{ "subscriptionId": "sub_12345", "status": "canceled" }
```

### 3.3 Complete Payment Flow (Frontend → Lambda)

```
1. User clicks "Upgrade to Premium"
   ↓
2. Frontend loads Stripe Elements (card input form)
   ↓
3. User enters card details (number, expiry, CVC)
   ↓
4. Frontend calls stripe.createPaymentMethod() → returns paymentMethodId
   ↓
5. Frontend calls Lambda API:
   POST https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/
        invoicer-stage/createSubscription
   Body: { customerId: "cus_ABC123", paymentMethodId: "pm_1NABCxyz" }
   ↓
6. Lambda creates Stripe subscription → returns response:
   { subscriptionId, status, clientSecret }
   ↓
7. If 3D Secure required (status = "incomplete"):
   Frontend uses clientSecret with stripe.confirmCardPayment()
   ↓
8. Frontend updates Firestore user document:
   - stripe.subscriptionId = "sub_12345"
   - stripe.subscriptionStatus = "active"
   - plan = "premium" (or "pro")
   ↓
9. Quota system detects plan change → unlocks unlimited features
   ↓
10. UI updates (show "Premium" badge, remove upgrade prompts)
```

**Key Point:** Lambda handles all Stripe SDK calls. Frontend only handles:
- Payment method collection (Stripe Elements)
- 3D Secure confirmation (if needed)
- Firestore updates after success

---

## 4. Integration Architecture

### 4.1 High-Level Architecture (Lambda Backend)

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                          │
│  - Pricing page with "Upgrade" button                       │
│  - Stripe Elements (card input, collect paymentMethodId)    │
│  - Payment confirmation UI                                   │
│  - Subscription management dashboard                         │
└─────────────┬───────────────────────────────────────────────┘
              │
              │ Direct API calls (no Next.js middleware needed)
              │
              │ 1. POST {base}/createCustomer (on signup)
              │ 2. POST {base}/createSubscription (on upgrade)
              │ 3. POST {base}/cancelSubscription (on cancel)
              │ 4. POST {base}/getSubscriptionStatus (check status)
              ↓
┌─────────────────────────────────────────────────────────────┐
│              AWS LAMBDA STRIPE API (DEPLOYED)                │
│  Base: https://jm1n4qxu69.execute-api.eu-west-2            │
│        .amazonaws.com/invoicer-stage/                        │
│                                                              │
│  Endpoints:                                                  │
│    - POST /createCustomer                                    │
│    - POST /createSubscription                                │
│    - POST /cancelSubscription                                │
│    - POST /getSubscriptionStatus                             │
│    - GET  /getProductDetails                                 │
│    - POST /getSubscriptionList                               │
│                                                              │
│  ✅ Stripe secret keys secured in Lambda                     │
│  ✅ Already handles Stripe SDK calls                         │
│  ✅ CORS configured for frontend access                      │
└─────────────┬───────────────────────────────────────────────┘
              │
              │ Stripe webhooks configured in AWS
              │ (webhook handler in Lambda)
              ↓
┌─────────────────────────────────────────────────────────────┐
│                    FIRESTORE DATABASE                        │
│  Frontend updates after successful API calls                 │
│                                                              │
│  users/{uid}                                                 │
│    - stripe.customerId: "cus_ABC123"                         │
│    - stripe.subscriptionId: "sub_12345"                      │
│    - stripe.subscriptionStatus: "active"                     │
│    - plan: "premium" | "pro"                                 │
│    - invoiceParses: 999999 (unlimited)                       │
└─────────────────────────────────────────────────────────────┘
```

**Key Differences:**
- ✅ No Next.js API routes needed (Lambda handles everything)
- ✅ Frontend calls Lambda API directly
- ✅ Stripe keys secured in AWS Lambda (not in Next.js env)
- ✅ Webhook handling already configured in Lambda
- ⚠️ Frontend must update Firestore after successful API responses

### 4.2 Component Structure (Frontend Only)

**New Components Needed:**
```
app/
  components/
    stripe/
      StripeCheckoutForm.tsx        # Card input form with Stripe Elements
      SubscriptionManagement.tsx    # User dashboard
      UpgradeButton.tsx             # Pricing card upgrade button
      PaymentSuccessModal.tsx       # Success confirmation
      PaymentErrorModal.tsx         # Error handling
  
  lib/
    stripe/
      client.ts                     # Load Stripe.js (publishable key)
      api.ts                        # Lambda API client wrapper
      types.ts                      # TypeScript interfaces
  
  hooks/
    useStripeSubscription.ts        # Subscription management hook
    usePaymentForm.ts               # Payment form logic
  
  utils/
    stripeHelpers.ts                # Format helpers, validation
```

**NO Next.js API routes needed** - Lambda backend handles all Stripe operations

**Frontend Responsibilities:**
1. Collect payment info with Stripe Elements
2. Call Lambda API endpoints
3. Update Firestore after successful responses
4. Handle errors and user feedback

---

## 5. Database Schema Design

### 5.1 Enhanced User Document

```typescript
interface User {
  // Existing fields
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  
  // Quota fields
  invoiceParses: number;
  templateDownloads: number;
  generatorUses: number;
  
  // Plan & subscription (existing + new)
  plan: 'free' | 'premium' | 'pro' | 'enterprise';
  
  // NEW: Stripe integration fields
  stripe: {
    customerId: string;              // "cus_ABC123"
    subscriptionId?: string;         // "sub_12345" (null for free users)
    subscriptionStatus?: SubscriptionStatus;
    priceId?: string;                // "price_1XYZabc" (which plan)
    paymentMethodId?: string;        // "pm_1NABCxyz"
    currentPeriodEnd?: Timestamp;    // When subscription renews/ends
    cancelAtPeriodEnd?: boolean;     // User requested cancellation
    canceledAt?: Timestamp;          // When subscription was canceled
    trialEnd?: Timestamp;            // If offering trial periods
  };
  
  // Payment history (optional, for user dashboard)
  billing?: {
    lastPaymentDate?: Timestamp;
    lastPaymentAmount?: number;
    lastPaymentStatus?: 'succeeded' | 'failed';
    failedPaymentCount?: number;     // For grace period logic
  };
}

type SubscriptionStatus = 
  | 'active'           // Paid and active
  | 'trialing'         // In trial period
  | 'past_due'         // Payment failed, retrying
  | 'canceled'         // Canceled by user
  | 'unpaid'           // Payment failed, no retry
  | 'incomplete'       // Initial payment not completed
  | 'incomplete_expired'; // Initial payment timeout
```

### 5.2 New Collections

**Subscription Events Log:**
```typescript
// subscriptions/{uid}/events/{eventId}
interface SubscriptionEvent {
  type: 'created' | 'updated' | 'canceled' | 'payment_succeeded' | 'payment_failed';
  timestamp: Timestamp;
  stripeEventId: string;           // Webhook event ID
  subscriptionId: string;
  status: SubscriptionStatus;
  metadata: {
    plan?: string;
    amount?: number;
    currency?: string;
    periodEnd?: Timestamp;
    errorMessage?: string;         // If payment failed
  };
}
```

**Payment Intents Log (for debugging):**
```typescript
// payments/{paymentIntentId}
interface PaymentIntent {
  uid: string;
  amount: number;
  currency: string;
  status: string;
  created: Timestamp;
  stripePaymentIntentId: string;
  errorMessage?: string;
}
```

---

## 6. Implementation Phases

### Phase 1: Foundation (Week 1) 🏗️

**Deliverables:**
- [ ] Install Stripe.js (frontend only): `npm install @stripe/stripe-js`
- [ ] Set up environment variables (`.env.local`)
  ```
  # Frontend only needs publishable key
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
  
  # Lambda API base URL
  NEXT_PUBLIC_STRIPE_API_URL=https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage
  ```
- [ ] Create `/app/lib/stripe/client.ts` (loadStripe helper)
- [ ] Create `/app/lib/stripe/api.ts` (Lambda API client wrapper)
- [ ] Create `/app/lib/stripe/types.ts` (TypeScript interfaces)
- [ ] Update Firestore security rules for new `stripe` field
- [ ] Create database migration script (add `stripe` field to existing users)
- [ ] Test Lambda API endpoints with Postman/curl

**Testing:**
- [ ] Verify Lambda API is accessible from frontend
- [ ] Test CORS configuration (OPTIONS requests)
- [ ] Verify Stripe.js loads with publishable key
- [ ] Ensure Firestore security rules allow authenticated writes

**Risk:** LOW - No user-facing changes yet

**Note:** Lambda backend already has Stripe secret keys. Frontend never touches them.

---

### Phase 2: Customer Creation (Week 1-2) 👤

**⚠️ IMPORTANT:** Lambda prints customer ID to logs but doesn't return it in structured format. Need to either:
- Option A: Have Lambda team modify to return customer ID in response
- Option B: Manually copy customer ID from Lambda logs after creation
- **Recommended:** Option A - Update Lambda to return customer ID

**Deliverables:**
- [ ] **ACTION REQUIRED:** Request Lambda team to return `customerId` in response
- [ ] Create `createStripeCustomer()` helper function
- [ ] Implement Firestore write for customer ID
- [ ] Handle errors (retry logic, fallback to free tier)
- [ ] Add retry mechanism (Lambda doesn't handle retries)

**Implementation:**
```typescript
// app/lib/stripe/api.ts
export async function createStripeCustomer(
  email: string, 
  name: string, 
  userId: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRIPE_API_URL}/createCustomer`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        metadata: { userId }
      })
    }
  );
  
  if (!response.ok) {
    throw new Error(`Lambda error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // ⚠️ VERIFY: Lambda returns { customerId, email, name }
  if (!data.customerId) {
    throw new Error('Lambda did not return customerId');
  }
  
  return data;
}

// Save to Firestore
export async function saveCustomerIdToFirestore(
  userId: string, 
  customerId: string
) {
  await updateDoc(doc(db, 'users', userId), {
    'stripe.customerId': customerId,
    'stripe.createdAt': serverTimestamp()
  });
}
```

**User Flow (Manual Process Initially):**
```
Option A (If Lambda returns ID):
  User signs up → Firebase Auth creates user
  → Call Lambda /createCustomer → Get { customerId } in response
  → Save to Firestore: users/{uid}/stripe.customerId
  → Continue as free user

Option B (Current - Manual Copy):
  User signs up → Firebase Auth creates user
  → Call Lambda /createCustomer → Returns success (no ID)
  → Check Lambda logs → Find customer ID
  → Manually update Firestore with customer ID
  → Continue as free user
```

**Testing:**
- [ ] Call Lambda /createCustomer → Verify response format
- [ ] Check if customerId is in response or logs only
- [ ] Save customerId to Firestore manually if needed
- [ ] Verify Stripe dashboard shows customer with metadata
- [ ] Test retry logic for failed requests

**Risk:** HIGH - If customerId not returned, need manual intervention for each signup

---

### Phase 3: Subscription Checkout (Week 2-3) 💳

**Deliverables:**
- [ ] Create `StripeCheckoutForm.tsx` component
- [ ] Integrate Stripe Elements (card input form)
- [ ] Create Lambda API client: `createSubscription()`
- [ ] Handle payment method collection and submission
- [ ] Process subscription creation response from Lambda
- [ ] Update Firestore with subscription data
- [ ] Update user's `plan` field to unlock features

**User Flow:**
```
User clicks "Upgrade to Premium" → Modal opens with card form
→ User enters card details → Stripe.js creates PaymentMethod (frontend)
→ Get paymentMethodId from Stripe Elements
→ Frontend calls Lambda: POST {base}/createSubscription
   Body: { customerId: user.stripe.customerId, paymentMethodId }
→ Lambda creates subscription → Returns { subscriptionId, status, clientSecret }
→ If 3D Secure required: Frontend confirms with clientSecret
→ Update Firestore: stripe.subscriptionId, stripe.subscriptionStatus, plan = "premium"
→ Quota system detects plan change → Unlocks unlimited access
```

**Component Structure:**
```tsx
// app/components/stripe/StripeCheckoutForm.tsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createSubscription } from '@/app/lib/stripe/api';

export function StripeCheckoutForm({ 
  customerId, 
  onSuccess, 
  onError 
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    // 1. Create payment method with Stripe.js
    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    
    // 2. Call Lambda API
    const result = await createSubscription(customerId, paymentMethod.id);
    
    // 3. Handle 3D Secure if needed
    if (result.status === 'incomplete') {
      await stripe.confirmCardPayment(result.clientSecret);
    }
    
    // 4. Update Firestore
    await updateFirestoreSubscription(result);
    
    onSuccess();
  };
}
```

**Lambda API Call:**
```typescript
// app/lib/stripe/api.ts
export async function createSubscription(
  customerId: string,
  paymentMethodId: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRIPE_API_URL}/createSubscription`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId, paymentMethodId })
    }
  );
  
  return response.json();
  // Returns: { subscriptionId, status, paymentMethodId, clientSecret }
}
```

**Testing:**
- [ ] Test with Stripe test cards (4242 4242 4242 4242)
- [ ] Test 3D Secure card (4000 0027 6000 3184)
- [ ] Test declined card (4000 0000 0000 0002)
- [ ] Verify Lambda API response format matches documentation
- [ ] Verify Firestore updates correctly after success
- [ ] Verify quota system recognizes new plan immediately
- [ ] Test parser unlock after upgrade

**Risk:** HIGH - Payment flow must be flawless

---

### Phase 4: Webhook Integration (Week 3-4) 🔔

**✅ ALREADY IMPLEMENTED IN LAMBDA**

Your Lambda backend should already have webhook handling configured. Frontend needs to:

**Frontend Responsibilities:**
- [ ] Create periodic subscription status check
- [ ] Poll Lambda API: `POST {base}/getSubscriptionStatus`
- [ ] Update Firestore when status changes detected
- [ ] Handle edge cases (expired subscriptions, payment failures)

**Optional: Real-time Updates via Firebase Cloud Functions**
```typescript
// Alternative: Use Firebase Cloud Function to listen for Lambda webhooks
// Lambda → Firebase Cloud Function → Firestore update
// This keeps Firestore in sync without polling
```

**Why Webhooks are Critical (Lambda handles this):**
```
Lambda webhook handler processes:
- Subscription renewal (monthly charge)
- Payment failure → Retry → Success/Failure
- User cancels via Stripe dashboard
- Subscription expires
- Refunds processed

Frontend doesn't need to handle webhooks directly.
Lambda should update a status endpoint that frontend can poll.
```

**Frontend Polling Strategy:**
```typescript
// app/hooks/useSubscriptionStatus.ts
export function useSubscriptionStatus(subscriptionId: string) {
  useEffect(() => {
    const checkStatus = async () => {
      const status = await getSubscriptionStatus(subscriptionId);
      
      // Update Firestore if status changed
      if (status.status !== currentStatus) {
        await updateFirestoreSubscription(status);
      }
    };
    
    // Poll every 30 seconds when subscription active
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [subscriptionId]);
}
```

**Testing:**
- [ ] Verify Lambda webhook endpoint is configured in Stripe dashboard
- [ ] Test subscription status polling
- [ ] Verify Firestore updates when Lambda processes webhook
- [ ] Test payment failure scenario (updates reflected in frontend)

**Risk:** MEDIUM - Polling introduces slight delay, but safer than exposing webhook endpoint

**Recommendation:** Confirm Lambda webhook implementation handles Firestore updates directly, or add polling fallback.

---

### Phase 5: Subscription Management (Week 4-5) ⚙️

**Deliverables:**
- [ ] Create `SubscriptionManagement.tsx` dashboard component
- [ ] Display current plan, billing date, payment method
- [ ] "Cancel Subscription" button
- [ ] Call Lambda API: `POST {base}/cancelSubscription`
- [ ] Handle cancellation response
- [ ] Update Firestore `plan` back to `free` after cancellation
- [ ] Re-enable quota limits

**User Flow:**
```
User goes to /account → Sees "Premium Plan" with billing date
→ Clicks "Cancel Subscription" → Confirmation modal
→ User confirms → Call Lambda: POST {base}/cancelSubscription
   Body: { subscriptionId: user.stripe.subscriptionId }
→ Lambda cancels in Stripe → Returns { subscriptionId, status: "canceled" }
→ Frontend updates Firestore: plan = "free", quotas reset to 10
→ User sees "You're now on the Free plan"
```

**Lambda API Call:**
```typescript
// app/lib/stripe/api.ts
export async function cancelSubscription(subscriptionId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRIPE_API_URL}/cancelSubscription`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId })
    }
  );
  
  return response.json(); // { subscriptionId, status: "canceled" }
}
```

**Firestore Update After Cancellation:**
```typescript
await updateDoc(doc(db, 'users', user.uid), {
  'stripe.subscriptionStatus': 'canceled',
  'stripe.canceledAt': serverTimestamp(),
  'plan': 'free',
  'invoiceParses': 10,  // Reset to free tier
  'templateDownloads': 3,
  'generatorUses': 5
});
```

**Cancellation Logic:**
Lambda determines:
1. Cancel immediately: plan downgrades now
2. Cancel at period end: user keeps premium until billing date
   (Frontend should show "Active until {periodEnd}")

**Testing:**
- [ ] Cancel subscription → Verify Lambda returns success
- [ ] Verify Firestore plan = "free" and quotas reset
- [ ] Check parser page shows "Upgrade" prompt again
- [ ] Verify Stripe dashboard shows canceled status
- [ ] Test cancellation at period end (if supported)

**Risk:** MEDIUM - Must handle gracefully, no data loss

---

### Phase 6: Error Handling & Edge Cases (Week 5-6) 🛡️

**Scenarios to Handle:**

1. **Payment Failure During Renewal:**
   ```
   Webhook: invoice.payment_failed
   → Set status to "past_due"
   → Send email: "Payment failed, please update card"
   → Grace period: 3 days premium access
   → After grace period: Downgrade to free
   ```

2. **User Updates Payment Method:**
   ```
   Stripe dashboard → User adds new card
   → Webhook: customer.updated
   → Update Firestore paymentMethodId
   ```

3. **Subscription Deleted via Stripe Dashboard:**
   ```
   Webhook: customer.subscription.deleted
   → Update Firestore: plan = "free"
   → Log event
   ```

4. **Duplicate Webhooks:**
   ```
   Use Stripe event ID to detect duplicates
   → Check if event already processed
   → Skip if already handled
   ```

5. **Firestore Update Failures:**
   ```
   Webhook received but Firestore down
   → Retry logic with exponential backoff
   → Log to error tracking system
   → Manual admin intervention if persistent
   ```

**Testing:**
- [ ] Simulate payment failure (test card)
- [ ] Test grace period logic
- [ ] Verify duplicate webhook detection
- [ ] Test Firestore retry logic

**Risk:** HIGH - Edge cases can cause quota/access inconsistencies

---

### Phase 7: Migration of Existing Users (Week 6) 🔄

**Goal:** Add Stripe fields to existing user documents without disrupting service

**Migration Script:**
```typescript
// scripts/migrate-users-to-stripe.ts
async function migrateUsers() {
  const usersSnapshot = await db.collection('users').get();
  
  for (const doc of usersSnapshot.docs) {
    const user = doc.data();
    
    // Only migrate users without Stripe data
    if (!user.stripe) {
      await doc.ref.update({
        stripe: {
          customerId: null,  // Will be created on next login
          subscriptionId: null,
          subscriptionStatus: null
        }
      });
      
      console.log(`Migrated user: ${user.email}`);
    }
  }
}
```

**Migration Plan:**
1. Run script on staging database first
2. Verify all users have `stripe` field
3. Deploy updated code (reads both old and new formats)
4. Run script on production during low-traffic hours
5. Monitor for errors
6. Verify no user lockouts

**Testing:**
- [ ] Test on staging with real user data copy
- [ ] Verify existing users can still log in
- [ ] Check quota system works with new fields
- [ ] Monitor error logs for 24 hours

**Risk:** MEDIUM - Must not break existing user experience

---

### Phase 8: Testing & QA (Week 7) ✅

**Test Scenarios:**

| Scenario | Expected Result | Status |
|----------|----------------|--------|
| New user signs up | Stripe customer created | [ ] |
| User upgrades to Premium | Subscription active, plan updated | [ ] |
| Monthly renewal succeeds | Subscription stays active | [ ] |
| Monthly renewal fails | Grace period, then downgrade | [ ] |
| User cancels subscription | Downgrade at period end | [ ] |
| User updates payment method | New card saved | [ ] |
| Webhook signature invalid | Request rejected | [ ] |
| Firestore update fails | Retry + log error | [ ] |
| User with expired sub logs in | Auto-downgrade to free | [ ] |
| Admin user | Bypass all payment checks | [ ] |

**Stripe Test Cards:**
```
Success: 4242 4242 4242 4242
3D Secure: 4000 0027 6000 3184
Declined: 4000 0000 0000 0002
Insufficient funds: 4000 0000 0000 9995
```

**Testing Tools:**
- Stripe CLI for webhook testing
- Postman for API route testing
- Jest/Vitest for unit tests
- Playwright for E2E testing

---

### Phase 9: Production Deployment (Week 8) 🚀

**Pre-Deployment Checklist:**
- [ ] Switch to Stripe production keys
- [ ] Configure production webhook endpoint
- [ ] Test with real $1 charge (refund immediately)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Prepare rollback plan
- [ ] Notify team of deployment window

**Deployment Steps:**
1. Deploy to staging → Full QA pass
2. Smoke test all critical flows
3. Deploy to production (off-peak hours)
4. Monitor logs for 30 minutes
5. Test with real payment (internal team)
6. Gradually roll out to users (feature flag?)
7. Monitor for 72 hours

**Post-Deployment:**
- Monitor Stripe dashboard for issues
- Check Firestore writes (rate, errors)
- Review error logs daily
- Collect user feedback

---

## 7. Security Considerations

### 7.1 Critical Security Rules (Lambda Architecture)

1. **✅ Stripe Secret Keys in Lambda Only**
   ```typescript
   // ❌ WRONG - Frontend
   const stripe = new Stripe('sk_live_...');
   
   // ✅ CORRECT - Lambda has secret keys
   // Frontend only has publishable key:
   const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
   ```
   
   **Status:** ✅ Already secured in Lambda environment variables

2. **✅ Webhook Signatures (Lambda Handles)**
   Lambda backend should verify webhook signatures:
   ```python
   # Lambda webhook handler (Python example)
   event = stripe.Webhook.construct_event(
       payload, sig_header, webhook_secret
   )
   ```
   
   **Action Required:** Confirm Lambda webhook handler verifies signatures

3. **Validate Firebase Auth before calling Lambda**
   ```typescript
   // Frontend must send Firebase ID token
   const idToken = await user.getIdToken();
   
   const response = await fetch(lambdaEndpoint, {
     headers: {
       'Authorization': `Bearer ${idToken}`,
       'Content-Type': 'application/json'
     }
   });
   ```
   
   **Action Required:** Confirm Lambda validates Firebase tokens OR add validation

4. **Use HTTPS only** (enforced by API Gateway)

5. **Rate limiting** (handled by API Gateway)

6. **Firestore Security Rules** (frontend writes must be validated)

### 7.2 Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can only read/write their own document
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId 
                   && !request.resource.data.diff(resource.data).affectedKeys()
                     .hasAny(['stripe.customerId', 'stripe.subscriptionId']);
      
      // Stripe fields can only be written by server (admin)
      // This prevents users from manually setting premium status
    }
    
    // Only server can write subscription events
    match /subscriptions/{userId}/events/{eventId} {
      allow read: if request.auth.uid == userId;
      allow write: if false; // Server only via Admin SDK
    }
  }
}
```

### 7.3 Environment Variables (Lambda Architecture)

**Frontend (.env.local):**
```bash
# Public - Safe to expose
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Lambda API base URL
NEXT_PUBLIC_STRIPE_API_URL=https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage
```

**Lambda (AWS Environment Variables):**
```bash
# Secret - NEVER expose to frontend
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Other Lambda secrets
FIREBASE_ADMIN_KEY=...  # If Lambda needs to update Firestore
```

**Security Checklist:**
- [ ] Add `.env.local` to `.gitignore`
- [ ] Use environment variables in Vercel/hosting dashboard (frontend vars only)
- [ ] ✅ Stripe secret keys secured in AWS Lambda environment
- [ ] Rotate keys if accidentally exposed
- [ ] Use test keys in development
- [ ] Use restricted keys (limit to specific endpoints)
- [ ] **IMPORTANT:** Confirm Lambda has access to Firebase Admin SDK for Firestore updates

---

## 8. Testing Strategy

### 8.1 Unit Tests

```typescript
// __tests__/stripe/subscriptionHelpers.test.ts
describe('Subscription Helpers', () => {
  test('creates subscription with valid customer', async () => {
    const result = await createSubscription('cus_test', 'pm_test');
    expect(result.status).toBe('active');
  });
  
  test('handles payment failure gracefully', async () => {
    const result = await createSubscription('cus_test', 'pm_declined');
    expect(result.status).toBe('incomplete');
  });
});
```

### 8.2 Integration Tests

```typescript
// __tests__/api/stripe/create-subscription.test.ts
describe('POST /api/stripe/create-subscription', () => {
  test('creates subscription and updates Firestore', async () => {
    const response = await fetch('/api/stripe/create-subscription', {
      method: 'POST',
      body: JSON.stringify({ customerId: 'cus_test', paymentMethodId: 'pm_test' })
    });
    
    expect(response.status).toBe(200);
    
    // Verify Firestore was updated
    const userDoc = await db.collection('users').doc('test_uid').get();
    expect(userDoc.data().plan).toBe('premium');
  });
});
```

### 8.3 E2E Tests (Playwright)

```typescript
// tests/e2e/subscription-flow.spec.ts
test('user can upgrade to premium', async ({ page }) => {
  // Sign in
  await page.goto('/sign-in');
  await page.fill('input[type=email]', 'test@example.com');
  await page.fill('input[type=password]', 'password');
  await page.click('button[type=submit]');
  
  // Go to pricing page
  await page.goto('/pricing');
  await page.click('text=Upgrade to Premium');
  
  // Fill card details (use Stripe test card)
  const cardElement = page.frameLocator('iframe[name*="__privateStripeFrame"]');
  await cardElement.fill('[name="cardnumber"]', '4242424242424242');
  await cardElement.fill('[name="exp-date"]', '12/34');
  await cardElement.fill('[name="cvc"]', '123');
  await cardElement.fill('[name="postal"]', '12345');
  
  // Submit payment
  await page.click('button:has-text("Subscribe")');
  
  // Verify success
  await expect(page.locator('text=Welcome to Premium!')).toBeVisible();
  await expect(page.locator('text=Unlimited parses')).toBeVisible();
});
```

---

## 9. Rollout Plan

### 9.1 Feature Flag Strategy

Use feature flags to gradually enable Stripe integration:

```typescript
// app/lib/featureFlags.ts
export const FEATURE_FLAGS = {
  STRIPE_ENABLED: process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true',
  STRIPE_BETA_USERS: ['user1@test.com', 'user2@test.com'], // Beta testers
};

// In components:
if (FEATURE_FLAGS.STRIPE_ENABLED) {
  return <StripeCheckoutButton />;
} else {
  return <ComingSoonBadge />;
}
```

### 9.2 Rollout Phases

**Week 1: Internal Testing**
- Enable for admin users only
- Test with real payments (refund immediately)
- Monitor all metrics

**Week 2: Beta Users**
- Enable for 10 selected beta testers
- Collect feedback
- Fix any issues

**Week 3: Limited Rollout (10%)**
- Enable for 10% of users (random selection)
- Monitor conversion rate
- Check for errors

**Week 4: Full Rollout (100%)**
- Enable for all users
- Monitor closely for 72 hours
- Prepare to rollback if issues

### 9.3 Success Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Successful payment rate | > 95% | [ ] |
| Webhook processing success | > 99% | [ ] |
| Quota sync accuracy | 100% | [ ] |
| Checkout abandonment rate | < 30% | [ ] |
| Customer support tickets | < 5/day | [ ] |

---

## 10. Risk Mitigation

### 10.1 Identified Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Stripe API downtime | Low | High | Cache subscription status, graceful degradation |
| Webhook delivery failure | Medium | High | Retry logic, manual reconciliation script |
| Payment fraud | Low | Medium | Use Stripe Radar, implement velocity checks |
| Firestore quota exceeded | Low | High | Monitor write rate, implement batching |
| User lockout (access denied) | Medium | Critical | Grace period, manual override for admins |
| Double-charging | Low | Critical | Idempotency keys, check for existing subscription |
| Currency mismatch (USD vs GBP) | High | Medium | Clarify pricing, convert currencies |

### 10.2 Rollback Plan

**If critical issue detected:**

1. **Immediate Actions:**
   - Set `NEXT_PUBLIC_STRIPE_ENABLED=false`
   - Deploy rollback (< 5 minutes)
   - Pause all new subscriptions

2. **Communication:**
   - Post status page update
   - Email affected users
   - Refund any failed transactions

3. **Investigation:**
   - Pull logs from last 24 hours
   - Identify root cause
   - Create hotfix branch

4. **Resolution:**
   - Fix issue
   - Test on staging
   - Gradual re-rollout

### 10.3 Monitoring & Alerts

**Set up alerts for:**
- Stripe webhook failures (> 5% failure rate)
- Payment success rate drops below 95%
- Firestore write errors spike
- Unusual subscription creation volume (fraud detection)
- High cart abandonment rate (> 50%)

**Tools:**
- Stripe Dashboard (built-in monitoring)
- Sentry (error tracking)
- Google Cloud Monitoring (Firestore metrics)
- Custom Slack alerts for critical events

---

## 11. Lambda Limitations & Workarounds

### 11.1 Current Lambda Limitations

Based on Lambda team answers, the current implementation has these limitations:

| Limitation | Impact | Workaround |
|------------|--------|------------|
| **No Firestore Updates** | Frontend must manage all database writes | Implement Firestore writes in frontend after each Lambda call |
| **No Webhooks** | Subscription changes not auto-synced | Periodic polling with `getSubscriptionStatus` |
| **No Authentication** | Public API, no user validation | Implement rate limiting, consider adding auth later |
| **No Retries** | Network failures not handled | Implement retry logic in frontend |
| **No Idempotency** | Duplicate calls may create duplicate resources | Track request IDs in Firestore, check before retry |
| **Customer ID in Logs** | ID not returned in API response | Request Lambda update OR manual copy from logs |

### 11.2 Required Lambda API Update

**Critical Issue:** Lambda prints customer ID to logs but doesn't return it.

**Request to Lambda Team:**
```
Please update /createCustomer endpoint to return customer ID in response:

Current (assumed):
{
  "success": true,
  "message": "Customer created"
}

Needed:
{
  "success": true,
  "customerId": "cus_ABC123",
  "email": "user@example.com",
  "name": "John Doe"
}
```

**Without this change:** Manual intervention required for every user signup.

### 11.3 Polling Strategy (No Webhooks)

Since webhooks are not configured, implement periodic polling:

```typescript
// app/hooks/useSubscriptionPolling.ts
export function useSubscriptionPolling(subscriptionId: string | null) {
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  
  useEffect(() => {
    if (!subscriptionId) return;
    
    const pollStatus = async () => {
      try {
        const result = await getSubscriptionStatus(subscriptionId);
        
        // Update Firestore if status changed
        if (result.status !== status) {
          await updateFirestoreSubscriptionStatus(result);
          setStatus(result.status);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };
    
    // Poll every 60 seconds
    pollStatus(); // Initial check
    const interval = setInterval(pollStatus, 60000);
    
    return () => clearInterval(interval);
  }, [subscriptionId, status]);
  
  return status;
}
```

**Polling Schedule:**
- Active subscription: Every 60 seconds
- Trial period: Every 30 seconds
- No subscription: Disable polling

**Limitations:**
- Up to 60 second delay for status changes
- Increased API calls (not ideal for scaling)
- User must stay on page to receive updates

**Future Improvement:** Add webhook support to Lambda for real-time updates

### 11.4 Error Handling Strategy

Lambda doesn't provide structured errors or retries. Implement in frontend:

```typescript
// app/lib/stripe/api.ts
async function callLambdaWithRetry<T>(
  endpoint: string,
  options: RequestInit,
  maxRetries = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRIPE_API_URL}${endpoint}`,
        options
      );
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Lambda error ${response.status}: ${text}`);
      }
      
      return await response.json();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, attempt - 1) * 1000)
        );
      }
    }
  }
  
  throw lastError || new Error('All retries failed');
}
```

### 11.5 Idempotency Strategy

Lambda doesn't support idempotency keys. Prevent duplicates in frontend:

```typescript
// app/lib/stripe/idempotency.ts
const requestCache = new Map<string, Promise<any>>();

export async function idempotentRequest<T>(
  key: string,
  request: () => Promise<T>
): Promise<T> {
  // Check if request already in progress
  if (requestCache.has(key)) {
    return requestCache.get(key)!;
  }
  
  // Check Firestore for completed request
  const existingResult = await checkFirestoreForRequest(key);
  if (existingResult) {
    return existingResult;
  }
  
  // Execute request
  const promise = request();
  requestCache.set(key, promise);
  
  try {
    const result = await promise;
    
    // Save result to Firestore
    await saveRequestToFirestore(key, result);
    
    return result;
  } finally {
    requestCache.delete(key);
  }
}

// Usage:
const customerId = await idempotentRequest(
  `create-customer-${userId}`,
  () => createStripeCustomer(email, name, userId)
);
```

---

## 12. Lambda-Firestore Synchronization Strategy

### 12.1 ✅ Decision Confirmed: Frontend Updates Firestore

**Lambda Team Decision:** Lambda will NOT update Firestore.

**Chosen Approach: Frontend-Managed State**
```
Lambda API → Returns subscription data → Frontend updates Firestore
```

**Rationale:**
- ✅ Lambda team prefers simpler implementation (Stripe operations only)
- ✅ No Firebase Admin SDK needed in Lambda
- ✅ Frontend already has Firebase Auth context
- ✅ No webhooks means no concurrent update concerns

**Implications:**
- ⚠️ Frontend must update Firestore after EVERY successful Lambda call
- ⚠️ Network failure after payment = subscription exists but Firestore not updated
- ⚠️ Must implement robust error handling and retry logic
- ⚠️ User refresh might show stale data until polling updates

**Mitigation Strategies:**
1. **Atomic Pattern:** Try-catch around Lambda call + Firestore update
2. **Retry Logic:** If Firestore write fails, retry until success
3. **Status Polling:** Periodic checks to sync Firestore with Stripe
4. **Manual Recovery:** Admin dashboard to fix sync issues

### 12.2 Complete Implementation Example

**Pattern: Lambda Call + Firestore Sync**

```typescript
// app/lib/stripe/subscription.ts
import { db } from '@/app/lib/firebase/clientApp';
import { doc, updateDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';

export async function createSubscriptionWithSync(
  userId: string,
  customerId: string,
  paymentMethodId: string
) {
  let subscriptionData: any = null;
  
  try {
    // Step 1: Call Lambda API
    console.log('[Stripe] Calling Lambda to create subscription...');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRIPE_API_URL}/createSubscription`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, paymentMethodId })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lambda error ${response.status}: ${errorText}`);
    }
    
    subscriptionData = await response.json();
    console.log('[Stripe] Subscription created:', subscriptionData.subscriptionId);
    
    // Step 2: Update Firestore
    console.log('[Firestore] Updating user document...');
    await updateDoc(doc(db, 'users', userId), {
      'stripe.subscriptionId': subscriptionData.subscriptionId,
      'stripe.subscriptionStatus': subscriptionData.status,
      'stripe.paymentMethodId': subscriptionData.paymentMethodId,
      'stripe.createdAt': serverTimestamp(),
      'plan': 'premium', // Unlock features
      'invoiceParses': 999999,
      'templateDownloads': 999999,
      'generatorUses': 999999
    });
    
    console.log('[Firestore] ✅ Sync complete');
    
    return {
      success: true,
      subscriptionId: subscriptionData.subscriptionId,
      clientSecret: subscriptionData.clientSecret
    };
    
  } catch (error) {
    console.error('[ERROR]', error);
    
    // Critical: Subscription created but Firestore failed
    if (subscriptionData?.subscriptionId) {
      console.error('[CRITICAL] Orphaned subscription:', subscriptionData.subscriptionId);
      
      // Attempt one retry
      try {
        await updateDoc(doc(db, 'users', userId), {
          'stripe.subscriptionId': subscriptionData.subscriptionId,
          'stripe.subscriptionStatus': subscriptionData.status,
          'plan': 'premium'
        });
        return { success: true, subscriptionId: subscriptionData.subscriptionId };
      } catch (retryError) {
        // Log for manual recovery
        await addDoc(collection(db, 'syncFailures'), {
          userId,
          subscriptionId: subscriptionData.subscriptionId,
          timestamp: serverTimestamp(),
          resolved: false
        });
      }
    }
    
    throw error;
  }
}
```

### 11.2 Implementation for Option B

**Lambda Configuration:**
```python
# Lambda needs Firebase Admin SDK
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize with service account
cred = credentials.Certificate(json.loads(os.environ['FIREBASE_ADMIN_KEY']))
firebase_admin.initialize_app(cred)
db = firestore.client()

# Update user document after subscription creation
def update_user_subscription(user_id, subscription_data):
    db.collection('users').document(user_id).update({
        'stripe': subscription_data,
        'plan': 'premium'  # or 'pro'
    })
```

**Modified API Flow:**
```
1. Frontend calls Lambda: POST /createSubscription
2. Lambda creates Stripe subscription
3. Lambda updates Firestore user document
4. Lambda returns success to frontend
5. Frontend shows success message (no Firestore write needed)
```

**Action Required:**
- [ ] Confirm Lambda has Firebase Admin SDK
- [ ] Add Firebase service account key to Lambda environment
- [ ] Update Lambda to write to Firestore after Stripe operations
- [ ] Frontend becomes read-only for subscription data

---

## 12. Open Questions & Decisions Needed

### 12.1 Lambda-Firestore Integration

**CRITICAL QUESTION:** Does Lambda already update Firestore?
- [ ] Yes - Lambda writes to Firestore after Stripe operations
- [ ] No - Frontend needs to update Firestore after Lambda responses
- [ ] Unknown - Need to check Lambda implementation

**If NO:** We need to either:
1. Add Firebase Admin SDK to Lambda (recommended)
2. Keep frontend responsible for Firestore updates (simpler but less reliable)

### 12.2 Pricing Clarification

**QUESTION:** Which plan maps to Stripe's $29/month subscription?
- Option A: Pro plan (currently £29/month in config)
- Option B: Premium plan (currently £9.99/month)
- Option C: Create new "Stripe Premium" plan at $29

**DECISION NEEDED:** Confirm with business stakeholders

### 11.2 Currency Handling

**QUESTION:** USD or GBP for pricing?
- Stripe doc uses **USD ($29)**
- Pricing config uses **GBP (£29, £9.99)**

**OPTIONS:**
1. Convert USD to GBP at current exchange rate
2. Offer both currencies (geo-based)
3. Standardize on one currency

**DECISION NEEDED:** Clarify target market and preferred currency

### 11.3 Multiple Stripe Plans

**QUESTION:** Do we need multiple Stripe products?
- Free tier: No Stripe subscription needed
- Premium (£9.99): Stripe product #1?
- Pro (£29): Stripe product #2?
- Enterprise: Custom (no Stripe, manual invoicing)

**DECISION NEEDED:** Define Stripe product mapping

### 11.4 Trial Period

**QUESTION:** Offer free trial?
- Stripe supports trial periods (e.g., 7-day free trial)
- Could increase conversion rate
- Requires separate trial logic

**DECISION NEEDED:** Trial period strategy (if any)

### 11.5 Cancellation Policy

**QUESTION:** Immediate vs end-of-period cancellation?
- **Immediate:** Refund prorated amount, downgrade now
- **End-of-period:** No refund, premium until billing date ends

**DECISION NEEDED:** Choose cancellation policy

---

## 12. Lambda API Integration - Quick Reference

### 12.1 Available Lambda Endpoints

All endpoints use base URL: `https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/`

| Endpoint | Method | Request Body | Response |
|----------|--------|--------------|----------|
| `/createCustomer` | POST | `{ email, name, metadata: { userId } }` | `{ customerId, email, name }` |
| `/createSubscription` | POST | `{ customerId, paymentMethodId }` | `{ subscriptionId, status, clientSecret }` |
| `/getSubscriptionStatus` | POST | `{ subscriptionId }` | `{ subscriptionId, status, currentPeriodEnd, cancelAtPeriodEnd }` |
| `/cancelSubscription` | POST | `{ subscriptionId }` | `{ subscriptionId, status }` |
| `/getProductDetails` | GET | None | `{ product: {...}, price: {...} }` |
| `/getSubscriptionList` | POST | `{ customerId }` | `{ subscriptions: [...], count }` |

### 12.2 Frontend Implementation Checklist

**Phase 1: Setup**
- [ ] Install Stripe.js: `npm install @stripe/stripe-js`
- [ ] Create `app/lib/stripe/api.ts` with Lambda API wrappers
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env.local`
- [ ] Test Lambda endpoints with curl/Postman

**Phase 2: Customer Creation**
- [ ] Hook into `AuthContext.initializeNewUser()`
- [ ] Call Lambda `/createCustomer` on signup
- [ ] Store `customerId` in Firestore `users/{uid}/stripe.customerId`

**Phase 3: Subscription Checkout**
- [ ] Create `StripeCheckoutForm` component
- [ ] Load Stripe Elements for card input
- [ ] Collect payment method with `stripe.createPaymentMethod()`
- [ ] Call Lambda `/createSubscription` with `paymentMethodId`
- [ ] Handle 3D Secure if needed
- [ ] Update Firestore with subscription data

**Phase 4: Subscription Management**
- [ ] Create subscription dashboard
- [ ] Display current plan and billing info
- [ ] Implement cancel flow (call Lambda `/cancelSubscription`)
- [ ] Poll `/getSubscriptionStatus` periodically

**Phase 5: Testing**
- [ ] Test with Stripe test cards
- [ ] Verify Firestore updates correctly
- [ ] Test quota system recognizes paid plan
- [ ] Test cancellation flow

### 12.3 Lambda Team Answers ✅

**Implementation clarifications received:**

1. **Firestore Integration:**
   - ❌ Lambda does **NOT** update Firestore after Stripe operations
   - ✅ Lambda will **print customer ID** for manual copy/use
   - ❌ No Firebase Admin SDK needed in Lambda
   - **Action:** Frontend must handle ALL Firestore updates

2. **Authentication:**
   - ❌ Lambda does **NOT** validate Firebase ID tokens
   - ❌ No Authorization header needed
   - **Action:** Frontend can call Lambda directly (no auth layer)
   - **Security Note:** Consider adding basic validation in future

3. **Webhook Handling:**
   - ❌ Webhooks **NOT** configured in Lambda
   - ❌ No Firestore updates from webhooks
   - **Action:** Frontend must poll subscription status periodically
   - **Limitation:** Subscription changes (renewal, cancellation) won't auto-sync

4. **Error Handling:**
   - ❓ Error format not documented yet
   - ❌ No automatic retries
   - ❌ No idempotency keys
   - **Action:** Frontend must implement retry logic and error handling

5. **Currency:**
   - ❌ No currency configured in Lambda
   - ❌ Single price ID only
   - **Action:** Decide on USD or GBP before product creation

---

### 12.4 Revised Architecture (Frontend-Managed)

Based on Lambda team answers, the integration is **frontend-managed**:

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                          │
│                                                              │
│  User Flow:                                                  │
│  1. Signup → Call Lambda createCustomer → Copy customerId   │
│  2. Store customerId in Firestore manually                   │
│  3. Upgrade → Stripe Elements → Create payment method       │
│  4. Call Lambda createSubscription                           │
│  5. Update Firestore with subscription data                  │
│  6. Poll Lambda getSubscriptionStatus periodically           │
│  7. Update Firestore when status changes                     │
│                                                              │
│  Frontend Responsibilities:                                  │
│  ✅ ALL Firestore writes (customer ID, subscription data)    │
│  ✅ Payment form UI (Stripe Elements)                        │
│  ✅ Error handling & retries                                 │
│  ✅ Status polling (no webhooks)                             │
│  ✅ User notifications                                       │
└─────────────┬───────────────────────────────────────────────┘
              │
              │ Direct HTTP calls (no auth)
              ↓
┌─────────────────────────────────────────────────────────────┐
│              AWS LAMBDA STRIPE API (STATELESS)               │
│  Base: https://jm1n4qxu69.execute-api.eu-west-2            │
│        .amazonaws.com/invoicer-stage/                        │
│                                                              │
│  Responsibilities:                                           │
│  ✅ Stripe customer creation (prints ID to logs)             │
│  ✅ Stripe subscription creation/cancellation                │
│  ✅ Stripe subscription status checks                        │
│  ❌ NO Firestore updates                                     │
│  ❌ NO webhook handling                                      │
│  ❌ NO authentication                                        │
└─────────────────────────────────────────────────────────────┘
```

**Key Takeaways:**
- Lambda is a **pure Stripe API wrapper** (no state management)
- Frontend is **fully responsible** for Firestore synchronization
- No webhooks = Must implement **periodic polling**
- No auth = **Public API** (consider rate limiting)

---

## 13. Next Steps

### Immediate Actions (This Week)

1. **Clarify Lambda integration** (CRITICAL)
   - [ ] Contact Lambda team with questions from Section 12.3
   - [ ] Confirm Firestore update strategy
   - [ ] Confirm authentication requirements
   - [ ] Get test credentials for Lambda API

2. **Clarify pricing** (Section 12.2)
   - [ ] Confirm which plan = $29/month Stripe subscription
   - [ ] Decide on currency (USD vs GBP)
   - [ ] Define all Stripe products needed

3. **Create project structure**
   - [ ] Create `app/lib/stripe/` directory
   - [ ] Create `app/components/stripe/` directory
   - [ ] Create `app/hooks/` for subscription hooks
   - [ ] **NO** `app/api/stripe/` needed (Lambda handles this)

4. **Install dependencies**
   ```bash
   npm install @stripe/stripe-js
   # Note: NO 'stripe' package needed (Lambda has it)
   ```

5. **Set up environment variables**
   - [ ] Add to `.env.local`:
     ```
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
     NEXT_PUBLIC_STRIPE_API_URL=https://jm1n4qxu69...
     ```
   - [ ] Add to Vercel dashboard (production)

### Implementation Timeline

| Phase | Duration | Key Deliverable |
|-------|----------|-----------------|
| Phase 1: Foundation | 1 week | Stripe SDK setup, env vars |
| Phase 2: Customer Creation | 1 week | Auto-create customers on signup |
| Phase 3: Subscription Checkout | 1-2 weeks | Full payment flow |
| Phase 4: Webhooks | 1 week | Event handling, auto-updates |
| Phase 5: Management | 1 week | Cancel, update subscription |
| Phase 6: Error Handling | 1 week | Edge cases, grace periods |
| Phase 7: Migration | 3 days | Migrate existing users |
| Phase 8: Testing | 1 week | Comprehensive QA |
| Phase 9: Deployment | 1 week | Gradual rollout |

**Total Estimated Time:** 8-10 weeks

---

## 14. Summary & Recommendations (Lambda Architecture)

### Strategic Recommendations

1. **Start with Test Mode & Lambda Verification**
   - Verify Lambda API works with test mode
   - Test all endpoints with Postman/curl first
   - Confirm Firestore integration before frontend work
   - Use Stripe test cards for all flows

2. **Clarify Lambda-Firestore Strategy (CRITICAL)**
   - **Option A:** Lambda updates Firestore (recommended)
   - **Option B:** Frontend updates Firestore (simpler but less reliable)
   - This decision affects entire implementation approach

3. **Implement Feature Flags**
   - Deploy code but keep Stripe disabled initially
   - Enable for internal team first
   - Gradual rollout to users

4. **Lambda Team Coordination**
   - Regular sync meetings during implementation
   - Shared documentation of API contracts
   - Joint testing of integration points

5. **Maintain Backward Compatibility**
   - Existing free users continue working normally
   - Migration happens transparently
   - No disruption to current user base

### Success Factors

✅ **Zero tolerance for payment errors** - Every transaction must be reliable  
✅ **Lambda API reliability** - Monitor Lambda performance and errors  
✅ **Seamless user experience** - Upgrading should be frictionless  
✅ **Security first** - Stripe secrets in Lambda only  
✅ **Firestore consistency** - Subscription status always in sync  
✅ **Comprehensive testing** - Test frontend + Lambda integration  

### Key Differences from Standard Integration

| Aspect | Standard (Next.js API) | Lambda Architecture |
|--------|----------------------|-------------------|
| API Implementation | Next.js API routes | AWS Lambda functions |
| Stripe SDK Location | Next.js server | Lambda backend |
| Frontend Complexity | Lower | Slightly higher (API calls) |
| Security | Env vars in Next.js | Env vars in AWS |
| Webhook Handling | Next.js route | Lambda function |
| Firestore Updates | Server action | Lambda or frontend |
| Testing | Simpler | Need Lambda access |
| Deployment | Single deploy | Frontend + Lambda coordination |

---

**Document Status:** Updated for Lambda architecture - Ready for review

**Next Action:** Contact Lambda team to answer critical questions:
1. **Firestore integration:** Does Lambda update Firestore?
2. **Authentication:** Does Lambda validate Firebase tokens?
3. **Webhook status:** Are webhooks configured and tested?
4. **Pricing structure:** Confirm USD vs GBP, plan mapping
5. **Timeline coordination:** Align frontend + Lambda work

**Recommended Timeline Adjustment:**
- Original: 8-10 weeks
- With Lambda: 6-8 weeks (backend mostly done!)
- Focus shifts to frontend integration and testing

**Contact:** Ready to begin Phase 1 upon Lambda team confirmation ✅
