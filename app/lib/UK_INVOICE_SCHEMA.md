# UK Invoice Compliance Schema Documentation

## Overview
This document provides comprehensive schema documentation for UK invoice generation, validation, and HMRC compliance. Optimized for AI engines, search engines, and developer reference.

**Last Updated:** 2025-10-20  
**Version:** 1.0.0  
**Compliance:** HMRC Making Tax Digital (MTD) Compatible

---

## Table of Contents
1. [UK Business Identifiers](#uk-business-identifiers)
2. [VAT System](#vat-system)
3. [CIS (Construction Industry Scheme)](#cis-construction-industry-scheme)
4. [Date and Currency Formats](#date-and-currency-formats)
5. [Validation Rules](#validation-rules)
6. [Payment Information](#payment-information)
7. [HMRC Compliance](#hmrc-compliance)
8. [Code Examples](#code-examples)

---

## UK Business Identifiers

### 1. VAT Registration Number

**Purpose:** Identifies VAT-registered businesses in the UK  
**Format:** GB followed by 9 or 12 digits, or special formats for certain entities  
**Regulatory Body:** HM Revenue & Customs (HMRC)

#### Valid Formats:
```
GB123456789        - Standard 9-digit format (most common)
GB123456789012     - 12-digit format (for some businesses)
GBGD123            - Government departments
GBHA123            - Health authorities
```

#### Validation Rules:
- **Pattern:** `^GB([0-9]{9}|[0-9]{12}|GD[0-9]{3}|HA[0-9]{3})$`
- **Required:** For VAT-registered businesses only
- **Display:** Formatted with spaces: `GB 123 4567 89`
- **Invoice Requirement:** Must be displayed on invoices if business is VAT-registered

#### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function validateUKVATNumber(vatNumber: string): boolean
export function formatUKVATNumber(vatNumber: string): string
```

#### SEO Keywords:
- UK VAT number validation
- VAT registration number format
- GB VAT number check
- HMRC VAT number

---

### 2. Company Registration Number

**Purpose:** Identifies companies registered with Companies House  
**Format:** 8 digits, or 2-letter prefix + 6 digits  
**Regulatory Body:** Companies House

#### Valid Formats:
```
12345678           - Standard 8-digit format (England & Wales)
SC123456           - Scottish companies (SC prefix)
NI123456           - Northern Ireland companies (NI prefix)
```

#### Validation Rules:
- **Pattern:** `^([0-9]{8}|SC[0-9]{6}|NI[0-9]{6})$`
- **Required:** For limited companies only
- **Display:** As-is, no special formatting
- **Invoice Requirement:** Recommended for transparency

#### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function validateUKCompanyNumber(companyNumber: string): boolean
export function formatUKCompanyNumber(companyNumber: string): string
```

#### SEO Keywords:
- Companies House number
- UK company registration number
- Limited company number
- CRN validation

---

### 3. Gas Safe Registration Number

**Purpose:** Identifies registered gas engineers and plumbers  
**Format:** 6-7 digit number  
**Regulatory Body:** Gas Safe Register

#### Valid Formats:
```
123456             - 6-digit format
1234567            - 7-digit format
```

#### Validation Rules:
- **Pattern:** `^[0-9]{6,7}$`
- **Required:** For gas engineers, plumbers working with gas
- **Industry:** Plumbing, Heating, Gas Engineering
- **Legal Requirement:** Must be Gas Safe registered to work on gas appliances

#### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function validateGasSafeNumber(gasSafeNumber: string): boolean
```

#### SEO Keywords:
- Gas Safe registration number
- Gas engineer registration
- Plumber gas safe certificate
- UK gas safe validation

---

### 4. NICEIC Registration Number

**Purpose:** Identifies registered electricians  
**Format:** 5-8 alphanumeric characters  
**Regulatory Body:** NICEIC (National Inspection Council for Electrical Installation Contracting)

#### Valid Formats:
```
ABC12             - 5 characters
ABC1234           - 7 characters
ABCD1234          - 8 characters
```

#### Validation Rules:
- **Pattern:** `^[A-Z0-9]{5,8}$`
- **Required:** For electricians, electrical contractors
- **Industry:** Electrical Contracting
- **Industry Standard:** Demonstrates competence and compliance

#### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function validateNICEICNumber(niceicNumber: string): boolean
```

#### SEO Keywords:
- NICEIC registration number
- Electrician certification
- UK electrical contractor registration
- NICEIC validation

---

## VAT System

### UK VAT Rates (2024-2025)

The UK operates a multi-rate VAT system with different rates for different goods and services.

#### 1. Standard Rate: 20%
**Applies to:** Most goods and services  
**Code:** `20`  
**Display:** "VAT (Standard Rate - 20%)"

**Examples:**
- General goods and services
- Restaurant meals
- Building materials
- Professional services

#### 2. Reduced Rate: 5%
**Applies to:** Certain goods and services  
**Code:** `5`  
**Display:** "VAT (Reduced Rate - 5%)"

**Examples:**
- Domestic fuel and power
- Children's car seats
- Mobility aids
- Energy-saving materials

#### 3. Zero Rate: 0%
**Applies to:** Zero-rated supplies  
**Code:** `0`  
**Display:** "VAT (Zero-Rated - 0%)"

**Examples:**
- Most food and drink
- Books and newspapers
- Children's clothing
- Public transport

#### 4. VAT Exempt: -1
**Applies to:** Exempt supplies  
**Code:** `-1`  
**Display:** "VAT Exempt"

**Examples:**
- Financial services
- Insurance
- Education
- Healthcare

#### 5. Reverse Charge VAT
**Applies to:** Specific B2B services  
**Code:** Special flag `reverseCharge: true`  
**Display:** "VAT (Reverse Charge)"

**Examples:**
- Construction services (CIS)
- Mobile phones and computer chips
- Certain cross-border services

### VAT Calculation Formula

```typescript
// Standard VAT calculation
const vatAmount = (subtotal * vatRate) / 100;
const totalAmount = subtotal + vatAmount;

// With discount
const discountedSubtotal = subtotal - discountAmount;
const vatAmount = (discountedSubtotal * vatRate) / 100;
const totalAmount = discountedSubtotal + vatAmount;

// Reverse charge
const vatAmount = 0; // Customer accounts for VAT
const totalAmount = subtotal;
```

### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function validateVATRate(rate: number): boolean
export function getVATRateName(rate: number): string
```

### SEO Keywords:
- UK VAT rates 2024
- VAT calculation formula
- Standard rate VAT UK
- Reduced rate VAT examples
- Zero-rated VAT goods
- VAT exempt services
- Reverse charge VAT

---

## CIS (Construction Industry Scheme)

### Overview
The Construction Industry Scheme (CIS) sets out rules for how contractors must handle payments to subcontractors. Contractors must deduct CIS tax from payments to subcontractors and pass it to HMRC.

### CIS Deduction Rates

#### 1. No Deduction: 0%
**Status:** Gross payment status  
**Code:** `0`  
**Display:** No CIS deduction shown

**Applies to:**
- Subcontractors with gross payment status
- Direct employees (not CIS applicable)

#### 2. Registered Subcontractor: 20%
**Status:** Registered with HMRC for CIS  
**Code:** `20`  
**Display:** "CIS Deduction (Registered - 20%)"

**Applies to:**
- Registered subcontractors
- Most common rate in construction

#### 3. Unregistered Subcontractor: 30%
**Status:** Not registered with HMRC for CIS  
**Code:** `30`  
**Display:** "CIS Deduction (Not Registered - 30%)"

**Applies to:**
- Subcontractors not registered under CIS
- Higher deduction rate as incentive to register

### CIS Calculation Formula

```typescript
// CIS is applied AFTER VAT
const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
const vatAmount = (subtotal * vatRate) / 100;
const totalAmount = subtotal + vatAmount;

// CIS deduction
const cisDeductionAmount = (totalAmount * cisDeductionRate) / 100;
const amountDue = totalAmount - cisDeductionAmount;
```

### CIS Invoice Requirements

**Mandatory Information:**
1. Contractor's details (name, address, UTR, CIS registration)
2. Subcontractor's details (name, address, UTR, CIS registration)
3. Gross amount payable
4. Cost of materials (if applicable)
5. CIS deduction amount
6. Net amount payable (Amount Due)
7. Tax period

### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function validateCISRate(rate: number): boolean

// File: app/components/InvoiceGeneratorClient.tsx
// CIS calculation in useEffect hook
```

### SEO Keywords:
- CIS construction industry scheme
- CIS deduction rates 2024
- CIS tax calculation
- Construction invoice CIS
- Subcontractor CIS deduction
- HMRC CIS requirements

---

## Date and Currency Formats

### UK Date Format

**Display Format:** DD/MM/YYYY  
**Internal Format:** ISO 8601 (YYYY-MM-DD)  
**Separator:** Forward slash (/)

#### Examples:
```
Display:  20/10/2024
Internal: 2024-10-20

Display:  01/01/2025
Internal: 2025-01-01
```

#### Validation Rules:
- Day: 01-31 (depending on month)
- Month: 01-12
- Year: 4 digits
- Separators: / or - accepted

#### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function formatDateToUK(isoDate: string): string
export function formatDateFromUK(ukDate: string): string
export function calculateDueDate(invoiceDate: string, paymentTerms: string): string
```

### UK Currency (GBP)

**Symbol:** £ (Pound Sterling)  
**ISO Code:** GBP  
**Decimal Places:** 2  
**Separator:** Comma for thousands, period for decimals

#### Examples:
```
£1,234.56
£10.00
£999,999.99
```

#### Code Reference:
```typescript
// File: app/lib/ukValidation.ts
export function formatGBP(amount: number): string
```

### SEO Keywords:
- UK date format DD/MM/YYYY
- British date format
- GBP currency format
- Pound sterling symbol
- UK invoice date format

---

## Validation Rules

### UK Postcode

**Format:** Alphanumeric, 2-4 characters outward code + space + 3 characters inward code  
**Pattern:** `^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$`

#### Examples:
```
SW1A 1AA   - Central London
M1 1AE     - Manchester
B33 8TH    - Birmingham
```

#### Code Reference:
```typescript
export function validateUKPostcode(postcode: string): boolean
export function formatUKPostcode(postcode: string): string
```

### UK Phone Numbers

**Formats:**
- Mobile: 07### ######
- Landline: 0#### ######
- International: +44 #### ######

#### Patterns:
```
^(\+44|0)7[0-9]{9}$        - Mobile
^(\+44|0)[1-2][0-9]{9}$    - Landline
```

#### Code Reference:
```typescript
export function validateUKPhone(phone: string): boolean
export function formatUKPhone(phone: string): string
```

### UK Sort Code

**Format:** XX-XX-XX (6 digits with hyphens)  
**Pattern:** `^[0-9]{2}-[0-9]{2}-[0-9]{2}$`

#### Examples:
```
12-34-56
40-47-84
60-83-71
```

#### Code Reference:
```typescript
export function validateUKSortCode(sortCode: string): boolean
export function formatUKSortCode(sortCode: string): string
```

### UK Account Number

**Format:** 8 digits  
**Pattern:** `^[0-9]{8}$`

#### Examples:
```
12345678
00123456
98765432
```

#### Code Reference:
```typescript
export function validateUKAccountNumber(accountNumber: string): boolean
```

### UK IBAN

**Format:** GB## #### #### #### ##  
**Length:** 22 characters  
**Pattern:** `^GB[0-9]{2}[A-Z]{4}[0-9]{14}$`

#### Example:
```
GB29 NWBK 6016 1331 9268 19
```

#### Code Reference:
```typescript
export function validateIBAN(iban: string): boolean
export function formatIBAN(iban: string): string
```

### SEO Keywords:
- UK postcode validation
- British phone number format
- UK sort code format
- UK account number validation
- UK IBAN format

---

## Payment Information

### Required Fields for UK Invoices

#### Bank Details:
1. **Bank Name** - Full name of the bank
2. **Account Number** - 8-digit account number
3. **Sort Code** - 6-digit sort code (XX-XX-XX format)
4. **IBAN** - International payments (optional but recommended)
5. **SWIFT/BIC Code** - International payments (optional)

#### Payment Terms:
- Net 7 (7 days)
- Net 14 (14 days)
- Net 30 (30 days) - Most common
- Net 60 (60 days)
- Net 90 (90 days)
- Due on Receipt
- Custom terms

### SEO Keywords:
- UK bank details for invoices
- UK payment terms
- Invoice payment information UK
- UK IBAN number

---

## HMRC Compliance

### Making Tax Digital (MTD) Requirements

**Effective Date:** April 2019 (VAT), April 2024 (Income Tax)

#### Digital Record Keeping:
1. ✅ Store invoices digitally
2. ✅ Maintain digital accounting records
3. ✅ Submit VAT returns via MTD-compatible software
4. ✅ Keep records for minimum 6 years

#### Invoice Requirements:
1. ✅ Sequential invoice numbering
2. ✅ Invoice date
3. ✅ Supplier details (name, address, VAT number)
4. ✅ Customer details (name, address)
5. ✅ Description of goods/services
6. ✅ Quantity and unit price
7. ✅ VAT rate and amount (if applicable)
8. ✅ Total amount including VAT
9. ✅ Payment terms

### CIS Compliance Requirements

1. ✅ Contractor UTR (Unique Taxpayer Reference)
2. ✅ Subcontractor UTR
3. ✅ CIS registration status
4. ✅ Gross amount payable
5. ✅ Materials cost (if applicable)
6. ✅ CIS deduction rate and amount
7. ✅ Net amount payable
8. ✅ Tax month/period

### SEO Keywords:
- HMRC Making Tax Digital
- MTD compliance UK
- UK invoice requirements
- CIS invoice requirements
- HMRC invoice rules

---

## Code Examples

### Complete UK Invoice Data Structure

```typescript
interface UKInvoiceData {
  // Business Information
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  
  // UK Business Compliance
  vatNumber: string;          // GB123456789
  companyNumber: string;       // 12345678 or SC123456
  gasSafeNumber?: string;      // 123456 (plumbers/gas engineers)
  niceicNumber?: string;       // ABC1234 (electricians)
  
  // Invoice Details
  invoiceNumber: string;       // INV-2024-001
  invoiceDate: string;         // ISO format: 2024-10-20
  dueDate: string;             // ISO format: 2024-11-20
  poNumber?: string;
  
  // Client Information
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  clientVatNumber?: string;    // GB987654321
  
  // Line Items
  lineItems: Array<{
    description: string;
    quantity: number;
    rate: number;              // In GBP
    amount: number;            // quantity × rate
    vatRate: number;           // 20, 5, 0, or -1
  }>;
  
  // Totals
  subtotal: number;            // Sum of line items
  vatRate: number;             // Default VAT rate (20, 5, 0, -1)
  vatAmount: number;           // Calculated VAT
  discountAmount?: number;     // Optional discount
  totalAmount: number;         // subtotal + VAT - discount
  
  // CIS (Construction Only)
  cisDeductionRate: number;    // 0, 20, or 30
  cisDeductionAmount: number;  // Calculated CIS deduction
  amountDue: number;           // totalAmount - cisDeductionAmount
  
  // Special VAT Handling
  reverseCharge: boolean;      // true if reverse charge applies
  
  // Payment Information
  paymentTerms: string;        // "Net 30"
  bankName: string;
  accountNumber: string;       // 12345678
  sortCode: string;            // 12-34-56
  iban?: string;               // GB29NWBK60161331926819
  swiftCode?: string;          // NWBKGB2L
  
  // Additional Notes
  notes?: string;
}
```

### Validation Example

```typescript
import {
  validateUKVATNumber,
  validateUKCompanyNumber,
  validateGasSafeNumber,
  validateNICEICNumber,
  validateUKPostcode,
  validateUKPhone,
  validateUKSortCode,
  validateUKAccountNumber,
  validateVATRate,
  validateCISRate,
  formatDateToUK,
} from '@/app/lib/ukValidation';

// Validate UK business identifiers
const isValidVAT = validateUKVATNumber('GB123456789');        // true
const isValidCompany = validateUKCompanyNumber('12345678');   // true
const isValidGasSafe = validateGasSafeNumber('123456');       // true
const isValidNICEIC = validateNICEICNumber('ABC1234');        // true

// Validate contact details
const isValidPostcode = validateUKPostcode('SW1A 1AA');       // true
const isValidPhone = validateUKPhone('+44 7700 900000');      // true

// Validate banking details
const isValidSortCode = validateUKSortCode('12-34-56');       // true
const isValidAccount = validateUKAccountNumber('12345678');   // true

// Validate rates
const isValidVATRate = validateVATRate(20);                   // true
const isValidCISRate = validateCISRate(30);                   // true

// Format date
const ukDate = formatDateToUK('2024-10-20');                  // "20/10/2024"
```

### Calculation Example

```typescript
// Calculate invoice totals with VAT and CIS
const lineItems = [
  { description: 'Labour', quantity: 40, rate: 50.00, amount: 2000.00 },
  { description: 'Materials', quantity: 1, rate: 500.00, amount: 500.00 },
];

const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
// subtotal = 2500.00

const vatRate = 20; // Standard rate
const vatAmount = (subtotal * vatRate) / 100;
// vatAmount = 500.00

const totalAmount = subtotal + vatAmount;
// totalAmount = 3000.00

const cisDeductionRate = 20; // Registered subcontractor
const cisDeductionAmount = (totalAmount * cisDeductionRate) / 100;
// cisDeductionAmount = 600.00

const amountDue = totalAmount - cisDeductionAmount;
// amountDue = 2400.00
```

---

## API Reference

### File: `app/lib/ukValidation.ts`

#### Business Identifiers
- `validateUKVATNumber(vatNumber: string): boolean`
- `formatUKVATNumber(vatNumber: string): string`
- `validateUKCompanyNumber(companyNumber: string): boolean`
- `formatUKCompanyNumber(companyNumber: string): string`
- `validateGasSafeNumber(gasSafeNumber: string): boolean`
- `validateNICEICNumber(niceicNumber: string): boolean`

#### Contact Information
- `validateUKPostcode(postcode: string): boolean`
- `formatUKPostcode(postcode: string): string`
- `validateUKPhone(phone: string): boolean`
- `formatUKPhone(phone: string): string`

#### Banking
- `validateUKSortCode(sortCode: string): boolean`
- `formatUKSortCode(sortCode: string): string`
- `validateUKAccountNumber(accountNumber: string): boolean`
- `validateIBAN(iban: string): boolean`
- `formatIBAN(iban: string): string`

#### VAT and CIS
- `validateVATRate(rate: number): boolean`
- `validateCISRate(rate: number): boolean`
- `getVATRateName(rate: number): string`

#### Date and Currency
- `formatDateToUK(isoDate: string): string`
- `formatDateFromUK(ukDate: string): string`
- `calculateDueDate(invoiceDate: string, paymentTerms: string): string`
- `formatGBP(amount: number): string`

---

## SEO Meta Keywords

**Primary Keywords:**
- UK invoice generator
- HMRC compliant invoicing
- VAT invoice UK
- CIS invoice construction
- Making Tax Digital invoice
- UK business invoice template

**Secondary Keywords:**
- Gas Safe invoice template
- NICEIC electrician invoice
- Construction subcontractor invoice
- UK VAT rates 2024
- CIS deduction calculator
- UK invoice format

**Long-tail Keywords:**
- How to create UK compliant invoice
- UK invoice with VAT and CIS deduction
- HMRC MTD invoice requirements
- Construction invoice CIS 20% deduction
- UK plumber invoice with Gas Safe number
- Electrician NICEIC invoice template

---

## Structured Data Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "UK Invoice Generator",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  },
  "featureList": [
    "UK VAT calculation (20%, 5%, 0%, exempt)",
    "CIS deduction support (20%, 30%)",
    "HMRC MTD compliant",
    "Gas Safe registration",
    "NICEIC registration",
    "UK date format (DD/MM/YYYY)",
    "GBP currency formatting",
    "UK postcode validation",
    "UK phone number validation",
    "UK sort code and account number validation"
  ],
  "inLanguage": "en-GB",
  "targetCountry": "GB"
}
```

---

## Version History

### v1.0.0 (2025-10-20)
- Initial release
- UK VAT system support
- CIS deduction calculation
- UK business identifiers validation
- HMRC MTD compliance
- Gas Safe and NICEIC registration support

---

## Support and Resources

### Official Resources:
- **HMRC VAT Information:** https://www.gov.uk/vat-rates
- **Making Tax Digital:** https://www.gov.uk/making-tax-digital
- **CIS Information:** https://www.gov.uk/what-is-the-construction-industry-scheme
- **Companies House:** https://www.gov.uk/government/organisations/companies-house
- **Gas Safe Register:** https://www.gassaferegister.co.uk/
- **NICEIC:** https://www.niceic.com/

### Contact:
For technical support or questions about UK invoice compliance, please refer to the HMRC guidance or consult a qualified accountant.

---

**Document License:** MIT  
**Maintained by:** Invoice Generator Development Team  
**Last Review Date:** 2025-10-20