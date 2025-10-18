/**
 * InvoiceDataDisplay Component
 * 
 * Displays extracted invoice data in a structured format
 * Shows supplier info, line items, and totals
 * 
 * Features:
 * - Responsive grid layout for header info
 * - Scrollable line items list
 * - Clear totals section with subtotal/tax/total
 * - Memoized to prevent unnecessary re-renders
 */

'use client';

import { memo } from 'react';
import { InvoiceData } from '../../types/invoice';

interface InvoiceDataDisplayProps {
  data: InvoiceData;
}

function InvoiceDataDisplayComponent({ data }: InvoiceDataDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Supplier</p>
          <p className="font-semibold text-gray-900">{data.supplier}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Invoice Number</p>
          <p className="font-semibold text-gray-900">{data.invoiceNumber}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Date</p>
          <p className="font-semibold text-gray-900">{data.date}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Due Date</p>
          <p className="font-semibold text-gray-900">{data.dueDate}</p>
        </div>
      </div>

      {/* Line Items */}
      <div className="mt-6">
        <h4 className="text-sm font-bold text-gray-700 mb-3">
          Line Items ({data.lineItems.length})
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {data.lineItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-gray-900 text-sm">
                  {item.description}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  £{item.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <span>Qty: {item.quantity}</span>
                <span>@£{item.unitPrice.toFixed(2)}</span>
                <span className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold">£{data.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax:</span>
          <span className="font-semibold">£{data.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
          <span>Total:</span>
          <span className="text-primary-600">£{data.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export const InvoiceDataDisplay = memo(InvoiceDataDisplayComponent);
