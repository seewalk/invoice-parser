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
  Printer,
  ShieldCheck,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { generateTemplatePDF } from '@/app/actions/generateTemplatePDF';
import { useLeadCapture } from '@/app/hooks/useLeadCapture';
import LeadCaptureModal from '@/app/components/LeadCaptureModal';
import dynamic from 'next/dynamic';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { useQuota } from '@/app/hooks/useQuota';
import { useRouter } from 'next/navigation';
import {
  validateUKVATNumber,
  formatUKVATNumber,
  validateUKPostcode,
  formatUKPostcode,
  validateUKPhone,
  formatUKPhone,
  validateUKSortCode,
  formatUKSortCode,
  validateUKAccountNumber,
  validateUKCompanyNumber,
  formatUKCompanyNumber,
  validateGasSafeNumber,
  validateNICEICNumber,
  validateCISRate,
  validateVATRate,
  getVATRateName,
  formatDateToUK,
  formatDateFromUK,
  calculateDueDate,
  formatGBP,
  formatIBAN,
  validateIBAN
} from '@/app/lib/ukValidation';

// Lazy-load UpgradePrompt for performance
const UpgradePrompt = dynamic(
  () => import('@/app/components/monetization/UpgradePrompt'),
  { ssr: false }
);

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  vatRate: number; // UK VAT rate per line item (0%, 5%, 20%, or -1 for exempt)
}

interface InvoiceData {
  // Business Info
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  
  // UK Business Compliance Fields
  vatNumber: string;          // UK VAT registration number (GB123456789)
  companyNumber: string;       // Companies House number
  gasSafeNumber: string;       // Gas Safe registration (for plumbers/gas engineers)
  niceicNumber: string;        // NICEIC registration (for electricians)

  // Invoice Details
  invoiceNumber: string;
  invoiceDate: string;         // ISO format for internal use
  dueDate: string;             // ISO format for internal use
  poNumber: string;

  // Client Info
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  clientVatNumber: string;     // Client's VAT number (optional)

  // Line Items
  lineItems: LineItem[];

  // Totals
  subtotal: number;
  vatRate: number;             // Default VAT rate (20% standard)
  vatAmount: number;           // Total VAT amount
  
  // UK-specific calculations
  cisDeductionRate: number;    // CIS deduction rate (0%, 20%, or 30%)
  cisDeductionAmount: number;  // CIS deduction amount
  
  discountAmount: number;
  totalAmount: number;         // Total after VAT and CIS
  amountDue: number;           // Amount due after CIS deduction

  // Payment Info
  paymentTerms: string;
  bankName: string;
  accountNumber: string;       // 8-digit UK account number
  sortCode: string;            // XX-XX-XX format
  iban: string;                // UK IBAN (22 characters)
  swiftCode: string;           // BIC/SWIFT code

  // Notes
  notes: string;
  
  // HMRC Compliance
  reverseCharge: boolean;      // Reverse charge VAT (for specific services)
}

interface InvoiceGeneratorClientProps {
  template: InvoiceTemplate;
  industryName: string;
}

