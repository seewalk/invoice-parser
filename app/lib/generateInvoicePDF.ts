import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InvoiceTemplate } from './invoiceTemplateLibrary';

export interface PDFOptions {
  fontSize?: number;
  headerColor?: [number, number, number];
  accentColor?: [number, number, number];
  includeWatermark?: boolean;
}

/**
 * Generate a professional invoice PDF from template sample data
 * @param template - The invoice template with sample data
 * @param options - Optional PDF styling options
 * @returns void (triggers browser download)
 */
export function generateInvoicePDF(
  template: InvoiceTemplate,
  options: PDFOptions = {}
): void {
  const {
    fontSize = 10,
    headerColor = [37, 99, 235], // blue-600
    accentColor = [71, 85, 105], // slate-600
    includeWatermark = true,
  } = options;

  const sample = template.sampleData;
  const doc = new jsPDF();
  
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const leftMargin = 20;
  const rightMargin = pageWidth - 20;
  const contentWidth = rightMargin - leftMargin;

  // Helper function to add text with word wrapping
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    options: any = {}
  ): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y, options);
    return y + (lines.length * (options.lineHeight || 5));
  };

  // Helper function to format date to UK format (DD/MM/YYYY)
  const formatDateToUK = (isoDate: string): string => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Add watermark if enabled
  if (includeWatermark) {
    doc.setFontSize(60);
    doc.setTextColor(240, 240, 240);
    doc.text('SAMPLE', pageWidth / 2, doc.internal.pageSize.getHeight() / 2, {
      align: 'center',
      angle: 45,
    });
  }

  // Reset text color
  doc.setTextColor(0, 0, 0);

  // HEADER SECTION
  doc.setFillColor(...headerColor);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Business Name
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(sample.businessName || 'Your Business Name', leftMargin, 20);

  // Business Address
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  if (sample.businessAddress) {
    doc.text(sample.businessAddress, leftMargin, 28);
  }

  // Contact Info
  if (sample.businessEmail || sample.businessPhone) {
    let contactText = '';
    if (sample.businessEmail) contactText += `Email: ${sample.businessEmail}`;
    if (sample.businessPhone) {
      if (contactText) contactText += ' | ';
      contactText += `Phone: ${sample.businessPhone}`;
    }
    doc.text(contactText, leftMargin, 35);
  }

  // UK Compliance Information (VAT, Company Number, etc.)
  yPosition = 42;
  if (sample.vatNumber || sample.companyNumber || sample.gasSafeNumber || sample.niceicNumber) {
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    if (sample.vatNumber) {
      doc.text(`VAT Reg: ${sample.vatNumber}`, rightMargin, yPosition, { align: 'right' });
      yPosition += 4;
    }
    if (sample.companyNumber) {
      doc.text(`Company No: ${sample.companyNumber}`, rightMargin, yPosition, { align: 'right' });
      yPosition += 4;
    }
    if (sample.gasSafeNumber) {
      doc.text(`Gas Safe Reg: ${sample.gasSafeNumber}`, rightMargin, yPosition, { align: 'right' });
      yPosition += 4;
    }
    if (sample.niceicNumber) {
      doc.text(`NICEIC Reg: ${sample.niceicNumber}`, rightMargin, yPosition, { align: 'right' });
    }
  }

  yPosition = 50;

  // INVOICE TITLE
  doc.setFontSize(24);
  doc.setTextColor(...accentColor);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', rightMargin, yPosition, { align: 'right' });

  yPosition += 15;

  // INVOICE DETAILS (Right side)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  const invoiceDetails = [
    { label: 'Invoice Number:', value: sample.invoiceNumber || 'N/A' },
    { label: 'Invoice Date:', value: formatDateToUK(sample.invoiceDate || new Date().toISOString().split('T')[0]) },
    { label: 'Due Date:', value: sample.dueDate ? formatDateToUK(sample.dueDate) : 'Upon Receipt' },
  ];

  if (sample.poNumber) {
    invoiceDetails.push({ label: 'PO Number:', value: sample.poNumber });
  }

  invoiceDetails.forEach((detail) => {
    doc.setFont('helvetica', 'bold');
    doc.text(detail.label, rightMargin - 60, yPosition, { align: 'left' });
    doc.setFont('helvetica', 'normal');
    doc.text(detail.value, rightMargin, yPosition, { align: 'right' });
    yPosition += 6;
  });

  // BILL TO SECTION (Left side)
  yPosition = 65;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...accentColor);
  doc.text('BILL TO:', leftMargin, yPosition);
  
  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);

  if (sample.clientName) {
    doc.setFont('helvetica', 'bold');
    doc.text(sample.clientName, leftMargin, yPosition);
    yPosition += 6;
    doc.setFont('helvetica', 'normal');
  }

  if (sample.clientAddress) {
    yPosition = addWrappedText(sample.clientAddress, leftMargin, yPosition, 80);
    yPosition += 1;
  }

  if (sample.clientEmail) {
    doc.text(`Email: ${sample.clientEmail}`, leftMargin, yPosition);
    yPosition += 6;
  }

  if (sample.clientPhone) {
    doc.text(`Phone: ${sample.clientPhone}`, leftMargin, yPosition);
    yPosition += 6;
  }

  if (sample.clientVatNumber) {
    doc.setFont('helvetica', 'bold');
    doc.text(`VAT Reg: ${sample.clientVatNumber}`, leftMargin, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += 6;
  }

  yPosition += 10;

  // LINE ITEMS TABLE
  if (sample.lineItems && sample.lineItems.length > 0) {
    const tableData = sample.lineItems.map((item: any) => [
      item.description || '',
      item.quantity?.toString() || '1',
      item.rate ? `£${item.rate.toFixed(2)}` : '£0.00',
      item.amount ? `£${item.amount.toFixed(2)}` : '£0.00',
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Description', 'Quantity', 'Rate', 'Amount']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: headerColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'left',
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, // Description
        1: { cellWidth: 25, halign: 'center' }, // Quantity
        2: { cellWidth: 30, halign: 'right' }, // Rate
        3: { cellWidth: 30, halign: 'right' }, // Amount
      },
      margin: { left: leftMargin, right: leftMargin },
    });

    // Get the Y position after the table
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // TOTALS SECTION
  const totalsX = rightMargin - 60;
  const valuesX = rightMargin;

  doc.setFontSize(10);

  // Subtotal
  if (sample.subtotal !== undefined) {
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal:', totalsX, yPosition);
    doc.text(`£${sample.subtotal.toFixed(2)}`, valuesX, yPosition, { align: 'right' });
    yPosition += 6;
  }

  // VAT (UK-specific with rate names)
  if (sample.vatAmount !== undefined) {
    // Determine VAT rate name
    let vatLabel = 'VAT:';
    if (sample.vatRate !== undefined) {
      if (sample.vatRate === 20) {
        vatLabel = `VAT (Standard Rate - ${sample.vatRate}%):`;
      } else if (sample.vatRate === 5) {
        vatLabel = `VAT (Reduced Rate - ${sample.vatRate}%):`;
      } else if (sample.vatRate === 0) {
        vatLabel = `VAT (Zero-Rated - ${sample.vatRate}%):`;
      } else if (sample.vatRate === -1) {
        vatLabel = 'VAT Exempt:';
      } else {
        vatLabel = `VAT (${sample.vatRate}%):`;
      }
    }
    
    // Handle reverse charge
    if (sample.reverseCharge) {
      doc.setTextColor(0, 0, 255); // Blue for reverse charge
      doc.text('VAT (Reverse Charge):', totalsX, yPosition);
      doc.text('£0.00', valuesX, yPosition, { align: 'right' });
      doc.setTextColor(0, 0, 0);
      yPosition += 6;
    } else if (sample.vatRate !== -1) {
      doc.text(vatLabel, totalsX, yPosition);
      doc.text(`£${sample.vatAmount.toFixed(2)}`, valuesX, yPosition, { align: 'right' });
      yPosition += 6;
    } else {
      // VAT Exempt
      doc.setTextColor(100, 100, 100);
      doc.text('VAT Exempt', totalsX, yPosition);
      doc.text('£0.00', valuesX, yPosition, { align: 'right' });
      doc.setTextColor(0, 0, 0);
      yPosition += 6;
    }
  } else if (sample.taxAmount !== undefined) {
    // Fallback for old taxAmount field
    const taxLabel = sample.taxRate ? `Tax (${sample.taxRate}%):` : 'Tax:';
    doc.text(taxLabel, totalsX, yPosition);
    doc.text(`£${sample.taxAmount.toFixed(2)}`, valuesX, yPosition, { align: 'right' });
    yPosition += 6;
  }

  // Discount
  if (sample.discountAmount !== undefined && sample.discountAmount > 0) {
    doc.setTextColor(0, 150, 0); // Green for discount
    doc.text('Discount:', totalsX, yPosition);
    doc.text(`-£${sample.discountAmount.toFixed(2)}`, valuesX, yPosition, { align: 'right' });
    doc.setTextColor(0, 0, 0);
    yPosition += 6;
  }

  // Total (bold and larger)
  yPosition += 2;
  doc.setDrawColor(...accentColor);
  doc.line(totalsX - 5, yPosition - 2, valuesX, yPosition - 2);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total (inc. VAT):', totalsX, yPosition + 5);
  doc.text(`£${sample.totalAmount.toFixed(2)}`, valuesX, yPosition + 5, { align: 'right' });
  
  yPosition += 12;

  // CIS Deduction (Construction Industry Scheme)
  if (sample.cisDeductionRate !== undefined && sample.cisDeductionRate > 0) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setDrawColor(200, 200, 200);
    doc.line(totalsX - 5, yPosition - 2, valuesX, yPosition - 2);
    
    // CIS Deduction label
    let cisLabel = `CIS Deduction (${sample.cisDeductionRate}%):`
    if (sample.cisDeductionRate === 20) {
      cisLabel = `CIS Deduction (Registered - ${sample.cisDeductionRate}%):`;
    } else if (sample.cisDeductionRate === 30) {
      cisLabel = `CIS Deduction (Not Registered - ${sample.cisDeductionRate}%):`;
    }
    
    doc.setTextColor(220, 38, 38); // Red for deduction
    doc.text(cisLabel, totalsX, yPosition + 3);
    doc.text(`-£${sample.cisDeductionAmount.toFixed(2)}`, valuesX, yPosition + 3, { align: 'right' });
    yPosition += 8;
    
    // Amount Due (after CIS deduction)
    doc.setDrawColor(16, 185, 129); // Green
    doc.line(totalsX - 5, yPosition - 2, valuesX, yPosition - 2);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 150, 105); // Green for amount due
    doc.text('Amount Due:', totalsX, yPosition + 5);
    doc.text(`£${sample.amountDue.toFixed(2)}`, valuesX, yPosition + 5, { align: 'right' });
    doc.setTextColor(0, 0, 0);
    yPosition += 12;
  } else {
    yPosition += 3;
  }

  // PAYMENT INFORMATION
  if (sample.paymentTerms || sample.bankName || sample.accountNumber || sample.sortCode) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...accentColor);
    doc.text('PAYMENT INFORMATION', leftMargin, yPosition);
    
    yPosition += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);

    if (sample.paymentTerms) {
      doc.text(`Payment Terms: ${sample.paymentTerms}`, leftMargin, yPosition);
      yPosition += 5;
    }

    if (sample.bankName) {
      doc.text(`Bank: ${sample.bankName}`, leftMargin, yPosition);
      yPosition += 5;
    }

    if (sample.accountNumber) {
      doc.text(`Account Number: ${sample.accountNumber}`, leftMargin, yPosition);
      yPosition += 5;
    }

    if (sample.sortCode) {
      doc.text(`Sort Code: ${sample.sortCode}`, leftMargin, yPosition);
      yPosition += 5;
    }

    if (sample.iban) {
      doc.text(`IBAN: ${sample.iban}`, leftMargin, yPosition);
      yPosition += 5;
    }

    if (sample.swiftCode) {
      doc.text(`SWIFT/BIC: ${sample.swiftCode}`, leftMargin, yPosition);
      yPosition += 5;
    }

    yPosition += 5;
  }

  // NOTES
  if (sample.notes) {
    // Check if we need a new page
    if (yPosition > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...accentColor);
    doc.text('NOTES', leftMargin, yPosition);
    
    yPosition += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    yPosition = addWrappedText(sample.notes, leftMargin, yPosition, contentWidth, { lineHeight: 4 });
  }

  // FOOTER
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Generated from ${template.name} | Created with Elektroluma Ltd Invoice Processing System`,
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );

  // Generate filename
  const invoiceNumber = sample.invoiceNumber || 'SAMPLE';
  const sanitizedNumber = invoiceNumber.replace(/[^a-zA-Z0-9-]/g, '_');
  const fileName = `${sanitizedNumber}_${template.id}.pdf`;

  // Trigger download
  doc.save(fileName);
}

/**
 * Generate PDF with custom branding
 */
export function generateBrandedInvoicePDF(
  template: InvoiceTemplate,
  brandColors?: {
    primary: [number, number, number];
    accent: [number, number, number];
  }
): void {
  const options: PDFOptions = {
    headerColor: brandColors?.primary,
    accentColor: brandColors?.accent,
    includeWatermark: true,
  };

  generateInvoicePDF(template, options);
}

/**
 * Generate PDF without watermark (for premium users)
 */
export function generateCleanInvoicePDF(template: InvoiceTemplate): void {
  generateInvoicePDF(template, { includeWatermark: false });
}