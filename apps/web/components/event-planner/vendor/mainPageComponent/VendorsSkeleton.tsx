"use client";

export function VendorsSkeleton(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 bg-white">
      {/* Header Skeleton */}
      <div className="h-10 w-64 bg-gray-200 rounded mb-6 animate-pulse"></div>

      {/* Location Filter Skeleton */}
      <div className="mb-12">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-4 mr-0 sm:mr-12 lg:mr-40">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 bg-gray-100 rounded-xl p-2 h-20 animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      {/* Popular Vendors Section Skeleton */}
      <div>
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
