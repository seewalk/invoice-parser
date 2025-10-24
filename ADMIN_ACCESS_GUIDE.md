# 🔐 Admin Access & Unlimited Privileges Guide

**For InvoiceParse.ai Platform Administrators**

---

## 📋 **Overview**

This guide explains how admin users are granted unlimited access to all platform features, bypassing quota restrictions while maintaining proper security and analytics tracking.

---

## 🎯 **Admin Privileges**

Admin users receive:
- ✅ **Unlimited invoice parsing** (no quota limits)
- ✅ **Unlimited template downloads** (no quota limits)
- ✅ **Unlimited generator uses** (no quota limits)
- ✅ **Access to all user analytics** (via Firebase Console)
- ✅ **Access to lead captures** (for sales/marketing)
- ✅ **Full CRUD access to user data** (for support)
- ✅ **Usage tracking** (analytics logged, quotas not decremented)

---

## 👤 **How to Identify Admins**

### Method 1: Email Domain Detection (Current)

Admins are automatically detected during registration by email domain:

```typescript
// app/lib/firebase/AuthContext.tsx (line 110)
const isAdmin = 
  email.endsWith('@elektroluma.com') || 
  email.endsWith('@admin.invoiceparse.ai');
```

**Admin Email Domains:**
- `@elektroluma.com` - Company domain
- `@admin.invoiceparse.ai` - Admin-specific domain

**Example Admin Emails:**
- `admin@elektroluma.com` ✅
- `support@elektroluma.com` ✅
- `john@admin.invoiceparse.ai` ✅
- `regular@gmail.com` ❌

### Method 2: Firebase Custom Claims (Advanced)

For more control, use Firebase Admin SDK to set custom claims:

```javascript
// Using Firebase Admin SDK (Node.js)
const admin = require('firebase-admin');

// Set admin claim
admin.auth().setCustomUserClaims(userId, { admin: true })
  .then(() => {
    console.log('Admin claim set successfully');
  });
```

Then update Firestore:
```javascript
admin.firestore().collection('users').doc(userId).update({
  role: 'admin',
  plan: 'enterprise'
});
```

### Method 3: Manual Firestore Update

Via Firebase Console:
1. Go to Firestore Database
2. Navigate to `users/{userId}`
3. Edit document fields:
   - `role`: `"admin"`
   - `plan`: `"enterprise"`
   - `invoiceParses`: `999999`
   - `templateDownloads`: `999999`
   - `generatorUses`: `999999`

---

## 🏗️ **Implementation Architecture**

### 1. User Document Structure

```typescript
// Firestore: users/{userId}
interface UserQuotas {
  // Identity
  email: string;
  name: string;
  
  // Access Control
  role: 'user' | 'admin';  // Admin role flag
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  
  // Quotas (effectively unlimited for admins)
  invoiceParses: number;      // 999999 for admins
  templateDownloads: number;  // 999999 for admins
  generatorUses: number;      // 999999 for admins
  
  // Timestamps
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
  subscriptionEnd?: Timestamp;
}
```

### 2. Quota Check Flow

```typescript
// app/hooks/useQuota.ts

checkQuota(type: QuotaType): boolean {
  // 1. Check if admin (highest priority)
  if (userQuotas.role === 'admin') {
    return true;  // ✅ Unlimited access
  }
  
  // 2. Check if premium user
  if (userQuotas.plan !== 'free') {
    return true;  // ✅ Unlimited access
  }
  
  // 3. Check quota for free users
  return userQuotas[type] > 0;
}
```

### 3. Quota Decrement Flow

```typescript
// app/hooks/useQuota.ts

decrementQuota(type: QuotaType): Promise<boolean> {
  // Admin: Log usage but don't decrement
  if (userQuotas.role === 'admin') {
    await logUsage({ type, role: 'admin' });
    return true;  // ✅ No quota decrement
  }
  
  // Premium: Log usage but don't decrement
  if (userQuotas.plan !== 'free') {
    await logUsage({ type, plan: userQuotas.plan });
    return true;  // ✅ No quota decrement
  }
  
  // Free: Decrement quota and log
  await updateDoc(userRef, { [type]: increment(-1) });
  await logUsage({ type, quotaRemaining: remaining - 1 });
  return true;
}
```

