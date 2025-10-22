/**
 * Analyze SEO Report for Length Issues
 * 
 * Extracts pages with:
 * - H1 longer than 55 characters
 * - Meta description longer than 155 characters
 */

const fs = require('fs');
const path = require('path');

// Check if report exists
const jsonReportPath = path.join(process.cwd(), 'seo-keyword-audit-report.json');
const csvReportPath = path.join(process.cwd(), 'seo-keyword-audit-report.csv');

if (!fs.existsSync(jsonReportPath) && !fs.existsSync(csvReportPath)) {
  console.log('❌ No SEO audit reports found.');
  console.log('Please run: npm run build && npm run seo-keyword-audit');
  process.exit(1);
}

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}     SEO LENGTH ANALYSIS - H1 & Meta Description Issues        ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

let report;

// Try to read JSON report first
if (fs.existsSync(jsonReportPath)) {
  console.log(`${colors.green}✅ Reading JSON report...${colors.reset}\n`);
  report = JSON.parse(fs.readFileSync(jsonReportPath, 'utf-8'));
} else {
  console.log(`${colors.yellow}⚠️  JSON report not found, parsing CSV...${colors.reset}\n`);
  // Parse CSV as fallback
  const csvContent = fs.readFileSync(csvReportPath, 'utf-8');
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  
  report = {
    pages: lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g).map(v => v.replace(/^"|"$/g, ''));
      return {
        path: values[0],
        score: parseInt(values[1]),
        wordCount: parseInt(values[2]),
        metaInfo: {
          title: values[5],
          h1First: '', // Not in CSV
          description: '' // Not in CSV
        }
      };
    })
  };
}

// Analyze H1 and Meta Description lengths
const h1Issues = [];
const metaDescIssues = [];
const bothIssues = [];

report.pages.forEach(page => {
  const h1 = page.metaInfo?.h1First || '';
  const metaDesc = page.metaInfo?.description || '';
  const title = page.metaInfo?.title || '';
  
  const h1Length = h1.length;
  const metaDescLength = metaDesc.length;
  
  const hasH1Issue = h1Length > 55;
  const hasMetaDescIssue = metaDescLength > 155;
  
  if (hasH1Issue && hasMetaDescIssue) {
    bothIssues.push({
      path: page.path,
      h1,
      h1Length,
      metaDesc: metaDesc.substring(0, 100) + (metaDesc.length > 100 ? '...' : ''),
      metaDescLength,
      title
    });
  } else if (hasH1Issue) {
    h1Issues.push({
      path: page.path,
      h1,
      h1Length,
      title
    });
  } else if (hasMetaDescIssue) {
    metaDescIssues.push({
      path: page.path,
      metaDesc: metaDesc.substring(0, 100) + (metaDesc.length > 100 ? '...' : ''),
      metaDescLength,
      title
    });
  }
});

// Print results
console.log(`${colors.bright}${colors.blue}━━━ SUMMARY ━━━${colors.reset}\n`);
console.log(`Total pages analyzed: ${colors.cyan}${report.pages.length}${colors.reset}`);
console.log(`Pages with H1 > 55 chars: ${colors.yellow}${h1Issues.length + bothIssues.length}${colors.reset}`);
console.log(`Pages with meta desc > 155 chars: ${colors.yellow}${metaDescIssues.length + bothIssues.length}${colors.reset}`);
console.log(`Pages with BOTH issues: ${colors.red}${bothIssues.length}${colors.reset}\n`);

// Print pages with BOTH issues
if (bothIssues.length > 0) {
  console.log(`${colors.bright}${colors.red}━━━ CRITICAL: Pages with BOTH Issues (${bothIssues.length}) ━━━${colors.reset}\n`);
  
  bothIssues.forEach((page, idx) => {
    console.log(`${colors.bright}${idx + 1}. ${colors.cyan}${page.path}${colors.reset}`);
    console.log(`   ${colors.dim}Title:${colors.reset} ${page.title.substring(0, 60)}...`);
    console.log(`   ${colors.red}H1 (${page.h1Length} chars):${colors.reset} ${page.h1.substring(0, 80)}${page.h1.length > 80 ? '...' : ''}`);
    console.log(`   ${colors.red}Meta Desc (${page.metaDescLength} chars):${colors.reset} ${page.metaDesc}`);
    console.log('');
  });
}

