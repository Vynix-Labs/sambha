"use client";

import { CheckCircle } from "lucide-react";
import { Vendor } from "../../../../types/vendor";

interface VendorHeaderProps {
  vendor: Vendor;
}

export function VendorHeader({ vendor }: VendorHeaderProps): React.JSX.Element {
  return (
    <>
      <h1 className="text-semibold text-xl text-gray-900 font-bold flex items-center gap-1">
        {vendor.name}
        {vendor.verified && (
          <span className="text-[#0e7b33]">
            <CheckCircle className="w-5 h-5" />
          </span>
        )}
      </h1>
      <h2 className="text-gray-700 font-semibold">{vendor.price} per day</h2>
      <div className="flex items-center mb-4">
        <span className="text-[#c96fff] flex items-center">
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            return (
              <span key={i} className="relative">
                <span className="text-[#c96fff]/30">★</span>
                {vendor.rating >= starValue ? (
                  <span className="absolute inset-0 text-[#c96fff]">★</span>
                ) : vendor.rating >= starValue - 0.5 ? (
                  <span className="absolute inset-0 text-[#c96fff] w-1/2 overflow-hidden">
                    ★
                  </span>
                ) : null}
              </span>
            );
          })}
          <span className="ml-1 text-gray-900 font-semibold">
            {vendor.rating.toFixed(2)}
          </span>
        </span>
        <span className="text-gray-500 ml-2 text-sm">
          ({vendor.reviewCount} reviews)
        </span>
      </div>
    </>
  );
}
