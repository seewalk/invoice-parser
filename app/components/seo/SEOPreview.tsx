// components/seo/SEOPreview.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

type SEOData = {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
};

type Heading = {
  level: string;
  text: string;
};

export function AdvancedSEOPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [linkStats, setLinkStats] = useState({ internal: 0, external: 0, broken: 0 });
  const pathname = usePathname();
  
  // ✅ ALL HOOKS AT THE TOP - BEFORE ANY CONDITIONAL RETURNS
  
  // Extract SEO metadata
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const extractSEOData = () => {
      const data: SEOData = {
        title: document.title || '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || 'index, follow',
        ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
        ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
        twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content') || '',
      };
      setSeoData(data);
    };
    
    extractSEOData();
    const timer = setTimeout(extractSEOData, 500);
    return () => clearTimeout(timer);
  }, [pathname]);
  
  // Extract heading structure with delay for dynamic content
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const extractHeadings = () => {
      const h1s = Array.from(document.querySelectorAll('h1')).map(h => ({ 
        level: 'H1', 
        text: h.textContent?.trim() || '' 
      }));
      const h2s = Array.from(document.querySelectorAll('h2')).map(h => ({ 
        level: 'H2', 
        text: h.textContent?.trim() || '' 
      }));
      const h3s = Array.from(document.querySelectorAll('h3')).map(h => ({ 
        level: 'H3', 
        text: h.textContent?.trim() || '' 
      }));
      const h4s = Array.from(document.querySelectorAll('h4')).map(h => ({ 
        level: 'H4', 
        text: h.textContent?.trim() || '' 
      }));
      
      // Combine and limit display
      const allHeadings = [...h1s, ...h2s, ...h3s, ...h4s];
      setHeadings(allHeadings);
    };
    
    // Wait for dynamic content to render
    const timer = setTimeout(extractHeadings, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, lastUpdate]);
  
  // Extract link statistics
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    const links = Array.from(document.querySelectorAll('a[href]'));
    const internal = links.filter(a => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('/') || href.startsWith('#');
    }).length;
    const external = links.filter(a => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('http') && !href.includes(window.location.hostname);
    }).length;
    const broken = links.filter(a => {
      const href = a.getAttribute('href') || '';
      return !href || href === '#';
    }).length;
    setLinkStats({ internal, external, broken });
  }, [pathname]);
  
  // ✅ NOW CONDITIONAL RETURN IS AFTER ALL HOOKS
  if (process.env.NODE_ENV !== 'development' || !seoData) return null;
  
  // Calculate SEO scores
  const titleLength = seoData.title.length;
  const descLength = seoData.description.length;
  const titleScore = titleLength >= 45 && titleLength <= 55;
  const descScore = descLength >= 120 && descLength <= 158;
  const hasCanonical = !!seoData.canonical;
  const hasOGTags = !!(seoData.ogTitle && seoData.ogDescription && seoData.ogImage);
  const isIndexable = !((seoData.robots ?? '').includes('noindex'));
  
  // Count headings by level
  const headingCounts = {
    h1: headings.filter(h => h.level === 'H1').length,
    h2: headings.filter(h => h.level === 'H2').length,
    h3: headings.filter(h => h.level === 'H3').length,
    h4: headings.filter(h => h.level === 'H4').length,
  };
  const totalHeadings = headings.length;
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-md">
      {/* Collapsed Header */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 shadow-xl hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            {titleScore && descScore && hasCanonical && hasOGTags ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-yellow-400" />
            )}
            <span className="text-white font-medium text-sm">SEO Preview</span>
          </div>
          <ChevronUp className="w-4 h-4 text-gray-400" />
        </button>
      )}
      
      {/* Expanded Panel */}
      {isOpen && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span>SEO Preview</span>
              <span className="text-xs text-gray-400">(Dev Only)</span>
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 space-y-4 text-xs">
            {/* Current Page */}
            <Section title="Page Info">
              <InfoRow label="Path" value={pathname} />
              <InfoRow label="Indexable" value={isIndexable ? '✅ Yes' : '⚠️ No (noindex)'} status={isIndexable ? 'success' : 'warning'} />
            </Section>
            
            {/* Title */}
            <Section title="Title Tag">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400">Content:</span>
                  <StatusBadge status={titleScore ? 'success' : 'warning'}>
                    {titleLength}/55
                  </StatusBadge>
                </div>
                <div className="text-blue-400 font-medium text-sm line-clamp-2 bg-gray-800 p-2 rounded">
                  {seoData.title}
                </div>
                <ProgressBar 
                  value={titleLength} 
                  max={55} 
                  optimal={titleLength >= 45 && titleLength <= 55}
                />
              </div>
            </Section>
            
            {/* Description */}
            <Section title="Meta Description">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-gray-400">Content:</span>
                  <StatusBadge status={descScore ? 'success' : 'warning'}>
                    {descLength}/158
                  </StatusBadge>
                </div>
                <div className="text-gray-300 text-xs line-clamp-3 bg-gray-800 p-2 rounded">
                  {seoData.description}
                </div>
                <ProgressBar 
                  value={descLength} 
                  max={158} 
                  optimal={descLength >= 120 && descLength <= 158}
                />
              </div>
            </Section>
            
            {/* Canonical */}
            <Section title="Canonical URL">
              <InfoRow 
                label="Set" 
                value={hasCanonical ? '✅ Yes' : '⚠️ Missing'} 
                status={hasCanonical ? 'success' : 'warning'}
              />
              {hasCanonical && (
                <div className="text-gray-400 text-xs break-all bg-gray-800 p-2 rounded mt-1">
                  {seoData.canonical}
                </div>
              )}
            </Section>
            
            {/* Social Tags */}
            <Section title="Social Tags (Open Graph)">
              <InfoRow 
                label="Complete" 
                value={hasOGTags ? '✅ Yes' : '⚠️ Incomplete'} 
                status={hasOGTags ? 'success' : 'warning'}
              />
              <div className="mt-2 space-y-1">
                <MiniInfoRow label="og:title" value={seoData.ogTitle ? '✓' : '✗'} present={!!seoData.ogTitle} />
                <MiniInfoRow label="og:description" value={seoData.ogDescription ? '✓' : '✗'} present={!!seoData.ogDescription} />
                <MiniInfoRow label="og:image" value={seoData.ogImage ? '✓' : '✗'} present={!!seoData.ogImage} />
                <MiniInfoRow label="twitter:card" value={seoData.twitterCard || 'Not set'} present={!!seoData.twitterCard} />
              </div>
            </Section>
            
            {/* Links */}
            <Section title="Links">
              <div className="grid grid-cols-3 gap-2">
                <StatBox label="Internal" value={linkStats.internal} status="info" />
                <StatBox label="External" value={linkStats.external} status="info" />
                <StatBox label="Broken" value={linkStats.broken} status={linkStats.broken > 0 ? 'error' : 'success'} />
              </div>
            </Section>
            
            {/* Headings */}
            <Section title="Heading Structure">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400 text-xs">
                  {totalHeadings} total
                  {headingCounts.h1 > 0 && ` • H1 (${headingCounts.h1})`}
                  {headingCounts.h2 > 0 && ` • H2 (${headingCounts.h2})`}
                  {headingCounts.h3 > 0 && ` • H3 (${headingCounts.h3})`}
                  {headingCounts.h4 > 0 && ` • H4 (${headingCounts.h4})`}
                </div>
                <button
                  onClick={() => setLastUpdate(Date.now())}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-400 hover:text-white transition-colors"
                  title="Re-scan page for headings"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {headings.length === 0 ? (
                  <div className="text-gray-500 text-xs">No headings found</div>
                ) : (
                  headings.map((h, i) => (
                    <div key={i} className="flex gap-2 text-xs">
                      <span className={`font-mono font-bold min-w-[2rem] ${
                        h.level === 'H1' ? 'text-blue-400' : 
                        h.level === 'H2' ? 'text-green-400' : 
                        h.level === 'H3' ? 'text-yellow-400' :
                        'text-gray-400'
                      }`}>
                        {h.level}
                      </span>
                      <span className="text-gray-300 truncate">{h.text}</span>
                    </div>
                  ))
                )}
              </div>
            </Section>
            
            {/* Quick Actions */}
            <Section title="Quick Tools">
              <div className="flex flex-wrap gap-2">
                <QuickLink href={`https://search.google.com/search-console?resource_id=${encodeURIComponent('https://negotiables.co.uk')}`}>
                  Search Console
                </QuickLink>
                <QuickLink href={`https://www.google.com/search?q=site:negotiables.co.uk${pathname}`}>
                  Google Index
                </QuickLink>
                <QuickLink href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent('https://negotiables.co.uk' + pathname)}`}>
                  OG Debugger
                </QuickLink>
                <QuickLink href={`https://cards-dev.twitter.com/validator?url=${encodeURIComponent('https://negotiables.co.uk' + pathname)}`}>
                  Twitter Validator
                </QuickLink>
              </div>
            </Section>
            
            {/* Sitemap Check */}
            <Section title="Sitemap">
              <InfoRow label="Main" value="/sitemap.xml" />
              <InfoRow label="Partners" value="/partners-directory/sitemap.xml" />
              <div className="mt-2">
                <QuickLink href="/sitemap.xml">View Main Sitemap</QuickLink>
              </div>
            </Section>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-gray-700 pt-3 first:border-t-0 first:pt-0">
      <h4 className="font-semibold text-white mb-2 text-xs">{title}</h4>
      {children}
    </div>
  );
}

