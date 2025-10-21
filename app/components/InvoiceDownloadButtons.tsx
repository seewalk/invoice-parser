'use client';

import { Download, FileText, FileSpreadsheet, Lock, Sparkles } from 'lucide-react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { generateTemplatePDF } from '@/app/actions/generateTemplatePDF';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/firebase/AuthContext';
import { useQuota } from '@/app/hooks/useQuota';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy-load UpgradePrompt for performance (only loads when needed)
const UpgradePrompt = dynamic(
  () => import('@/app/components/monetization/UpgradePrompt'),
  { ssr: false }
);

interface InvoiceDownloadButtonsProps {
  template: InvoiceTemplate;
}

export default function InvoiceDownloadButtons({ template }: InvoiceDownloadButtonsProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { checkQuota, decrementQuota, getRemaining, hasUnlimitedAccess } = useQuota();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastDownloadType, setLastDownloadType] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  /**
   * Generate PDF and trigger download
   * This is the actual PDF generation logic, called after auth/quota checks
   */
  const generateAndDownloadPDF = async () => {
    setIsGenerating(true);
    setLastDownloadType('pdf');
    
    try {
      console.log('[Template Download] Generating PDF for:', template.name);
      
      // Call server action to generate PDF
      const result = await generateTemplatePDF(template);
      
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
        
        console.log('[Template Download] PDF downloaded successfully:', result.fileName);
        
        // 💳 QUOTA DECREMENT: Decrement quota for authenticated users
        if (user && !hasUnlimitedAccess) {
          console.log('[Template Download] Decrementing download quota');
          await decrementQuota('templateDownloads', {
            templateName: template.name,
            templateId: template.id,
            timestamp: new Date().toISOString()
          });
        }
        
        // Reset state after a short delay
        setTimeout(() => {
          setIsGenerating(false);
          setLastDownloadType(null);
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
      console.error('[Template Download] Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      setIsGenerating(false);
      setLastDownloadType(null);
    }
  };

  /**
   * Handle PDF download button click
   * Authenticated users: check quota and download
   * Demo users: redirect to sign-up
   */
  const handlePDFDownload = async () => {
    // 🔒 AUTH CHECK: Redirect to sign-up if not authenticated
    if (!user) {
      console.log('[Template Download] User not authenticated, redirecting to sign-up');
      router.push(`/sign-up?redirect=/invoice-templates/${template.keywords[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
      return;
    }

    // 🎫 QUOTA CHECK: Check if user has quota remaining (skip for premium)
    if (!hasUnlimitedAccess && !checkQuota('templateDownloads')) {
      console.log('[Template Download] No quota remaining, showing upgrade prompt');
      setShowUpgradePrompt(true);
      return;
    }

    console.log('[Template Download] Quota check passed, proceeding with download');
    await generateAndDownloadPDF();
  };

  const handleWordDownload = () => {
    if (!user) {
      router.push(`/sign-up?redirect=/invoice-templates/${template.keywords[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
      return;
    }
    setLastDownloadType('word');
    alert('Word download functionality coming soon! This will generate a .docx file with the invoice template.');
    setTimeout(() => setLastDownloadType(null), 2000);
  };

  const handleExcelDownload = () => {
    if (!user) {
      router.push(`/sign-up?redirect=/invoice-templates/${template.keywords[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
      return;
    }
    setLastDownloadType('excel');
    alert('Excel download functionality coming soon! This will generate a .xlsx file with the invoice template.');
    setTimeout(() => setLastDownloadType(null), 2000);
  };

  // Calculate quota info
  const remainingDownloads = user ? getRemaining('templateDownloads') : 0;
  const isQuotaExhausted = user && !hasUnlimitedAccess && remainingDownloads === 0;

  return (
    <>
      {/* Upgrade Prompt Modal */}
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        source="template-download"
        templateName={template.name}
        templateId={template.id}
      />

      {/* Download Options */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">
            Download Options
          </h3>
          {!authLoading && user && (
            <div className="text-right">
              {hasUnlimitedAccess ? (
                <span className="text-xs text-primary-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Unlimited
                </span>
              ) : (
                <span className="text-xs text-slate-600">
                  {remainingDownloads} / 3 left
                </span>
              )}
            </div>
          )}
        </div>

        {/* Demo User CTA (Not logged in) */}
        {!authLoading && !user && (
          <div className="mb-4 p-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg border-2 border-primary-200">
            <p className="text-sm font-semibold text-slate-900 mb-2">
              🎁 Sign up to download this template
            </p>
            <p className="text-xs text-slate-600 mb-3">
              Get <strong>3 free template downloads</strong> when you create an account
            </p>
            <Link
              href={`/sign-up?redirect=/invoice-templates/${template.keywords[0].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition"
            >
              Sign Up for Free
            </Link>
          </div>
        )}

        {/* Quota Exhausted Warning (Logged in, no quota) */}
        {user && isQuotaExhausted && (
          <div className="mb-4 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
            <p className="text-sm font-semibold text-slate-900 mb-2">
              📦 You've used all 3 free downloads
            </p>
            <p className="text-xs text-slate-600 mb-3">
              Upgrade to download unlimited templates
            </p>
            <Link
              href="/pricing"
              className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition"
            >
              View Pricing
            </Link>
          </div>
        )}

        <div className="space-y-3">
          {/* PDF Download Button */}
          <button
            onClick={handlePDFDownload}
            disabled={isGenerating || authLoading}
            className={`w-full flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 transition group ${
              isGenerating && lastDownloadType === 'pdf' ? 'opacity-50 cursor-wait' : ''
            } ${authLoading ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              {!user ? (
                <Lock className="w-5 h-5 text-red-600" />
              ) : (
                <FileText className="w-5 h-5 text-red-600" />
              )}
              <div className="text-left">
                <span className="font-semibold text-slate-900 block">
                  {isGenerating && lastDownloadType === 'pdf' 
                    ? 'Generating PDF...' 
                    : !user 
                    ? 'PDF (.pdf) - Sign up required'
                    : 'PDF (.pdf)'}
                </span>
                <span className="text-xs text-slate-600">
                  {!user 
                    ? 'Create account to download' 
                    : 'Professional invoice document'}
                </span>
              </div>
            </div>
            <Download className={`w-5 h-5 text-red-600 ${
              isGenerating && lastDownloadType === 'pdf' ? 'animate-bounce' : 'group-hover:translate-y-1'
            } transition-transform`} />
          </button>

          {/* Word Download Button */}
          <button
            onClick={handleWordDownload}
            disabled={authLoading}
            className={`w-full flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition group ${
              lastDownloadType === 'word' ? 'opacity-50' : ''
            } ${authLoading ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              {!user ? (
                <Lock className="w-5 h-5 text-blue-600" />
              ) : (
                <FileText className="w-5 h-5 text-blue-600" />
              )}
              <div className="text-left">
                <span className="font-semibold text-slate-900 block">
                  {!user ? 'Word (.docx) - Sign up required' : 'Word (.docx)'}
                </span>
                <span className="text-xs text-slate-600">
                  {!user ? 'Create account to download' : 'Editable document format'}
                </span>
              </div>
            </div>
            <Download className="w-5 h-5 text-blue-600 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Excel Download Button */}
          <button
            onClick={handleExcelDownload}
            disabled={authLoading}
            className={`w-full flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition group ${
              lastDownloadType === 'excel' ? 'opacity-50' : ''
            } ${authLoading ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-3">
              {!user ? (
                <Lock className="w-5 h-5 text-green-600" />
              ) : (
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              )}
              <div className="text-left">
                <span className="font-semibold text-slate-900 block">
                  {!user ? 'Excel (.xlsx) - Sign up required' : 'Excel (.xlsx)'}
                </span>
                <span className="text-xs text-slate-600">
                  {!user ? 'Create account to download' : 'Spreadsheet with calculations'}
                </span>
              </div>
            </div>
            <Download className="w-5 h-5 text-green-600 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Download Info */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          {!user ? (
            <p className="text-xs text-slate-600">
              <span className="font-semibold">🎁 Free Trial:</span> Sign up to get 3 template downloads at no cost.
            </p>
          ) : hasUnlimitedAccess ? (
            <p className="text-xs text-slate-600">
              <span className="font-semibold">✓ Premium Access:</span> Download unlimited templates included in your plan.
            </p>
          ) : (
            <p className="text-xs text-slate-600">
              <span className="font-semibold">✓ Free Downloads:</span> {remainingDownloads} of 3 template downloads remaining.
            </p>
          )}
        </div>
      </div>
    </>
  );
}