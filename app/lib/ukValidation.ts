/**
 * UK-specific validation utilities for invoice generation
 * Ensures compliance with UK government and accounting standards
 */

/**
 * VAT Number Validation (UK)
 * Format: GB followed by 9 or 12 digits
 * Examples: GB123456789, GB123456789012
 */
export function validateUKVATNumber(vatNumber: string): boolean {
  if (!vatNumber) return true; // Optional field
  
  // Remove spaces and convert to uppercase
  const cleaned = vatNumber.replace(/\s/g, '').toUpperCase();
  
  // UK VAT number patterns:
  // Standard: GB + 9 digits
  // Branch traders: GB + 12 digits
  // Government departments: GBGD + 3 digits
  // Health authorities: GBHA + 3 digits
  const patterns = [
    /^GB\d{9}$/,           // Standard format
    /^GB\d{12}$/,          // Branch traders
    /^GBGD\d{3}$/,         // Government departments
    /^GBHA\d{3}$/,         // Health authorities
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Format VAT number to standard UK format
 */
export function formatUKVATNumber(vatNumber: string): string {
  if (!vatNumber) return '';
  
  const cleaned = vatNumber.replace(/\s/g, '').toUpperCase();
  
  // Standard format: GB123 4567 89
  if (/^GB\d{9}$/.test(cleaned)) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  }
  
  // Branch traders: GB123 4567 8901 2
  if (/^GB\d{12}$/.test(cleaned)) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9, 13)} ${cleaned.slice(13)}`;
  }
  
  return cleaned;
}

/**
 * UK Postcode Validation
 * Follows UK government postcode format
 */
export function validateUKPostcode(postcode: string): boolean {
  if (!postcode) return true; // Optional field
  
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  
  // UK postcode regex (comprehensive pattern)
  const postcodePattern = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/i;
  
  return postcodePattern.test(cleaned);
}

/**
 * Format UK postcode to standard format
 */
export function formatUKPostcode(postcode: string): string {
  if (!postcode) return '';
  
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  
  // Format with space before last 3 characters (e.g., SW1A 1AA)
  if (cleaned.length >= 5) {
    return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
  }
  
  return cleaned;
}

/**
 * UK Phone Number Validation
 * Supports various UK formats including mobile and landline
 */
export function validateUKPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  
  const cleaned = phone.replace(/\s|-|\(|\)/g, '');
  
  // UK phone patterns:
  // +44 followed by 10 digits
  // 0 followed by 10 digits
  // Mobile: 07xxx xxxxxx
  // London: 020 xxxx xxxx
  // Other: 01xxx xxxxxx or 011xx xxxxxx
  const patterns = [
    /^\+44\d{10}$/,        // +44 format
    /^0\d{10}$/,           // 0 prefix format (11 digits total)
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Format UK phone number to standard format
 */
export function formatUKPhone(phone: string): string {
  if (!phone) return '';
  
  const cleaned = phone.replace(/\s|-|\(|\)/g, '');
  
  // Format +44 numbers
  if (cleaned.startsWith('+44')) {
    const digits = cleaned.slice(3);
    if (digits.startsWith('7')) {
      // Mobile: +44 7xxx xxx xxx
      return `+44 ${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    } else if (digits.startsWith('20')) {
      // London: +44 20 xxxx xxxx
      return `+44 20 ${digits.slice(2, 6)} ${digits.slice(6)}`;
    }
    return `+44 ${digits}`;
  }
  
  // Format 0 prefix numbers
  if (cleaned.startsWith('0')) {
    if (cleaned.startsWith('07')) {
      // Mobile: 07xxx xxxxxx
      return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    } else if (cleaned.startsWith('020')) {
      // London: 020 xxxx xxxx
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
    }
    // Other landlines: 01xxx xxxxxx
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return cleaned;
}

/**
 * UK Sort Code Validation
 * Format: 6 digits, typically displayed as XX-XX-XX
 */
export function validateUKSortCode(sortCode: string): boolean {
  if (!sortCode) return true; // Optional field
  
  const cleaned = sortCode.replace(/\s|-/g, '');
  
  // Must be exactly 6 digits
  return /^\d{6}$/.test(cleaned);
}

/**
 * Format UK sort code to standard format (XX-XX-XX)
 */
