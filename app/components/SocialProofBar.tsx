'use client';

export default function SocialProofBar() {
  return (
    <section className="py-12 bg-white border-y border-gray-200" aria-label="Trusted by leading businesses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wide">
          Trusted by Leading UK Businesses
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {['Restaurant Group', 'Sysco Partner', 'US Foods', 'Costco Business', 'QuickBooks Certified'].map(
            (brand) => (
              <div key={brand} className="text-xl font-bold text-gray-400">
                {brand}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}