# 🔧 S3 Upload Setup Guide

## 📋 Overview

Your API expects invoice images to be uploaded to S3 first, then the S3 URL is sent to the Lambda function.

**Current Flow:**
```
User uploads file → Frontend uploads to S3 → Get S3 URL → Send URL to Lambda → Get results
```

**API Expects:**
```json
{
  "imageUrl": "https://invoice-parser-images.s3.eu-west-2.amazonaws.com/filename.jpg"
}
```

---

## 🚧 Current Implementation (Temporary)

**Status:** Currently using test image URL for demo purposes

The parser is currently hardcoded to use:
```
https://invoice-parser-images.s3.eu-west-2.amazonaws.com/fakeinvoice2.jpg
```

This allows the frontend to work and demonstrate the full flow, but **all uploads will process the same test invoice**.

---

## ✅ Production Solution Options

### **Option 1: Direct S3 Upload (Recommended)**

#### **1. Create Pre-Signed Upload URLs**

Add a new Lambda function to generate pre-signed S3 URLs:

```python
# Lambda: generate-upload-url
import boto3
import json
from datetime import datetime

s3_client = boto3.client('s3')
BUCKET_NAME = 'invoice-parser-images'

def lambda_handler(event, context):
    # Get filename from request
    filename = event.get('filename', f'invoice-{datetime.now().timestamp()}.jpg')
    
    # Generate pre-signed POST URL
    response = s3_client.generate_presigned_post(
        Bucket=BUCKET_NAME,
        Key=filename,
        ExpiresIn=300  # 5 minutes
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'uploadUrl': response['url'],
            'fields': response['fields'],
            'fileUrl': f'https://{BUCKET_NAME}.s3.eu-west-2.amazonaws.com/{filename}'
        })
    }
```

#### **2. Update Frontend to Use Pre-Signed URLs**

```typescript
// Step 1: Get upload URL
const getUploadUrl = async (filename: string) => {
  const response = await fetch('YOUR_API/generate-upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename }),
  });
  return response.json();
};

// Step 2: Upload to S3
const uploadToS3 = async (file: File, uploadData: any) => {
  const formData = new FormData();
  Object.keys(uploadData.fields).forEach(key => {
    formData.append(key, uploadData.fields[key]);
  });
  formData.append('file', file);

  await fetch(uploadData.uploadUrl, {
    method: 'POST',
    body: formData,
  });
  
  return uploadData.fileUrl;
};

// Step 3: Process invoice
const processInvoice = async () => {
  // Get upload URL
  const uploadData = await getUploadUrl(selectedFile.name);
  
  // Upload to S3
  const imageUrl = await uploadToS3(selectedFile, uploadData);
  
  // Call your parser API
  const response = await fetch(
    'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    }
  );
  
  const result = await response.json();
  // ... handle result
};
```

---

### **Option 2: API Gateway Binary Support**

Configure API Gateway to accept binary uploads:

#### **1. Enable Binary Media Types in API Gateway**
- Go to API Gateway console
- Select your API
- Settings → Binary Media Types
- Add: `image/*`, `application/pdf`

#### **2. Update Lambda to Handle Binary**

```python
import base64
import boto3

s3_client = boto3.client('s3')

def lambda_handler(event, context):
    # Check if binary upload
    if event.get('isBase64Encoded'):
        # Decode binary data
        file_content = base64.b64decode(event['body'])
        
        # Upload to S3
        filename = f'invoice-{datetime.now().timestamp()}.jpg'
        s3_client.put_object(
            Bucket='invoice-parser-images',
            Key=filename,
            Body=file_content
        )
        
        image_url = f'https://invoice-parser-images.s3.eu-west-2.amazonaws.com/{filename}'
    else:
        # JSON with imageUrl
        body = json.loads(event['body'])
        image_url = body['imageUrl']
    
    # Process invoice with image_url
    # ... your existing processing code
```

#### **3. Update Frontend**

```typescript
const response = await fetch(
  'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: selectedFile,
  }
);
```

---

### **Option 3: Base64 Encoding (Simple but Limited)**

**Pros:** No S3 pre-signed URLs needed
**Cons:** 6MB Lambda payload limit, slower

```typescript
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const processInvoice = async () => {
  const base64Image = await fileToBase64(selectedFile);
  
  const response = await fetch(
    'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        imageData: base64Image,
        filename: selectedFile.name 
      }),
    }
  );
};
```

**Lambda handler:**
```python
def lambda_handler(event, context):
    body = json.loads(event['body'])
    
    if 'imageData' in body:
        # Upload base64 to S3
        image_data = base64.b64decode(body['imageData'].split(',')[1])
        filename = body.get('filename', 'invoice.jpg')
        
        s3_client.put_object(
            Bucket='invoice-parser-images',
            Key=filename,
            Body=image_data
        )
        
        image_url = f'https://invoice-parser-images.s3.eu-west-2.amazonaws.com/{filename}'
    else:
        image_url = body['imageUrl']
    
    # Process invoice
```

---

## 🎯 Recommended Implementation

**For MVP/Production: Use Option 1 (Pre-Signed URLs)**

