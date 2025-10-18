'use client';

import { memo } from 'react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';

interface TemplatePreviewProps {
  template: InvoiceTemplate;
  /**
   * Scale factor for miniature preview (e.g., 0.35 for 35% size)
   * If not provided, renders at full size
   */
  scale?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * TemplatePreview Component
 * 
 * Renders a full invoice preview with all template data.
 * Can be rendered at different scales for miniature/full previews.
 * 
 * Optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Pure presentation component with no side effects
 * - No external API calls or heavy computations
 */
function TemplatePreviewComponent({ template, scale, className = '' }: TemplatePreviewProps) {
  const sample = template.sampleData;
  
  const containerClass = scale 
    ? `scale-[${scale}] origin-top-left w-[${(100 / scale)}%] h-[${(100 / scale)}%]`
    : '';

  return (
    <div 
      className={`${containerClass} ${className}`}
      style={scale ? { 
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${(100 / scale)}%`,
        height: `${(100 / scale)}%`
      } : undefined}
    >
      <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-200 p-8 md:p-12">
        {/* Invoice Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b-2 border-slate-200">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {sample.businessName}
            </h2>
            <div className="text-sm text-slate-600 whitespace-pre-line">
              {sample.businessAddress}
            </div>
            {sample.businessPhone && (
              <div className="text-sm text-slate-600 mt-2">
                Tel: {sample.businessPhone}
              </div>
            )}
            {sample.businessEmail && (
              <div className="text-sm text-slate-600">
                Email: {sample.businessEmail}
              </div>
            )}
            {sample.vatNumber && (
              <div className="text-sm text-slate-600 mt-2">
                VAT: {sample.vatNumber}
              </div>
            )}
          </div>
          
          <div className="text-right">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">INVOICE</h1>
            <div className="space-y-2 text-sm">
              <div className="flex justify-end gap-4">
                <span className="font-semibold text-slate-700">Invoice #:</span>
                <span className="text-slate-900">{sample.invoiceNumber}</span>
              </div>
              <div className="flex justify-end gap-4">
                <span className="font-semibold text-slate-700">Date:</span>
                <span className="text-slate-900">{sample.invoiceDate}</span>
              </div>
              {sample.dueDate && (
                <div className="flex justify-end gap-4">
                  <span className="font-semibold text-slate-700">Due Date:</span>
                  <span className="text-slate-900">{sample.dueDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-700 uppercase mb-2">Bill To:</h3>
          <div className="text-slate-900 font-semibold">{sample.clientName}</div>
          {sample.clientAddress && (
            <div className="text-sm text-slate-600 whitespace-pre-line mt-1">
              {sample.clientAddress}
            </div>
          )}
        </div>

        {/* Line Items Table */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300">
                <th className="text-left py-3 px-2 text-sm font-bold text-slate-700">Description</th>
                <th className="text-right py-3 px-2 text-sm font-bold text-slate-700">Qty</th>
                <th className="text-right py-3 px-2 text-sm font-bold text-slate-700">Rate</th>
                <th className="text-right py-3 px-2 text-sm font-bold text-slate-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sample.lineItems?.map((item: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="py-3 px-2 text-sm text-slate-900">{item.description}</td>
                  <td className="text-right py-3 px-2 text-sm text-slate-900">{item.quantity}</td>
                  <td className="text-right py-3 px-2 text-sm text-slate-900">
                    £{typeof item.rate === 'number' ? item.rate.toFixed(2) : item.rate}
                  </td>
                  <td className="text-right py-3 px-2 text-sm text-slate-900 font-semibold">
                    £{typeof item.amount === 'number' ? item.amount.toFixed(2) : item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between py-2 text-sm">
              <span className="text-slate-700">Subtotal:</span>
              <span className="text-slate-900 font-semibold">
                £{typeof sample.subtotal === 'number' ? sample.subtotal.toFixed(2) : sample.subtotal}
              </span>
            </div>
            
            {sample.serviceCharge && (
              <div className="flex justify-between py-2 text-sm">
                <span className="text-slate-700">Service Charge:</span>
                <span className="text-slate-900 font-semibold">
                  £{typeof sample.serviceCharge === 'number' ? sample.serviceCharge.toFixed(2) : sample.serviceCharge}
                </span>
              </div>
            )}
            
            {sample.vatAmount && sample.vatAmount > 0 && (
              <div className="flex justify-between py-2 text-sm">
                <span className="text-slate-700">VAT (20%):</span>
                <span className="text-slate-900 font-semibold">
                  £{typeof sample.vatAmount === 'number' ? sample.vatAmount.toFixed(2) : sample.vatAmount}
                </span>
              </div>
            )}
            
            <div className="flex justify-between py-3 border-t-2 border-slate-300 text-lg">
              <span className="font-bold text-slate-900">Total:</span>
              <span className="font-bold text-indigo-600">
                £{typeof sample.totalAmount === 'number' ? sample.totalAmount.toFixed(2) : sample.totalAmount}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        {(sample.bankName || sample.paymentTerms) && (
          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <h3 className="text-sm font-bold text-slate-700 uppercase mb-3">Payment Information</h3>
            {sample.bankName && (
              <div className="space-y-1 text-sm mb-4">
                <div className="flex gap-4">
                  <span className="font-semibold text-slate-700 min-w-[120px]">Bank:</span>
                  <span className="text-slate-900">{sample.bankName}</span>
                </div>
                {sample.accountNumber && (
                  <div className="flex gap-4">
                    <span className="font-semibold text-slate-700 min-w-[120px]">Account Number:</span>
                    <span className="text-slate-900">{sample.accountNumber}</span>
                  </div>
                )}
                {sample.sortCode && (
                  <div className="flex gap-4">
                    <span className="font-semibold text-slate-700 min-w-[120px]">Sort Code:</span>
                    <span className="text-slate-900">{sample.sortCode}</span>
                  </div>
                )}
              </div>
            )}
            {sample.paymentTerms && (
              <div className="text-sm text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-700">Payment Terms:</span> {sample.paymentTerms}
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        {sample.notes && (
          <div className="text-sm text-slate-600 italic leading-relaxed">
            {sample.notes}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Memoized export to prevent unnecessary re-renders
 * Will only re-render if template, scale, or className props change
 */
export const TemplatePreview = memo(TemplatePreviewComponent);