---

## 🔒 **Firebase Security Rules**

### Admin Access Rules

```javascript
// firestore.rules

function isAdmin() {
  return request.auth != null && (
    // Method 1: Custom claims
    request.auth.token.admin == true ||
    // Method 2: Role field
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
  );
}

// Admin can read all users
match /users/{userId} {
  allow read: if isOwner(userId) || isAdmin();
  allow write: if isOwner(userId);
  allow create, update: if isAdmin();  // Admin management
}

// Admin can read all usage data
match /users/{userId}/usage/{usageId} {
  allow read: if isOwner(userId) || isAdmin();
  allow update, delete: if isAdmin();  // Admin cleanup
}

// Admin can read all lead captures
match /leadCaptures/{leadId} {
  allow create: if true;  // Anyone can create
  allow read, update, delete: if isAdmin();  // Admin only
}
```

---

## 📊 **Usage Analytics for Admins**

Even though admins have unlimited access, all usage is tracked:

### Logged Data
```typescript
// Firestore: users/{adminUserId}/usage/{usageId}
{
  type: 'invoiceParses' | 'templateDownloads' | 'generatorUses',
  timestamp: Timestamp,
  role: 'admin',
  plan: 'enterprise',
  metadata: {
    invoiceNumber: string,
    supplier: string,
    totalAmount: number,
    // ... etc
  }
}
```

### Analytics Queries

**Total admin usage (Firebase Console):**
```
Collection: users/{adminUserId}/usage
Filter: role == 'admin'
```

**Invoice parses by admins:**
```
Collection group: usage
Filter: role == 'admin' AND type == 'invoiceParses'
```

---

## 🎨 **UI Indicators**

### Admin Badge Display

The parser page shows admin status:

```tsx
// app/parser/page.tsx (lines 603-622)

{!authLoading && user && (
  <>
    {hasUnlimitedAccess ? (
      <span className="text-sm text-primary-600 font-semibold flex items-center gap-1">
        <Sparkles className="w-4 h-4" />
        {userQuotas?.role === 'admin' ? 'Admin' : 'Unlimited'} Parses
      </span>
    ) : (
      <span className="text-sm text-gray-600">
        {getRemaining('invoiceParses')} / 5 parses remaining
      </span>
    )}
  </>
)}
```

**UI Variations:**
- **Admin user:** "✨ Admin Parses" (blue badge)
- **Premium user:** "✨ Unlimited Parses" (blue badge)
- **Free user:** "3 / 5 parses remaining" (gray text)

---

## 🧪 **Testing Admin Access**

### Test Checklist

- [ ] **Registration Test**
  1. Create account with admin email (`admin@elektroluma.com`)
  2. Verify `role: 'admin'` in Firestore
  3. Verify quotas set to 999999

- [ ] **Quota Check Test**
  1. Login as admin
  2. Check parser page shows "Admin Parses"
  3. Verify `hasUnlimitedAccess === true`

- [ ] **Parsing Test**
  1. Parse invoice as admin
  2. Verify quota NOT decremented
  3. Verify usage logged in `users/{adminId}/usage`

- [ ] **Analytics Test**
  1. Check usage collection for admin entries
  2. Verify `role: 'admin'` in usage records
  3. Confirm metadata properly logged

- [ ] **Security Test**
  1. Login as admin
  2. Access Firebase Console
  3. Verify can view all user data
  4. Verify can read lead captures

---

## 🚀 **Setting Up a New Admin**

### Option 1: Admin Email Registration (Easiest)

```bash
# User registers with admin email
Email: admin@elektroluma.com
Password: ********
Name: Admin User

# System automatically:
# 1. Sets role: 'admin'
# 2. Sets plan: 'enterprise'
# 3. Sets all quotas to 999999
```

