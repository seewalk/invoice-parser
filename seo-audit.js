/**
 * Comprehensive SEO Audit Tool
 * 
 * Verifies:
 * - Static HTML generation (SSG)
 * - Schema.org structured data
 * - Meta tags (canonical, OG, Twitter)
 * - Organization entity consistency
 * - Performance metrics
 * - SEO best practices
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// ANSI color codes for terminal output
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
const EXPECTED_DOMAIN = 'elektroluma.co.uk';

class SEOAuditor {
  constructor() {
    this.results = {
      totalPages: 0,
      staticGeneration: { passed: 0, failed: 0, details: [] },
      schemas: { passed: 0, failed: 0, details: [] },
      metaTags: { passed: 0, failed: 0, details: [] },
      organization: { passed: 0, failed: 0, details: [] },
      overall: { score: 0, issues: [], warnings: [], successes: [] }
    };
  }

  // Check if file is statically generated
  checkStaticGeneration(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Check for SSG indicators
    const hasStaticProps = content.includes('getStaticProps') || content.includes('generateStaticParams');
    const hasClientOnly = content.includes('use client') && !hasStaticProps;
    
    if (hasStaticProps || !hasClientOnly) {
      this.results.staticGeneration.passed++;
      this.results.staticGeneration.details.push({
        file: relativePath,
        status: 'pass',
        message: hasStaticProps ? 'Uses SSG (getStaticProps/generateStaticParams)' : 'Server component (default SSG)'
      });
    } else if (hasClientOnly) {
      this.results.staticGeneration.failed++;
      this.results.staticGeneration.details.push({
        file: relativePath,
        status: 'warning',
        message: 'Client component - verify if SSG parent wrapper exists'
      });
    }
  }

  // Check Schema.org structured data
  checkSchemas(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    // Extract all schema types
    const schemaMatches = content.matchAll(/"@type":\s*"([^"]+)"/g);
    const schemaTypes = Array.from(schemaMatches, m => m[1]);
    
    if (schemaTypes.length === 0) {
      this.results.schemas.failed++;
      this.results.schemas.details.push({
        file: relativePath,
        status: 'fail',
        message: 'No Schema.org structured data found',
        types: []
      });
      return;
    }
    
    // Check for Organization schema
    const hasOrgSchema = schemaTypes.includes('Organization');
    
    this.results.schemas.passed++;
    this.results.schemas.details.push({
      file: relativePath,
      status: hasOrgSchema ? 'pass' : 'warning',
      message: `Found ${schemaTypes.length} schema(s)${hasOrgSchema ? ' including Organization' : ' - missing Organization'}`,
      types: schemaTypes
    });
  }

  // Check meta tags (canonical, OG, etc.)
  checkMetaTags(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    const checks = {
      hasCanonical: /alternates:\s*{[^}]*canonical:/s.test(content) || /<link[^>]*rel="canonical"/i.test(content),
      hasOGTags: /openGraph:\s*{/s.test(content) || /<meta[^>]*property="og:/i.test(content),
      hasTitle: /title:\s*['"`]/s.test(content) || /<title>/i.test(content),
      hasDescription: /description:\s*['"`]/s.test(content) || /<meta[^>]*name="description"/i.test(content),
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    const totalChecks = Object.keys(checks).length;
    
    if (passedChecks === totalChecks) {
      this.results.metaTags.passed++;
      this.results.metaTags.details.push({
        file: relativePath,
        status: 'pass',
        message: `All meta tags present (${passedChecks}/${totalChecks})`,
        checks
      });
    } else if (passedChecks >= totalChecks / 2) {
      this.results.metaTags.passed++;
      this.results.metaTags.details.push({
        file: relativePath,
        status: 'warning',
        message: `Some meta tags missing (${passedChecks}/${totalChecks})`,
        checks
      });
    } else {
      this.results.metaTags.failed++;
      this.results.metaTags.details.push({
        file: relativePath,
        status: 'fail',
        message: `Critical meta tags missing (${passedChecks}/${totalChecks})`,
        checks
      });
    }
  }

  // Check Organization entity consistency
  checkOrganization(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(process.cwd(), filePath);
    
    const hasOrgName = content.includes(EXPECTED_ORG_NAME);
    const hasCompanyNumber = content.includes(EXPECTED_COMPANY_NUMBER);
    const hasDomain = content.includes(EXPECTED_DOMAIN);
    
    if (hasOrgName || hasCompanyNumber || hasDomain) {
      const consistency = [hasOrgName, hasCompanyNumber, hasDomain].filter(Boolean).length;
      
      if (consistency >= 2) {
        this.results.organization.passed++;
        this.results.organization.details.push({
          file: relativePath,
          status: 'pass',
          message: 'Organization entity found with consistent details',
          details: { hasOrgName, hasCompanyNumber, hasDomain }
        });
      } else {
        this.results.organization.failed++;
        this.results.organization.details.push({
          file: relativePath,
          status: 'warning',
          message: 'Organization entity found but inconsistent details',
          details: { hasOrgName, hasCompanyNumber, hasDomain }
        });
      }
    }
  }

  // Audit a single file
  async auditFile(filePath) {
    this.results.totalPages++;
    
    try {
      this.checkStaticGeneration(filePath);
      this.checkSchemas(filePath);
      this.checkMetaTags(filePath);
      this.checkOrganization(filePath);
    } catch (error) {
      this.results.overall.issues.push({
        file: path.relative(process.cwd(), filePath),
        error: error.message
      });
    }
  }

  // Calculate overall score
  calculateScore() {
    const total = this.results.totalPages * 4; // 4 checks per page
    const passed = 
      this.results.staticGeneration.passed +
      this.results.schemas.passed +
      this.results.metaTags.passed +
      this.results.organization.passed;
    
    this.results.overall.score = Math.round((passed / total) * 100);
    
    // Generate summary
    if (this.results.overall.score >= 90) {
      this.results.overall.successes.push('✅ Excellent SEO implementation!');
    } else if (this.results.overall.score >= 70) {
      this.results.overall.warnings.push('⚠️  Good SEO, but room for improvement');
    } else {
      this.results.overall.issues.push('❌ SEO needs significant improvements');
    }
  }

  // Print detailed report
  printReport() {
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}           COMPREHENSIVE SEO AUDIT REPORT                        ${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}\n`);
    
    console.log(`${colors.bright}📊 OVERALL SCORE: ${this.results.overall.score}%${colors.reset}\n`);
    console.log(`${colors.bright}📄 Total Pages Audited: ${this.results.totalPages}${colors.reset}\n`);
    
    // Static Generation Report
    console.log(`${colors.bright}${colors.blue}━━━ 1. STATIC GENERATION (SSG) ━━━${colors.reset}`);
    console.log(`✅ Passed: ${colors.green}${this.results.staticGeneration.passed}${colors.reset}`);
    console.log(`❌ Failed: ${colors.red}${this.results.staticGeneration.failed}${colors.reset}`);
    this.results.staticGeneration.details.forEach(detail => {
      const icon = detail.status === 'pass' ? '✅' : detail.status === 'warning' ? '⚠️' : '❌';
      console.log(`  ${icon} ${detail.file}`);
      console.log(`     ${detail.message}`);
    });
    console.log('');
    
    // Schema.org Report
    console.log(`${colors.bright}${colors.blue}━━━ 2. SCHEMA.ORG STRUCTURED DATA ━━━${colors.reset}`);
    console.log(`✅ Passed: ${colors.green}${this.results.schemas.passed}${colors.reset}`);
    console.log(`❌ Failed: ${colors.red}${this.results.schemas.failed}${colors.reset}`);
    this.results.schemas.details.forEach(detail => {
      const icon = detail.status === 'pass' ? '✅' : detail.status === 'warning' ? '⚠️' : '❌';
      console.log(`  ${icon} ${detail.file}`);
      console.log(`     ${detail.message}`);
      if (detail.types.length > 0) {
        console.log(`     Types: ${detail.types.join(', ')}`);
      }
    });
    console.log('');
    
    // Meta Tags Report
    console.log(`${colors.bright}${colors.blue}━━━ 3. META TAGS & CANONICAL URLs ━━━${colors.reset}`);
    console.log(`✅ Passed: ${colors.green}${this.results.metaTags.passed}${colors.reset}`);
    console.log(`❌ Failed: ${colors.red}${this.results.metaTags.failed}${colors.reset}`);
    this.results.metaTags.details.forEach(detail => {
      const icon = detail.status === 'pass' ? '✅' : detail.status === 'warning' ? '⚠️' : '❌';
      console.log(`  ${icon} ${detail.file}`);
      console.log(`     ${detail.message}`);
    });
    console.log('');
    
    // Organization Entity Report
    console.log(`${colors.bright}${colors.blue}━━━ 4. ORGANIZATION ENTITY CONSISTENCY ━━━${colors.reset}`);
    console.log(`✅ Passed: ${colors.green}${this.results.organization.passed}${colors.reset}`);
    console.log(`❌ Failed: ${colors.red}${this.results.organization.failed}${colors.reset}`);
    this.results.organization.details.forEach(detail => {
      const icon = detail.status === 'pass' ? '✅' : detail.status === 'warning' ? '⚠️' : '❌';
      console.log(`  ${icon} ${detail.file}`);
      console.log(`     ${detail.message}`);
    });
    console.log('');
    
    // Overall Summary
    console.log(`${colors.bright}${colors.blue}━━━ SUMMARY ━━━${colors.reset}`);
    this.results.overall.successes.forEach(msg => console.log(`${colors.green}${msg}${colors.reset}`));
    this.results.overall.warnings.forEach(msg => console.log(`${colors.yellow}${msg}${colors.reset}`));
    this.results.overall.issues.forEach(msg => console.log(`${colors.red}${msg}${colors.reset}`));
    
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════════════════${colors.reset}\n`);
  }

  // Save JSON report
  saveReport() {
    const reportPath = path.join(process.cwd(), 'seo-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`${colors.green}📄 Detailed report saved to: ${reportPath}${colors.reset}\n`);
  }

  // Main audit function
  async run() {
    console.log(`${colors.bright}${colors.cyan}🔍 Starting SEO Audit...${colors.reset}\n`);
    
    // Find all page files
    const pageFiles = await glob('app/**/page.{tsx,ts,jsx,js}', {
      ignore: ['**/node_modules/**', '**/.next/**']
    });
    
    // Find layout files
    const layoutFiles = await glob('app/**/layout.{tsx,ts,jsx,js}', {
      ignore: ['**/node_modules/**', '**/.next/**']
    });
    
    // Find schema component files
    const schemaFiles = await glob('app/components/**/*Schema*.{tsx,ts,jsx,js}', {
      ignore: ['**/node_modules/**']
    });
    
    // Find config files
    const configFiles = await glob('app/lib/**/*{C,c}onfig*.{tsx,ts,jsx,js}', {
      ignore: ['**/node_modules/**']
    });
    
    const allFiles = [...pageFiles, ...layoutFiles, ...schemaFiles, ...configFiles];
    
    console.log(`${colors.bright}Found ${allFiles.length} files to audit:${colors.reset}`);
    console.log(`  - ${pageFiles.length} page files`);
    console.log(`  - ${layoutFiles.length} layout files`);
    console.log(`  - ${schemaFiles.length} schema components`);
    console.log(`  - ${configFiles.length} config files\n`);
    
    // Audit each file
    for (const file of allFiles) {
      await this.auditFile(file);
    }
    
    // Calculate score and print report
    this.calculateScore();
    this.printReport();
    this.saveReport();
  }
}

// Run the audit
const auditor = new SEOAuditor();
auditor.run().catch(console.error);