/**
 * Extract H1 and Meta Description Length Issues
 * Directly from built HTML files
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

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
console.log(`${colors.bright}${colors.cyan}     H1 & Meta Description Length Analysis                     ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

// Check if build exists
const nextDir = path.join(process.cwd(), '.next');
if (!fs.existsSync(nextDir)) {
  console.log(`${colors.red}❌ No .next directory found. Please run 'npm run build' first.${colors.reset}\n`);
  process.exit(1);
}

async function extractMetaInfo(html) {
  const h1Match = /<h1[^>]*>([^<]+)<\/h1>/i.exec(html);
  const h1 = h1Match ? h1Match[1].replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim() : '';
  
  const descMatch = /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i.exec(html);
  const description = descMatch ? descMatch[1] : '';
  
  const titleMatch = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
  const title = titleMatch ? titleMatch[1] : '';
  
  return { h1, description, title };
}

async function analyze() {
  console.log(`${colors.bright}Scanning built HTML files...${colors.reset}\n`);
  
  // Find all HTML files
  const htmlFiles = await glob('.next/server/app/**/*.html', {
    ignore: ['**/node_modules/**']
  });
  
  if (htmlFiles.length === 0) {
    console.log(`${colors.yellow}⚠️  No HTML files found.${colors.reset}\n`);
    return;
  }
  
  const longH1Pages = [];
  const longMetaPages = [];
  const bothIssuesPages = [];
  
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(process.cwd(), file);
    const urlPath = relativePath
      .replace('.next/server/app', '')
      .replace('/index.html', '')
      .replace('.html', '');
    
    const { h1, description, title } = await extractMetaInfo(html);
    
    const h1Length = h1.length;
    const descLength = description.length;
    
    const hasLongH1 = h1Length > 55;
    const hasLongDesc = descLength > 155;
    
    if (hasLongH1 && hasLongDesc) {
      bothIssuesPages.push({ path: urlPath, h1, h1Length, description, descLength, title });
    } else if (hasLongH1) {
      longH1Pages.push({ path: urlPath, h1, h1Length, title });
    } else if (hasLongDesc) {
      longMetaPages.push({ path: urlPath, description, descLength, title });
    }
  }
  
  // Print results
  console.log(`${colors.bright}${colors.blue}━━━ SUMMARY ━━━${colors.reset}\n`);
  console.log(`Total pages analyzed: ${colors.cyan}${htmlFiles.length}${colors.reset}`);
  console.log(`Pages with H1 > 55 chars: ${colors.yellow}${longH1Pages.length + bothIssuesPages.length}${colors.reset}`);
  console.log(`Pages with meta desc > 155 chars: ${colors.yellow}${longMetaPages.length + bothIssuesPages.length}${colors.reset}`);
  console.log(`Pages with BOTH issues: ${colors.red}${bothIssuesPages.length}${colors.reset}\n`);
  
  // BOTH issues
  if (bothIssuesPages.length > 0) {
    console.log(`${colors.bright}${colors.red}━━━ CRITICAL: Pages with BOTH Issues (${bothIssuesPages.length}) ━━━${colors.reset}\n`);
    
    bothIssuesPages.forEach((page, idx) => {
      console.log(`${colors.bright}${idx + 1}. ${colors.cyan}${page.path || '/'}${colors.reset}`);
      console.log(`   ${colors.dim}Title:${colors.reset} ${page.title.substring(0, 60)}...`);
      console.log(`   ${colors.red}H1 (${page.h1Length} chars):${colors.reset} ${page.h1.substring(0, 80)}${page.h1.length > 80 ? '...' : ''}`);
      console.log(`   ${colors.red}Meta Desc (${page.descLength} chars):${colors.reset}`);
      console.log(`   ${page.description.substring(0, 100)}${page.description.length > 100 ? '...' : ''}`);
      console.log('');
    });
  }
  
  // H1 only
  if (longH1Pages.length > 0) {
    console.log(`${colors.bright}${colors.yellow}━━━ Pages with H1 > 55 Characters (${longH1Pages.length}) ━━━${colors.reset}\n`);
    
    longH1Pages.forEach((page, idx) => {
      console.log(`${colors.bright}${idx + 1}. ${colors.cyan}${page.path || '/'}${colors.reset}`);
      console.log(`   ${colors.yellow}H1 (${page.h1Length} chars):${colors.reset} ${page.h1}`);
      console.log(`   ${colors.green}✂️  Suggestion:${colors.reset} ${page.h1.substring(0, 50)}...`);
      console.log('');
    });
  }
  
  // Meta desc only
  if (longMetaPages.length > 0) {
    console.log(`${colors.bright}${colors.yellow}━━━ Pages with Meta Description > 155 Characters (${longMetaPages.length}) ━━━${colors.reset}\n`);
    
    longMetaPages.forEach((page, idx) => {
      console.log(`${colors.bright}${idx + 1}. ${colors.cyan}${page.path || '/'}${colors.reset}`);
      console.log(`   ${colors.yellow}Meta Desc (${page.descLength} chars):${colors.reset}`);
      console.log(`   ${page.description.substring(0, 100)}...`);
      console.log(`   ${colors.green}✂️  Suggestion:${colors.reset} ${page.description.substring(0, 150)}...`);
      console.log('');
    });
  }
  
  // No issues
  if (longH1Pages.length === 0 && longMetaPages.length === 0 && bothIssuesPages.length === 0) {
    console.log(`${colors.green}${colors.bright}🎉 Excellent! All H1s and meta descriptions are within optimal length!${colors.reset}\n`);
  }
  
  // Export to CSV
  const exportPath = path.join(process.cwd(), 'seo-length-issues.csv');
  let csvOutput = 'Path,Issue Type,H1 Length,H1 Text,Meta Desc Length,Meta Desc Text\n';
  
  bothIssuesPages.forEach(page => {
    csvOutput += `"${page.path}","BOTH",${page.h1Length},"${page.h1.replace(/"/g, '""')}",${page.descLength},"${page.description.replace(/"/g, '""')}"\n`;
  });
  
  longH1Pages.forEach(page => {
    csvOutput += `"${page.path}","H1_ONLY",${page.h1Length},"${page.h1.replace(/"/g, '""')}",N/A,"N/A"\n`;
  });
  
  longMetaPages.forEach(page => {
    csvOutput += `"${page.path}","META_ONLY",N/A,"N/A",${page.descLength},"${page.description.replace(/"/g, '""')}"\n`;
  });
  
  fs.writeFileSync(exportPath, csvOutput);
  console.log(`${colors.green}📄 Results exported to: ${exportPath}${colors.reset}\n`);
  
  // Recommendations
  console.log(`${colors.bright}${colors.blue}━━━ RECOMMENDATIONS ━━━${colors.reset}\n`);
  
  if (longH1Pages.length > 0 || bothIssuesPages.length > 0) {
    console.log(`${colors.yellow}H1 Best Practices:${colors.reset}`);
    console.log(`  • Keep H1 under 55 characters (ideally 40-50)`);
    console.log(`  • Google truncates longer H1s in search results`);
    console.log(`  • Focus on clarity and primary keyword`);
    console.log(`  • Make it compelling and descriptive\n`);
  }
  
  if (longMetaPages.length > 0 || bothIssuesPages.length > 0) {
    console.log(`${colors.yellow}Meta Description Best Practices:${colors.reset}`);
    console.log(`  • Keep between 150-155 characters`);
    console.log(`  • Google truncates at ~155-160 chars`);
    console.log(`  • Include primary keyword and CTA`);
    console.log(`  • Make each description unique\n`);
  }
  
  console.log(`${colors.cyan}💡 Pro Tip:${colors.reset} Shorter = Better click-through rates!`);
  console.log(`   Users scan quickly. Be concise and compelling.\n`);
  
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
}

analyze().catch(console.error);
