'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  RefreshCw,
  Copy,
  Check,
  Download,
  Database,
  TrendingUp,
  FileText,
  FilePlus,
  Loader2,
} from 'lucide-react';
import { InvoiceData } from '../../types/invoice';
import { InvoiceDataDisplay } from './InvoiceDataDisplay';
import { ExportButton } from './ExportButton';

interface ParserResultsDisplayProps {
  invoiceData: InvoiceData;
  copied: boolean;
  generatingPDF: boolean;
  pdfGenerated: boolean;
  onReset: () => void;
  onCopyJSON: () => void;
  onDownloadJSON: () => void;
  onGeneratePDF: () => void;
}

function ParserResultsDisplayComponent({
  invoiceData,
  copied,
  generatingPDF,
  pdfGenerated,
  onReset,
  onCopyJSON,
  onDownloadJSON,
  onGeneratePDF,
}: ParserResultsDisplayProps) {
  return (
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
          onClick={onReset}
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
          onClick={onCopyJSON}
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
          onClick={onDownloadJSON}
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
            onClick={onGeneratePDF}
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
  );
}

export const ParserResultsDisplay = memo(ParserResultsDisplayComponent);