// Print H1-only issues
if (h1Issues.length > 0) {
  console.log(`${colors.bright}${colors.yellow}━━━ Pages with H1 > 55 Characters (${h1Issues.length}) ━━━${colors.reset}\n`);
  
  h1Issues.forEach((page, idx) => {
    console.log(`${colors.bright}${idx + 1}. ${colors.cyan}${page.path}${colors.reset}`);
    console.log(`   ${colors.yellow}H1 (${page.h1Length} chars):${colors.reset} ${page.h1}`);
    console.log(`   ${colors.dim}Suggestion:${colors.reset} Shorten to ~50 chars for better click-through rates`);
    console.log('');
  });
}

// Print Meta Description-only issues
if (metaDescIssues.length > 0) {
  console.log(`${colors.bright}${colors.yellow}━━━ Pages with Meta Description > 155 Characters (${metaDescIssues.length}) ━━━${colors.reset}\n`);
  
  metaDescIssues.forEach((page, idx) => {
    console.log(`${colors.bright}${idx + 1}. ${colors.cyan}${page.path}${colors.reset}`);
    console.log(`   ${colors.yellow}Meta Desc (${page.metaDescLength} chars):${colors.reset}`);
    console.log(`   ${page.metaDesc}`);
    console.log(`   ${colors.dim}Suggestion:${colors.reset} Trim to 150-155 chars for full display in search results`);
    console.log('');
  });
}

// No issues found
if (h1Issues.length === 0 && metaDescIssues.length === 0 && bothIssues.length === 0) {
  console.log(`${colors.green}${colors.bright}🎉 Excellent! All H1s and meta descriptions are within optimal length!${colors.reset}\n`);
}

// Export results to CSV
const exportPath = path.join(process.cwd(), 'seo-length-issues.csv');
let csvOutput = 'Path,Issue Type,H1 Length,H1 Text,Meta Desc Length,Meta Desc Text\n';

bothIssues.forEach(page => {
  csvOutput += `"${page.path}","BOTH",${page.h1Length},"${page.h1.replace(/"/g, '""')}",${page.metaDescLength},"${page.metaDesc.replace(/"/g, '""')}"\n`;
});

h1Issues.forEach(page => {
  csvOutput += `"${page.path}","H1_ONLY",${page.h1Length},"${page.h1.replace(/"/g, '""')}",N/A,"N/A"\n`;
});

metaDescIssues.forEach(page => {
  csvOutput += `"${page.path}","META_ONLY",N/A,"N/A",${page.metaDescLength},"${page.metaDesc.replace(/"/g, '""')}"\n`;
});

fs.writeFileSync(exportPath, csvOutput);
console.log(`${colors.green}📄 Results exported to: ${exportPath}${colors.reset}\n`);

// Summary recommendations
console.log(`${colors.bright}${colors.blue}━━━ RECOMMENDATIONS ━━━${colors.reset}\n`);

if (bothIssues.length > 0 || h1Issues.length > 0) {
  console.log(`${colors.yellow}H1 Best Practices:${colors.reset}`);
  console.log(`  • Keep H1 under 55 characters (ideally 40-50)`);
  console.log(`  • Include primary keyword near the beginning`);
  console.log(`  • Make it compelling and click-worthy`);
  console.log(`  • One H1 per page only\n`);
}

if (bothIssues.length > 0 || metaDescIssues.length > 0) {
  console.log(`${colors.yellow}Meta Description Best Practices:${colors.reset}`);
  console.log(`  • Keep between 150-155 characters (Google's display limit)`);
  console.log(`  • Include primary keyword naturally`);
  console.log(`  • Add a call-to-action`);
  console.log(`  • Make it unique per page\n`);
}

console.log(`${colors.cyan}💡 Pro Tip:${colors.reset} Shorter, punchier text often performs better!`);
console.log(`   Focus on clarity and relevance over cramming keywords.\n`);

console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
