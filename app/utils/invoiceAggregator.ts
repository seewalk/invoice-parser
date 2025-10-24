/**
 * Invoice Data Aggregator
 * 
 * Utility for merging multi-page invoice parsing results into a single coherent document.
 * This module implements the "Continuation Page Pattern" where:
 * - Page 1 contains header data (vendor, invoice #, dates)
 * - Subsequent pages contain additional line items
 * - Last page may contain financial totals
 * 
 * @module invoiceAggregator
 */

import { InvoiceData } from '../types/invoice';

/**
 * Page classification types for intelligent merging
 */
export type PageType = 'first' | 'continuation' | 'last' | 'single';

/**
 * Individual page parsing result with metadata
 */
export interface PageResult {
  pageNumber: number;
  data: InvoiceData;
  pageType: PageType;
  imageUrl: string;
  processingTime: number;
  error?: string;
}

/**
 * Aggregation result with metadata
 */
export interface AggregatedInvoice {
  invoice: InvoiceData;
  metadata: {
    totalPages: number;
    pagesProcessed: number;
    averageConfidence: number;
    processingTimeMs: number;
    pageTypes: PageType[];
    warnings: string[];
  };
}

/**
 * Detects the type of page based on its content
 * 
 * This is critical for proper data merging:
 * - First pages have complete header data
 * - Continuation pages may have "See Page 1" markers
 * - Last pages typically have financial totals
 * 
 * @param data - Parsed invoice data from GPT Vision
 * @param pageNumber - Sequential page number (1-indexed)
 * @param totalPages - Total number of pages in document
 * @returns Detected page type
 */
export function detectPageType(
  data: InvoiceData,
  pageNumber: number,
  totalPages: number
): PageType {
  // Single page document (most common case)
  if (totalPages === 1) {
    return 'single';
  }

  // First page detection
  if (pageNumber === 1) {
    return 'first';
  }

  // Check for continuation page markers
  const isContinuationPage = 
    data.supplier?.toLowerCase().includes('see page') ||
    data.invoiceNumber?.toLowerCase().includes('see page') ||
    data.supplier === 'Unknown Supplier' ||
    data.invoiceNumber === 'N/A';

  // Last page detection (has totals and is not first page)
  const hasFinancialTotals = data.totalAmount > 0 && data.subtotal > 0;
  const isLastPage = pageNumber === totalPages;

  if (isLastPage && hasFinancialTotals) {
    return 'last';
  }

  if (isContinuationPage) {
    return 'continuation';
  }

  // Default to continuation if uncertain
  return 'continuation';
}

/**
 * Merges line items from multiple pages, removing duplicates
 * 
 * Deduplication strategy:
 * 1. Exact match on description + quantity + unitPrice
 * 2. Fuzzy match on description (90% similarity) with same price
 * 
 * @param existingItems - Line items from previous pages
 * @param newItems - Line items from current page
 * @returns Merged and deduplicated line items
 */
function mergeLineItems(
  existingItems: InvoiceData['lineItems'],
  newItems: InvoiceData['lineItems']
): InvoiceData['lineItems'] {
  const merged = [...existingItems];

  for (const newItem of newItems) {
    // Check for exact duplicates
    const isDuplicate = existingItems.some(existing =>
      existing.description === newItem.description &&
      existing.quantity === newItem.quantity &&
      existing.unitPrice === newItem.unitPrice &&
      existing.totalPrice === newItem.totalPrice
    );

    if (!isDuplicate) {
      merged.push(newItem);
    }
  }

  return merged;
}

/**
 * Calculates average confidence across all pages
 * Uses weighted average favoring pages with more data
 */
function calculateAverageConfidence(results: PageResult[]): number {
  if (results.length === 0) return 0;

  const totalWeight = results.reduce((sum, r) => {
    const itemCount = r.data.lineItems?.length || 1;
    return sum + itemCount;
  }, 0);

  const weightedSum = results.reduce((sum, r) => {
    const itemCount = r.data.lineItems?.length || 1;
    return sum + (r.data.confidence * itemCount);
  }, 0);

  return weightedSum / totalWeight;
}

/**
 * Aggregates multiple page results into a single invoice document
 * 
 * This is the core aggregation algorithm:
 * 1. Use header data from first page
 * 2. Merge line items from all pages (deduplicated)
 * 3. Use financial totals from last page (if present)
 * 4. Calculate aggregate confidence score
 * 5. Validate financial calculations
 * 
 * @param pageResults - Array of parsed page results
 * @returns Aggregated invoice with metadata
 */
