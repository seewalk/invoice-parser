/**
 * Ultimate SEO Keyword & Heading Audit Tool
 * 
 * This comprehensive tool analyzes:
 * - Keyword density and distribution
 * - Heading hierarchy (H1-H6)
 * - Keyword placement in critical SEO elements
 * - Content quality and readability
 * - SEO optimization score with actionable recommendations
 * 
 * Run after build: npm run build && npm run seo-keyword-audit
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Colors for beautiful terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
};

// Target keywords for the invoice parser business
const TARGET_KEYWORDS = {
  primary: [
    'invoice generator',
    'vat invoice',
    'cis invoice',
    'uk invoice',
    'hmrc compliant invoice',
    'vat compliant',
    'construction invoice',
  ],
  secondary: [
    'invoice template',
    'invoice maker',
    'free invoice generator',
    'invoice examples',
    'vat calculation',
    'cis deduction',
    'invoice format',
    'business invoice',
  ],
  longTail: [
    'how to create vat invoice uk',
    'cis deduction calculation',
    'hmrc invoice requirements',
    'vat invoice format uk',
    'construction industry scheme invoice',
    'free uk invoice generator',
  ]
};

class SEOKeywordAuditor {
  constructor() {
    this.results = {
      totalPages: 0,
      pages: [],
      overallScore: 0,
      topIssues: [],
      topStrengths: [],
      recommendations: [],
    };
  }

  // Extract all text content from HTML
  extractTextContent(html) {
    // Remove script and style tags
    let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Remove HTML tags
    text = text.replace(/<[^>]+>/g, ' ');
    
    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    
    // Normalize whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
  }

  // Extract heading structure
  extractHeadings(html) {
    const headings = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };
    
    for (let level = 1; level <= 6; level++) {
      const regex = new RegExp(`<h${level}[^>]*>([^<]+)</h${level}>`, 'gi');
      let match;
      
      while ((match = regex.exec(html)) !== null) {
        const text = match[1].replace(/&nbsp;/g, ' ').trim();
        headings[`h${level}`].push(text);
      }
    }
    
    return headings;
  }

  // Extract meta information
  extractMetaInfo(html) {
    return {
      title: /<title[^>]*>([^<]+)<\/title>/i.exec(html)?.[1] || '',
      description: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] || '',
      h1First: /<h1[^>]*>([^<]+)<\/h1>/i.exec(html)?.[1]?.replace(/&nbsp;/g, ' ').trim() || '',
      url: /<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] || '',
    };
  }

  // Calculate keyword density
  calculateKeywordDensity(text, keyword) {
    const words = text.toLowerCase().split(/\s+/);
    const keywordParts = keyword.toLowerCase().split(/\s+/);
    
    if (keywordParts.length === 1) {
      const count = words.filter(w => w === keywordParts[0]).length;
      return { count, density: (count / words.length) * 100 };
    }
    
    // Multi-word keyword
    let count = 0;
    const phrase = keyword.toLowerCase();
    const textLower = text.toLowerCase();
    let pos = 0;
    
    while ((pos = textLower.indexOf(phrase, pos)) !== -1) {
      count++;
      pos += phrase.length;
    }
    
    return { count, density: (count / (words.length / keywordParts.length)) * 100 };
  }

  // Analyze keyword usage across all elements
  analyzeKeywordUsage(html, text, metaInfo, headings) {
    const analysis = {
      primary: [],
      secondary: [],
      longTail: [],
      score: 0,
      strengths: [],
      issues: [],
    };

    // Analyze primary keywords
    TARGET_KEYWORDS.primary.forEach(keyword => {
      const density = this.calculateKeywordDensity(text, keyword);
      const inTitle = metaInfo.title.toLowerCase().includes(keyword.toLowerCase());
      const inDescription = metaInfo.description.toLowerCase().includes(keyword.toLowerCase());
      const inH1 = metaInfo.h1First.toLowerCase().includes(keyword.toLowerCase());
      const inH2s = headings.h2.some(h => h.toLowerCase().includes(keyword.toLowerCase()));
      const inUrl = metaInfo.url.toLowerCase().includes(keyword.replace(/\s+/g, '-').toLowerCase());
      
      let keywordScore = 0;
      const details = [];
      
      // Scoring logic
      if (inTitle) { keywordScore += 30; details.push('✅ In title'); }
      else { details.push('❌ Missing from title'); }
      
      if (inDescription) { keywordScore += 20; details.push('✅ In meta description'); }
      else { details.push('❌ Missing from meta description'); }
      
      if (inH1) { keywordScore += 25; details.push('✅ In H1'); }
      else { details.push('❌ Missing from H1'); }
      
      if (inH2s) { keywordScore += 15; details.push('✅ In H2s'); }
      else { details.push('⚠️  Missing from H2s'); }
      
      if (density.density >= 0.5 && density.density <= 2.5) {
        keywordScore += 10;
        details.push(`✅ Good density: ${density.density.toFixed(2)}%`);
      } else if (density.density > 2.5) {
        details.push(`⚠️  Keyword stuffing risk: ${density.density.toFixed(2)}%`);
      } else {
        details.push(`⚠️  Low density: ${density.density.toFixed(2)}%`);
      }
      
      analysis.primary.push({
        keyword,
        score: keywordScore,
        count: density.count,
        density: density.density,
        placement: { inTitle, inDescription, inH1, inH2s, inUrl },
        details,
      });
      
      analysis.score += keywordScore;
    });

    // Analyze secondary keywords (lighter analysis)
    TARGET_KEYWORDS.secondary.forEach(keyword => {
      const density = this.calculateKeywordDensity(text, keyword);
      const appears = density.count > 0;
      
      if (appears) {
        analysis.secondary.push({
          keyword,
          count: density.count,
          density: density.density,
          status: '✅ Present',
        });
      }
    });

    // Analyze long-tail keywords
    TARGET_KEYWORDS.longTail.forEach(keyword => {
      const density = this.calculateKeywordDensity(text, keyword);
      if (density.count > 0) {
        analysis.longTail.push({
          keyword,
          count: density.count,
          status: '✅ Excellent!',
        });
        analysis.score += 5;
      }
    });

    return analysis;
  }

  // Analyze heading structure
  analyzeHeadingStructure(headings) {
    const analysis = {
      score: 0,
      h1Count: headings.h1.length,
      totalHeadings: 0,
      hierarchy: [],
      issues: [],
      strengths: [],
    };

    // Count total headings
    for (let level = 1; level <= 6; level++) {
      analysis.totalHeadings += headings[`h${level}`].length;
    }

    // Check H1
    if (analysis.h1Count === 1) {
      analysis.score += 25;
      analysis.strengths.push('✅ Single H1 tag (SEO best practice)');
    } else if (analysis.h1Count === 0) {
      analysis.issues.push('❌ CRITICAL: No H1 tag found');
    } else {
      analysis.issues.push(`⚠️  Multiple H1 tags (${analysis.h1Count}) - should be only 1`);
      analysis.score += 10;
    }

    // Check for H2s
    if (headings.h2.length >= 3) {
      analysis.score += 20;
      analysis.strengths.push(`✅ Good H2 structure (${headings.h2.length} sections)`);
    } else if (headings.h2.length > 0) {
      analysis.score += 10;
      analysis.issues.push(`⚠️  Few H2 tags (${headings.h2.length}) - add more sections`);
    } else {
      analysis.issues.push('❌ No H2 tags - add section headings');
    }

    // Check heading hierarchy
    analysis.hierarchy = [
      { level: 'H1', count: headings.h1.length, examples: headings.h1.slice(0, 2) },
      { level: 'H2', count: headings.h2.length, examples: headings.h2.slice(0, 3) },
      { level: 'H3', count: headings.h3.length, examples: headings.h3.slice(0, 3) },
      { level: 'H4', count: headings.h4.length, examples: headings.h4.slice(0, 2) },
    ];

    // Check for proper nesting
    if (headings.h1.length > 0 && headings.h2.length > 0) {
      analysis.score += 15;
    }

    // Check heading length
    const allHeadings = [...headings.h1, ...headings.h2, ...headings.h3];
    const longHeadings = allHeadings.filter(h => h.length > 70);
    if (longHeadings.length > 0) {
      analysis.issues.push(`⚠️  ${longHeadings.length} headings too long (>70 chars)`);
    } else if (allHeadings.length > 0) {
      analysis.score += 10;
      analysis.strengths.push('✅ All headings are concise (<70 chars)');
    }

    return analysis;
  }

  // Analyze content quality
  analyzeContentQuality(text, html) {
    const analysis = {
      score: 0,
      wordCount: 0,
      readabilityScore: 0,
      issues: [],
      strengths: [],
    };

    // Word count
    const words = text.split(/\s+/).filter(w => w.length > 0);
    analysis.wordCount = words.length;

    if (analysis.wordCount >= 1500) {
      analysis.score += 30;
      analysis.strengths.push(`✅ Excellent content length (${analysis.wordCount} words)`);
    } else if (analysis.wordCount >= 800) {
      analysis.score += 20;
      analysis.strengths.push(`✅ Good content length (${analysis.wordCount} words)`);
    } else if (analysis.wordCount >= 300) {
      analysis.score += 10;
      analysis.issues.push(`⚠️  Thin content (${analysis.wordCount} words) - aim for 800+`);
    } else {
      analysis.issues.push(`❌ Very thin content (${analysis.wordCount} words) - add more`);
    }

    // Calculate simple readability (avg sentence length)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = words.length / sentences.length;

    if (avgWordsPerSentence <= 20) {
      analysis.score += 15;
      analysis.strengths.push('✅ Good readability (concise sentences)');
    } else if (avgWordsPerSentence <= 30) {
      analysis.score += 10;
      analysis.issues.push('⚠️  Some long sentences - improve readability');
    } else {
      analysis.issues.push('❌ Very long sentences - break them down');
    }

    // Check for lists (good for SEO)
    const listMatches = html.match(/<(ul|ol)[^>]*>/gi) || [];
    if (listMatches.length >= 2) {
      analysis.score += 10;
      analysis.strengths.push(`✅ Good use of lists (${listMatches.length})`);
    }

    // Check for internal links
    const internalLinks = (html.match(/<a[^>]*href=["'][^"']*["'][^>]*>/gi) || [])
      .filter(link => !link.includes('http') || link.includes('localhost'));
    
    if (internalLinks.length >= 3) {
      analysis.score += 10;
      analysis.strengths.push(`✅ Good internal linking (${internalLinks.length} links)`);
    } else if (internalLinks.length > 0) {
      analysis.score += 5;
      analysis.issues.push(`⚠️  Add more internal links (${internalLinks.length} found)`);
    }

    return analysis;
  }

  // Audit a single page
  auditPage(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    const urlPath = relativePath
      .replace('.next/server/app', '')
      .replace('/index.html', '')
      .replace('.html', '');

    const text = this.extractTextContent(html);
    const headings = this.extractHeadings(html);
    const metaInfo = this.extractMetaInfo(html);
    
    const keywordAnalysis = this.analyzeKeywordUsage(html, text, metaInfo, headings);
    const headingAnalysis = this.analyzeHeadingStructure(headings);
    const contentAnalysis = this.analyzeContentQuality(text, html);
    
    const totalScore = Math.min(100, Math.round(
      (keywordAnalysis.score / (TARGET_KEYWORDS.primary.length * 100) * 40) +
      (headingAnalysis.score / 100 * 30) +
      (contentAnalysis.score / 100 * 30)
    ));

    const pageResult = {
      path: urlPath,
      file: relativePath,
      title: metaInfo.title,
      score: totalScore,
      wordCount: contentAnalysis.wordCount,
      keywordAnalysis,
      headingAnalysis,
      contentAnalysis,
      metaInfo,
      headings,
    };

    this.results.pages.push(pageResult);
    this.results.totalPages++;

    return pageResult;
  }

  // Generate recommendations
  generateRecommendations() {
    const recs = [];
    
    // Analyze all pages for common issues
    const lowScorePages = this.results.pages.filter(p => p.score < 60);
    const missingH1Pages = this.results.pages.filter(p => p.headingAnalysis.h1Count !== 1);
    const thinContentPages = this.results.pages.filter(p => p.wordCount < 800);
    
    if (lowScorePages.length > 0) {
      recs.push({
        priority: 'HIGH',
        category: 'Overall SEO',
        issue: `${lowScorePages.length} pages have SEO score below 60%`,
        action: 'Focus on improving keyword placement and content quality on these pages',
        pages: lowScorePages.map(p => p.path).slice(0, 5),
      });
    }

    if (missingH1Pages.length > 0) {
      recs.push({
        priority: 'CRITICAL',
        category: 'Heading Structure',
        issue: `${missingH1Pages.length} pages missing proper H1 tag`,
        action: 'Add exactly one H1 tag per page with primary keyword',
        pages: missingH1Pages.map(p => p.path).slice(0, 5),
      });
    }

    if (thinContentPages.length > 0) {
      recs.push({
        priority: 'MEDIUM',
        category: 'Content Quality',
        issue: `${thinContentPages.length} pages have thin content (<800 words)`,
        action: 'Expand content with detailed explanations, examples, and use cases',
        pages: thinContentPages.map(p => p.path).slice(0, 5),
      });
    }

    // Check for keyword opportunities
    const pagesNeedingKeywords = this.results.pages.filter(p => 
      p.keywordAnalysis.primary.some(k => k.score < 50)
    );

    if (pagesNeedingKeywords.length > 0) {
      recs.push({
        priority: 'HIGH',
        category: 'Keyword Optimization',
        issue: `${pagesNeedingKeywords.length} pages not fully optimized for primary keywords`,
        action: 'Add primary keywords to title, H1, H2s, and first paragraph',
        pages: pagesNeedingKeywords.map(p => p.path).slice(0, 5),
      });
    }

    this.results.recommendations = recs;
  }

  // Print detailed report
  printReport() {
    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}           🚀 ULTIMATE SEO KEYWORD & HEADING AUDIT 🚀                      ${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

    // Overall score
    const avgScore = Math.round(
      this.results.pages.reduce((sum, p) => sum + p.score, 0) / this.results.pages.length
    );
    this.results.overallScore = avgScore;

    console.log(`${colors.bright}📊 OVERALL SEO SCORE: ${this.getScoreColor(avgScore)}${avgScore}/100${colors.reset}\n`);
    console.log(`${colors.bright}📄 Pages Analyzed: ${this.results.totalPages}${colors.reset}\n`);

    // Score distribution
    const excellent = this.results.pages.filter(p => p.score >= 80).length;
    const good = this.results.pages.filter(p => p.score >= 60 && p.score < 80).length;
    const needsWork = this.results.pages.filter(p => p.score < 60).length;

    console.log(`${colors.bright}${colors.blue}━━━ SCORE DISTRIBUTION ━━━${colors.reset}`);
    console.log(`  ${colors.green}🌟 Excellent (80-100): ${excellent}${colors.reset}`);
    console.log(`  ${colors.yellow}👍 Good (60-79): ${good}${colors.reset}`);
    console.log(`  ${colors.red}⚠️  Needs Work (<60): ${needsWork}${colors.reset}\n`);

    // Per-page analysis
    console.log(`${colors.bright}${colors.blue}━━━ PER-PAGE ANALYSIS ━━━${colors.reset}\n`);

    // Sort pages by score (worst first for priority)
    const sortedPages = [...this.results.pages].sort((a, b) => a.score - b.score);

    sortedPages.forEach((page, idx) => {
      if (idx < 10) { // Show top 10 worst pages for action
        console.log(`${colors.bright}${this.getScoreColor(page.score)}[${page.score}/100]${colors.reset} ${colors.cyan}${page.path}${colors.reset}`);
        console.log(`  📝 Title: ${page.title.substring(0, 60)}...`);
        console.log(`  📏 Words: ${page.wordCount} | H1: ${page.headingAnalysis.h1Count} | H2: ${page.headings.h2.length}`);
        
        // Show top keyword
        if (page.keywordAnalysis.primary.length > 0) {
          const topKeyword = page.keywordAnalysis.primary[0];
          console.log(`  🎯 Top Keyword: "${topKeyword.keyword}" (${topKeyword.count} mentions, ${topKeyword.density.toFixed(2)}% density)`);
        }

        // Show critical issues
        const criticalIssues = [
          ...page.headingAnalysis.issues,
          ...page.contentAnalysis.issues,
        ].filter(issue => issue.includes('❌'));

        if (criticalIssues.length > 0) {
          console.log(`  ${colors.red}Issues:${colors.reset}`);
          criticalIssues.slice(0, 2).forEach(issue => {
            console.log(`    ${issue}`);
          });
        }
        
        console.log('');
      }
    });

    // Keyword coverage report
    console.log(`${colors.bright}${colors.blue}━━━ KEYWORD COVERAGE ACROSS ALL PAGES ━━━${colors.reset}\n`);
    
    const keywordCoverage = {};
    TARGET_KEYWORDS.primary.forEach(kw => keywordCoverage[kw] = 0);
    
    this.results.pages.forEach(page => {
      page.keywordAnalysis.primary.forEach(kw => {
        if (kw.count > 0) keywordCoverage[kw.keyword]++;
      });
    });

    Object.entries(keywordCoverage).forEach(([keyword, pageCount]) => {
      const coverage = (pageCount / this.results.totalPages) * 100;
      const bar = '█'.repeat(Math.round(coverage / 5));
      console.log(`  ${keyword.padEnd(30)} ${bar} ${pageCount}/${this.results.totalPages} pages (${coverage.toFixed(0)}%)`);
    });
    console.log('');

    // Long-tail keyword success
    console.log(`${colors.bright}${colors.blue}━━━ LONG-TAIL KEYWORD WINS 🎉 ━━━${colors.reset}\n`);
    const longTailFound = [];
    this.results.pages.forEach(page => {
      page.keywordAnalysis.longTail.forEach(lt => {
        if (!longTailFound.includes(lt.keyword)) {
          longTailFound.push(lt.keyword);
        }
      });
    });

    if (longTailFound.length > 0) {
      longTailFound.forEach(keyword => {
        console.log(`  ${colors.green}✅ "${keyword}"${colors.reset}`);
      });
    } else {
      console.log(`  ${colors.yellow}⚠️  No long-tail keywords detected. Add FAQ sections and detailed explanations.${colors.reset}`);
    }
    console.log('');

    // Recommendations
    console.log(`${colors.bright}${colors.blue}━━━ 🎯 PRIORITY RECOMMENDATIONS ━━━${colors.reset}\n`);
    
    if (this.results.recommendations.length === 0) {
      console.log(`  ${colors.green}🎉 Excellent! No critical issues found!${colors.reset}\n`);
    } else {
      this.results.recommendations.forEach((rec, idx) => {
        const priorityColor = rec.priority === 'CRITICAL' ? colors.red : 
                             rec.priority === 'HIGH' ? colors.yellow : colors.blue;
        
        console.log(`  ${priorityColor}${colors.bright}[${rec.priority}]${colors.reset} ${rec.category}`);
        console.log(`  ${colors.dim}Issue:${colors.reset} ${rec.issue}`);
        console.log(`  ${colors.dim}Action:${colors.reset} ${rec.action}`);
        if (rec.pages && rec.pages.length > 0) {
          console.log(`  ${colors.dim}Affected pages:${colors.reset} ${rec.pages.join(', ')}`);
        }
        console.log('');
      });
    }

    // Success metrics
    console.log(`${colors.bright}${colors.blue}━━━ 🌟 SUCCESS METRICS ━━━${colors.reset}\n`);
    const totalWords = this.results.pages.reduce((sum, p) => sum + p.wordCount, 0);
    const avgWords = Math.round(totalWords / this.results.pages.length);
    const pagesOver800 = this.results.pages.filter(p => p.wordCount >= 800).length;

    console.log(`  📝 Total Words: ${colors.green}${totalWords.toLocaleString()}${colors.reset}`);
    console.log(`  📊 Average Words/Page: ${colors.green}${avgWords}${colors.reset}`);
    console.log(`  ✅ Pages with 800+ words: ${colors.green}${pagesOver800}/${this.results.totalPages}${colors.reset}`);
    console.log(`  🎯 Primary Keywords Tracked: ${colors.cyan}${TARGET_KEYWORDS.primary.length}${colors.reset}`);
    console.log(`  🌱 Secondary Keywords: ${colors.cyan}${TARGET_KEYWORDS.secondary.length}${colors.reset}`);
    console.log(`  🎪 Long-tail Keywords: ${colors.cyan}${TARGET_KEYWORDS.longTail.length}${colors.reset}`);

    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════════════════════${colors.reset}\n`);

    // Call to action
    if (avgScore >= 80) {
      console.log(`${colors.green}${colors.bright}🎉 OUTSTANDING SEO! You're ready to dominate search results! 🎉${colors.reset}\n`);
    } else if (avgScore >= 60) {
      console.log(`${colors.yellow}${colors.bright}💪 GOOD FOUNDATION! Follow recommendations to reach excellence! 💪${colors.reset}\n`);
    } else {
      console.log(`${colors.red}${colors.bright}⚡ ACTION NEEDED! Implement recommendations to boost rankings! ⚡${colors.reset}\n`);
    }

    console.log(`${colors.cyan}💡 Next steps:${colors.reset}`);
    console.log(`   1. Review the recommendations above`);
    console.log(`   2. Focus on pages with scores below 60`);
    console.log(`   3. Ensure all primary keywords appear in titles and H1s`);
    console.log(`   4. Expand thin content pages to 800+ words`);
    console.log(`   5. Re-run this audit after improvements\n`);

    console.log(`${colors.green}💰 Remember: Better SEO = More Traffic = More Income = Freedom! 💰${colors.reset}\n`);
  }

  // Helper: Get color based on score
  getScoreColor(score) {
    if (score >= 80) return colors.green + colors.bright;
    if (score >= 60) return colors.yellow + colors.bright;
    return colors.red + colors.bright;
  }

  // Save detailed JSON report
  saveReport() {
    const reportPath = path.join(process.cwd(), 'seo-keyword-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`${colors.green}📄 Detailed JSON report saved to: ${reportPath}${colors.reset}\n`);

    // Also save a CSV for easy analysis
    const csvPath = path.join(process.cwd(), 'seo-keyword-audit-report.csv');
    let csv = 'Path,Score,Word Count,H1 Count,H2 Count,Title,Top Keyword\n';
    
    this.results.pages.forEach(page => {
      const topKeyword = page.keywordAnalysis.primary[0]?.keyword || 'none';
      csv += `"${page.path}",${page.score},${page.wordCount},${page.headingAnalysis.h1Count},${page.headings.h2.length},"${page.title.replace(/"/g, '""')}","${topKeyword}"\n`;
    });
    
    fs.writeFileSync(csvPath, csv);
    console.log(`${colors.green}📊 CSV report saved to: ${csvPath}${colors.reset}\n`);
  }

  // Main run function
  async run() {
    console.log(`${colors.bright}${colors.cyan}🚀 Starting Ultimate SEO Keyword & Heading Audit...${colors.reset}\n`);

    // Check if build exists
    const nextDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(nextDir)) {
      console.log(`${colors.red}❌ No .next directory found. Please run 'npm run build' first.${colors.reset}\n`);
      process.exit(1);
    }

    // Find all HTML files
    const htmlFiles = await glob('.next/server/app/**/*.html', {
      ignore: ['**/node_modules/**']
    });

    if (htmlFiles.length === 0) {
      console.log(`${colors.yellow}⚠️  No HTML files found. Next.js App Router uses RSC.${colors.reset}`);
      console.log(`${colors.cyan}ℹ️  To analyze: npm run build && npm run start, then use browser tools${colors.reset}\n`);
      return;
    }

    console.log(`${colors.bright}Found ${htmlFiles.length} pages to analyze...${colors.reset}\n`);

    // Audit each page
    htmlFiles.forEach(file => {
      this.auditPage(file);
    });

    // Generate recommendations
    this.generateRecommendations();

    // Print and save reports
    this.printReport();
    this.saveReport();
  }
}

// Run the auditor
const auditor = new SEOKeywordAuditor();
auditor.run().catch(console.error);
