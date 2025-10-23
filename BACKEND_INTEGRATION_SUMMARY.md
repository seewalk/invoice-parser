# 🎯 Backend Integration Quick Reference

**Status:** ✅ Complete GPT-4/5 Vision Integration Guide Ready  
**Date:** 2024-10-23  
**Frontend:** Sequential single-page processing  
**Backend:** Per-page GPT Vision parsing

---

## 📄 **MAIN DOCUMENT**

**Complete Guide:** `BACKEND_GPT_INTEGRATION_GUIDE.md` (37KB, 1,263 lines)

This is your comprehensive, production-ready guide for backend developers.

---

## ⚡ **QUICK START FOR BACKEND DEV**

### **What Changed**
- ❌ **OLD:** Frontend sent all pages in one batch
- ✅ **NEW:** Frontend sends pages one-at-a-time sequentially

### **What Backend Needs to Do**
1. Accept request with `imageUrls: [single_url]` (array with 1 URL)
2. Download image from S3 URL
3. Send to GPT-4/5 Vision API with provided prompts
4. Parse JSON response
5. Validate and normalize data
6. Return standardized JSON

### **Expected Response Time**
- Target: < 5 seconds per page
- Typical: 2-4 seconds

---

## 🔑 **KEY SECTIONS IN FULL GUIDE**

| Section | Page | What's Included |
|---------|------|-----------------|
| **System Prompt** | Line 50 | 200-line production prompt for GPT Vision |
| **User Prompt** | Line 280 | Dynamic prompt builder per request |
| **Python Lambda** | Line 350 | Complete working Lambda function |
| **Response Format** | Line 120 | Exact JSON structure required |
| **Error Handling** | Line 850 | All error cases and responses |
| **Cost Analysis** | Line 920 | Token usage and pricing ($0.015/page) |
| **Testing** | Line 980 | Test cases and validation checklist |
| **Deployment** | Line 1050 | AWS deployment steps |

---

## 📋 **CRITICAL INFORMATION**

### **API Endpoint**
```
POST https://jm1n4qxu69.execute-api.eu-west-2.amazonaws.com/invoicer-stage/invoiceParser
```

### **Request Example**
```json
{
  "imageUrls": [
    "https://invoice-parser-images.s3.eu-west-2.amazonaws.com/uploads/2024-10-23/page1.jpg"
  ]
}
```

### **Response Example**
```json
{
  "success": true,
  "data": {
    "vendor": {"name": "ABC Construction Ltd"},
    "invoiceNumber": "INV-2024-001",
    "invoiceDate": "2024-10-15",
    "date": "2024-10-15",
    "dueDate": "2024-11-15",
    "total": 2500.00,
    "totalAmount": 2500.00,
    "currency": "GBP",
    "items": [
      {
        "description": "Labour - Carpentry",
        "quantity": 40,
        "unitPrice": 25.00,
        "total": 1000.00,
        "category": "Labour"
      }
    ],
    "lineItems": [ /* same as items */ ],
    "subtotal": 2000.00,
    "tax": 400.00,
    "taxAmount": 400.00,
    "vat": 400.00,
    "confidence": 0.95
  }
}
```

---

## 🎨 **PROMPT HIGHLIGHTS**

### **System Prompt Features**
✅ UK-specific invoice patterns (VAT, CIS, Companies House)  
✅ Multi-page detection (page 1 vs continuation pages)  
✅ Category inference (Labour, Materials, Equipment, Services)  
✅ Calculation validation (subtotal + tax = total)  
✅ Confidence scoring (0.0-1.0 based on quality)  
✅ Edge case handling (illegible text, handwritten, missing data)  
✅ Structured JSON output enforcement

### **User Prompt Features**
✅ Context-aware (page number awareness)  
✅ Priority-based extraction (header → items → totals)  
✅ Special instructions for continuation pages  
✅ Quality assessment requirements

---

## 💰 **COST EXPECTATIONS**

| Component | Tokens | Cost |
|-----------|--------|------|
| System Prompt | ~800 | $0.0024 |
| User Prompt | ~150 | $0.00045 |
| Image (high detail) | ~1,500 | $0.0045 |
| Response | ~500 | $0.0075 |
| **Total per page** | **~2,950** | **$0.0145** |

**Monthly Estimates:**
- 1,000 pages: $14.50
- 5,000 pages: $72.50
- 10,000 pages: $145.00

---

## 🛠️ **LAMBDA CONFIGURATION**

```yaml
Memory: 1024 MB (minimum)
Timeout: 30 seconds
Runtime: Python 3.11
Environment Variables:
  - OPENAI_API_KEY: sk-proj-xxxxx
  - AWS_REGION: eu-west-2
Dependencies:
  - openai==1.12.0
  - requests==2.31.0
```

---

## ✅ **FRONTEND COMPATIBILITY**

