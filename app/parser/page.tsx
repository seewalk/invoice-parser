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
import { 
  aggregateInvoicePages, 
  detectPageType, 
  validateAggregatedInvoice,
  formatAggregationMetadata,
  type PageResult
} from '../utils/invoiceAggregator';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { useQuota } from '@/app/hooks/useQuota';
import { useRouter } from 'next/navigation';
import { usePhaseProgress, INVOICE_PROCESSING_PHASES } from '@/app/hooks/useSmartProgress';

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
  const router = useRouter();
  const { user, loading: authLoading, userQuotas } = useAuth();
  const { checkQuota, decrementQuota, getRemaining, hasUnlimitedAccess } = useQuota();
  
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
  const [demoParseUsed, setDemoParseUsed] = useState(false);
  
  // Multi-page processing state
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageResults, setPageResults] = useState<PageResult[]>([]);
  const [processingProgress, setProcessingProgress] = useState(0);
  
  // Smart progress hook for smooth Google Drive-style loading
  const { 
    progress: smoothProgress, 
    currentPhase, 
    startPhase, 
    completePhase,
    resetProgress: resetSmartProgress 
  } = usePhaseProgress();

  // Check if demo parse has been used (localStorage)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const used = localStorage.getItem('elektroluma_demo_parse_used');
      setDemoParseUsed(used === 'true');
    }
  }, []);

  // Lead capture hook (only for demo/anonymous users)
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



  /**
   * Helper function: Parse a single page via API
   * This is called sequentially for each page
   */
  const parseSinglePage = async (imageUrl: string, pageNumber: number, totalPages: number): Promise<PageResult> => {
    const pageStartTime = Date.now();
    
    console.log(`[Parser] Processing page ${pageNumber}/${totalPages}:`, imageUrl);
    
    try {
      // API call with SINGLE URL (array with one element)
      const apiPayload = {
        imageUrls: [imageUrl]  // Backend expects array, but with only 1 URL
      };

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
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('[Parser] Failed to parse API response:', responseText);
        throw new Error('Invalid API response format');
      }

      // Extract data from response (handle nested structure)
      const data = result.data || result;

      // Transform API response to InvoiceData format
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

      const processingTime = Date.now() - pageStartTime;
      
      // Detect page type for aggregation
      const pageType = detectPageType(invoiceData, pageNumber, totalPages);
      
      console.log(`[Parser] Page ${pageNumber}/${totalPages} parsed successfully`, {
        pageType,
        lineItems: invoiceData.lineItems.length,
        confidence: invoiceData.confidence,
        processingTime: `${processingTime}ms`
      });

      return {
        pageNumber,
        data: invoiceData,
        pageType,
        imageUrl,
        processingTime
      };
      
    } catch (err) {
      const processingTime = Date.now() - pageStartTime;
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      console.error(`[Parser] Failed to parse page ${pageNumber}/${totalPages}:`, errorMessage);
      
      // Return error result (will be handled by aggregator)
      return {
        pageNumber,
        data: {
          supplier: 'Error',
          invoiceNumber: 'Error',
          date: new Date().toISOString().split('T')[0],
          dueDate: new Date().toISOString().split('T')[0],
          totalAmount: 0,
          currency: 'GBP',
          lineItems: [],
          taxAmount: 0,
          subtotal: 0,
          confidence: 0
        },
        pageType: 'continuation',
        imageUrl,
        processingTime,
        error: errorMessage
      };
    }
  };

  /**
   * Main processing function: Sequential multi-page invoice parsing
   * with client-side aggregation
   */
  const processInvoice = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    // 🎁 DEMO MODE: Allow 1 free parse without login
    if (!user) {
      if (demoParseUsed) {
        console.log('[Parser] Demo parse already used, require sign-in');
        setError('Sign up to get 5 free invoice parses!');
        setShowUpgradePrompt(true);
        return;
      }
      console.log('[Parser] Allowing demo parse (1 free without login)');
    } else {
      // 🎫 QUOTA CHECK: For authenticated users, check quota
      if (!checkQuota('invoiceParses')) {
        console.log('[Parser] No quota remaining, showing upgrade prompt');
        setShowUpgradePrompt(true);
        setError('You\'ve used all 5 free parses. Upgrade for unlimited parsing!');
        return;
      }
      console.log('[Parser] Quota check passed, proceeding with processing');
    }

    setProcessing(true);
    setError(null);
    setCurrentStep('upload');
    setPageResults([]);
    setCurrentPage(0);
    setProcessingProgress(0);
    
    // Initialize smooth progress
    resetSmartProgress();
    startPhase('initializing');

    try {
      console.log('═══════════════════════════════════════════════════════');
      console.log('🚀 SEQUENTIAL MULTI-PAGE PARSER - Production Mode');
      console.log('═══════════════════════════════════════════════════════');

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // PHASE 1: PDF/Image Conversion & Preparation
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      startPhase('converting');
      let imagesToUpload: File[] = [];

      for (const file of selectedFiles) {
        if (isPdfFile(file)) {
          console.log('[Phase 1] PDF detected, converting all pages to images...');
          
          const conversionResults = await convertPdfToImages(file);
          
          if (!conversionResults || conversionResults.length === 0) {
            throw new Error(`Failed to convert PDF ${file.name} to images`);
          }

          console.log(`[Phase 1] ✓ PDF converted: ${conversionResults.length} page(s)`);

          const pdfImages = conversionResults
            .filter(result => result.blob && result.fileName)
            .map(result => 
              new File([result.blob!], result.fileName!, {
                type: 'image/jpeg'
              })
            );
          imagesToUpload.push(...pdfImages);
        } else {
          console.log('[Phase 1] Image file detected:', file.name);
          imagesToUpload.push(file);
        }
      }

      const totalPagesCount = imagesToUpload.length;
      setTotalPages(totalPagesCount);
      
      console.log(`[Phase 1] ✓ Total pages to process: ${totalPagesCount}`);

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // PHASE 2: S3 Upload (All Pages)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      startPhase('uploading');
      setCurrentStep('upload');
      console.log('[Phase 2] Starting S3 upload for all pages...');

      const imageUrls: string[] = [];
      
      for (let i = 0; i < imagesToUpload.length; i++) {
        const imageFile = imagesToUpload[i];
        const pageNum = i + 1;
        
        console.log(`[Phase 2] Uploading page ${pageNum}/${totalPagesCount}...`);

        const fileBuffer = await imageFile.arrayBuffer();

        const uploadResult = await uploadToS3({
          fileBuffer,
          fileName: imageFile.name,
          contentType: 'image/jpeg',
        });

        if (!uploadResult.success || !uploadResult.imageUrl) {
          throw new Error(uploadResult.error || `Failed to upload page ${pageNum} to S3`);
        }

        imageUrls.push(uploadResult.imageUrl);
        
        // Update progress (upload is 30% of total process)
        const uploadProgress = ((pageNum / totalPagesCount) * 30);
        setProcessingProgress(uploadProgress);
        
        console.log(`[Phase 2] ✓ Page ${pageNum}/${totalPagesCount} uploaded to S3`);
      }

      console.log('[Phase 2] ✓ All pages uploaded to S3 successfully');

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // PHASE 3: Sequential GPT Vision Parsing (One Page at a Time)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      startPhase('parsing');
      setCurrentStep('ocr');
      console.log('[Phase 3] Starting sequential GPT Vision parsing...');
      console.log('[Phase 3] Processing pages one-by-one for optimal accuracy');

      const results: PageResult[] = [];

      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const pageNum = i + 1;
        
        setCurrentPage(pageNum);
        console.log(`[Phase 3] ─────────────────────────────────────────`);
        console.log(`[Phase 3] 📄 Processing Page ${pageNum}/${totalPagesCount}`);
        
        // Parse this page
        const pageResult = await parseSinglePage(imageUrl, pageNum, totalPagesCount);
        results.push(pageResult);
        
        // Update UI with intermediate results
        setPageResults([...results]);
        
        // Update progress (parsing is 60% of total process, after 30% upload)
        const parseProgress = 30 + ((pageNum / totalPagesCount) * 60);
        setProcessingProgress(parseProgress);
        
        if (pageResult.error) {
          console.warn(`[Phase 3] ⚠️  Page ${pageNum} had errors:`, pageResult.error);
        } else {
          console.log(`[Phase 3] ✓ Page ${pageNum} parsed - ${pageResult.data.lineItems.length} items`);
        }
      }

      console.log('[Phase 3] ✓ All pages parsed successfully');

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // PHASE 4: Client-Side Aggregation & Validation
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      startPhase('aggregating');
      setCurrentStep('parsing');
      console.log('[Phase 4] Aggregating multi-page results...');

      const aggregated = aggregateInvoicePages(results);
      
      console.log('[Phase 4] ✓ Aggregation complete:', formatAggregationMetadata(aggregated.metadata));

      // Validate aggregated results
      const validation = validateAggregatedInvoice(aggregated);
      
      if (!validation.isValid) {
        console.error('[Phase 4] ❌ Validation failed:', validation.errors);
        throw new Error(`Validation errors: ${validation.errors.join(', ')}`);
      }

      if (validation.warnings.length > 0) {
        console.warn('[Phase 4] ⚠️  Validation warnings:', validation.warnings);
      }

      console.log('[Phase 4] ✓ Validation passed');

      // Final progress update
      setProcessingProgress(100);
      
      // Move to finalizing phase
      startPhase('finalizing');

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // PHASE 5: Quota Management & Finalization
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (user) {
        console.log('[Phase 5] Decrementing quota for authenticated user');
        const quotaDecremented = await decrementQuota('invoiceParses', {
          invoiceNumber: aggregated.invoice.invoiceNumber,
          supplier: aggregated.invoice.supplier,
          totalAmount: aggregated.invoice.totalAmount,
          totalPages: totalPagesCount,
          timestamp: new Date().toISOString()
        });

        if (quotaDecremented) {
          console.log('[Phase 5] ✓ Quota decremented successfully');
        } else {
          console.warn('[Phase 5] ⚠️  Failed to decrement quota');
        }
      } else {
        console.log('[Phase 5] Marking demo parse as used');
        if (typeof window !== 'undefined') {
          localStorage.setItem('elektroluma_demo_parse_used', 'true');
          setDemoParseUsed(true);
        }
      }

      // Set final aggregated invoice data
      setInvoiceData(aggregated.invoice);
      setCurrentStep('complete');

      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ SUCCESS: Multi-page invoice processed');
      console.log('═══════════════════════════════════════════════════════');
      console.log('📊 Final Results:');
      console.log(`   • Pages Processed: ${aggregated.metadata.pagesProcessed}`);
      console.log(`   • Line Items: ${aggregated.invoice.lineItems.length}`);
      console.log(`   • Confidence: ${(aggregated.invoice.confidence * 100).toFixed(1)}%`);
      console.log(`   • Total Amount: £${aggregated.invoice.totalAmount.toFixed(2)}`);
      console.log(`   • Processing Time: ${aggregated.metadata.processingTimeMs}ms`);
      console.log('═══════════════════════════════════════════════════════');

    } catch (err) {
      console.error('═══════════════════════════════════════════════════════');
      console.error('❌ ERROR: Invoice processing failed');
      console.error('═══════════════════════════════════════════════════════');
      console.error('Error details:', err);
      
      setError(
        err instanceof Error
          ? `Failed to process invoice: ${err.message}`
          : 'Failed to process invoice. Please try again.'
      );
      setCurrentStep('upload');
      setProcessingProgress(0);
    } finally {
      setProcessing(false);
    }
  }, [selectedFiles, user, checkQuota, decrementQuota, demoParseUsed]);

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
    
    // Reset multi-page processing state
    setCurrentPage(0);
    setTotalPages(0);
    setPageResults([]);
    setProcessingProgress(0);
    
    // Reset smart progress
    resetSmartProgress();
  }, [previewUrls, resetSmartProgress]);

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
   * Authenticated users: direct download
   * Demo/anonymous users: lead capture modal first
   */
  const handleGeneratePDF = useCallback(async () => {
    // Authenticated users: skip lead capture, download directly
    if (user) {
      console.log('[Parser] Authenticated user, proceeding with PDF generation');
      await generateAndDownloadPDF();
      return;
    }

    // Demo/anonymous users: check if we need to capture lead first
    if (isLeadCaptureRequired) {
      console.log('[Parser] Demo user - lead capture required, showing modal');
      setPendingPDFDownload(true);
      openModal();
      return;
    }

    // Demo user has already submitted lead, proceed with download
    console.log('[Parser] Demo user - lead already captured, proceeding with PDF generation');
    await generateAndDownloadPDF();
  }, [user, isLeadCaptureRequired, openModal, generateAndDownloadPDF]);

  /**
   * Handle lead submission from modal (demo users only)
   * After successful submission, trigger the PDF download
   */
  const handleLeadCaptured = useCallback(
    async (data: any) => {
      console.log('[Parser] Demo user lead captured, proceeding with PDF generation');
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
                <span className="text-2xl font-bold gradient-text">Elektroluma</span>
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
                    <span className="text-sm text-gray-600">
                      Demo used
                    </span>
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
                
                {/* Progress Indicator - Single & Multi-Page */}
                {processing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-700">
                        {totalPages > 1 
                          ? `Processing Page ${currentPage} of ${totalPages}`
                          : 'Processing Invoice...'}
                      </span>
                      <span className="text-sm font-semibold text-primary-600">
                        {Math.round(smoothProgress)}%
                      </span>
                    </div>
                    
                    {/* Smooth Progress Bar - Google Drive Style */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg"
                        style={{ width: `${smoothProgress}%` }}
                        transition={{ 
                          type: "spring",
                          stiffness: 50,
                          damping: 20
                        }}
                      />
                    </div>
                    
                    {/* Current Phase Indicator */}
                    {currentPhase && (
                      <div className="mt-3 text-xs text-gray-500 italic">
                        {currentPhase === 'initializing' && '🚀 Initializing...'}
                        {currentPhase === 'converting' && '🔄 Converting PDF to images...'}
                        {currentPhase === 'uploading' && '☁️ Uploading to cloud...'}
                        {currentPhase === 'parsing' && '🤖 AI extracting data...'}
                        {currentPhase === 'aggregating' && '🔗 Combining pages...'}
                        {currentPhase === 'finalizing' && '✨ Finalizing results...'}
                      </div>
                    )}
                    
                    {/* Page Status Grid */}
                    {pageResults.length > 0 && (
                      <div className="mt-4 grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => {
                          const pageNum = index + 1;
                          const result = pageResults.find(r => r.pageNumber === pageNum);
                          const isProcessing = currentPage === pageNum;
                          const isComplete = result !== undefined;
                          const hasError = result?.error;
                          
                          return (
                            <div
                              key={pageNum}
                              className={`
                                relative h-12 rounded-lg border-2 flex items-center justify-center text-xs font-semibold
                                transition-all duration-300
                                ${isComplete && !hasError ? 'bg-green-50 border-green-500 text-green-700' : ''}
                                ${hasError ? 'bg-red-50 border-red-500 text-red-700' : ''}
                                ${isProcessing ? 'bg-blue-50 border-blue-500 text-blue-700 animate-pulse' : ''}
                                ${!isComplete && !isProcessing ? 'bg-gray-50 border-gray-300 text-gray-400' : ''}
                              `}
                              title={
                                hasError ? `Page ${pageNum}: Error - ${result.error}` :
                                isComplete ? `Page ${pageNum}: Complete (${result.data.lineItems.length} items)` :
                                isProcessing ? `Page ${pageNum}: Processing...` :
                                `Page ${pageNum}: Waiting`
                              }
                            >
                              {isComplete && !hasError && (
                                <CheckCircle className="w-4 h-4 absolute top-0.5 right-0.5 text-green-600" />
                              )}
                              {pageNum}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Aggregation Info */}
                    {pageResults.length > 0 && (
                      <div className="mt-4 text-xs text-gray-600 space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Pages Processed:</span>
                          <span className="font-semibold">{pageResults.length} / {totalPages}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Line Items Found:</span>
                          <span className="font-semibold">
                            {pageResults.reduce((sum, r) => sum + r.data.lineItems.length, 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Avg Confidence:</span>
                          <span className="font-semibold">
                            {(pageResults.reduce((sum, r) => sum + r.data.confidence, 0) / pageResults.length * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
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
