'use client';

import { memo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileCheck, AlertCircle, Sparkles, Eye } from 'lucide-react';

interface ParserUploadZoneProps {
  selectedFile: File | null;
  previewUrl: string | null;
  processing: boolean;
  error: string | null;
  isDragging: boolean;
  onFileSelect: (file: File) => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onProcess: () => void;
  onReset: () => void;
}

function ParserUploadZoneComponent({
  selectedFile,
  previewUrl,
  processing,
  error,
  isDragging,
  onFileSelect,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onProcess,
  onReset,
}: ParserUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="space-y-6">
      {/* Upload Area */}
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
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
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
                  onReset();
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
            onClick={onProcess}
            className="w-full mt-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Process Invoice</span>
          </motion.button>
        )}
      </motion.div>

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
  );
}

export const ParserUploadZone = memo(ParserUploadZoneComponent);
