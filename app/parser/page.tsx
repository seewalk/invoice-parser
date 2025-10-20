'use client';

import { useState, useCallback, useRef, useEffect, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Sparkles,
  CheckCircle,
  Clock,
  Database,
  Zap,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { uploadToS3 } from '../actions/UploadToS3';
import { generatePDFInvoice } from '../actions/generatePDF';
import { InvoiceData } from '../types/invoice';
import { type ProcessingStep } from '../components/parser';
import { useLeadCapture } from '../hooks/useLeadCapture';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { convertPdfToImage, convertPdfToImages, isPdfFile, isImageFile } from '../utils/pdfToImage';

// Lazy-load UpgradePrompt for performance
const UpgradePrompt = dynamic(
  () => import('@/app/components/monetization/UpgradePrompt'),
  { ssr: false }
);

// Dynamic imports for code splitting
const PageHero = dynamic(() => import('@/app/components/PageHero'), {
  loading: () => <div className="h-32 bg-gradient-to-br from-slate-50 to-blue-50 animate-pulse" />,
  ssr: true
});

const FeatureCard = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.FeatureCard })),
  { loading: () => <div className="h-40 bg-white rounded-xl animate-pulse" /> }
);

const ProcessingSteps = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.ProcessingSteps })),
  { loading: () => <div className="h-64 bg-white rounded-xl animate-pulse" /> }
);

const ParserUploadZone = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.ParserUploadZone })),
  { loading: () => <div className="h-96 bg-white rounded-2xl animate-pulse" /> }
);

const ParserResultsDisplay = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.ParserResultsDisplay })),
  { loading: () => <div className="h-96 bg-white rounded-2xl animate-pulse" /> }
);