### Option 2: Manual Firestore Update

```bash
# 1. User registers normally
# 2. Admin manually updates Firestore

firebase firestore:update users/{userId} --data '{
  "role": "admin",
  "plan": "enterprise",
  "invoiceParses": 999999,
  "templateDownloads": 999999,
  "generatorUses": 999999
}'
```

### Option 3: Firebase Admin SDK Script

```javascript
// scripts/makeAdmin.js
const admin = require('firebase-admin');
admin.initializeApp();

async function makeAdmin(email) {
  // Get user by email
  const user = await admin.auth().getUserByEmail(email);
  
  // Set custom claims
  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  
  // Update Firestore
  await admin.firestore().collection('users').doc(user.uid).update({
    role: 'admin',
    plan: 'enterprise',
    invoiceParses: 999999,
    templateDownloads: 999999,
    generatorUses: 999999
  });
  
  console.log(`✅ ${email} is now an admin`);
}

makeAdmin('user@example.com');
```

---

## 🔧 **Troubleshooting**

### Issue: Admin Not Recognized

**Symptoms:**
- Admin email registered but still shows quotas
- "Upgrade" button visible
- Quota decrementing

**Solutions:**
1. **Check email domain:**
   ```typescript
   // Verify in AuthContext.tsx
   email.endsWith('@elektroluma.com') || 
   email.endsWith('@admin.invoiceparse.ai')
   ```

2. **Check Firestore document:**
   ```
   users/{userId}
   role: 'admin' ✅
   plan: 'enterprise' ✅
   ```

3. **Force re-login:**
   - Logout
   - Clear browser cache
   - Login again
   - Check `userQuotas.role`

4. **Check console logs:**
   ```
   [Quota] Admin user - unlimited access granted ✅
   [Quota] Admin user, no decrement needed ✅
   ```

### Issue: Quota Still Decrementing

**Check:**
1. `useQuota.ts` checks admin role first
2. `userQuotas.role === 'admin'` evaluates true
3. No errors in console during decrement

### Issue: Can't Access Lead Captures

**Check Firestore Rules:**
```javascript
match /leadCaptures/{leadId} {
  allow read, update, delete: if isAdmin(); ✅
}
```

**Verify isAdmin() function:**
```javascript
function isAdmin() {
  return request.auth != null && (
    request.auth.token.admin == true ||
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
  );
}
```

---

## 📝 **Best Practices**

### Security
✅ **DO:** Use custom email domains for admins  
✅ **DO:** Set strong passwords for admin accounts  
✅ **DO:** Monitor admin usage in analytics  
✅ **DO:** Use Firebase Console for sensitive operations  
❌ **DON'T:** Share admin credentials  
❌ **DON'T:** Use admin accounts for testing  
❌ **DON'T:** Hardcode admin UIDs in frontend code  

### Monitoring
✅ **DO:** Track all admin actions in usage collection  
✅ **DO:** Set up alerts for unusual admin activity  
✅ **DO:** Regular audit of admin users  
✅ **DO:** Log admin operations with metadata  

### Administration
✅ **DO:** Document all admin accounts  
✅ **DO:** Revoke admin access when no longer needed  
✅ **DO:** Use least privilege principle  
✅ **DO:** Regular security audits  

---

## 📚 **Related Files**

| File | Purpose |
|------|---------|
| `app/lib/firebase/AuthContext.tsx` | Admin role detection & initialization |
| `app/hooks/useQuota.ts` | Admin quota bypass logic |
| `firestore.rules` | Admin security rules |
| `app/parser/page.tsx` | Admin UI indicators |

---

## 🆘 **Support**

For admin access issues:
1. Check implementation in `AuthContext.tsx`
2. Verify Firestore rules deployed
3. Review console logs for quota checks
4. Contact development team if issues persist

---

**Document Version:** 1.0  
**Last Updated:** 2024-10-24  
**Author:** InvoiceParse.ai Development Team  
**Status:** ✅ Production Ready
