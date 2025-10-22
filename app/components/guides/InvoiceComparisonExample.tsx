'use client';

import { memo } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

/**
 * Invoice data structure for comparison examples
 */
export interface InvoiceExampleData {
  // Header
  invoiceNumber: string;
  invoiceDate: string;
  dueDate?: string;
  
  // Business Info
  businessName: string;
  businessAddress: string;
  businessPhone?: string;
  businessEmail?: string;
  vatNumber?: string;
  companyNumber?: string;
  gasSafeNumber?: string;
  niceicNumber?: string;
  utr?: string; // For CIS
  
  // Client Info
  clientName: string;
  clientAddress?: string;
  clientVatNumber?: string;
  clientUtr?: string; // For CIS
  
  // Line Items
  lineItems: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
    vatRate?: string; // For display purposes
  }>;
  
  // Totals
  subtotal: number;
  vatAmount?: number;
  vatRate?: string;
  cisDeduction?: number;
  cisRate?: string;
  totalAmount: number;
  amountDue?: number; // After CIS deduction
  
  // Payment Info
  bankName?: string;
  accountNumber?: string;
  sortCode?: string;
  paymentTerms?: string;
  
  // Special notices
  reverseChargeNotice?: string;
  cisNotice?: string;
  notes?: string;
}

export interface ComparisonPoint {
  aspect: string;
  correct: string;
  incorrect: string;
  explanation: string;
}

interface InvoiceComparisonExampleProps {
  title: string;
  description: string;
  correctExample: InvoiceExampleData;
  incorrectExample: InvoiceExampleData;
  comparisonPoints: ComparisonPoint[];
  className?: string;
}

/**
 * InvoiceComparisonExample Component
 * 
 * Displays two invoice examples side-by-side (correct vs incorrect)
 * with annotations explaining the differences.
 * 
 * Responsive:
 * - Desktop: 2 columns (do's and don'ts side by side)
 * - Mobile: Stacked (do's first, then don'ts)
 */
