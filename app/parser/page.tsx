'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
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
import { InvoiceData, PageState, PageAnalysis, LineItem } from '../types/invoice';
import { useLeadCapture } from '../hooks/useLeadCapture';
import LeadCaptureModal from '../components/LeadCaptureModal';
import { convertPdfToImages, isPdfFile } from '../utils/pdfToImage';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { useQuota } from '@/app/hooks/useQuota';
import { useRouter } from 'next/navigation';

// Lazy-load components
const UpgradePrompt = dynamic(
  () => import('@/app/components/monetization/UpgradePrompt'),
  { ssr: false }
);

const PageHero = dynamic(() => import('@/app/components/PageHero'), {
  loading: () => <div className="h-32 bg-gradient-to-br from-slate-50 to-blue-50 animate-pulse" />,
  ssr: true
});

const FeatureCard = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.FeatureCard })),
  { loading: () => <div className="h-40 bg-white rounded-xl animate-pulse" /> }
);

// Multi-page parsing components
const PageCarousel = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.PageCarousel })),
  { loading: () => <div className="h-96 bg-white rounded-xl animate-pulse" /> }
);

const PageResultCard = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.PageResultCard })),
  { loading: () => <div className="h-64 bg-white rounded-xl animate-pulse" /> }
);

const CombineResultsButton = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.CombineResultsButton })),
  { loading: () => <div className="h-32 bg-white rounded-xl animate-pulse" /> }
);

const SmartSuggestion = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.SmartSuggestion })),
  { loading: () => <div className="h-32 bg-white rounded-xl animate-pulse" /> }
);

const ParserResultsDisplay = dynamic(() =>
  import('../components/parser').then(mod => ({ default: mod.ParserResultsDisplay })),
  { loading: () => <div className="h-96 bg-white rounded-2xl animate-pulse" /> }
);

/**
 * Analyze if page 1 contains complete invoice data
 */
function analyzePageCompleteness(page1Data: InvoiceData): PageAnalysis {
  const tolerance = 0.01; // £0.01 tolerance for rounding

  // Check if totals match
  const calculatedTotal = page1Data.subtotal + page1Data.taxAmount;
  const totalDifference = Math.abs(calculatedTotal - page1Data.totalAmount);
  const totalsMatch = totalDifference < tolerance;

  if (totalsMatch) {
    return {
      isComplete: true,
      confidence: 0.95,
      suggestion: `Page 1 totals are balanced (Subtotal £${page1Data.subtotal.toFixed(2)} + Tax £${page1Data.taxAmount.toFixed(2)} = Total £${page1Data.totalAmount.toFixed(2)}). Invoice appears complete. Additional pages likely contain terms & conditions.`,
      type: 'success'
    };
  }

  // Check if line items seem incomplete
  const hasSuspiciousTotal = page1Data.totalAmount > calculatedTotal * 1.5;

  if (hasSuspiciousTotal) {
    return {
      isComplete: false,
      confidence: 0.3,
      suggestion: `Invoice total (£${page1Data.totalAmount.toFixed(2)}) significantly exceeds page 1 subtotal (£${calculatedTotal.toFixed(2)}). Line items likely continue on next pages. Recommend parsing page 2.`,
      type: 'warning',
      missingData: ['Line items', 'Accurate subtotal']
    };
  }

  return {
    isComplete: false,
    confidence: 0.6,
    suggestion: `Page 1 totals don't balance. Consider parsing additional pages to capture all line items.`,
    type: 'info'
  };
}

/**
 * Aggregate results from multiple parsed pages
 */
function combineInvoicePages(pages: PageState[]): InvoiceData {
  const parsedPages = pages.filter(p => p.result !== null);

  if (parsedPages.length === 0) {
    throw new Error('No parsed pages to combine');
  }

  if (parsedPages.length === 1) {
    return parsedPages[0].result!;
  }

  // Multi-page aggregation
  const page1 = parsedPages[0].result!;

  // Collect all line items
  const allLineItems: LineItem[] = [];
  const seenItems = new Set<string>();

  for (const page of parsedPages) {
    for (const item of page.result!.lineItems) {
      // Create unique key for deduplication
      const itemKey = `${item.description.trim()}-${item.unitPrice}-${item.quantity}`;

      if (!seenItems.has(itemKey)) {
        allLineItems.push(item);
        seenItems.add(itemKey);
      }
    }
  }

  // Recalculate totals
  const subtotal = allLineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxAmount = page1.taxAmount || 0;
  const totalAmount = subtotal + taxAmount;
  const confidence = Math.min(...parsedPages.map(p => p.result!.confidence));

  console.log('[Parser] Combined invoice data:', {
    pages: parsedPages.length,
    lineItems: allLineItems.length,
    subtotal,
    taxAmount,
    totalAmount
  });

  return {
    supplier: page1.supplier,
    invoiceNumber: page1.invoiceNumber,
    date: page1.date,
    dueDate: page1.dueDate,
    currency: page1.currency,
    lineItems: allLineItems,
    subtotal,
    taxAmount,
    totalAmount,
    confidence
  };
}

