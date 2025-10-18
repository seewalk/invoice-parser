'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  Plus, 
  Trash2, 
  Eye,
  EyeOff,
  FileText,
  Building,
  User,
  Calendar,
  CreditCard,
  FileCheck,
  Printer
} from 'lucide-react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { generateInvoicePDF } from '@/app/lib/generateInvoicePDF';

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  // Business Info
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;

  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  poNumber: string;

  // Client Info
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;

  // Line Items
  lineItems: LineItem[];

  // Totals
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;

  // Payment Info
  paymentTerms: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
  iban: string;
  swiftCode: string;

  // Notes
  notes: string;
}

interface InvoiceGeneratorClientProps {
  template: InvoiceTemplate;
  industryName: string;
}

export default function InvoiceGeneratorClient({ 
  template, 
  industryName 
}: InvoiceGeneratorClientProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'business' | 'client' | 'items' | 'payment'>('business');

  // Initialize form data with template sample data
  const [formData, setFormData] = useState<InvoiceData>(() => {
    const sample = template.sampleData;
    return {
      businessName: sample.businessName || '',
      businessAddress: sample.businessAddress || '',
      businessEmail: sample.businessEmail || '',
      businessPhone: sample.businessPhone || '',
      invoiceNumber: sample.invoiceNumber || `INV-${Date.now()}`,
      invoiceDate: sample.invoiceDate || new Date().toISOString().split('T')[0],
      dueDate: sample.dueDate || '',
      poNumber: sample.poNumber || '',
      clientName: sample.clientName || '',
      clientAddress: sample.clientAddress || '',
      clientEmail: sample.clientEmail || '',
      clientPhone: sample.clientPhone || '',
      lineItems: sample.lineItems || [
        { description: '', quantity: 1, rate: 0, amount: 0 }
      ],
      subtotal: sample.subtotal || 0,
      taxRate: sample.taxRate || sample.vatRate || 20,
      taxAmount: sample.taxAmount || sample.vatAmount || 0,
      discountAmount: sample.discountAmount || 0,
      totalAmount: sample.totalAmount || 0,
      paymentTerms: sample.paymentTerms || 'Net 30',
      bankName: sample.bankName || '',
      accountNumber: sample.accountNumber || '',
      sortCode: sample.sortCode || '',
      iban: sample.iban || '',
      swiftCode: sample.swiftCode || '',
      notes: sample.notes || '',
    };
  });

  // Calculate totals whenever line items or tax rate changes
  useEffect(() => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const totalAmount = subtotal + taxAmount - formData.discountAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      totalAmount,
    }));
  }, [formData.lineItems, formData.taxRate, formData.discountAmount]);

  const updateField = (field: keyof InvoiceData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const removeLineItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index)
    }));
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    setFormData(prev => {
      const newLineItems = [...prev.lineItems];
      newLineItems[index] = { ...newLineItems[index], [field]: value };
      
      // Calculate amount
      if (field === 'quantity' || field === 'rate') {
        newLineItems[index].amount = newLineItems[index].quantity * newLineItems[index].rate;
      }
      
      return { ...prev, lineItems: newLineItems };
    });
  };

  const handleDownloadPDF = () => {
    setIsGenerating(true);
    
    try {
      // Create a modified template with user's data
      const customTemplate: InvoiceTemplate = {
        ...template,
        sampleData: {
          ...formData,
          vatAmount: formData.taxAmount,
          vatRate: formData.taxRate,
        }
      };
      
      generateInvoicePDF(customTemplate);
      
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      setIsGenerating(false);
    }
  };

  const handlePrintPreview = () => {
    // Create a new window for print preview
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      alert('Please allow pop-ups to use print preview');
      return;
    }

    // Generate the invoice HTML for printing
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${formData.invoiceNumber} - ${formData.clientName || 'Preview'}</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              font-size: 12px;
              line-height: 1.5;
              color: #1e293b;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            
            @media print {
              body {
                padding: 20px;
              }
              .no-print {
                display: none !important;
              }
            }
            
            .header {
              border-bottom: 3px solid #4f46e5;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            
            .company-name {
              font-size: 24px;
              font-weight: bold;
              color: #1e293b;
              margin-bottom: 8px;
            }
            
            .company-details {
              font-size: 11px;
              color: #64748b;
              line-height: 1.6;
            }
            
            .invoice-title {
              font-size: 32px;
              font-weight: bold;
              color: #475569;
              margin-bottom: 20px;
            }
            
            .invoice-details-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            
            .bill-to {
              flex: 1;
            }
            
            .invoice-meta {
              text-align: right;
              min-width: 200px;
            }
            
            .section-title {
              font-size: 11px;
              font-weight: bold;
              color: #64748b;
              text-transform: uppercase;
              margin-bottom: 8px;
              letter-spacing: 0.5px;
            }
            
            .client-name {
              font-weight: bold;
              font-size: 14px;
              margin-bottom: 4px;
            }
            
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
            }
            
            .detail-label {
              font-weight: 600;
              color: #64748b;
            }
            
            .line-items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 30px 0;
              border: 1px solid #e2e8f0;
            }
            
            .line-items-table thead {
              background-color: #f8fafc;
            }
            
            .line-items-table th {
              padding: 12px;
              text-align: left;
              font-weight: 600;
              color: #475569;
              border-bottom: 2px solid #e2e8f0;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .line-items-table td {
              padding: 12px;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .line-items-table tbody tr:nth-child(even) {
              background-color: #f8fafc;
            }
            
            .text-right {
              text-align: right;
            }
            
            .text-center {
              text-align: center;
            }
            
            .totals-section {
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
            }
            
            .totals-table {
              min-width: 300px;
            }
            
            .totals-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              font-size: 13px;
            }
            
            .totals-row.subtotal {
              color: #64748b;
            }
            
            .totals-row.total {
              border-top: 2px solid #cbd5e1;
              margin-top: 8px;
              padding-top: 12px;
              font-size: 16px;
              font-weight: bold;
              color: #4f46e5;
            }
            
            .payment-info {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
            }
            
            .payment-info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
              margin-top: 12px;
            }
            
            .payment-detail {
              font-size: 11px;
            }
            
            .payment-label {
              font-weight: 600;
              color: #64748b;
            }
            
            .notes-section {
              margin-top: 30px;
              padding: 16px;
              background-color: #f8fafc;
              border-left: 4px solid #4f46e5;
              border-radius: 4px;
            }
            
            .notes-title {
              font-weight: bold;
              margin-bottom: 8px;
              color: #475569;
            }
            
            .notes-content {
              color: #64748b;
              white-space: pre-line;
            }
            
            .print-buttons {
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background-color: #f8fafc;
              border-radius: 8px;
            }
            
            .print-btn {
              background-color: #4f46e5;
              color: white;
              border: none;
              padding: 12px 32px;
              font-size: 14px;
              font-weight: 600;
              border-radius: 6px;
              cursor: pointer;
              margin: 0 8px;
            }
            
            .print-btn:hover {
              background-color: #4338ca;
            }
            
            .print-btn.secondary {
              background-color: #64748b;
            }
            
            .print-btn.secondary:hover {
              background-color: #475569;
            }
            
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120px;
              font-weight: bold;
              color: rgba(0, 0, 0, 0.03);
              z-index: -1;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="watermark">PREVIEW</div>
          
          <div class="print-buttons no-print">
            <button class="print-btn" onclick="window.print()">🖨️ Print Invoice</button>
            <button class="print-btn secondary" onclick="window.close()">✕ Close Preview</button>
          </div>

          <div class="header">
            <div class="company-name">${formData.businessName || 'Your Business Name'}</div>
            <div class="company-details">
              ${formData.businessAddress ? formData.businessAddress.split('\n').join('<br>') : ''}<br>
              ${formData.businessEmail || ''} ${formData.businessEmail && formData.businessPhone ? '|' : ''} ${formData.businessPhone || ''}
            </div>
          </div>

          <div class="invoice-title">INVOICE</div>

          <div class="invoice-details-section">
            <div class="bill-to">
              <div class="section-title">Bill To</div>
              <div class="client-name">${formData.clientName || 'Client Name'}</div>
              <div class="company-details">
                ${formData.clientAddress ? formData.clientAddress.split('\n').join('<br>') : ''}<br>
                ${formData.clientEmail || ''}<br>
                ${formData.clientPhone || ''}
              </div>
            </div>

            <div class="invoice-meta">
              <div class="detail-row">
                <span class="detail-label">Invoice #:</span>
                <span>${formData.invoiceNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span>${formData.invoiceDate}</span>
              </div>
              ${formData.dueDate ? `
              <div class="detail-row">
                <span class="detail-label">Due Date:</span>
                <span>${formData.dueDate}</span>
              </div>
              ` : ''}
              ${formData.poNumber ? `
              <div class="detail-row">
                <span class="detail-label">PO Number:</span>
                <span>${formData.poNumber}</span>
              </div>
              ` : ''}
            </div>
          </div>

          <table class="line-items-table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="text-center" style="width: 100px;">Quantity</th>
                <th class="text-right" style="width: 120px;">Rate</th>
                <th class="text-right" style="width: 120px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${formData.lineItems.map(item => `
                <tr>
                  <td>${item.description || '-'}</td>
                  <td class="text-center">${item.quantity}</td>
                  <td class="text-right">£${item.rate.toFixed(2)}</td>
                  <td class="text-right">£${item.amount.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals-section">
            <div class="totals-table">
              <div class="totals-row subtotal">
                <span>Subtotal:</span>
                <span>£${formData.subtotal.toFixed(2)}</span>
              </div>
              <div class="totals-row subtotal">
                <span>Tax (${formData.taxRate}%):</span>
                <span>£${formData.taxAmount.toFixed(2)}</span>
              </div>
              ${formData.discountAmount > 0 ? `
              <div class="totals-row subtotal" style="color: #10b981;">
                <span>Discount:</span>
                <span>-£${formData.discountAmount.toFixed(2)}</span>
              </div>
              ` : ''}
              <div class="totals-row total">
                <span>Total:</span>
                <span>£${formData.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          ${formData.bankName || formData.paymentTerms ? `
          <div class="payment-info">
            <div class="section-title">Payment Information</div>
            <div class="payment-info-grid">
              ${formData.paymentTerms ? `
              <div class="payment-detail">
                <span class="payment-label">Payment Terms:</span> ${formData.paymentTerms}
              </div>
              ` : ''}
              ${formData.bankName ? `
              <div class="payment-detail">
                <span class="payment-label">Bank:</span> ${formData.bankName}
              </div>
              ` : ''}
              ${formData.accountNumber ? `
              <div class="payment-detail">
                <span class="payment-label">Account Number:</span> ${formData.accountNumber}
              </div>
              ` : ''}
              ${formData.sortCode ? `
              <div class="payment-detail">
                <span class="payment-label">Sort Code:</span> ${formData.sortCode}
              </div>
              ` : ''}
              ${formData.iban ? `
              <div class="payment-detail">
                <span class="payment-label">IBAN:</span> ${formData.iban}
              </div>
              ` : ''}
              ${formData.swiftCode ? `
              <div class="payment-detail">
                <span class="payment-label">SWIFT/BIC:</span> ${formData.swiftCode}
              </div>
              ` : ''}
            </div>
          </div>
          ` : ''}

          ${formData.notes ? `
          <div class="notes-section">
            <div class="notes-title">Notes</div>
            <div class="notes-content">${formData.notes}</div>
          </div>
          ` : ''}

          <div class="print-buttons no-print" style="margin-top: 40px;">
            <button class="print-btn" onclick="window.print()">🖨️ Print Invoice</button>
            <button class="print-btn secondary" onclick="window.close()">✕ Close Preview</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
  };

  const steps = [
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'client', label: 'Client Info', icon: User },
    { id: 'items', label: 'Line Items', icon: FileCheck },
    { id: 'payment', label: 'Payment Info', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/invoice-generator"
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Templates</span>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <div>
                <h1 className="text-lg font-bold text-slate-900">{template.name}</h1>
                <p className="text-xs text-slate-600">{industryName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{showPreview ? 'Hide' : 'Show'} Preview</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-wait"
              >
                <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
              </button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      isActive 
                        ? 'bg-indigo-600 text-white' 
                        : isCompleted
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${isCompleted ? 'bg-green-500' : 'bg-slate-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl mx-auto'} gap-8`}>
          
          {/* Form Section */}
          <div className="space-y-6">
            
            {/* Business Information */}
            {currentStep === 'business' && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Business Information</h2>
                    <p className="text-sm text-slate-600">Your company details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => updateField('businessName', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your Business Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Business Address
                    </label>
                    <textarea
                      value={formData.businessAddress}
                      onChange={(e) => updateField('businessAddress', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="123 Business Street, London, SW1A 1AA"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => updateField('businessEmail', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="info@business.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.businessPhone}
                        onChange={(e) => updateField('businessPhone', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="020 1234 5678"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Invoice Number *
                      </label>
                      <input
                        type="text"
                        value={formData.invoiceNumber}
                        onChange={(e) => updateField('invoiceNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="INV-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Invoice Date *
                      </label>
                      <input
                        type="date"
                        value={formData.invoiceDate}
                        onChange={(e) => updateField('invoiceDate', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => updateField('dueDate', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setCurrentStep('client')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Next: Client Info
                  </button>
                </div>
              </div>
            )}

            {/* Client Information */}
            {currentStep === 'client' && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Client Information</h2>
                    <p className="text-sm text-slate-600">Your customer's details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => updateField('clientName', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Client Company Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Client Address
                    </label>
                    <textarea
                      value={formData.clientAddress}
                      onChange={(e) => updateField('clientAddress', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="456 Client Avenue, Manchester, M1 1AA"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => updateField('clientEmail', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="client@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.clientPhone}
                        onChange={(e) => updateField('clientPhone', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0161 123 4567"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep('business')}
                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('items')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Next: Line Items
                  </button>
                </div>
              </div>
            )}

            {/* Line Items */}
            {currentStep === 'items' && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Line Items</h2>
                      <p className="text-sm text-slate-600">Products or services</p>
                    </div>
                  </div>
                  <button
                    onClick={addLineItem}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.lineItems.map((item, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-slate-700">Item {index + 1}</span>
                        {formData.lineItems.length > 1 && (
                          <button
                            onClick={() => removeLineItem(index)}
                            className="text-red-600 hover:text-red-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-600 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Product or service description"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Rate (£)
                            </label>
                            <input
                              type="number"
                              value={item.rate}
                              onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">
                              Amount (£)
                            </label>
                            <input
                              type="number"
                              value={item.amount.toFixed(2)}
                              readOnly
                              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50 text-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals Summary */}
                <div className="mt-6 border-t border-slate-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-semibold text-slate-900">£{formData.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Tax Rate (%):</span>
                    <input
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-20 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    />
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tax Amount:</span>
                    <span className="font-semibold text-slate-900">£{formData.taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Discount (£):</span>
                    <input
                      type="number"
                      value={formData.discountAmount}
                      onChange={(e) => updateField('discountAmount', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-20 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    />
                  </div>

                  <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-300">
                    <span className="text-slate-900">Total:</span>
                    <span className="text-indigo-600">£{formData.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentStep('client')}
                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Next: Payment Info
                  </button>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Payment Information</h2>
                    <p className="text-sm text-slate-600">Bank details and terms</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Payment Terms
                    </label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => updateField('paymentTerms', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Upon Receipt">Upon Receipt</option>
                      <option value="Net 7">Net 7</option>
                      <option value="Net 14">Net 14</option>
                      <option value="Net 30">Net 30</option>
                      <option value="Net 60">Net 60</option>
                      <option value="Net 90">Net 90</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => updateField('bankName', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Example Bank"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) => updateField('accountNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="12345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sort Code
                      </label>
                      <input
                        type="text"
                        value={formData.sortCode}
                        onChange={(e) => updateField('sortCode', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="12-34-56"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        IBAN (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.iban}
                        onChange={(e) => updateField('iban', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="GB29 NWBK 6016 1331 9268 19"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SWIFT/BIC (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.swiftCode}
                        onChange={(e) => updateField('swiftCode', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="NWBKGB2L"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Thank you for your business. Payment is due within 30 days."
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    onClick={() => setCurrentStep('items')}
                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition"
                  >
                    Back
                  </button>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handlePrintPreview}
                      className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Preview</span>
                    </button>
                    
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGenerating}
                      className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-wait"
                    >
                      <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
                      <span>{isGenerating ? 'Generating PDF...' : 'Download Invoice'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  Live Preview
                </h3>
                
                <div className="border border-slate-300 rounded-lg p-6 bg-white text-sm">
                  {/* Invoice Preview */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b-2 border-indigo-600 pb-4">
                      <h2 className="text-2xl font-bold text-slate-900">{formData.businessName || 'Your Business Name'}</h2>
                      <p className="text-xs text-slate-600 whitespace-pre-line">{formData.businessAddress}</p>
                      {formData.businessEmail && <p className="text-xs text-slate-600">{formData.businessEmail}</p>}
                      {formData.businessPhone && <p className="text-xs text-slate-600">{formData.businessPhone}</p>}
                    </div>

                    {/* Invoice Details */}
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">INVOICE</h3>
                        <div className="space-y-1 text-xs">
                          <p><span className="font-semibold">Invoice #:</span> {formData.invoiceNumber}</p>
                          <p><span className="font-semibold">Date:</span> {formData.invoiceDate}</p>
                          {formData.dueDate && <p><span className="font-semibold">Due:</span> {formData.dueDate}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <h4 className="font-semibold text-sm text-slate-900 mb-2">Bill To:</h4>
                        <p className="text-xs font-semibold text-slate-900">{formData.clientName || 'Client Name'}</p>
                        <p className="text-xs text-slate-600 whitespace-pre-line">{formData.clientAddress}</p>
                      </div>
                    </div>

                    {/* Line Items */}
                    <div className="border-t border-slate-300 pt-4">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-300">
                            <th className="text-left py-2">Description</th>
                            <th className="text-center py-2 w-16">Qty</th>
                            <th className="text-right py-2 w-20">Rate</th>
                            <th className="text-right py-2 w-20">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.lineItems.map((item, index) => (
                            <tr key={index} className="border-b border-slate-200">
                              <td className="py-2">{item.description || '-'}</td>
                              <td className="text-center py-2">{item.quantity}</td>
                              <td className="text-right py-2">£{item.rate.toFixed(2)}</td>
                              <td className="text-right py-2">£{item.amount.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end">
                      <div className="w-64 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>£{formData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax ({formData.taxRate}%):</span>
                          <span>£{formData.taxAmount.toFixed(2)}</span>
                        </div>
                        {formData.discountAmount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-£{formData.discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold text-base border-t-2 border-slate-300 pt-2">
                          <span>Total:</span>
                          <span>£{formData.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    {formData.bankName && (
                      <div className="border-t border-slate-300 pt-4 text-xs">
                        <h4 className="font-semibold text-sm mb-2">Payment Information</h4>
                        <div className="space-y-1">
                          <p><span className="font-semibold">Terms:</span> {formData.paymentTerms}</p>
                          {formData.bankName && <p><span className="font-semibold">Bank:</span> {formData.bankName}</p>}
                          {formData.accountNumber && <p><span className="font-semibold">Account:</span> {formData.accountNumber}</p>}
                          {formData.sortCode && <p><span className="font-semibold">Sort Code:</span> {formData.sortCode}</p>}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {formData.notes && (
                      <div className="border-t border-slate-300 pt-4 text-xs">
                        <h4 className="font-semibold text-sm mb-2">Notes</h4>
                        <p className="text-slate-600 whitespace-pre-line">{formData.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
