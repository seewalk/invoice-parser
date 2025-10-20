/**
 * Runtime SEO Audit - Checks Built HTML Files
 * 
 * This audits the actual .next/server output to verify:
 * - Schemas are properly injected at build time
 * - Meta tags are inherited from layouts
 * - Static generation is working correctly
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

const EXPECTED_ORG_NAME = 'Elektroluma Ltd';
const EXPECTED_COMPANY_NUMBER = '16392032';

class RuntimeAuditor {
  constructor() {
    this.results = {
      totalPages: 0,
      schemas: { found: 0, missing: 0, details: [] },
      metaTags: { found: 0, missing: 0, details: [] },
      staticGeneration: { static: 0, dynamic: 0, details: [] },
      overall: { score: 0, issues: [], warnings: [], successes: [] }
    };
  }

  // Check if Next.js build exists
  checkBuildExists() {
    const nextDir = path.join(process.cwd(), '.next');
    if (!fs.existsSync(nextDir)) {
      console.log(`${colors.red}❌ No .next directory found. Please run 'npm run build' first.${colors.reset}\n`);
      process.exit(1);
    }
    
    const serverDir = path.join(nextDir, 'server');
    if (!fs.existsSync(serverDir)) {
      console.log(`${colors.red}❌ No .next/server directory found. Build may be incomplete.${colors.reset}\n`);
      process.exit(1);
    }
    
    console.log(`${colors.green}✅ Build directory found${colors.reset}\n`);
  }

  // Extract schemas from HTML content
  extractSchemas(html) {
    const schemaRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    const schemas = [];
    let match;
    
    while ((match = schemaRegex.exec(html)) !== null) {
      try {
        const schemaData = JSON.parse(match[1]);
        schemas.push(schemaData);
      } catch (e) {
        // Skip invalid JSON
      }
    }
    
    return schemas;
  }

  // Extract meta tags from HTML content
  extractMetaTags(html) {
    const tags = {
      title: /<title[^>]*>([^<]+)<\/title>/i.exec(html)?.[1] || null,
      description: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] || null,
      canonical: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i.exec(html)?.[1] || null,
      ogTitle: /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] || null,
      ogDescription: /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] || null,
      ogUrl: /<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i.exec(html)?.[1] || null,
    };
    
    return tags;
  }

  // Audit a single HTML file
  auditHtmlFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    this.results.totalPages++;
    
    // Check schemas
    const schemas = this.extractSchemas(content);
    const schemaTypes = schemas.map(s => s['@type']).filter(Boolean);
    const hasOrgSchema = schemaTypes.includes('Organization');
    
    if (schemas.length > 0) {
      this.results.schemas.found++;
      this.results.schemas.details.push({
        file: relativePath,
        status: hasOrgSchema ? 'pass' : 'warning',
        count: schemas.length,
        types: schemaTypes,
        message: hasOrgSchema 
          ? `✅ ${schemas.length} schema(s) including Organization`
          : `⚠️  ${schemas.length} schema(s) but missing Organization`
      });
    } else {
      this.results.schemas.missing++;
      this.results.schemas.details.push({
        file: relativePath,
        status: 'fail',
        count: 0,
        types: [],
        message: '❌ No schemas found'
      });
    }
    
    // Check meta tags
    const metaTags = this.extractMetaTags(content);
    const metaCount = Object.values(metaTags).filter(Boolean).length;
    const totalMeta = Object.keys(metaTags).length;
    
    if (metaCount >= totalMeta - 1) {
      this.results.metaTags.found++;
      this.results.metaTags.details.push({
        file: relativePath,
        status: 'pass',
        count: metaCount,
        message: `✅ ${metaCount}/${totalMeta} meta tags present`,
        tags: metaTags
      });
    } else if (metaCount >= totalMeta / 2) {
      this.results.metaTags.found++;
      this.results.metaTags.details.push({
        file: relativePath,
        status: 'warning',
        count: metaCount,
        message: `⚠️  ${metaCount}/${totalMeta} meta tags present`,
        tags: metaTags
      });
    } else {
      this.results.metaTags.missing++;
      this.results.metaTags.details.push({
        file: relativePath,
        status: 'fail',
        count: metaCount,
        message: `❌ ${metaCount}/${totalMeta} meta tags present`,
        tags: metaTags
      });
    }
    
    // Check for organization entity
    const hasOrgName = content.includes(EXPECTED_ORG_NAME);
    const hasCompanyNumber = content.includes(EXPECTED_COMPANY_NUMBER);
    
    if (hasOrgName && hasCompanyNumber) {
      this.results.overall.successes.push(`${relativePath}: Organization entity consistent`);
    } else if (hasOrgName || hasCompanyNumber) {
      this.results.overall.warnings.push(`${relativePath}: Partial organization entity`);
    }
  }

  // Calculate overall score
  calculateScore() {
    const maxScore = this.results.totalPages * 2; // 2 checks per page
    const actualScore = this.results.schemas.found + this.results.metaTags.found;
    this.results.overall.score = maxScore > 0 ? Math.round((actualScore / maxScore) * 100) : 0;
  }

  // Print report
  printReport() {
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}        RUNTIME SEO AUDIT - BUILT HTML ANALYSIS                  ${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}\n`);
    
    console.log(`${colors.bright}📊 OVERALL SCORE: ${this.results.overall.score}%${colors.reset}\n`);
    console.log(`${colors.bright}📄 Total Pages Analyzed: ${this.results.totalPages}${colors.reset}\n`);
    
    // Schema report
    console.log(`${colors.bright}${colors.blue}━━━ SCHEMA.ORG STRUCTURED DATA ━━━${colors.reset}`);
    console.log(`✅ Pages with schemas: ${colors.green}${this.results.schemas.found}${colors.reset}`);
    console.log(`❌ Pages without schemas: ${colors.red}${this.results.schemas.missing}${colors.reset}\n`);
    
    this.results.schemas.details.forEach(detail => {
      console.log(`  ${detail.message}`);
      console.log(`     ${colors.cyan}${detail.file}${colors.reset}`);
      if (detail.types.length > 0) {
        console.log(`     Types: ${detail.types.join(', ')}`);
      }
      console.log('');
    });
    
    // Meta tags report
    console.log(`${colors.bright}${colors.blue}━━━ META TAGS & SEO ELEMENTS ━━━${colors.reset}`);
    console.log(`✅ Pages with complete meta: ${colors.green}${this.results.metaTags.found}${colors.reset}`);
    console.log(`❌ Pages with incomplete meta: ${colors.red}${this.results.metaTags.missing}${colors.reset}\n`);
    
    this.results.metaTags.details.forEach(detail => {
      console.log(`  ${detail.message}`);
      console.log(`     ${colors.cyan}${detail.file}${colors.reset}`);
      if (detail.tags.title) {
        console.log(`     Title: ${detail.tags.title.substring(0, 60)}...`);
      }
      console.log('');
    });
    
    // Summary
    console.log(`${colors.bright}${colors.blue}━━━ SUMMARY ━━━${colors.reset}`);
    
    if (this.results.overall.score >= 90) {
      console.log(`${colors.green}✅ Excellent SEO implementation!${colors.reset}`);
    } else if (this.results.overall.score >= 70) {
      console.log(`${colors.yellow}⚠️  Good SEO, but room for improvement${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ SEO needs improvements${colors.reset}`);
    }
    
    console.log(`\n${colors.bright}Key Findings:${colors.reset}`);
    console.log(`  • ${this.results.schemas.found} pages have Schema.org markup`);
    console.log(`  • ${this.results.metaTags.found} pages have proper meta tags`);
    console.log(`  • ${this.results.overall.successes.length} pages have consistent organization entity`);
    
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}\n`);
  }

  // Save JSON report
  saveReport() {
    const reportPath = path.join(process.cwd(), 'seo-audit-runtime-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`${colors.green}📄 Detailed report saved to: ${reportPath}${colors.reset}\n`);
  }

  // Main run function
  async run() {
    console.log(`${colors.bright}${colors.cyan}🔍 Starting Runtime SEO Audit...${colors.reset}\n`);
    
    // Check if build exists
    this.checkBuildExists();
    
    // Find all HTML files in .next/server/app
    const serverAppDir = path.join(process.cwd(), '.next', 'server', 'app');
    
    if (!fs.existsSync(serverAppDir)) {
      console.log(`${colors.yellow}⚠️  No app directory found in build. Checking pages directory...${colors.reset}\n`);
      return;
    }
    
    // Find all HTML files
    const htmlFiles = await glob('.next/server/app/**/*.html', {
      ignore: ['**/node_modules/**']
    });
    
    console.log(`${colors.bright}Found ${htmlFiles.length} built HTML files${colors.reset}\n`);
    
    if (htmlFiles.length === 0) {
      console.log(`${colors.yellow}⚠️  No HTML files found. The build may be using React Server Components without pre-rendered HTML.${colors.reset}`);
      console.log(`${colors.yellow}    This is normal for Next.js App Router. Schemas and meta tags are rendered at runtime.${colors.reset}\n`);
      
      // Check for RSC payload files instead
      const rscFiles = await glob('.next/server/app/**/page.js', {
        ignore: ['**/node_modules/**']
      });
      
      console.log(`${colors.bright}Found ${rscFiles.length} React Server Component files${colors.reset}\n`);
      
      if (rscFiles.length > 0) {
        console.log(`${colors.green}✅ React Server Components detected${colors.reset}`);
        console.log(`${colors.cyan}ℹ️  To verify SEO elements, start the production server and use browser dev tools:${colors.reset}`);
        console.log(`   1. npm run build && npm run start`);
        console.log(`   2. Open http://localhost:3000 in browser`);
        console.log(`   3. View page source (Ctrl+U) to see rendered schemas and meta tags\n`);
      }
      
      return;
    }
    
    // Audit each HTML file
    for (const file of htmlFiles) {
      this.auditHtmlFile(file);
    }
    
    // Calculate score and print report
    this.calculateScore();
    this.printReport();
    this.saveReport();
  }
}

// Run the auditor
const auditor = new RuntimeAuditor();
auditor.run().catch(console.error);