export default function InvoiceParser() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('upload');
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pendingPDFDownload, setPendingPDFDownload] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Lead capture hook
  const {
    showModal,
    openModal,
    closeModal,
    handleLeadSubmit,
    hasSubmittedLead,
    isLeadCaptureRequired,
  } = useLeadCapture({
    source: 'parser',
    metadata: {
      templateName: 'Invoice Parser',
    },
  });

  // Handle file selection (supports multiple files)
  const handleFileSelect = useCallback((files: FileList | File[]) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    const fileArray = Array.from(files);
    
    // Validate all files
    for (const file of fileArray) {
      if (!validTypes.includes(file.type)) {
        setError('Please upload image files (JPG, PNG, WEBP) or PDFs only');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} is too large. Max size is 10MB`);
        return;
      }
    }

    setSelectedFiles(fileArray);
    setError(null);

    // Create previews for image files
    const newPreviewUrls: string[] = [];
    let loadedCount = 0;

    fileArray.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviewUrls[index] = e.target?.result as string;
          loadedCount++;
          if (loadedCount === fileArray.filter(f => f.type.startsWith('image/')).length) {
            setPreviewUrls(newPreviewUrls.filter(url => url)); // Remove undefined entries
          }
        };
        reader.onerror = () => {
          setError('Failed to read file');
        };
        reader.readAsDataURL(file);
      }
    });

    // If no images, clear preview URLs
    if (fileArray.every(f => !f.type.startsWith('image/'))) {
      setPreviewUrls([]);
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
        handleFileSelect(files);
      }
    },
    [handleFileSelect]
  );



  // Process invoice with real API and S3 upload
  const processInvoice = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    setProcessing(true);
    setError(null);
    setCurrentStep('upload');

    try {
      // Step 1: Process all selected files (PDFs and images)
      let imagesToUpload: File[] = [];

      for (const file of selectedFiles) {
        if (isPdfFile(file)) {
          console.log('[Parser] PDF detected, converting all pages to images...');
          
          const conversionResults = await convertPdfToImages(file);
          
          if (!conversionResults || conversionResults.length === 0) {
            throw new Error(`Failed to convert PDF ${file.name} to images`);
          }

          console.log(`[Parser] PDF converted successfully: ${conversionResults.length} page(s)`, {
            originalSize: file.size,
            fileName: file.name,
            pages: conversionResults.map(r => ({
              page: r.pageNumber,
              size: r.blob?.size || 0,
              fileName: r.fileName
            }))
          });

          // Create File objects from blobs and add to upload list
          const pdfImages = conversionResults
            .filter(result => result.blob && result.fileName)
            .map(result => 
              new File([result.blob!], result.fileName!, {
                type: 'image/jpeg'
              })
            );
          imagesToUpload.push(...pdfImages);
        } else {
          console.log('[Parser] Image file detected, no conversion needed:', file.name);
          imagesToUpload.push(file);
        }
      }

      console.log(`[Parser] Total images to upload: ${imagesToUpload.length}`);

      // Step 2: Upload each image to S3 sequentially
      setCurrentStep('upload');
      console.log(`Starting S3 upload for ${imagesToUpload.length} image(s)`);

      const imageUrls: string[] = [];
      
      for (let i = 0; i < imagesToUpload.length; i++) {
        const imageFile = imagesToUpload[i];
        console.log(`Uploading image ${i + 1}/${imagesToUpload.length}:`, imageFile.name);

        // Convert file to buffer for server action
        const fileBuffer = await imageFile.arrayBuffer();

        // Call server action to upload (credentials stay server-side)
        const uploadResult = await uploadToS3({
          fileBuffer,
          fileName: imageFile.name,
          contentType: 'image/jpeg',
        });

        if (!uploadResult.success || !uploadResult.imageUrl) {
          throw new Error(uploadResult.error || `Failed to upload image ${i + 1} to S3`);
        }

        imageUrls.push(uploadResult.imageUrl);
        console.log(`Successfully uploaded image ${i + 1}/${imagesToUpload.length} to S3:`, uploadResult.imageUrl);
      }

      console.log('All images uploaded to S3:', imageUrls);

      // Step 3: Send S3 URLs array to API
      setCurrentStep('ocr');

      const apiPayload = {
        imageUrls: imageUrls
      };

      console.log('Sending to API with S3 URLs:', apiPayload);

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

      // Step 4: Parse response
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
  }, [selectedFiles]);

  // Reset function
  // Cleanup effect for preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

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
    // Clean up preview URLs before resetting
    previewUrls.forEach(url => {
      if (url && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    setSelectedFiles([]);
    setPreviewUrls([]);
    setInvoiceData(null);
    setError(null);
    setCurrentStep('upload');
    setProcessing(false);
    setGeneratingPDF(false);
    setPdfGenerated(false);
  }, [previewUrls]);

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
  // This is the actual PDF generation logic, called after lead capture
  const generateAndDownloadPDF = useCallback(async () => {
    console.log('[Parser] Generating PDF from parsed invoice data');
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
      
      // Show upgrade prompt 2 seconds after download
      setTimeout(() => {
        setShowUpgradePrompt(true);
      }, 2000);
    } catch (error) {
      console.error('[Client] PDF generation error:', error);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPDF(false);
      setPendingPDFDownload(false);
    }
  }, [invoiceData]);

  /**
   * Handle PDF download button click
   * Intercepts to show lead capture modal if needed
   */
  const handleGeneratePDF = useCallback(async () => {
    // Check if we need to capture lead first
    if (isLeadCaptureRequired) {
      console.log('[Parser] Lead capture required, showing modal');
      setPendingPDFDownload(true);
      openModal();
      return;
    }

    // User has already submitted lead, proceed with download
    console.log('[Parser] Lead already captured, proceeding with PDF generation');
    await generateAndDownloadPDF();
  }, [isLeadCaptureRequired, openModal, generateAndDownloadPDF]);

  /**
   * Handle lead submission from modal
   * After successful submission, trigger the PDF download
   */
  const handleLeadCaptured = useCallback(
    async (data: any) => {
      console.log('[Parser] Lead captured, proceeding with PDF generation');
      await handleLeadSubmit(data);

      // Lead is captured, now generate and download PDF
      if (pendingPDFDownload) {
        await generateAndDownloadPDF();
      }
    },
    [handleLeadSubmit, pendingPDFDownload, generateAndDownloadPDF]
  );

  return (
    <>
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => {
          closeModal();
          setPendingPDFDownload(false);
        }}
        onSubmit={handleLeadCaptured}
        source="parser"
        metadata={{
          templateName: 'Invoice Parser',
        }}
      />

      {/* Upgrade Prompt Modal (shown 2s after successful download) */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        source="parser"
        templateName="Invoice Parser"
      />

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
          {!invoiceData && (
            <ParserUploadZone
              selectedFiles={selectedFiles}
              previewUrls={previewUrls}
              processing={processing}
              error={error}
              isDragging={isDragging}
              onFileSelect={handleFileSelect}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onProcess={processInvoice}
              onReset={resetParser}
            />
          )}

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
              <ParserResultsDisplay
                invoiceData={invoiceData}
                copied={copied}
                generatingPDF={generatingPDF}
                pdfGenerated={pdfGenerated}
                onReset={resetParser}
                onCopyJSON={copyToClipboard}
                onDownloadJSON={downloadJSON}
                onGeneratePDF={handleGeneratePDF}
              />
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
    </>
  );
}
