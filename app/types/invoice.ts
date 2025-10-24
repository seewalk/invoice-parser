/**
 * Shared Invoice Data Types
 * 
 * Types used across invoice processing components
 */

/**
 * Line item in an invoice
 */
export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

/**
 * Complete invoice data structure
 */
export interface InvoiceData {
  supplier: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  totalAmount: number;
  currency: string;
  lineItems: LineItem[];
  taxAmount: number;
  subtotal: number;
  confidence: number;
}

/**
 * State for individual page in multi-page PDF parsing
 */
export interface PageState {
  /** Page number (1-indexed for display) */
  pageNumber: number;
  
  /** Original converted JPEG blob */
  blob: Blob;
  
  /** Local blob URL for thumbnail preview */
  previewUrl: string;
  
  /** S3 URL after upload (null if not yet uploaded) */
  uploadedUrl: string | null;
  
  /** Current parsing status */
  status: 'pending' | 'uploading' | 'parsing' | 'complete' | 'error';
  
  /** Parsed invoice data for this page */
  result: InvoiceData | null;
  
  /** Error message if parsing failed */
  error: string | null;
  
  /** ISO timestamp when page was successfully parsed */
  parsedAt: string | null;
  
  /** Size of converted image (for debugging) */
  imageSize: number;
}

/**
 * Page completeness analysis result
 */
export interface PageAnalysis {
  isComplete: boolean;
  confidence: number;
  suggestion: string;
  type: 'info' | 'warning' | 'success';
  missingData?: string[];
}