### **Why?**
- ✅ Most secure (S3 handles upload, not Lambda)
- ✅ No file size limits
- ✅ Fast uploads (direct to S3)
- ✅ Standard AWS pattern
- ✅ Scalable

### **Implementation Steps:**

1. **Create Upload URL Lambda**
   ```bash
   # Create new Lambda function
   # Name: invoice-parser-upload-url
   # Runtime: Python 3.11
   # Add S3 permissions
   ```

2. **Add API Gateway Endpoint**
   ```
   POST /generate-upload-url
   → Lambda: invoice-parser-upload-url
   → Enable CORS
   ```

3. **Update Frontend**
   - Add upload URL generation call
   - Upload file to S3 using pre-signed POST
   - Send S3 URL to parser Lambda

4. **Test Flow**
   ```
   User selects file
   → Get upload URL from API
   → Upload to S3 directly
   → Send S3 URL to parser
   → Display results
   ```

---

## 🚀 Quick Implementation (Copy-Paste Ready)

### **1. Lambda Function (generate-upload-url)**

```python
import boto3
import json
import uuid
from datetime import datetime

s3_client = boto3.client('s3')
BUCKET_NAME = 'invoice-parser-images'
REGION = 'eu-west-2'

def lambda_handler(event, context):
    try:
        # Parse request
        body = json.loads(event.get('body', '{}'))
        filename = body.get('filename', f'invoice-{uuid.uuid4()}.jpg')
        
        # Clean filename
        safe_filename = filename.replace(' ', '_')
        key = f'uploads/{datetime.now().strftime("%Y/%m/%d")}/{safe_filename}'
        
        # Generate pre-signed POST
        response = s3_client.generate_presigned_post(
            Bucket=BUCKET_NAME,
            Key=key,
            ExpiresIn=300,  # 5 minutes
            Conditions=[
                ['content-length-range', 1, 10485760]  # 1 byte to 10MB
            ]
        )
        
        file_url = f'https://{BUCKET_NAME}.s3.{REGION}.amazonaws.com/{key}'
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'uploadUrl': response['url'],
                'fields': response['fields'],
                'fileUrl': file_url,
                'key': key
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
```

### **2. Frontend Implementation**

Replace the `processInvoice` function in `/app/parser/page.tsx`:

```typescript
const processInvoice = useCallback(async () => {
  if (!selectedFile) return;

  setProcessing(true);
  setError(null);
  setCurrentStep('upload');

  try {
    // Step 1: Get pre-signed upload URL
    setCurrentStep('upload');
    
    const uploadUrlResponse = await fetch(
      'YOUR_API_GATEWAY_URL/generate-upload-url',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: selectedFile.name }),
      }
    );
    
    if (!uploadUrlResponse.ok) {
      throw new Error('Failed to get upload URL');
    }
    
    const uploadData = await uploadUrlResponse.json();
    
    // Step 2: Upload file to S3
    const formData = new FormData();
    Object.keys(uploadData.fields).forEach(key => {
      formData.append(key, uploadData.fields[key]);
    });
    formData.append('file', selectedFile);
    
    const s3Response = await fetch(uploadData.uploadUrl, {
      method: 'POST',
      body: formData,
    });
    
    if (!s3Response.ok) {
      throw new Error('Failed to upload file to S3');
    }
    
    // Step 3: Process invoice with S3 URL
    setCurrentStep('ocr');
    
    const parseResponse = await fetch(
      'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: uploadData.fileUrl }),
      }
    );
    
    const result = await parseResponse.json();
    
    // Step 4: Transform and display
    setCurrentStep('parsing');
    
    const invoiceData = {
      // ... your existing transformation code
    };
    
    setInvoiceData(invoiceData);
    setCurrentStep('complete');
    
  } catch (err) {
    console.error('Error:', err);
    setError(err.message);
    setCurrentStep('upload');
  } finally {
    setProcessing(false);
  }
}, [selectedFile]);
```

---

## ⚙️ IAM Permissions Required

### **For Upload URL Lambda:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::invoice-parser-images/*"
    }
  ]
}
```

### **S3 Bucket CORS Configuration:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["POST", "PUT"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

---

## 🧪 Testing

### **Test Upload URL Generation:**
```bash
curl -X POST https://YOUR_API/generate-upload-url \
  -H "Content-Type: application/json" \
  -d '{"filename": "test-invoice.pdf"}'
```

### **Test S3 Upload:**
Use the returned uploadUrl and fields to upload via curl or Postman

### **Test Full Flow:**
1. Get upload URL
2. Upload file to S3
3. Send S3 URL to parser
4. Verify results

---

## 📝 Current Status

**Temporary Implementation:**
- ✅ Frontend ready for S3 integration
- ✅ Using test image URL for demo
- ⏳ Need to implement upload URL Lambda
- ⏳ Need to add S3 upload step

**To Go Live:**
1. Deploy upload URL Lambda
2. Update frontend with new endpoint
3. Test full flow
4. Remove hardcoded test image URL

---

## 🎯 Summary

**Current:** Hardcoded test image URL  
**Next Step:** Implement pre-signed S3 uploads  
**Time Needed:** 1-2 hours  
**Complexity:** Medium  

**Quick Win:** Option 1 is production-ready and scalable!