export default function InvoiceParser() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { checkQuota, decrementQuota, getRemaining, hasUnlimitedAccess } = useQuota();
  
  // Multi-page parsing state
  const [pages, setPages] = useState<PageState[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [combinedResult, setCombinedResult] = useState<InvoiceData | null>(null);
  const [isCombining, setIsCombining] = useState(false);
  const [pageAnalysis, setPageAnalysis] = useState<PageAnalysis | null>(null);
  
  // Legacy state (kept for compatibility)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [pendingPDFDownload, setPendingPDFDownload] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [demoParseUsed, setDemoParseUsed] = useState(false);

  // Check if demo parse has been used
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const used = localStorage.getItem('elektroluma_demo_parse_used');
      setDemoParseUsed(used === 'true');
    }
  }, []);

  // Lead capture hook
  const {
    showModal,
    openModal,
    closeModal,
    handleLeadSubmit,
    isLeadCaptureRequired,
  } = useLeadCapture({
    source: 'parser',
    metadata: { templateName: 'Invoice Parser' },
  });

  /**
   * Initialize pages from PDF file
   */
  const initializePagesFromPdf = useCallback(async (file: File) => {
    try {
      console.log('[Parser] Converting PDF to images...');
      const conversionResults = await convertPdfToImages(file);
      
      if (!conversionResults || conversionResults.length === 0) {
        throw new Error('Failed to convert PDF to images');
      }

      const newPages: PageState[] = conversionResults.map((result) => ({
        pageNumber: result.pageNumber,
        blob: result.blob!,
        previewUrl: URL.createObjectURL(result.blob!),
        uploadedUrl: null,
        status: 'pending' as const,
        result: null,
        error: null,
        parsedAt: null,
        imageSize: result.blob!.size
      }));

      setPages(newPages);
      setCurrentPageIndex(0);
      console.log(`[Parser] Initialized ${newPages.length} pages`);

      // Auto-parse if single page (backward compatibility)
      if (newPages.length === 1) {
        console.log('[Parser] Single-page PDF detected, auto-parsing...');
        setTimeout(() => parsePageIndividually(0, newPages), 500);
      }
    } catch (err) {
      console.error('[Parser] PDF conversion error:', err);
      setError(err instanceof Error ? err.message : 'Failed to convert PDF');
    }
  }, []);

  /**
   * Handle file selection
   */
  const handleFileSelect = useCallback((files: FileList | File[]) => {
    const file = files[0];
    if (!file) return;

    const validTypes = ['application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload PDF files only');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(`File is too large. Max size is 10MB`);
      return;
    }

    setSelectedFile(file);
    setError(null);
    setCombinedResult(null);
    setPageAnalysis(null);

    // Initialize pages from PDF
    if (isPdfFile(file)) {
      initializePagesFromPdf(file);
    }
  }, [initializePagesFromPdf]);

  // Drag handlers
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  /**
   * Parse individual page
   */
  const parsePageIndividually = useCallback(async (
    pageIndex: number,
    pagesArray?: PageState[]
  ) => {
    const currentPages = pagesArray || pages;
    const page = currentPages[pageIndex];

    // Quota check
    if (!user && demoParseUsed) {
      setError('Sign up to get 5 free invoice parses!');
      setShowUpgradePrompt(true);
      return;
    }

    if (user && !checkQuota('invoiceParses')) {
      setShowUpgradePrompt(true);
      setError('You\'ve used all 5 free parses. Upgrade for unlimited parsing!');
      return;
    }

    // Update status: uploading
    setPages(prev => prev.map((p, i) =>
      i === pageIndex ? { ...p, status: 'uploading' as const, error: null } : p
    ));

    try {
      // Upload to S3
      const fileBuffer = await page.blob.arrayBuffer();
      const uploadResult = await uploadToS3({
        fileBuffer,
        fileName: `page${page.pageNumber}.jpg`,
        contentType: 'image/jpeg'
      });

      if (!uploadResult.success || !uploadResult.imageUrl) {
        throw new Error(uploadResult.error || 'S3 upload failed');
      }

      setPages(prev => prev.map((p, i) =>
        i === pageIndex ? { ...p, uploadedUrl: uploadResult.imageUrl! } : p
      ));

      console.log(`[Parser] Page ${page.pageNumber} uploaded:`, uploadResult.imageUrl);

      // Update status: parsing
      setPages(prev => prev.map((p, i) =>
        i === pageIndex ? { ...p, status: 'parsing' as const } : p
      ));

      // Call backend API
      const response = await fetch(
        'https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUrls: [uploadResult.imageUrl] })
        }
      );

      const responseText = await response.text();
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${responseText}`);
      }

      const result = JSON.parse(responseText);
      const data = result.data || result;

      // Transform to InvoiceData
      const invoiceData: InvoiceData = {
        supplier: data.vendor?.name || data.supplier || 'Unknown Supplier',
        invoiceNumber: data.invoiceNumber || data.invoice_number || 'N/A',
        date: data.invoiceDate || data.date || new Date().toISOString().split('T')[0],
        dueDate: data.dueDate || data.due_date || data.invoiceDate || new Date().toISOString().split('T')[0],
        totalAmount: parseFloat(data.total || data.totalAmount || 0),
        currency: data.currency || 'GBP',
        lineItems: (data.items || data.lineItems || []).map((item: any) => ({
          description: item.description || item.name || 'Unknown Item',
          quantity: parseFloat(item.quantity || item.qty || 1),
          unitPrice: parseFloat(item.unitPrice || item.unit_price || item.price || 0),
          totalPrice: parseFloat(item.total || item.totalPrice || 0),
          category: item.category || 'General',
        })),
        taxAmount: parseFloat(data.tax || data.taxAmount || data.vat || 0),
        subtotal: parseFloat(data.subtotal || data.subTotal || 0),
        confidence: parseFloat(String(data.confidence || 0.95)),
      };

      // Update page with result
      setPages(prev => prev.map((p, i) =>
        i === pageIndex ? {
          ...p,
          status: 'complete' as const,
          result: invoiceData,
          parsedAt: new Date().toISOString(),
          error: null
        } : p
      ));

      // Decrement quota
      if (user) {
        await decrementQuota('invoiceParses', {
          pageNumber: page.pageNumber,
          invoiceNumber: invoiceData.invoiceNumber,
          supplier: invoiceData.supplier,
          totalAmount: invoiceData.totalAmount,
          timestamp: new Date().toISOString()
        });
      } else {
        localStorage.setItem('elektroluma_demo_parse_used', 'true');
        setDemoParseUsed(true);
      }

      // Analyze if page 1
      if (pageIndex === 0) {
        const analysis = analyzePageCompleteness(invoiceData);
        setPageAnalysis(analysis);
      }

      console.log(`[Parser] Page ${page.pageNumber} parsed successfully`);

    } catch (err) {
      console.error(`[Parser] Error parsing page ${page.pageNumber}:`, err);
      setPages(prev => prev.map((p, i) =>
        i === pageIndex ? {
          ...p,
          status: 'error' as const,
          error: err instanceof Error ? err.message : 'Parsing failed'
        } : p
      ));
    }
  }, [pages, user, demoParseUsed, checkQuota, decrementQuota]);

  /**
   * Combine multiple parsed pages
   */
  const handleCombinePages = useCallback(() => {
    setIsCombining(true);
    try {
      const combined = combineInvoicePages(pages);
      setCombinedResult(combined);
      console.log('[Parser] Pages combined successfully');
    } catch (err) {
      console.error('[Parser] Combination error:', err);
      setError(err instanceof Error ? err.message : 'Failed to combine pages');
    } finally {
      setIsCombining(false);
    }
  }, [pages]);

  /**
   * Reset parser
   */
  const resetParser = useCallback(() => {
    pages.forEach(page => {
      if (page.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(page.previewUrl);
      }
    });
    setPages([]);
    setSelectedFile(null);
    setCombinedResult(null);
    setPageAnalysis(null);
    setError(null);
    setCurrentPageIndex(0);
  }, [pages]);

  // Cleanup
  useEffect(() => {
    return () => {
      pages.forEach(page => {
        if (page.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(page.previewUrl);
        }
      });
    };
  }, [pages]);

  // PDF generation functions (kept from original)
  const copyToClipboard = useCallback(() => {
    const data = combinedResult || pages.find(p => p.result)?.result;
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [combinedResult, pages]);

  const downloadJSON = useCallback(() => {
    const data = combinedResult || pages.find(p => p.result)?.result;
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${data.invoiceNumber}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [combinedResult, pages]);

  const generateAndDownloadPDF = useCallback(async () => {
    const data = combinedResult || pages.find(p => p.result)?.result;
    if (!data) return;

    setGeneratingPDF(true);
    try {
      const result = await generatePDFInvoice(data);
      if (!result.success || !result.pdfBase64) {
        throw new Error(result.error || 'Failed to generate PDF');
      }

      const binaryString = atob(result.pdfBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.fileName!;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setPdfGenerated(true);
      setTimeout(() => setPdfGenerated(false), 3000);
      setTimeout(() => setShowUpgradePrompt(true), 2000);
    } catch (error) {
      console.error('[Parser] PDF generation error:', error);
      setError('Failed to generate PDF');
    } finally {
      setGeneratingPDF(false);
      setPendingPDFDownload(false);
    }
  }, [combinedResult, pages]);

  const handleGeneratePDF = useCallback(async () => {
    if (user) {
      await generateAndDownloadPDF();
      return;
    }
    if (isLeadCaptureRequired) {
      setPendingPDFDownload(true);
      openModal();
      return;
    }
    await generateAndDownloadPDF();
  }, [user, isLeadCaptureRequired, openModal, generateAndDownloadPDF]);

  const handleLeadCaptured = useCallback(async (data: any) => {
    await handleLeadSubmit(data);
    if (pendingPDFDownload) {
      await generateAndDownloadPDF();
    }
  }, [handleLeadSubmit, pendingPDFDownload, generateAndDownloadPDF]);

  const parsedCount = pages.filter(p => p.status === 'complete').length;
  const finalResult = combinedResult || (parsedCount === 1 ? pages[0].result : null);

  return (
    <>
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => {
          closeModal();
          setPendingPDFDownload(false);
        }}
        onSubmit={handleLeadCaptured}
        source="parser"
        metadata={{ templateName: 'Invoice Parser' }}
      />

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
                {!authLoading && user && (
                  <>
                    {hasUnlimitedAccess ? (
                      <span className="text-sm text-primary-600 font-semibold flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Unlimited Parses
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {getRemaining('invoiceParses')} / 5 parses remaining
                      </span>
                    )}
                    {!hasUnlimitedAccess && (
                      <Link
                        href="/pricing"
                        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition"
                      >
                        Upgrade
                      </Link>
                    )}
                  </>
                )}
                {!authLoading && !user && (
                  <>
                    {!demoParseUsed ? (
                      <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        1 Free Demo Parse
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">Demo used</span>
                    )}
                    <Link
                      href="/sign-up?redirect=/parser"
                      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition"
                    >
                      Sign Up for 5 Free
                    </Link>
                  </>
                )}
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
          <div className="space-y-6">
            {/* Upload Zone */}
            {pages.length === 0 && (
              <div
                className={`bg-white rounded-2xl border-2 border-dashed transition-all p-12 text-center ${
                  isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Drop PDF here or click to browse
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Support for multi-page invoices
                </p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer transition"
                >
                  Select PDF File
                </label>
                {error && (
                  <p className="text-sm text-red-600 mt-4">{error}</p>
                )}
              </div>
            )}

            {/* Page Carousel */}
            {pages.length > 0 && (
              <PageCarousel
                pages={pages}
                currentPageIndex={currentPageIndex}
                onPageSelect={setCurrentPageIndex}
                onParsePage={parsePageIndividually}
              />
            )}

            {/* Smart Suggestion (after page 1 parsed) */}
            {pageAnalysis && !combinedResult && (
              <SmartSuggestion
                analysis={pageAnalysis}
                onParseNext={() => pages.length > 1 && parsePageIndividually(1)}
                onSkip={() => setCombinedResult(pages[0].result!)}
              />
            )}

            {/* Individual Page Results */}
            {pages.map((page, idx) => (
              page.result && !combinedResult && (
                <PageResultCard
                  key={`result-${page.pageNumber}`}
                  page={page}
                  onReparse={() => parsePageIndividually(idx)}
                />
              )
            ))}

            {/* Combine Button */}
            {parsedCount > 1 && !combinedResult && (
              <CombineResultsButton
                pages={pages}
                onCombine={handleCombinePages}
                isCombining={isCombining}
              />
            )}

            {/* Final Results */}
            {finalResult && (
              <ParserResultsDisplay
                invoiceData={finalResult}
                copied={copied}
                generatingPDF={generatingPDF}
                pdfGenerated={pdfGenerated}
                onReset={resetParser}
                onCopyJSON={copyToClipboard}
                onDownloadJSON={downloadJSON}
                onGeneratePDF={handleGeneratePDF}
              />
            )}

            {/* Features */}
            {pages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <FeatureCard icon={Zap} title="Lightning Fast" description="Process invoices in under 5 seconds" />
                <FeatureCard icon={CheckCircle} title="99% Accurate" description="AI-powered extraction" />
                <FeatureCard icon={Database} title="Auto-Integrate" description="Export to QuickBooks, Xero" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
