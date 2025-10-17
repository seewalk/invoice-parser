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
} from 'lucide-react';
import Link from 'next/link';

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
      // Step 1: Upload
      setCurrentStep('upload');
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Step 2: Call the API
      setCurrentStep('ocr');
      
      const response = await fetch(
        'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // Step 3: Parse response
      setCurrentStep('parsing');
      
      const result = await response.json();

      // Transform API response to our InvoiceData format
      // Adjust this mapping based on your actual API response structure
      const invoiceData: InvoiceData = {
        supplier: result.supplier || result.vendor || 'Unknown Supplier',
        invoiceNumber: result.invoiceNumber || result.invoice_number || result.number || 'N/A',
        date: result.date || result.invoice_date || new Date().toISOString().split('T')[0],
        dueDate: result.dueDate || result.due_date || result.date || new Date().toISOString().split('T')[0],
        totalAmount: parseFloat(result.total || result.totalAmount || result.total_amount || 0),
        currency: result.currency || 'GBP',
        lineItems: (result.lineItems || result.line_items || result.items || []).map((item: any) => ({
          description: item.description || item.name || item.item || 'Unknown Item',
          quantity: parseFloat(item.quantity || item.qty || 1),
          unitPrice: parseFloat(item.unitPrice || item.unit_price || item.price || 0),
          totalPrice: parseFloat(item.totalPrice || item.total_price || item.total || item.amount || 0),
          category: item.category || item.type || 'General',
        })),
        taxAmount: parseFloat(result.tax || result.taxAmount || result.tax_amount || 0),
        subtotal: parseFloat(result.subtotal || result.subTotal || result.sub_total || 0),
        confidence: parseFloat(result.confidence || result.accuracy || 0.95),
      };

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
