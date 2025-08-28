import { CheckCircle } from "lucide-react";
import { Vendor } from "../../../types/vendor";

export function VendorProfile({
  vendor,
}: {
  vendor: Vendor;
}): React.JSX.Element {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-6">
        <div className="flex items-center justify-center mb-4 gap-2">
          {vendor.images[0] && (
            <img
              src={vendor.images[0]}
              alt={vendor.name}
              style={{
                width: "74px",
                height: "84px",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          )}
          <div>
            <h1 className="text-semibold  text-gray-900 font-bold flex items-center gap-1">
              {vendor.name}
              {vendor.verified && (
                <span className="text-[#0e7b33]">
                  <CheckCircle className="w-5 h-5" />
                </span>
              )}
            </h1>
            <h2 className="text-gray-700 text-sm font-semibold">
              {vendor.price} per day
            </h2>
            <div className="flex items-center mb-4">
              <span className="text-[#c96fff]  flex items-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  return (
                    <span key={i} className="relative">
                      {/* Base empty star */}
                      <span className="text-[#c57d00]/30">★</span>
                      {/* Filled portion */}
                      {vendor.rating >= starValue ? (
                        <span className="absolute inset-0 text-[#c57d00]">
                          ★
                        </span>
                      ) : vendor.rating >= starValue - 0.5 ? (
                        <span className="absolute inset-0 text-[#c57d00] w-1/2 overflow-hidden">
                          ★
                        </span>
                      ) : null}
                    </span>
                  );
                })}
                <span className="ml-1 text-gray-900 text-sm font-semibold">
                  {vendor.rating.toFixed(2)}
                </span>
              </span>
              <span className="text-gray-500 ml-2 text-xs">
                ({vendor.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
