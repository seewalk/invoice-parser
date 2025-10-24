'use client';

import { memo, useState } from 'react';
import { PageState } from '@/app/types/invoice';
import { ChevronDown, ChevronUp, RefreshCw, Copy, CheckCircle } from 'lucide-react';

interface PageResultCardProps {
  page: PageState;
  onReparse: () => void;
}

/**
 * PageResultCard Component
 * 
 * Displays parsed result for individual page
 * 
 * Features:
 * - Collapsible/expandable accordion
 * - Shows key invoice data fields
 * - Line items table
 * - Confidence score
 * - Re-parse button
 * - Copy JSON button
 */
export const PageResultCard = memo(function PageResultCard({
  page,
  onReparse
}: PageResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!page.result) return null;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(page.result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCurrency = (amount: number, currency: string = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              📄 Page {page.pageNumber} Results
            </h3>
            <p className="text-sm text-gray-600">
              {page.result.lineItems.length} line items • {formatCurrency(page.result.totalAmount, page.result.currency)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onReparse();
            }}
            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
            aria-label="Re-parse page"
            title="Re-parse this page"
          >
            <RefreshCw className="w-4 h-4 text-green-700" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-green-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-green-700" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-4">
          {/* Invoice Header */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Supplier</label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{page.result.supplier}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Invoice Number</label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{page.result.invoiceNumber}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Date</label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{page.result.date}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Due Date</label>
              <p className="text-sm font-semibold text-gray-900 mt-1">{page.result.dueDate}</p>
            </div>
          </div>

          {/* Line Items */}
          {page.result.lineItems.length > 0 && (
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">
                Line Items ({page.result.lineItems.length})
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Description</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-700">Qty</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-700">Unit Price</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {page.result.lineItems.slice(0, 5).map((item, idx) => (
                         <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-900">{item.description}</td>
                          <td className="px-4 py-2 text-right text-gray-700">{item.quantity}</td>
                          <td className="px-4 py-2 text-right text-gray-700">
                            {formatCurrency(item.unitPrice, page.result?.currency || 'GBP')}
                          </td>
                          <td className="px-4 py-2 text-right font-medium text-gray-900">
                            {formatCurrency(item.totalPrice, page.result?.currency || 'GBP')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {page.result.lineItems.length > 5 && (
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 text-center">
                    ... and {page.result.lineItems.length - 5} more items
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(page.result.subtotal, page.result.currency)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(page.result.taxAmount, page.result.currency)}
              </span>
            </div>
            <div className="flex justify-between text-base border-t border-gray-300 pt-2">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-gray-900 text-lg">
                {formatCurrency(page.result.totalAmount, page.result.currency)}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>✅ Confidence: {Math.round(page.result.confidence * 100)}%</span>
              {page.parsedAt && (
                <span>⏱️ Parsed: {new Date(page.parsedAt).toLocaleString()}</span>
              )}
            </div>
            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3 h-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy JSON
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});