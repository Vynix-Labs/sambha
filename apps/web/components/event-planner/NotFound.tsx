// components/NoVendorsFound.tsx
"use client";

import Link from "next/link";

export function NoVendorsFound(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Vendors Found
        </h2>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t find any vendors matching your criteria. Try adjusting
          your filters or check back later.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/event-planner/vendors"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Browse All Vendors
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