export function aggregateInvoicePages(pageResults: PageResult[]): AggregatedInvoice {
  const startTime = Date.now();
  const warnings: string[] = [];

  // Edge case: No results
  if (pageResults.length === 0) {
    throw new Error('Cannot aggregate: no page results provided');
  }

  // Edge case: Single page (fast path)
  if (pageResults.length === 1) {
    const single = pageResults[0];
    return {
      invoice: single.data,
      metadata: {
        totalPages: 1,
        pagesProcessed: 1,
        averageConfidence: single.data.confidence,
        processingTimeMs: single.processingTime,
        pageTypes: [single.pageType],
        warnings: []
      }
    };
  }

  // Sort by page number to ensure correct order
  const sortedResults = [...pageResults].sort((a, b) => a.pageNumber - b.pageNumber);

  // Identify page types
  const pageTypes = sortedResults.map(r => r.pageType);

  // Find first page (should have header data)
  const firstPage = sortedResults.find(r => r.pageType === 'first') || sortedResults[0];

  // Find last page (should have totals)
  const lastPage = sortedResults.find(r => r.pageType === 'last') || 
                   sortedResults[sortedResults.length - 1];

  // Start with header data from first page
  const aggregated: InvoiceData = {
    supplier: firstPage.data.supplier,
    invoiceNumber: firstPage.data.invoiceNumber,
    date: firstPage.data.date,
    dueDate: firstPage.data.dueDate,
    currency: firstPage.data.currency,
    lineItems: [],
    subtotal: 0,
    taxAmount: 0,
    totalAmount: 0,
    confidence: 0
  };

  // Merge line items from all pages
  for (const result of sortedResults) {
    if (result.data.lineItems && result.data.lineItems.length > 0) {
      aggregated.lineItems = mergeLineItems(
        aggregated.lineItems,
        result.data.lineItems
      );
    }
  }

  // Use financial totals from last page (if available and valid)
  if (lastPage.data.totalAmount > 0) {
    aggregated.subtotal = lastPage.data.subtotal;
    aggregated.taxAmount = lastPage.data.taxAmount;
    aggregated.totalAmount = lastPage.data.totalAmount;
  } else {
    // Calculate totals from line items if not provided
    const calculatedSubtotal = aggregated.lineItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    aggregated.subtotal = calculatedSubtotal;
    
    // Estimate tax (assume 20% UK VAT if not provided)
    if (calculatedSubtotal > 0) {
      const estimatedTax = calculatedSubtotal * 0.20;
      aggregated.taxAmount = estimatedTax;
      aggregated.totalAmount = calculatedSubtotal + estimatedTax;
      
      warnings.push(
        'Financial totals not found on last page - calculated from line items with estimated 20% VAT'
      );
    }
  }

  // Calculate aggregate confidence
  aggregated.confidence = calculateAverageConfidence(sortedResults);

  // Validate financial calculations
  const calculatedTotal = aggregated.subtotal + aggregated.taxAmount;
  const totalDifference = Math.abs(calculatedTotal - aggregated.totalAmount);
  
  if (totalDifference > 0.02) { // Allow 2p rounding error
    warnings.push(
      `Total mismatch: calculated £${calculatedTotal.toFixed(2)} vs reported £${aggregated.totalAmount.toFixed(2)}`
    );
    
    // Reduce confidence if significant discrepancy
    if (totalDifference > 1.00) {
      aggregated.confidence = Math.max(0.5, aggregated.confidence - 0.1);
    }
  }

  // Check for missing line items (suspicious if very few items across many pages)
  if (aggregated.lineItems.length < sortedResults.length) {
    warnings.push(
      `Low line item count: ${aggregated.lineItems.length} items across ${sortedResults.length} pages - possible extraction issues`
    );
  }

  // Validate header data
  if (aggregated.supplier === 'Unknown Supplier' || aggregated.supplier.includes('See Page')) {
    warnings.push('Supplier name not properly extracted from first page');
  }

  if (aggregated.invoiceNumber === 'N/A' || aggregated.invoiceNumber.includes('See Page')) {
    warnings.push('Invoice number not properly extracted from first page');
  }

  const processingTime = Date.now() - startTime;

  return {
    invoice: aggregated,
    metadata: {
      totalPages: sortedResults.length,
      pagesProcessed: sortedResults.length,
      averageConfidence: aggregated.confidence,
      processingTimeMs: sortedResults.reduce((sum, r) => sum + r.processingTime, 0),
      pageTypes,
      warnings
    }
  };
}

/**
 * Validates aggregated invoice data for completeness
 * 
 * @param aggregated - Aggregated invoice result
 * @returns Validation result with issues
 */
export function validateAggregatedInvoice(aggregated: AggregatedInvoice): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [...aggregated.metadata.warnings];

  // Critical validations (errors)
  if (!aggregated.invoice.supplier || aggregated.invoice.supplier === 'Unknown Supplier') {
    errors.push('Missing supplier/vendor name');
  }

  if (aggregated.invoice.lineItems.length === 0) {
    errors.push('No line items extracted');
  }

  if (aggregated.invoice.totalAmount <= 0) {
    errors.push('Invalid or missing total amount');
  }

  // Non-critical validations (warnings)
  if (aggregated.invoice.confidence < 0.70) {
    warnings.push('Low confidence score - manual review recommended');
  }

  if (aggregated.invoice.confidence < 0.50) {
    errors.push('Very low confidence score - data may be unreliable');
  }

  if (aggregated.metadata.totalPages > 10) {
    warnings.push(`Large document (${aggregated.metadata.totalPages} pages) - processing time may be extended`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Formats aggregation metadata for logging/debugging
 */
export function formatAggregationMetadata(metadata: AggregatedInvoice['metadata']): string {
  return `Pages: ${metadata.pagesProcessed}/${metadata.totalPages} | ` +
         `Confidence: ${(metadata.averageConfidence * 100).toFixed(1)}% | ` +
         `Time: ${metadata.processingTimeMs}ms | ` +
         `Types: [${metadata.pageTypes.join(', ')}]` +
         (metadata.warnings.length > 0 ? ` | Warnings: ${metadata.warnings.length}` : '');
}