function InfoRow({ 
  label, 
  value, 
  status 
}: { 
  label: string; 
  value: string; 
  status?: 'success' | 'warning' | 'error' 
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={
        status === 'success' ? 'text-green-400' :
        status === 'warning' ? 'text-yellow-400' :
        status === 'error' ? 'text-red-400' :
        'text-gray-300'
      }>
        {value}
      </span>
    </div>
  );
}

function MiniInfoRow({ label, value, present }: { label: string; value: string; present: boolean }) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className="text-gray-500">{label}</span>
      <span className={present ? 'text-green-400' : 'text-red-400'}>{value}</span>
    </div>
  );
}

function StatusBadge({ status, children }: { status: 'success' | 'warning' | 'error'; children: React.ReactNode }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
      status === 'success' ? 'bg-green-900/50 text-green-400' :
      status === 'warning' ? 'bg-yellow-900/50 text-yellow-400' :
      'bg-red-900/50 text-red-400'
    }`}>
      {children}
    </span>
  );
}

function ProgressBar({ value, max, optimal }: { value: number; max: number; optimal: boolean }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all ${optimal ? 'bg-green-500' : 'bg-yellow-500'}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function StatBox({ label, value, status }: { label: string; value: number; status: 'success' | 'info' | 'error' }) {
  return (
    <div className={`p-2 rounded text-center ${
      status === 'error' ? 'bg-red-900/20 border border-red-900/50' :
      status === 'success' ? 'bg-green-900/20 border border-green-900/50' :
      'bg-gray-800 border border-gray-700'
    }`}>
      <div className={`text-lg font-bold ${
        status === 'error' ? 'text-red-400' :
        status === 'success' ? 'text-green-400' :
        'text-blue-400'
      }`}>
        {value}
      </div>
      <div className="text-gray-400 text-xs">{label}</div>
    </div>
  );
}

function QuickLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 hover:text-white transition-colors"
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  );
}
