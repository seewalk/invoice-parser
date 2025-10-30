'use client';

import { Text } from '../ui/Text';

export default function SocialProofBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-200" aria-label="Trusted by leading businesses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Text 
          size="sm" 
          variant="muted" 
          align="center" 
          className="mb-8 uppercase tracking-wide"
        >
          Trusted by Leading UK Businesses
        </Text>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {['Restaurant Group', 'Sysco Partner', 'US Foods', 'Costco Business', 'QuickBooks Certified'].map(
            (brand) => (
              <Text 
                key={brand} 
                size="xl" 
                weight="bold" 
                className="text-gray-400"
              >
                {brand}
              </Text>
            )
          )}
        </div>
      </div>
    </section>
  );
}