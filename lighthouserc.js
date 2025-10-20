module.exports = {
  ci: {
    collect: {
      // Build the static site first
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 60000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/faq',
        'http://localhost:3000/pricing',
        'http://localhost:3000/blog',
        'http://localhost:3000/invoice-templates',
        'http://localhost:3000/invoice-generator',
        'http://localhost:3000/alternatives',
      ],
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
        // Focus on SEO and accessibility
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        // SEO must be excellent
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // Performance should be good
        'categories:performance': ['warn', { minScore: 0.8 }],
        
        // Accessibility critical
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        
        // Best practices
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        
        // Specific SEO checks
        'meta-description': 'error',
        'document-title': 'error',
        'link-text': 'warn',
        'crawlable-anchors': 'error',
        'robots-txt': 'warn',
        'canonical': 'error',
        'structured-data': 'error',
        
        // Performance checks
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};