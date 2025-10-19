'use client';

import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { InvoiceTemplate } from '@/app/lib/invoiceTemplateLibrary';
import { generateTemplatePDF } from '@/app/actions/generateTemplatePDF';
import { useState } from 'react';

interface InvoiceDownloadButtonsProps {
  template: InvoiceTemplate;
}

export default function InvoiceDownloadButtons({ template }: InvoiceDownloadButtonsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastDownloadType, setLastDownloadType] = useState<string | null>(null);

  const handlePDFDownload = async () => {
    setIsGenerating(true);
    setLastDownloadType('pdf');
    
    try {
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
        
        // Reset state after a short delay
        setTimeout(() => {
          setIsGenerating(false);
          setLastDownloadType(null);
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
      setIsGenerating(false);
      setLastDownloadType(null);
    }
  };

  const handleWordDownload = () => {
    setLastDownloadType('word');
    alert('Word download functionality coming soon! This will generate a .docx file with the invoice template.');
    setTimeout(() => setLastDownloadType(null), 2000);
  };

  const handleExcelDownload = () => {
    setLastDownloadType('excel');
    alert('Excel download functionality coming soon! This will generate a .xlsx file with the invoice template.');
    setTimeout(() => setLastDownloadType(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        Download Options
      </h3>
      <div className="space-y-3">
        {/* PDF Download Button */}
        <button
          onClick={handlePDFDownload}
          disabled={isGenerating}
          className={`w-full flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-lg hover:bg-red-100 transition group ${
            isGenerating && lastDownloadType === 'pdf' ? 'opacity-50 cursor-wait' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-red-600" />
            <div className="text-left">
              <span className="font-semibold text-slate-900 block">
                {isGenerating && lastDownloadType === 'pdf' ? 'Generating PDF...' : 'PDF (.pdf)'}
              </span>
              <span className="text-xs text-slate-600">
                Professional invoice document
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
          className={`w-full flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition group ${
            lastDownloadType === 'word' ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <div className="text-left">
              <span className="font-semibold text-slate-900 block">Word (.docx)</span>
              <span className="text-xs text-slate-600">
                Editable document format
              </span>
            </div>
          </div>
          <Download className="w-5 h-5 text-blue-600 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* Excel Download Button */}
        <button
          onClick={handleExcelDownload}
          className={`w-full flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 transition group ${
            lastDownloadType === 'excel' ? 'opacity-50' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <div className="text-left">
              <span className="font-semibold text-slate-900 block">Excel (.xlsx)</span>
              <span className="text-xs text-slate-600">
                Spreadsheet with calculations
              </span>
            </div>
          </div>
          <Download className="w-5 h-5 text-green-600 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Download Info */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          <span className="font-semibold">✓ Free Download:</span> All templates include sample data and are ready to use.
        </p>
      </div>
    </div>
  );
}