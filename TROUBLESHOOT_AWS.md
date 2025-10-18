# 🔧 AWS S3 Upload Troubleshooting

## Current Error: "SignatureDoesNotMatch"

This error means AWS is receiving the request but rejecting it because:
1. Access Key ID is wrong/incomplete
2. Secret Access Key is wrong/incomplete  
3. Secret Access Key has extra spaces or is truncated
4. Using old/revoked credentials

---

## 🔍 Step 1: Verify Your AWS Credentials

### Check Your Secret Access Key Length

AWS Secret Access Keys are **exactly 40 characters** long.

**Your current key from .env.local:**
```
HIxynJBeO8u8VnGz3AEcRV1Lzoa/NSbX5i2sQdKFn
```

**Character count:** 41 characters (with the 'n' at the end)

⚠️ **This might be the issue!** Check if:
- The key is complete (no truncation)
- No extra spaces at the end
- Copied correctly from AWS

---

## 🔑 Step 2: Get Fresh Credentials from AWS

### Option A: Use Existing Credentials (Verify First)

1. Go to AWS Console: https://console.aws.amazon.com/
2. Navigate to **IAM** → **Users** → Select your user
3. Go to **Security Credentials** tab
4. Under **Access Keys**, verify the Access Key ID matches: `AKIAQ4OO7RMV4B2ODUWP`

⚠️ **Important:** You CANNOT view the Secret Access Key again after creation. If you lost it, you must create new credentials.

### Option B: Create New Credentials (Recommended)

1. Go to AWS Console → IAM → Users → Your User
2. **Security Credentials** tab
3. Click **Create Access Key**
4. Choose **"Other"** as use case
5. **IMMEDIATELY COPY BOTH:**
   - Access Key ID (starts with AKIA)
   - Secret Access Key (40 characters - you can't view this again!)
6. **Delete the old access key** if you created new ones

---

## 📝 Step 3: Update Your .env.local File

**Location:** `C:\Users\paula\invoice-parser\.env.local`

**Format (no quotes, no spaces):**
```env
# AWS S3 Configuration (NO NEXT_PUBLIC_ PREFIX!)
AWS_REGION=eu-west-2
AWS_S3_BUCKET=invoice-parser-images
AWS_ACCESS_KEY_ID=AKIAQ4OO7RMV4B2ODUWP
AWS_SECRET_ACCESS_KEY=your-40-character-secret-key-here

# API Configuration
NEXT_PUBLIC_API_ENDPOINT=https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser
```

**Common Mistakes to Avoid:**
- ❌ Don't put quotes around values: `AWS_REGION="eu-west-2"` ← WRONG
- ✅ Correct: `AWS_REGION=eu-west-2`
- ❌ Don't add spaces: `AWS_REGION= eu-west-2` ← WRONG
- ❌ Don't use NEXT_PUBLIC_ prefix for AWS vars
- ❌ Don't truncate the secret key (must be complete)

---

## 🔐 Step 4: Verify IAM Permissions

Your IAM user needs these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::invoice-parser-images/*"
    }
  ]
}
```

### Check Permissions:
1. AWS Console → IAM → Users → Your User
2. **Permissions** tab
3. Verify there's a policy allowing `s3:PutObject` on `invoice-parser-images` bucket

---

## 🧪 Step 5: Test with Debug Logging

After updating `.env.local`:

1. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

2. **Open browser dev tools** (F12)

3. **Go to Console tab**

4. **Upload an invoice and click Process**

5. **Look for debug logs:**
   ```
   [S3 Upload] Environment check: {
     hasAccessKey: true,
     hasSecretKey: true,
     accessKeyLength: 20,
     secretKeyLength: 40,  ← Should be 40!
     region: 'eu-west-2',
     bucket: 'invoice-parser-images'
   }
   ```

6. **Check the lengths:**
   - `accessKeyLength` should be **20**
   - `secretKeyLength` should be **40**
   - If either is wrong, your env vars aren't loading correctly

---

## 🔄 Step 6: Alternative - Use Fallback Mode

If you want to **test the demo without AWS** for now:

### Option: Comment out credentials temporarily

In your `.env.local`:
```env
# Temporarily commented out to use fallback image
# AWS_REGION=eu-west-2
# AWS_S3_BUCKET=invoice-parser-images
# AWS_ACCESS_KEY_ID=AKIAQ4OO7RMV4B2ODUWP
# AWS_SECRET_ACCESS_KEY=your-secret-here

NEXT_PUBLIC_API_ENDPOINT=https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser
```

This will use a test image automatically. Good for testing the rest of the flow!

---

## 🐛 Common Issues & Solutions

### Issue 1: "credentials not configured" but they are

**Cause:** Server didn't restart after updating `.env.local`

**Solution:**
```bash
# Kill the server completely (Ctrl+C)
# Clear Next.js cache
rm -rf .next
# Start fresh
npm run dev
```

### Issue 2: Still getting signature error

**Possible causes:**
1. ❌ Secret key is incomplete/wrong
2. ❌ Secret key has spaces before/after
3. ❌ Using old/revoked credentials
4. ❌ IAM permissions issue

**Solution:** Create fresh credentials from AWS Console

### Issue 3: "Access Denied"

**Cause:** IAM user doesn't have S3 permissions

**Solution:** Add S3 policy to IAM user (see Step 4 above)

---

## ✅ Success Checklist

When it's working, you should see:

**In Terminal:**
```
[S3 Upload] Environment check: { hasAccessKey: true, hasSecretKey: true, ... }
Successfully uploaded to S3: https://invoice-parser-images.s3.eu-west-2.amazonaws.com/uploads/...
```

**In Browser:**
- No errors in console
- Processing steps complete
- Invoice data extracted and displayed

---

## 🆘 Still Stuck?

### Quick Diagnosis Command

Check what env vars the server sees:

Create a test file: `app/actions/testEnv.ts`
```typescript
'use server';

export async function testEnvVars() {
  return {
    hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
    hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyLength: process.env.AWS_ACCESS_KEY_ID?.length || 0,
    secretKeyLength: process.env.AWS_SECRET_ACCESS_KEY?.length || 0,
  };
}
```

Call it from your page and log the results.

---

## 🎯 Most Likely Solution

Based on the signature error, **99% chance the issue is:**

1. ❌ Secret Access Key is incomplete or has extra characters
2. ❌ Secret Access Key wasn't copied correctly from AWS
3. ❌ Need to create fresh credentials

**Recommended:** Create NEW access credentials in AWS Console and update `.env.local` with the complete, correct values.

---

**Let me know what you see in the debug logs!** That will tell us exactly what's wrong. 🔍
