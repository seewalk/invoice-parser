/**
 * Server Action: Upload File to S3
 * 
 * Securely uploads files to S3 using server-side AWS credentials
 * Never exposes credentials to the client
 * 
 * Benefits:
 * - Secure: Credentials never sent to browser
 * - Reliable: No CORS or signature issues
 * - Smaller bundle: AWS SDK not in client code
 */

'use server';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

interface UploadResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export async function uploadToS3(fileData: {
  fileBuffer: ArrayBuffer;
  fileName: string;
  contentType: string;
}): Promise<UploadResult> {
  try {
    // Get AWS credentials from environment (server-side only - no NEXT_PUBLIC_)
    const AWS_REGION = process.env.AWS_REGION || 'eu-west-2';
    const S3_BUCKET = process.env.AWS_S3_BUCKET || 'invoice-parser-images';
    const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
    const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

    // Check if credentials are configured
    if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY) {
      console.warn('AWS credentials not configured, using fallback image');
      return {
        success: true,
        imageUrl: 'https://invoice-parser-images.s3.eu-west-2.amazonaws.com/fakeinvoice2.jpg'
      };
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const safeFilename = fileData.fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const s3Key = `uploads/${new Date().toISOString().split('T')[0]}/${timestamp}-${safeFilename}`;

    // Initialize S3 client (server-side)
    const s3Client = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
      },
    });

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
      Body: new Uint8Array(fileData.fileBuffer),
      ContentType: fileData.contentType,
    });

    await s3Client.send(uploadCommand);

    // Construct the S3 URL
    const imageUrl = `https://${S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${s3Key}`;
    
    console.log('Successfully uploaded to S3:', imageUrl);

    return {
      success: true,
      imageUrl
    };

  } catch (error) {
    console.error('S3 upload error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file'
    };
  }
}