export function formatUKSortCode(sortCode: string): string {
  if (!sortCode) return '';
  
  const cleaned = sortCode.replace(/\s|-/g, '');
  
  if (cleaned.length === 6) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4)}`;
  }
  
  return cleaned;
}

/**
 * UK Account Number Validation
 * Typically 8 digits
 */
export function validateUKAccountNumber(accountNumber: string): boolean {
  if (!accountNumber) return true; // Optional field
  
  const cleaned = accountNumber.replace(/\s/g, '');
  
  // UK account numbers are typically 8 digits
  return /^\d{8}$/.test(cleaned);
}

/**
 * Format UK account number (8 digits, no special formatting)
 */
export function formatUKAccountNumber(accountNumber: string): string {
  if (!accountNumber) return '';
  
  return accountNumber.replace(/\s/g, '');
}

/**
 * Company Number Validation (Companies House)
 * Format: 8 characters (letters and numbers)
 * Examples: 12345678, SC123456, NI123456
 */
export function validateUKCompanyNumber(companyNumber: string): boolean {
  if (!companyNumber) return true; // Optional field
  
  const cleaned = companyNumber.replace(/\s/g, '').toUpperCase();
  
  // UK company number patterns:
  // England/Wales: 8 digits
  // Scotland: SC followed by 6 digits
  // Northern Ireland: NI followed by 6 digits
  const patterns = [
    /^\d{8}$/,             // Standard format
    /^SC\d{6}$/,           // Scotland
    /^NI\d{6}$/,           // Northern Ireland
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

/**
 * Format company number to uppercase
 */
export function formatUKCompanyNumber(companyNumber: string): string {
  if (!companyNumber) return '';
  
  return companyNumber.replace(/\s/g, '').toUpperCase();
}

/**
 * Gas Safe Registration Number Validation
 * Format: 6-7 digits
 */
export function validateGasSafeNumber(gasSafeNumber: string): boolean {
  if (!gasSafeNumber) return true; // Optional field
  
  const cleaned = gasSafeNumber.replace(/\s/g, '');
  
  // Gas Safe registration numbers are typically 6-7 digits
  return /^\d{6,7}$/.test(cleaned);
}

/**
 * NICEIC Registration Number Validation
 * Format: Alphanumeric, typically 5-8 characters
 */
export function validateNICEICNumber(niceicNumber: string): boolean {
  if (!niceicNumber) return true; // Optional field
  
  const cleaned = niceicNumber.replace(/\s/g, '').toUpperCase();
  
  // NICEIC numbers are alphanumeric, typically 5-8 characters
  return /^[A-Z0-9]{5,8}$/.test(cleaned);
}

/**
 * CIS (Construction Industry Scheme) Deduction Rate Validation
 * Valid rates: 0%, 20%, 30%
 */
export function validateCISRate(rate: number): boolean {
  const validRates = [0, 20, 30];
  return validRates.includes(rate);
}

/**
 * VAT Rate Validation (UK)
 * Valid rates: 0% (zero-rated), 5% (reduced), 20% (standard), -1 (exempt)
 */
export function validateVATRate(rate: number): boolean {
  const validRates = [0, 5, 20, -1]; // -1 represents VAT exempt
  return validRates.includes(rate);
}

/**
 * Get VAT rate name
 */
export function getVATRateName(rate: number): string {
  switch (rate) {
    case 0:
      return 'Zero-Rated';
    case 5:
      return 'Reduced Rate';
    case 20:
      return 'Standard Rate';
    case -1:
      return 'VAT Exempt';
    default:
      return 'Standard Rate';
  }
}

/**
 * Date format conversion: ISO to UK format (DD/MM/YYYY)
 */
export function formatDateToUK(isoDate: string): string {
  if (!isoDate) return '';
  
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Date format conversion: UK format (DD/MM/YYYY) to ISO
 */
export function formatDateFromUK(ukDate: string): string {
  if (!ukDate) return '';
  
  const parts = ukDate.split('/');
  if (parts.length !== 3) return '';
  
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * Validate UK date format (DD/MM/YYYY)
 */
export function validateUKDateFormat(date: string): boolean {
  if (!date) return true; // Optional field
  
  const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = date.match(pattern);
  
  if (!match) return false;
  
  const [, day, month, year] = match;
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  
  // Validate ranges
  if (m < 1 || m > 12) return false;
  if (d < 1 || d > 31) return false;
  if (y < 1900 || y > 2100) return false;
  
  // Validate days in month
  const daysInMonth = new Date(y, m, 0).getDate();
  return d <= daysInMonth;
}

/**
 * Calculate payment due date based on payment terms
 */
export function calculateDueDate(invoiceDate: string, paymentTerms: string): string {
  if (!invoiceDate) return '';
  
  const date = new Date(invoiceDate);
  
  // Extract days from payment terms (e.g., "Net 30" -> 30)
  const daysMatch = paymentTerms.match(/\d+/);
  if (daysMatch) {
    const days = parseInt(daysMatch[0], 10);
    date.setDate(date.getDate() + days);
  }
  
  return date.toISOString().split('T')[0];
}

/**
 * Format currency to GBP
 */
export function formatGBP(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

/**
 * Validate IBAN format
 */
export function validateIBAN(iban: string): boolean {
  if (!iban) return true; // Optional field
  
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  
  // UK IBAN: GB followed by 2 check digits, then bank code (4 letters), sort code (6 digits), account number (8 digits)
  // Total: 22 characters
  const ukIBANPattern = /^GB\d{2}[A-Z]{4}\d{14}$/;
  
  return ukIBANPattern.test(cleaned);
}

/**
 * Format IBAN to readable format
 */
export function formatIBAN(iban: string): string {
  if (!iban) return '';
  
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  
  // Format as: GB29 NWBK 6016 1331 9268 19
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
}