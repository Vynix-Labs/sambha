"use client";

export function CategorySkeleton(): React.ReactElement {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 bg-white">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        <span>/</span>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Location Filter Skeleton */}
      <div className="mb-8">
        <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Vendor Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
