/**
 * PDF to Image Conversion Utility
 * 
 * Converts PDF files to images for processing by the invoice parser API.
 * Uses pdf.js to render the first page of a PDF to a canvas, then converts
 * to a JPEG image.
 * 
 * Why this is needed:
 * - API endpoint expects image URLs (not PDFs)
 * - First page of invoice PDF contains all necessary data
 * - JPEG provides good quality with reasonable file size
 */

import * as pdfjsLib from 'pdfjs-dist';

// Configure pdf.js worker
if (typeof window !== 'undefined') {
  // Use unpkg CDN with explicit HTTPS and version
  // This is more reliable than cdnjs and works consistently
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

interface ConversionResult {
  success: boolean;
  blob?: Blob;
  fileName?: string;
  error?: string;
}

/**
 * Convert PDF file to JPEG image (single page)
 * 
 * @param file - PDF file to convert
 * @param quality - JPEG quality (0-1), default 0.92
 * @param scale - Rendering scale for quality, default 2.0
 * @returns ConversionResult with blob and filename
 */
export async function convertPdfToImage(
  file: File,
  quality: number = 0.92,
  scale: number = 2.0
): Promise<ConversionResult> {
  try {
    console.log('[PDF Converter] Starting conversion for:', file.name);

    // Read PDF file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    console.log('[PDF Converter] PDF loaded, total pages:', pdf.numPages);

    // Get first page (backward compatibility)
    const page = await pdf.getPage(1);

    // Get viewport for rendering
    const viewport = page.getViewport({ scale });

    console.log('[PDF Converter] Page dimensions:', {
      width: viewport.width,
      height: viewport.height,
      scale
    });

    // Create canvas for rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get canvas 2D context');
    }

    // Set canvas dimensions
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    console.log('[PDF Converter] Page rendered to canvas');

    // Convert canvas to blob (JPEG format)
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        'image/jpeg',
        quality
      );
    });

    if (!blob) {
      throw new Error('Failed to convert canvas to blob');
    }

    // Generate filename (replace .pdf with .jpg)
    const fileName = file.name.replace(/\.pdf$/i, '.jpg');

    console.log('[PDF Converter] Conversion successful:', {
      originalSize: file.size,
      convertedSize: blob.size,
      fileName
    });

    return {
      success: true,
      blob,
      fileName
    };

  } catch (error) {
    console.error('[PDF Converter] Conversion error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert PDF to image'
    };
  }
}

/**
 * Check if a file is a PDF
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf';
}

/**
 * Check if a file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Convert all pages of a PDF file to JPEG images
 * 
 * @param file - PDF file to convert
 * @param quality - JPEG quality (0-1), default 0.92
 * @param scale - Rendering scale for quality, default 2.0
 * @returns Array of ConversionResults, one per page
 */
export async function convertPdfToImages(
  file: File,
  quality: number = 0.92,
  scale: number = 2.0
): Promise<Array<ConversionResult & { pageNumber: number }>> {
  try {
    console.log('[PDF Converter] Starting multi-page conversion for:', file.name);

    // Read PDF file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const totalPages = pdf.numPages;
    console.log('[PDF Converter] PDF loaded, total pages:', totalPages);

    const results: Array<ConversionResult & { pageNumber: number }> = [];

    // Convert each page
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      console.log(`[PDF Converter] Converting page ${pageNum} of ${totalPages}`);

      // Get page
      const page = await pdf.getPage(pageNum);

      // Get viewport for rendering
      const viewport = page.getViewport({ scale });

      // Create canvas for rendering
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Failed to get canvas 2D context');
      }

      // Set canvas dimensions
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render PDF page to canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Convert canvas to blob (JPEG format)
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/jpeg',
          quality
        );
      });

      if (!blob) {
        throw new Error(`Failed to convert page ${pageNum} to blob`);
      }

      // Generate filename for this page
      const baseFileName = file.name.replace(/\.pdf$/i, '');
      const fileName = totalPages > 1 
        ? `${baseFileName}_page${pageNum}.jpg`
        : `${baseFileName}.jpg`;

      results.push({
        success: true,
        blob,
        fileName,
        pageNumber: pageNum
      });
    }

    console.log('[PDF Converter] Multi-page conversion successful:', {
      totalPages,
      results: results.length
    });

    return results;

  } catch (error) {
    console.error('[PDF Converter] Multi-page conversion error:', error);
    
    return [{
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert PDF pages',
      pageNumber: 0
    }];
  }
}

/**
 * Get appropriate file type for upload
 * 
 * @param file - Original file
 * @returns Object with file info and whether conversion is needed
 */
export function getFileTypeInfo(file: File): {
  isPdf: boolean;
  isImage: boolean;
  needsConversion: boolean;
  fileType: string;
} {
  const isPdf = isPdfFile(file);
  const isImage = isImageFile(file);

  return {
    isPdf,
    isImage,
    needsConversion: isPdf,
    fileType: isPdf ? 'PDF' : isImage ? 'Image' : 'Unknown'
  };
}