export default function InvoiceGeneratorClient({ 
  template, 
  industryName 
}: InvoiceGeneratorClientProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { checkQuota, decrementQuota, getRemaining, hasUnlimitedAccess } = useQuota();
  
  const [showPreview, setShowPreview] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'business' | 'client' | 'items' | 'payment'>('business');
  const [pendingDownload, setPendingDownload] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Lead capture hook (only for demo/anonymous users)
  const {
    showModal,
    openModal,
    closeModal,
    handleLeadSubmit,
    hasSubmittedLead,
    isLeadCaptureRequired,
  } = useLeadCapture({
    source: 'invoice-generator',
    metadata: {
      templateName: template.name,
      templateId: template.id,
    },
  });

  // Initialize form data with template sample data
  const [formData, setFormData] = useState<InvoiceData>(() => {
    const sample = template.sampleData;
    const today = new Date().toISOString().split('T')[0];
    const dueDate30Days = calculateDueDate(today, 'Net 30');
    
    return {
      // Business Info
      businessName: sample.businessName || '',
      businessAddress: sample.businessAddress || '',
      businessEmail: sample.businessEmail || '',
      businessPhone: sample.businessPhone || '',
      
      // UK Business Compliance
      vatNumber: sample.vatNumber || '',
      companyNumber: sample.companyNumber || '',
      gasSafeNumber: sample.gasSafeNumber || '',
      niceicNumber: sample.niceicNumber || '',
      
      // Invoice Details
      invoiceNumber: sample.invoiceNumber || `INV-${String(Date.now()).slice(-6)}`,
      invoiceDate: sample.invoiceDate || today,
      dueDate: sample.dueDate || dueDate30Days,
      poNumber: sample.poNumber || '',
      
      // Client Info
      clientName: sample.clientName || '',
      clientAddress: sample.clientAddress || '',
      clientEmail: sample.clientEmail || '',
      clientPhone: sample.clientPhone || '',
      clientVatNumber: sample.clientVatNumber || '',
      
      // Line Items (initialize with UK VAT rate)
      lineItems: sample.lineItems?.map((item: any) => ({
        ...item,
        vatRate: item.vatRate || 20 // Default to 20% standard rate
      })) || [
        { description: '', quantity: 1, rate: 0, amount: 0, vatRate: 20 }
      ],
      
      // Totals
      subtotal: sample.subtotal || 0,
      vatRate: sample.taxRate || sample.vatRate || 20, // UK standard rate
      vatAmount: sample.taxAmount || sample.vatAmount || 0,
      
      // UK-specific
      cisDeductionRate: sample.cisDeductionRate || 0,
      cisDeductionAmount: sample.cisDeductionAmount || 0,
      
      discountAmount: sample.discountAmount || 0,
      totalAmount: sample.totalAmount || 0,
      amountDue: sample.amountDue || 0,
      
      // Payment Info
      paymentTerms: sample.paymentTerms || 'Net 30',
      bankName: sample.bankName || '',
      accountNumber: sample.accountNumber || '',
      sortCode: sample.sortCode || '',
      iban: sample.iban || '',
      swiftCode: sample.swiftCode || '',
      
      // Notes
      notes: sample.notes || '',
      
      // HMRC Compliance
      reverseCharge: sample.reverseCharge || false,
    };
  });

  // Calculate totals whenever line items, VAT rate, CIS, or discount changes
  useEffect(() => {
    // Calculate subtotal from line items
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.amount, 0);
    
    // Calculate VAT amount (if not exempt)
    let vatAmount = 0;
    if (formData.vatRate >= 0 && !formData.reverseCharge) {
      vatAmount = (subtotal * formData.vatRate) / 100;
    }
    
    // Calculate total after VAT and discount
    const totalAmount = subtotal + vatAmount - formData.discountAmount;
    
    // Calculate CIS deduction (applies after VAT)
    let cisDeductionAmount = 0;
    if (formData.cisDeductionRate > 0) {
      cisDeductionAmount = (totalAmount * formData.cisDeductionRate) / 100;
    }
    
    // Calculate amount due (after CIS deduction)
    const amountDue = totalAmount - cisDeductionAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      vatAmount,
      totalAmount,
      cisDeductionAmount,
      amountDue,
    }));
  }, [
    formData.lineItems, 
    formData.vatRate, 
    formData.cisDeductionRate, 
    formData.discountAmount,
    formData.reverseCharge
  ]);

  const updateField = (field: keyof InvoiceData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', quantity: 1, rate: 0, amount: 0, vatRate: 20 }]
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

  /**
   * Generate PDF and trigger download
   * This is the actual PDF generation logic, called after lead capture
   */
  const generateAndDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      console.log('[Invoice Generator] Generating PDF for:', template.name);
      console.log('[Invoice Generator] Form Data:', {
        vatNumber: formData.vatNumber,
        companyNumber: formData.companyNumber,
        gasSafeNumber: formData.gasSafeNumber,
        niceicNumber: formData.niceicNumber,
        clientVatNumber: formData.clientVatNumber,
        cisDeductionRate: formData.cisDeductionRate,
        cisDeductionAmount: formData.cisDeductionAmount,
        amountDue: formData.amountDue
      });
      
      // Create a modified template with user's data
      const customTemplate: InvoiceTemplate = {
        ...template,
        sampleData: {
          ...formData,
          vatAmount: formData.vatAmount,
          vatRate: formData.vatRate,
        }
      };
      
      console.log('[Invoice Generator] Sample Data being sent to PDF:', {
        vatNumber: customTemplate.sampleData.vatNumber,
        companyNumber: customTemplate.sampleData.companyNumber,
        gasSafeNumber: customTemplate.sampleData.gasSafeNumber,
        niceicNumber: customTemplate.sampleData.niceicNumber,
        clientVatNumber: customTemplate.sampleData.clientVatNumber,
        cisDeductionRate: customTemplate.sampleData.cisDeductionRate
      });
      
      // Call server action to generate PDF
      const result = await generateTemplatePDF(customTemplate);
      
      if (result.success && result.pdfBase64 && result.fileName) {
        // Convert base64 to blob and trigger download
        const byteCharacters = atob(result.pdfBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.fileName;
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        console.log('[Invoice Generator] PDF downloaded successfully:', result.fileName);
        
        // 💳 QUOTA DECREMENT: Decrement quota for authenticated users
        if (user && !hasUnlimitedAccess) {
          console.log('[Invoice Generator] Decrementing generator uses quota');
          await decrementQuota('generatorUses', {
            templateName: template.name,
            templateId: template.id,
            invoiceNumber: formData.invoiceNumber,
            clientName: formData.clientName,
            totalAmount: formData.totalAmount,
            timestamp: new Date().toISOString()
          });
        }
        
        setTimeout(() => {
          setIsGenerating(false);
          setPendingDownload(false);
        }, 2000);
        
        // Show upgrade prompt for free tier users after download
        if (user && !hasUnlimitedAccess) {
          setTimeout(() => {
            setShowUpgradePrompt(true);
          }, 2000);
        }
      } else {
        throw new Error(result.error || 'Failed to generate PDF');
      }
    } catch (error) {
      console.error('[Invoice Generator] Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      setIsGenerating(false);
      setPendingDownload(false);
    }
  };

  /**
   * Handle PDF download button click
   * Authenticated users: check quota and download
   * Demo users: lead capture first, then download
   */
  const handleDownloadPDF = async () => {
    // 🔒 AUTH CHECK: Redirect to sign-up if not authenticated
    if (!user) {
      // Demo users: check if we need to capture lead first
      if (isLeadCaptureRequired) {
        console.log('[Invoice Generator] Demo user - lead capture required, showing modal');
        setPendingDownload(true);
        openModal();
        return;
      }
      // Demo user has already submitted lead, proceed with download
      console.log('[Invoice Generator] Demo user - lead already captured, proceeding with download');
      await generateAndDownloadPDF();
      return;
    }

    // 🎫 QUOTA CHECK: For authenticated users, check quota
    if (!hasUnlimitedAccess && !checkQuota('generatorUses')) {
      console.log('[Invoice Generator] No quota remaining, showing upgrade prompt');
      setShowUpgradePrompt(true);
      return;
    }

    console.log('[Invoice Generator] Quota check passed, proceeding with download');
    await generateAndDownloadPDF();
  };

  /**
   * Handle lead submission from modal (demo users only)
   * After successful submission, trigger the PDF download
   */
  const handleLeadCaptured = async (data: any) => {
    console.log('[Invoice Generator] Demo user lead captured, proceeding with PDF generation');
    await handleLeadSubmit(data);
    
    // Lead is captured, now generate and download PDF
    if (pendingDownload) {
      await generateAndDownloadPDF();
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
              ${formData.vatNumber ? `<br><strong style="color: #059669;">🛡️ VAT Reg: ${formData.vatNumber}</strong>` : ''}
              ${formData.companyNumber ? `<br>Company No: ${formData.companyNumber}` : ''}
              ${formData.gasSafeNumber ? `<br>Gas Safe Reg: ${formData.gasSafeNumber}` : ''}
              ${formData.niceicNumber ? `<br>NICEIC Reg: ${formData.niceicNumber}` : ''}
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
                ${formData.clientVatNumber ? `<br><strong>VAT Reg: ${formData.clientVatNumber}</strong>` : ''}
              </div>
            </div>

            <div class="invoice-meta">
              <div class="detail-row">
                <span class="detail-label">Invoice #:</span>
                <span>${formData.invoiceNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span>${formatDateToUK(formData.invoiceDate)}</span>
              </div>
              ${formData.dueDate ? `
              <div class="detail-row">
                <span class="detail-label">Due Date:</span>
                <span>${formatDateToUK(formData.dueDate)}</span>
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
              ${formData.reverseCharge ? `
              <div class="totals-row subtotal" style="color: #2563eb; font-style: italic;">
                <span>VAT (Reverse Charge):</span>
                <span>£0.00</span>
              </div>
              ` : formData.vatRate === -1 ? `
              <div class="totals-row subtotal" style="color: #64748b; font-style: italic;">
                <span>VAT Exempt:</span>
                <span>£0.00</span>
              </div>
              ` : `
              <div class="totals-row subtotal">
                <span>VAT (${getVATRateName(formData.vatRate)} - ${formData.vatRate}%):</span>
                <span>£${formData.vatAmount.toFixed(2)}</span>
              </div>
              `}
              ${formData.discountAmount > 0 ? `
              <div class="totals-row subtotal" style="color: #10b981;">
                <span>Discount:</span>
                <span>-£${formData.discountAmount.toFixed(2)}</span>
              </div>
              ` : ''}
              <div class="totals-row total">
                <span>Total (inc. VAT):</span>
                <span>£${formData.totalAmount.toFixed(2)}</span>
              </div>
              ${formData.cisDeductionRate > 0 ? `
              <div class="totals-row subtotal" style="color: #dc2626; border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
                <span>CIS Deduction (${formData.cisDeductionRate}%):</span>
                <span>-£${formData.cisDeductionAmount.toFixed(2)}</span>
              </div>
              <div class="totals-row total" style="color: #059669; border-top: 2px solid #10b981;">
                <span>Amount Due:</span>
                <span>£${formData.amountDue.toFixed(2)}</span>
              </div>
              ` : ''}
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
    <>
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => {
          closeModal();
          setPendingDownload(false);
        }}
        onSubmit={handleLeadCaptured}
        source="invoice-generator"
        metadata={{
          templateName: template.name,
          templateId: template.id,
        }}
      />

      {/* Upgrade Prompt Modal (shown 2s after successful download) */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        source="invoice-generator"
        templateName={template.name}
        templateId={template.id}
      />

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
              {!authLoading && user && (
                <div className="hidden sm:block text-right mr-2">
                  {hasUnlimitedAccess ? (
                    <span className="text-xs text-primary-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Unlimited
                    </span>
                  ) : (
                    <span className="text-xs text-slate-600">
                      {getRemaining('generatorUses')} / 5 uses left
                    </span>
                  )}
                </div>
              )}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 transition"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{showPreview ? 'Hide' : 'Show'} Preview</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating || authLoading}
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
                        onChange={(e) => updateField('businessPhone', formatUKPhone(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="020 1234 5678"
                      />
                    </div>
                  </div>

                  {/* UK Business Compliance Section */}
                  <div className="border-t border-slate-200 pt-4 mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <h3 className="text-base font-semibold text-slate-900">UK Compliance Information</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          VAT Registration Number
                          <span className="text-slate-500 text-xs ml-1">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.vatNumber}
                          onChange={(e) => {
                            const formatted = formatUKVATNumber(e.target.value);
                            updateField('vatNumber', formatted);
                          }}
                          onBlur={(e) => {
                            if (e.target.value && !validateUKVATNumber(e.target.value)) {
                              alert('Invalid UK VAT number format. Expected format: GB123456789');
                            }
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="GB123456789"
                        />
                        <p className="text-xs text-slate-500 mt-1">Required if VAT registered</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Company Number
                          <span className="text-slate-500 text-xs ml-1">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.companyNumber}
                          onChange={(e) => {
                            const formatted = formatUKCompanyNumber(e.target.value);
                            updateField('companyNumber', formatted);
                          }}
                          onBlur={(e) => {
                            if (e.target.value && !validateUKCompanyNumber(e.target.value)) {
                              alert('Invalid UK company number format. Expected: 8 digits or SC/NI prefix');
                            }
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="12345678"
                        />
                        <p className="text-xs text-slate-500 mt-1">Companies House registration</p>
                      </div>
                    </div>

                    {/* Industry-Specific Registration Numbers */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Gas Safe Registration
                          <span className="text-slate-500 text-xs ml-1">(Plumbers/Gas Engineers)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.gasSafeNumber}
                          onChange={(e) => updateField('gasSafeNumber', e.target.value)}
                          onBlur={(e) => {
                            if (e.target.value && !validateGasSafeNumber(e.target.value)) {
                              alert('Invalid Gas Safe number format. Expected: 6-7 digits');
                            }
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="123456"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          NICEIC Registration
                          <span className="text-slate-500 text-xs ml-1">(Electricians)</span>
                        </label>
                        <input
                          type="text"
                          value={formData.niceicNumber}
                          onChange={(e) => updateField('niceicNumber', e.target.value.toUpperCase())}
                          onBlur={(e) => {
                            if (e.target.value && !validateNICEICNumber(e.target.value)) {
                              alert('Invalid NICEIC number format. Expected: 5-8 alphanumeric characters');
                            }
                          }}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="ABC12345"
                        />
                      </div>
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
                        onChange={(e) => updateField('clientPhone', formatUKPhone(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="0161 123 4567"
                      />
                    </div>
                  </div>

                  {/* Client VAT Number */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Client VAT Number
                      <span className="text-slate-500 text-xs ml-1">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.clientVatNumber}
                      onChange={(e) => {
                        const formatted = formatUKVATNumber(e.target.value);
                        updateField('clientVatNumber', formatted);
                      }}
                      onBlur={(e) => {
                        if (e.target.value && !validateUKVATNumber(e.target.value)) {
                          alert('Invalid UK VAT number format. Expected format: GB123456789');
                        }
                      }}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="GB123456789"
                    />
                    <p className="text-xs text-slate-500 mt-1">Required for B2B VAT invoices</p>
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

                {/* UK VAT and Totals Summary */}
                <div className="mt-6 border-t border-slate-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-semibold text-slate-900">£{formData.subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* UK VAT Rate Selector */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 flex items-center gap-2">
                      VAT Rate:
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                    </span>
                    <select
                      value={formData.vatRate}
                      onChange={(e) => updateField('vatRate', parseInt(e.target.value))}
                      className="px-3 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="20">20% (Standard Rate)</option>
                      <option value="5">5% (Reduced Rate)</option>
                      <option value="0">0% (Zero-Rated)</option>
                      <option value="-1">VAT Exempt</option>
                    </select>
                  </div>

                  {/* Reverse Charge VAT */}
                  <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.reverseCharge}
                        onChange={(e) => updateField('reverseCharge', e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      <span>Reverse Charge VAT</span>
                      <span className="text-xs text-slate-400">(Customer to account for VAT)</span>
                    </label>
                  </div>

                  {!formData.reverseCharge && formData.vatRate >= 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">VAT Amount ({getVATRateName(formData.vatRate)}):</span>
                      <span className="font-semibold text-slate-900">£{formData.vatAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {formData.reverseCharge && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 text-xs italic">Customer to account for VAT</span>
                    </div>
                  )}

                  {/* Discount */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Discount (£):</span>
                    <input
                      type="number"
                      value={formData.discountAmount}
                      onChange={(e) => updateField('discountAmount', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-24 px-2 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-right"
                    />
                  </div>

                  <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-300">
                    <span className="text-slate-900">Total (inc. VAT):</span>
                    <span className="text-indigo-600">£{formData.totalAmount.toFixed(2)}</span>
                  </div>

                  {/* CIS Deduction (Construction Industry Scheme) */}
                  <div className="border-t border-slate-200 pt-3 mt-3">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-700 font-medium">CIS Deduction:</span>
                      <select
                        value={formData.cisDeductionRate}
                        onChange={(e) => updateField('cisDeductionRate', parseInt(e.target.value))}
                        className="px-3 py-1 text-sm border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="0">None</option>
                        <option value="20">20% (CIS Registered)</option>
                        <option value="30">30% (Not Registered)</option>
                      </select>
                    </div>
                    
                    {formData.cisDeductionRate > 0 && (
                      <>
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>CIS Deduction ({formData.cisDeductionRate}%):</span>
                          <span className="text-red-600">-£{formData.cisDeductionAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200 mt-2">
                          <span className="text-slate-900">Amount Due:</span>
                          <span className="text-green-600">£{formData.amountDue.toFixed(2)}</span>
                        </div>
                      </>
                    )}
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
                        UK Account Number
                        <span className="text-slate-500 text-xs ml-1">(8 digits)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.accountNumber}
                        onChange={(e) => updateField('accountNumber', e.target.value)}
                        onBlur={(e) => {
                          if (e.target.value && !validateUKAccountNumber(e.target.value)) {
                            alert('Invalid UK account number. Must be 8 digits.');
                          }
                        }}
                        maxLength={8}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="12345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        UK Sort Code
                        <span className="text-slate-500 text-xs ml-1">(XX-XX-XX)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.sortCode}
                        onChange={(e) => updateField('sortCode', formatUKSortCode(e.target.value))}
                        onBlur={(e) => {
                          if (e.target.value && !validateUKSortCode(e.target.value)) {
                            alert('Invalid UK sort code. Expected format: XX-XX-XX');
                          }
                        }}
                        maxLength={8}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="12-34-56"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        UK IBAN (Optional)
                        <span className="text-slate-500 text-xs ml-1">(International payments)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.iban}
                        onChange={(e) => updateField('iban', formatIBAN(e.target.value))}
                        onBlur={(e) => {
                          if (e.target.value && !validateIBAN(e.target.value)) {
                            alert('Invalid UK IBAN format. Expected: GB + 2 digits + 4 letters + 14 digits');
                          }
                        }}
                        maxLength={27}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="GB29 NWBK 6016 1331 9268 19"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        SWIFT/BIC (Optional)
                        <span className="text-slate-500 text-xs ml-1">(International transfers)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.swiftCode}
                        onChange={(e) => updateField('swiftCode', e.target.value.toUpperCase())}
                        maxLength={11}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="NWBKGB2L"
                      />
                    </div>
                  </div>

                  {/* HMRC Making Tax Digital Compliance Notice */}
                  <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold text-blue-900 mb-1">HMRC Making Tax Digital Compliant</p>
                        <p className="text-blue-700 text-xs leading-relaxed">
                          This invoice generator meets HMRC Making Tax Digital (MTD) requirements for digital record keeping. 
                          All invoices include VAT registration numbers (where applicable), proper date formatting (DD/MM/YYYY), 
                          and Construction Industry Scheme (CIS) deductions when required.
                        </p>
                      </div>
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
                      placeholder="Thank you for your business. Payment is due within 30 days of invoice date."
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
                <div className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indigo-600" />
                  Live Preview
                </div>
                
                <div className="border border-slate-300 rounded-lg p-6 bg-white text-sm">
                  {/* Invoice Preview */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b-2 border-indigo-600 pb-4">
                      <div className="text-2xl font-bold text-slate-900">{formData.businessName || 'Your Business Name'}</div>
                      <p className="text-xs text-slate-600 whitespace-pre-line">{formData.businessAddress}</p>
                      {formData.businessEmail && <p className="text-xs text-slate-600">{formData.businessEmail}</p>}
                      {formData.businessPhone && <p className="text-xs text-slate-600">{formData.businessPhone}</p>}
                      {formData.vatNumber && (
                        <p className="text-xs text-slate-700 font-semibold mt-2">
                          <ShieldCheck className="w-3 h-3 inline mr-1 text-green-600" />
                          VAT Reg: {formData.vatNumber}
                        </p>
                      )}
                      {formData.companyNumber && (
                        <p className="text-xs text-slate-600">Company No: {formData.companyNumber}</p>
                      )}
                      {formData.gasSafeNumber && (
                        <p className="text-xs text-slate-600">Gas Safe Reg: {formData.gasSafeNumber}</p>
                      )}
                      {formData.niceicNumber && (
                        <p className="text-xs text-slate-600">NICEIC Reg: {formData.niceicNumber}</p>
                      )}
                    </div>

                    {/* Invoice Details */}
                    <div className="flex justify-between">
                      <div>
                        <div className="text-lg font-bold text-slate-900 mb-2">INVOICE</div>
                        <div className="space-y-1 text-xs">
                          <p><span className="font-semibold">Invoice #:</span> {formData.invoiceNumber}</p>
                          <p><span className="font-semibold">Date:</span> {formatDateToUK(formData.invoiceDate)}</p>
                          {formData.dueDate && <p><span className="font-semibold">Due:</span> {formatDateToUK(formData.dueDate)}</p>}
                          {formData.poNumber && <p><span className="font-semibold">PO Number:</span> {formData.poNumber}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm text-slate-900 mb-2">Bill To:</div>
                        <p className="text-xs font-semibold text-slate-900">{formData.clientName || 'Client Name'}</p>
                        <p className="text-xs text-slate-600 whitespace-pre-line">{formData.clientAddress}</p>
                        {formData.clientVatNumber && (
                          <p className="text-xs text-slate-600 mt-1">VAT Reg: {formData.clientVatNumber}</p>
                        )}
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

                    {/* UK Totals with VAT and CIS */}
                    <div className="flex justify-end">
                      <div className="w-64 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>£{formData.subtotal.toFixed(2)}</span>
                        </div>
                        
                        {formData.reverseCharge ? (
                          <div className="flex justify-between text-blue-600 italic">
                            <span>VAT (Reverse Charge):</span>
                            <span>£0.00</span>
                          </div>
                        ) : formData.vatRate >= 0 ? (
                          <div className="flex justify-between">
                            <span>VAT ({getVATRateName(formData.vatRate)} - {formData.vatRate}%):</span>
                            <span>£{formData.vatAmount.toFixed(2)}</span>
                          </div>
                        ) : (
                          <div className="flex justify-between text-slate-500 italic">
                            <span>VAT Exempt:</span>
                            <span>£0.00</span>
                          </div>
                        )}
                        
                        {formData.discountAmount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-£{formData.discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between font-bold text-base border-t-2 border-slate-300 pt-2">
                          <span>Total (inc. VAT):</span>
                          <span>£{formData.totalAmount.toFixed(2)}</span>
                        </div>
                        
                        {formData.cisDeductionRate > 0 && (
                          <>
                            <div className="flex justify-between text-red-600 border-t border-slate-200 pt-2">
                              <span>CIS Deduction ({formData.cisDeductionRate}%):</span>
                              <span>-£{formData.cisDeductionAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base text-green-600 border-t-2 border-green-300 pt-2">
                              <span>Amount Due:</span>
                              <span>£{formData.amountDue.toFixed(2)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Payment Info */}
                    {formData.bankName && (
                      <div className="border-t border-slate-300 pt-4 text-xs">
                        <div className="font-semibold text-sm mb-2">Payment Information</div>
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
                        <div className="font-semibold text-sm mb-2">Notes</div>
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
    </>
  );
}
