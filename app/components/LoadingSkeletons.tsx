export function ROISectionSkeleton() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>

        {/* Calculator skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side - inputs */}
            <div className="space-y-6">
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
            </div>

            {/* Right side - results */}
            <div className="space-y-6">
              <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSectionSkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-2/3 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>

        {/* Testimonials grid skeleton */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 animate-pulse">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-5 h-5 bg-gray-200 rounded" />
                ))}
              </div>

              {/* Quote */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSectionSkeleton() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded-lg w-2/3 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded-lg w-1/2 mx-auto animate-pulse" />
        </div>

        {/* Pricing cards skeleton */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl shadow-xl p-8 ${
                i === 2 ? 'ring-4 ring-primary-500 scale-105' : ''
              } animate-pulse`}
            >
              {/* Badge */}
              {i === 2 && (
                <div className="h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full w-32 mx-auto mb-4" />
              )}

              {/* Plan name */}
              <div className="h-8 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4" />

              {/* Price */}
              <div className="h-16 bg-gray-200 rounded-lg w-1/2 mx-auto mb-6" />

              {/* Features */}
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="h-4 bg-gray-200 rounded flex-1" />
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div className="mt-8 h-12 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}