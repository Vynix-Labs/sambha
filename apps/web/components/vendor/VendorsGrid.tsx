// components/vendor/VendorsGrid.tsx
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Vendor } from "@/types/vendor";

interface VendorsGridProps {
  vendors: Vendor[];
  className?: string;
}

export function VendorsGrid({ vendors, className = "" }: VendorsGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mr-0 sm:mr-10 lg:mr-10 ${className}`}
    >
      {vendors.map((vendor) => (
        <Link
          key={vendor.id}
          href={`/vendors/view/${vendor.id}`}
          className="flex flex-col group"
        >
          <div className="h-48 bg-gray-200 relative rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
            <img
              src={vendor.images[0]}
              alt={vendor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="pt-4">
            {vendor.verified ? (
              <div className="flex items-center gap-1 text-xs text-[#c96fff] mb-1 group-hover:text-[#a843ff] transition-colors duration-200">
                <CheckCircle className="w-4 h-4" />
                <span>Verified</span>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mb-1 group-hover:text-gray-700 transition-colors duration-200">
                {vendor.category}
              </p>
            )}
            <div className="items-start mb-2">
              <h3 className="font-semibold text-gray-700 group-hover:text-[#2a1d52] transition-colors duration-200">
                {vendor.name}
              </h3>
              <span className="text-gray-500 text-sm group-hover:text-gray-700 transition-colors duration-200">
                {vendor.price}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