function InvoiceComparisonExampleComponent({
  title,
  description,
  correctExample,
  incorrectExample,
  comparisonPoints,
  className = ''
}: InvoiceComparisonExampleProps) {
  
  /**
   * Render mini invoice preview
   */
  const renderInvoicePreview = (data: InvoiceExampleData, isCorrect: boolean) => {
    const borderColor = isCorrect ? 'border-green-300' : 'border-red-300';
    const bgColor = isCorrect ? 'bg-green-50' : 'bg-red-50';
    const headerBg = isCorrect ? 'bg-green-600' : 'bg-red-600';
    
    return (
      <div className={`bg-white rounded-lg shadow-lg border-2 ${borderColor} overflow-hidden`}>
        {/* Status Header */}
        <div className={`${headerBg} px-4 py-3 flex items-center gap-3`}>
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : (
            <XCircle className="w-6 h-6 text-white" />
          )}
          <span className="text-white font-bold text-lg">
            {isCorrect ? '✓ Correct Example' : '✗ Incorrect Example'}
          </span>
        </div>

        {/* Invoice Content */}
        <div className="p-6 space-y-4">
          {/* Header Section */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-slate-200">
            <div>
              <div className="text-lg font-bold text-slate-900">{data.businessName}</div>
              <div className="text-xs text-slate-600 whitespace-pre-line mt-1">
                {data.businessAddress}
              </div>
              {data.businessEmail && (
                <div className="text-xs text-slate-600 mt-1">{data.businessEmail}</div>
              )}
              {data.vatNumber && (
                <div className="text-xs text-slate-600 mt-1">
                  <span className="font-semibold">VAT:</span> {data.vatNumber}
                </div>
              )}
              {data.gasSafeNumber && (
                <div className="text-xs text-slate-600">
                  <span className="font-semibold">Gas Safe:</span> {data.gasSafeNumber}
                </div>
              )}
              {data.niceicNumber && (
                <div className="text-xs text-slate-600">
                  <span className="font-semibold">NICEIC:</span> {data.niceicNumber}
                </div>
              )}
              {data.utr && (
                <div className="text-xs text-slate-600">
                  <span className="font-semibold">UTR:</span> {data.utr}
                </div>
              )}
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600 mb-2">INVOICE</div>
              <div className="text-xs space-y-1">
                <div className="flex justify-end gap-2">
                  <span className="font-semibold">Invoice #:</span>
                  <span>{data.invoiceNumber}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <span className="font-semibold">Date:</span>
                  <span>{data.invoiceDate}</span>
                </div>
                {data.dueDate && (
                  <div className="flex justify-end gap-2">
                    <span className="font-semibold">Due:</span>
                    <span>{data.dueDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase mb-1">Bill To:</div>
            <div className="text-sm font-semibold text-slate-900">{data.clientName}</div>
            {data.clientAddress && (
              <div className="text-xs text-slate-600 whitespace-pre-line">{data.clientAddress}</div>
            )}
            {data.clientVatNumber && (
              <div className="text-xs text-slate-600 mt-1">
                <span className="font-semibold">VAT:</span> {data.clientVatNumber}
              </div>
            )}
            {data.clientUtr && (
              <div className="text-xs text-slate-600">
                <span className="font-semibold">UTR:</span> {data.clientUtr}
              </div>
            )}
          </div>

          {/* Line Items */}
          <div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="text-left py-2 font-bold text-slate-700">Description</th>
                  <th className="text-right py-2 font-bold text-slate-700">Qty</th>
                  <th className="text-right py-2 font-bold text-slate-700">Rate</th>
                  <th className="text-right py-2 font-bold text-slate-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.lineItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    <td className="py-2 text-slate-900">
                      {item.description}
                      {item.vatRate && (
                        <span className="text-slate-500 ml-2">({item.vatRate})</span>
                      )}
                    </td>
                    <td className="text-right py-2">{item.quantity}</td>
                    <td className="text-right py-2">£{item.rate.toFixed(2)}</td>
                    <td className="text-right py-2 font-semibold">£{item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-2/3 space-y-1 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-700">Subtotal:</span>
                <span className="font-semibold">£{data.subtotal.toFixed(2)}</span>
              </div>
              
              {data.vatAmount !== undefined && data.vatAmount > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-700">VAT {data.vatRate || '(20%)'}:</span>
                  <span className="font-semibold">£{data.vatAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between py-2 border-t border-slate-300 font-bold">
                <span>Total:</span>
                <span className="text-indigo-600">£{data.totalAmount.toFixed(2)}</span>
              </div>

              {data.cisDeduction !== undefined && data.cisDeduction > 0 && (
                <>
                  <div className="flex justify-between py-1 text-red-600">
                    <span>CIS Deduction {data.cisRate || '(20%)'}:</span>
                    <span className="font-semibold">-£{data.cisDeduction.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t-2 border-green-300 font-bold text-green-700">
                    <span>Amount Due:</span>
                    <span>£{(data.amountDue || 0).toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Special Notices */}
          {data.reverseChargeNotice && (
            <div className={`${bgColor} border ${borderColor} rounded p-2 text-xs`}>
              <div className="font-bold text-slate-900 mb-1">Reverse Charge Notice:</div>
              <div className="text-slate-700">{data.reverseChargeNotice}</div>
            </div>
          )}

          {data.cisNotice && (
            <div className={`${bgColor} border ${borderColor} rounded p-2 text-xs`}>
              <div className="font-bold text-slate-900 mb-1">CIS Notice:</div>
              <div className="text-slate-700">{data.cisNotice}</div>
            </div>
          )}

          {/* Payment Info */}
          {(data.bankName || data.paymentTerms) && (
            <div className="bg-slate-50 rounded p-3 text-xs">
              <div className="font-bold text-slate-700 mb-2">Payment Information</div>
              {data.bankName && (
                <div className="space-y-1">
                  <div><span className="font-semibold">Bank:</span> {data.bankName}</div>
                  {data.accountNumber && (
                    <div><span className="font-semibold">Account:</span> {data.accountNumber}</div>
                  )}
                  {data.sortCode && (
                    <div><span className="font-semibold">Sort Code:</span> {data.sortCode}</div>
                  )}
                </div>
              )}
              {data.paymentTerms && (
                <div className="mt-2">
                  <span className="font-semibold">Terms:</span> {data.paymentTerms}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`my-12 ${className}`}>
      {/* Title and Description */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
          <Info className="w-7 h-7 text-blue-600" />
          {title}
        </h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Side-by-Side Invoice Previews */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Correct Example */}
        <div>
          {renderInvoicePreview(correctExample, true)}
        </div>

        {/* Incorrect Example */}
        <div>
          {renderInvoicePreview(incorrectExample, false)}
        </div>
      </div>

      {/* Comparison Points */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
        <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-blue-600" />
          Key Differences Explained
        </h4>
        
        <div className="space-y-6">
          {comparisonPoints.map((point, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-blue-200">
              <div className="font-bold text-slate-900 text-lg mb-3">
                {idx + 1}. {point.aspect}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Correct */}
                <div className="bg-green-50 border-l-4 border-green-500 rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="font-semibold text-green-900">Correct:</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{point.correct}</p>
                </div>

                {/* Incorrect */}
                <div className="bg-red-50 border-l-4 border-red-500 rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="font-semibold text-red-900">Incorrect:</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{point.incorrect}</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 rounded p-4 border border-blue-200">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 mb-1">Why this matters:</div>
                    <p className="text-sm text-slate-700 leading-relaxed">{point.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 */
export const InvoiceComparisonExample = memo(InvoiceComparisonExampleComponent);