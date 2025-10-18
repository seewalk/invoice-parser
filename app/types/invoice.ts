/**
 * Shared Invoice Data Types
 * 
 * Types used across invoice processing components
 */

export interface InvoiceData {
  supplier: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  totalAmount: number;
  currency: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    category: string;
  }>;
  taxAmount: number;
  subtotal: number;
  confidence: number;
}
