'use client';

import { useState, useCallback, useRef, useEffect, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle,
  Download,
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
import { uploadToS3 } from '../actions/uploadToS3';
import { generatePDFInvoice } from '../actions/generatePDF';
import { InvoiceData } from '../types/invoice';
import { type ProcessingStep } from '../components/parser';

// Dynamic imports for code splitting
const PageHero = dynamic(() => import('@/app/components/PageHero'), {
  loading: () => <div className="h-32 bg-gradient-to-br from-slate-50 to-blue-50 animate-pulse" />,
  ssr: true
});

const FeatureCard = dynamic(() => 
  import('../components/parser').then(mod => ({ default: mod.FeatureCard })),
  { loading: () => <div className="h-40 bg-white rounded-xl animate-pulse" /> }
);

const ExportButton = dynamic(() => 
  import('../components/parser').then(mod => ({ default: mod.ExportButton })),
  { loading: () => <div className="h-20 bg-white rounded-lg animate-pulse" /> }
);

const ProcessingSteps = dynamic(() => 
  import('../components/parser').then(mod => ({ default: mod.ProcessingSteps })),
  { loading: () => <div className="h-64 bg-white rounded-xl animate-pulse" /> }
);

const InvoiceDataDisplay = dynamic(() => 
  import('../components/parser').then(mod => ({ default: mod.InvoiceDataDisplay })),
  { loading: () => <div className="h-96 bg-white rounded-xl animate-pulse" /> }
);





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
    // Validate file type - prioritize images
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an image file (JPG, PNG, WEBP) or PDF');
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
      reader.onerror = () => {
        setError('Failed to read file');
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

  // Process invoice with real API and S3 upload
  const processInvoice = useCallback(async () => {
    if (!selectedFile) return;

    setProcessing(true);
    setError(null);
    setCurrentStep('upload');

    try {
      // Step 1: Upload file to S3 (using secure server action)
      setCurrentStep('upload');
      console.log('Starting S3 upload for file:', selectedFile.name);
      
      // Convert file to buffer for server action
      const fileBuffer = await selectedFile.arrayBuffer();
      
      // Call server action to upload (credentials stay server-side)
      const uploadResult = await uploadToS3({
        fileBuffer,
        fileName: selectedFile.name,
        contentType: selectedFile.type,
      });
      
      if (!uploadResult.success || !uploadResult.imageUrl) {
        throw new Error(uploadResult.error || 'Failed to upload file to S3');
      }
      
      const imageUrl = uploadResult.imageUrl;
      console.log('Successfully uploaded to S3:', imageUrl);

      // Step 2: Send S3 URL to API
      setCurrentStep('ocr');
      
      const apiPayload = {
        imageUrl: imageUrl
      };

      console.log('Sending to API with S3 URL:', apiPayload);

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
  // Cleanup effect for preview URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Add pageshow event listener for back/forward cache support
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // If page was loaded from cache, ensure state is correct
      if (event.persisted) {
        console.log('[BFCache] Page restored from cache');
        // Reset any pending states that might have been interrupted
        if (processing) {
          setProcessing(false);
        }
        if (generatingPDF) {
          setGeneratingPDF(false);
        }
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [processing, generatingPDF]);

  const resetParser = useCallback(() => {
    // Clean up preview URL before resetting
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    
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
  }, [previewUrl]);

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

  // Generate and Download PDF Invoice (using server action)
  const handleGeneratePDF = useCallback(async () => {
    if (!invoiceData) return;

    setGeneratingPDF(true);

    try {
      console.log('[Client] Calling server action to generate PDF');
      
      const result = await generatePDFInvoice(invoiceData);
      
      if (!result.success || !result.pdfBase64 || !result.fileName) {
        throw new Error(result.error || 'Failed to generate PDF');
      }
      
      // Convert base64 to blob and trigger download
      const binaryString = atob(result.pdfBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('[Client] PDF downloaded successfully:', result.fileName);
      setPdfGenerated(true);
      setTimeout(() => setPdfGenerated(false), 3000);
    } catch (error) {
      console.error('[Client] PDF generation error:', error);
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

      <PageHero
        badge="AI-Powered Invoice Parser"
        badgeIcon={Sparkles}
        title={<>Invoice Parser <span className="gradient-text">Tool</span></>}
        description="Upload your invoice and watch AI extract all data in seconds"
        size="compact"
        stats={[
          { icon: Zap, label: '< 30 Seconds', color: 'text-blue-500' },
          { icon: CheckCircle, label: '99% Accurate', color: 'text-green-500' },
          { icon: Clock, label: '20 hrs/week Saved', color: 'text-purple-500' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

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
                    accept="image/jpeg,image/jpg,image/png,image/webp,.pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {!selectedFile ? (
                    <>
                      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Drop invoice image here or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, WEBP, PDF (max 10MB)
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
                      onClick={handleGeneratePDF}
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