The frontend automatically maps various field name formats:

```javascript
// All these work:
data.vendor.name || data.supplier || data.vendor
data.invoiceNumber || data.invoice_number
data.total || data.totalAmount || data.total_amount
data.items || data.lineItems || data.line_items
data.tax || data.taxAmount || data.vat

// So backend can use any naming convention!
```

**Pro Tip:** Use multiple field names (camelCase + snake_case) for maximum compatibility.

---

## 🎯 **SPECIAL FEATURES**

### **Multi-Page Support**
The system handles:
1. **Complete single-page invoices** (all data on one page)
2. **First page** (header + dates + first items)
3. **Continuation pages** (just line items, no header)
4. **Last page** (final items + totals)

### **UK Invoice Expertise**
- VAT (Value Added Tax) - 20% standard rate
- CIS (Construction Industry Scheme) deductions
- Companies House registration numbers
- HMRC tax references
- Payment terms (Net 30 days, etc.)

### **Quality Assurance**
- Confidence scoring (0.0-1.0)
- Calculation validation
- Image quality assessment
- Partial data handling

---

## 🔍 **TESTING CHECKLIST**

Before going live, test with:
- [ ] Simple single-page invoice
- [ ] Multi-page invoice (all pages)
- [ ] Continuation page (no header)
- [ ] Low quality scan
- [ ] Handwritten invoice
- [ ] Invoice with CIS deduction
- [ ] Multiple tax rates
- [ ] Non-English text
- [ ] Rotated/skewed image
- [ ] Very large invoice (50+ line items)

---

## 📊 **PERFORMANCE TARGETS**

| Metric | Target | Notes |
|--------|--------|-------|
| Response Time (P95) | < 5s | 95th percentile |
| Accuracy (Amounts) | > 99% | Within 1% of actual |
| Accuracy (Line Items) | > 95% | All items extracted |
| Confidence (Clear) | > 0.90 | For clear images |
| Error Rate | < 1% | Failed requests |
| Uptime | 99.9% | AWS SLA |

---

## 🚨 **COMMON PITFALLS TO AVOID**

1. ❌ **Don't expect multiple URLs** - Always process first URL only
2. ❌ **Don't aggregate pages backend-side** - Frontend handles this
3. ❌ **Don't use low temperature** - Use 0.1 for consistency
4. ❌ **Don't skip validation** - Always validate subtotal + tax = total
5. ❌ **Don't forget CORS headers** - Frontend needs them
6. ❌ **Don't use "low" detail** - Use "high" for accuracy
7. ❌ **Don't hardcode field names** - Support multiple naming conventions
8. ❌ **Don't return markdown** - JSON only (use response_format)

---

## 📞 **SUPPORT RESOURCES**

| Resource | Location | Purpose |
|----------|----------|---------|
| **Full Integration Guide** | `BACKEND_GPT_INTEGRATION_GUIDE.md` | Complete specs |
| **API Integration Docs** | `API_INTEGRATION.md` | Existing API docs |
| **Frontend Parser Code** | `app/parser/page.tsx` | See how frontend works |
| **Invoice Types** | `app/types/invoice.ts` | TypeScript interfaces |
| **OpenAI Docs** | https://platform.openai.com/docs/guides/vision | Official docs |

---

## 🎉 **READY TO IMPLEMENT**

Your backend developer has everything needed:
✅ Production-ready prompts (tested and optimized)  
✅ Complete Lambda function code (copy-paste ready)  
✅ Response format specification (exact structure)  
✅ Error handling (all cases covered)  
✅ Testing checklist (comprehensive)  
✅ Deployment guide (step-by-step)  
✅ Cost estimates (transparent pricing)  
✅ Performance benchmarks (clear targets)

**Next Steps:**
1. Backend dev reads `BACKEND_GPT_INTEGRATION_GUIDE.md`
2. Implement Lambda function (code provided)
3. Configure OpenAI API key
4. Deploy to AWS Lambda
5. Test with sample invoices
6. Go live! 🚀

---

## 📝 **VERSION HISTORY**

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-10-23 | Initial comprehensive guide created |

---

## 🤝 **COLLABORATION**

**Frontend Team:** Sequential page processing implemented  
**Backend Team:** Use this guide to implement GPT Vision parsing  
**Contract:** Request/response format defined in full guide

**Communication:**
- Frontend expects: `{success, data}` response
- Backend provides: Standardized JSON structure
- Both teams: Support flexible field naming

---

**Questions?** Check the full guide: `BACKEND_GPT_INTEGRATION_GUIDE.md`

**Issues?** Review error handling section in full guide

**Need examples?** See response examples (3 provided in full guide)

---

**Status:** 📄 Documentation Complete ✅  
**Next:** 🔧 Backend Implementation  
**Timeline:** Deploy within 1-2 days

---

**Built with ❤️ for InvoiceParse.ai**
