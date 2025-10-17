'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle,
  Download,
  X,
  AlertCircle,
  Clock,
  TrendingUp,
  Database,
  Zap,
  Eye,
  Copy,
  Check,
  ArrowLeft,
  FileCheck,
  Loader2,
  RefreshCw,
  FilePlus,
} from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
interface InvoiceData {
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

type ProcessingStep = 'upload' | 'ocr' | 'parsing' | 'complete';

export default function InvoiceParser() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('upload');
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or image file (JPG, PNG)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, []);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  // File input change handler
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  // Process invoice with real API
  const processInvoice = useCallback(async () => {
    if (!selectedFile) return;

    setProcessing(true);
    setError(null);
    setCurrentStep('upload');

    try {
      // Step 1: Upload file to S3
      setCurrentStep('upload');
      
      // First, we need to upload the file to S3 and get the URL
      // For now, we'll convert the file to base64 and send it
      // In production, you should upload to S3 first, then send the URL
      
      const reader = new FileReader();
      const fileDataPromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const fileData = await fileDataPromise;

      // Step 2: Send to API with the correct format
      setCurrentStep('ocr');
      
      // For demo purposes, we'll use the test image URL
      // In production, upload to S3 first, then use that URL
      const apiPayload = {
        imageUrl: 'https://invoice-parser-images.s3.eu-west-2.amazonaws.com/fakeinvoice2.jpg'
        // TODO: Replace with actual uploaded file URL after S3 upload
        // imageUrl: uploadedS3Url
      };

      console.log('Sending to API:', apiPayload);

      const response = await fetch(
        'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiPayload),
        }
      );

      const responseText = await response.text();
      console.log('API Response:', responseText);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText} - ${responseText}`);
      }

      // Step 3: Parse response
      setCurrentStep('parsing');
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse API response:', responseText);
        throw new Error('Invalid API response format');
      }

      console.log('Parsed result:', result);

      // Extract data from response (handle nested structure)
      const data = result.data || result;

      // Transform API response to our InvoiceData format
      const invoiceData: InvoiceData = {
        supplier: data.vendor?.name || data.supplier || data.vendor || data.seller || 'Unknown Supplier',
        invoiceNumber: data.invoiceNumber || data.invoice_number || data.number || data.invoiceNo || 'N/A',
        date: data.invoiceDate || data.date || data.invoice_date || new Date().toISOString().split('T')[0],
        dueDate: data.dueDate || data.due_date || data.paymentDue || data.invoiceDate || data.date || new Date().toISOString().split('T')[0],
        totalAmount: parseFloat(data.total || data.totalAmount || data.total_amount || data.grandTotal || data.amountDue || 0),
        currency: data.currency || 'GBP',
        lineItems: (data.items || data.lineItems || data.line_items || data.products || []).map((item: any) => ({
          description: item.description || item.name || item.item || item.product || 'Unknown Item',
          quantity: parseFloat(item.quantity || item.qty || item.amount || 1),
          unitPrice: parseFloat(item.unitPrice || item.unit_price || item.price || item.rate || 0),
          totalPrice: parseFloat(item.total || item.totalPrice || item.total_price || item.amount || item.lineTotal || 0),
          category: item.category || item.type || item.class || 'General',
        })),
        taxAmount: parseFloat(data.tax || data.taxAmount || data.tax_amount || data.vat || data.VAT || 0),
        subtotal: parseFloat(data.subtotal || data.subTotal || data.sub_total || data.netAmount || 0),
        confidence: parseFloat(String(data.confidence || data.accuracy || data.score || (result.success ? 0.95 : 0.50))),
      };

      console.log('Transformed invoice data:', invoiceData);

      setInvoiceData(invoiceData);
      setCurrentStep('complete');
    } catch (err) {
      console.error('Invoice processing error:', err);
      setError(
        err instanceof Error 
          ? `Failed to process invoice: ${err.message}` 
          : 'Failed to process invoice. Please try again.'
      );
      setCurrentStep('upload');
    } finally {
      setProcessing(false);
    }
  }, [selectedFile]);

  // Reset function
  const resetParser = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setInvoiceData(null);
    setError(null);
    setCurrentStep('upload');
    setProcessing(false);
    setGeneratingPDF(false);
    setPdfGenerated(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Copy JSON to clipboard
  const copyToClipboard = useCallback(() => {
    if (invoiceData) {
      navigator.clipboard.writeText(JSON.stringify(invoiceData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [invoiceData]);

  // Download JSON
  const downloadJSON = useCallback(() => {
    if (invoiceData) {
      const blob = new Blob([JSON.stringify(invoiceData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceData.invoiceNumber}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [invoiceData]);

  // Generate and Download PDF Invoice
  const generatePDFInvoice = useCallback(() => {
    if (!invoiceData) return;

    setGeneratingPDF(true);

    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Company/Logo Header
      doc.setFillColor(37, 99, 235); // Primary blue
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', 15, 25);
      
      // Invoice metadata in header
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 150, 15, { align: 'right' });
      doc.text(`Date: ${invoiceData.date}`, 150, 22, { align: 'right' });
      doc.text(`Due Date: ${invoiceData.dueDate}`, 150, 29, { align: 'right' });
      
      // Supplier Information
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('From:', 15, 55);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(invoiceData.supplier, 15, 62);
      
      // Bill To section (placeholder - can be enhanced)
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Bill To:', 15, 75);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text('Your Company Name', 15, 82);
      
      // Line Items Table
      const tableData = invoiceData.lineItems.map(item => [
        item.description,
        item.category,
        item.quantity.toString(),
        `${invoiceData.currency} ${item.unitPrice.toFixed(2)}`,
        `${invoiceData.currency} ${item.totalPrice.toFixed(2)}`
      ]);
      
      autoTable(doc, {
        startY: 95,
        head: [['Description', 'Category', 'Qty', 'Unit Price', 'Total']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        columnStyles: {
          0: { cellWidth: 60 },
          1: { cellWidth: 35 },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 35, halign: 'right' },
          4: { cellWidth: 35, halign: 'right' },
        },
        margin: { left: 15, right: 15 },
      });
      
      // Get the final Y position after the table
      const finalY = (doc as any).lastAutoTable.finalY || 95;
      
      // Totals Section
      const totalsStartY = finalY + 10;
      const rightAlign = 195;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      
      // Subtotal
      doc.text('Subtotal:', rightAlign - 50, totalsStartY, { align: 'right' });
      doc.text(`${invoiceData.currency} ${invoiceData.subtotal.toFixed(2)}`, rightAlign, totalsStartY, { align: 'right' });
      
      // Tax
      doc.text('Tax:', rightAlign - 50, totalsStartY + 7, { align: 'right' });
      doc.text(`${invoiceData.currency} ${invoiceData.taxAmount.toFixed(2)}`, rightAlign, totalsStartY + 7, { align: 'right' });
      
      // Total (Bold and larger)
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.text('TOTAL:', rightAlign - 50, totalsStartY + 17, { align: 'right' });
      doc.text(`${invoiceData.currency} ${invoiceData.totalAmount.toFixed(2)}`, rightAlign, totalsStartY + 17, { align: 'right' });
      
      // Confidence Score Badge
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`AI Confidence: ${(invoiceData.confidence * 100).toFixed(1)}%`, 15, totalsStartY + 20);
      
      // Footer
      doc.setTextColor(150, 150, 150);
      doc.setFontSize(8);
      doc.text('Generated by InvoiceParse.ai - AI-Powered Invoice Processing', 105, 285, { align: 'center' });
      
      // Save the PDF
      doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
      
      setPdfGenerated(true);
      setTimeout(() => setPdfGenerated(false), 3000);
    } catch (error) {
      console.error('PDF generation error:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPDF(false);
    }
  }, [invoiceData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5 text-primary-600" />
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">InvoiceParse.ai</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Free Trial: 10 invoices remaining</span>
              <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Invoice Parser <span className="gradient-text">Tool</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your invoice and watch AI extract all data in seconds
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Upload & Preview */}
          <div className="space-y-6">
            {/* Upload Area */}
            {!invoiceData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-2 text-primary-600" />
                  Upload Invoice
                </h2>

                {/* Drag & Drop Zone */}
                <div
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {!selectedFile ? (
                    <>
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Drop invoice here or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports PDF, JPG, PNG (max 10MB)
                      </p>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <FileCheck className="w-16 h-16 text-green-500 mx-auto" />
                      <div>
                        <p className="text-lg font-semibold text-gray-900 mb-1">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetParser();
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </motion.div>
                )}

                {/* Process Button */}
                {selectedFile && !processing && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={processInvoice}
                    className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Process Invoice</span>
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* File Preview */}
            {selectedFile && previewUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary-600" />
                  Preview
                </h3>
                <img
                  src={previewUrl}
                  alt="Invoice preview"
                  className="w-full rounded-lg border border-gray-200"
                />
              </motion.div>
            )}
          </div>

          {/* Right Side - Processing & Results */}
          <div className="space-y-6">
            {/* Processing Steps */}
            {(processing || invoiceData) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-primary-600" />
                  Processing Status
                </h2>

                <ProcessingSteps currentStep={currentStep} processing={processing} />
              </motion.div>
            )}

            {/* Results */}
            {invoiceData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                    Extracted Data
                  </h2>
                  <button
                    onClick={resetParser}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center space-x-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Process Another</span>
                  </button>
                </div>

                {/* Confidence Score */}
                <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Confidence Score
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {(invoiceData.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${invoiceData.confidence * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                    />
                  </div>
                </div>

                {/* Invoice Summary */}
                <InvoiceDataDisplay data={invoiceData} />

                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center space-x-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadJSON}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </div>

                {/* PDF Invoice Generation */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center">
                          <FilePlus className="w-5 h-5 mr-2 text-blue-600" />
                          Professional Invoice PDF
                        </h3>
                        <p className="text-sm text-gray-600">
                          Generate a formatted PDF invoice from extracted data
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={generatePDFInvoice}
                      disabled={generatingPDF}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                        generatingPDF
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : pdfGenerated
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:-translate-y-1'
                      }`}
                    >
                      {generatingPDF ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Generating PDF...</span>
                        </>
                      ) : pdfGenerated ? (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          <span>PDF Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-6 h-6" />
                          <span>Generate PDF Invoice</span>
                        </>
                      )}
                    </button>
                    
                    <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Professional layout with line items, totals, and branding</span>
                    </div>
                  </div>
                </div>

                {/* Export Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Export To:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ExportButton icon={Database} label="QuickBooks" />
                    <ExportButton icon={Database} label="Xero" />
                    <ExportButton icon={TrendingUp} label="POS System" />
                    <ExportButton icon={FileText} label="CSV Export" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Features Banner */}
        {!processing && !invoiceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Process invoices in under 5 seconds"
            />
            <FeatureCard
              icon={CheckCircle}
              title="99% Accurate"
              description="AI-powered extraction with high confidence"
            />
            <FeatureCard
              icon={Database}
              title="Auto-Integrate"
              description="Export to QuickBooks, Xero, and more"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Processing Steps Component
function ProcessingSteps({
  currentStep,
  processing,
}: {
  currentStep: ProcessingStep;
  processing: boolean;
}) {
  const steps = [
    { id: 'upload', label: 'Uploading', icon: Upload, duration: '0.8s' },
    { id: 'ocr', label: 'OCR Processing', icon: FileText, duration: '1.5s' },
    { id: 'parsing', label: 'AI Parsing', icon: Sparkles, duration: '1.8s' },
    { id: 'complete', label: 'Complete', icon: CheckCircle, duration: '0s' },
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isActive = index === stepIndex && processing;
        const isComplete = index < stepIndex || (index === stepIndex && !processing);
        const isPending = index > stepIndex;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all ${
              isActive
                ? 'border-primary-500 bg-primary-50'
                : isComplete
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isActive
                  ? 'bg-primary-600 animate-pulse'
                  : isComplete
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            >
              {isActive ? (
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              ) : (
                <step.icon className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`font-semibold ${
                  isActive
                    ? 'text-primary-700'
                    : isComplete
                    ? 'text-green-700'
                    : 'text-gray-600'
                }`}
              >
                {step.label}
              </h3>
              <p className="text-sm text-gray-500">
                {isActive
                  ? `Processing... (~${step.duration})`
                  : isComplete
                  ? 'Completed ✓'
                  : 'Pending'}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Invoice Data Display Component
function InvoiceDataDisplay({ data }: { data: InvoiceData }) {
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

// Export Button Component
function ExportButton({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50 transition-all group">
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 mx-auto mb-1" />
      <span className="text-xs font-medium text-gray-700 group-hover:text-primary-700">
        {label}
      </span>
    </button>
  );
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
