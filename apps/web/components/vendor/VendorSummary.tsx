// components/vendor/VendorSummary.tsx
import { Vendor } from "@/types/vendor";
import Image from "next/image";

export function VendorSummary({ vendor }: { vendor: Vendor }) {
  return (
    <div className="sticky top-4">
      <div className="border rounded-lg overflow-hidden mb-4">
        <div className="h-48 relative bg-gray-100">
          <Image
            src={vendor.images[0]}
            alt={vendor.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{vendor.name}</h3>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">
              ★ {vendor.rating.toFixed(1)}
            </span>
            <span className="text-gray-500 ml-1">({vendor.reviewCount})</span>
          </div>
          <p className="text-gray-700 mt-2">{vendor.price}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h4 className="font-medium mb-2">About this vendor</h4>
        <ul className="text-sm space-y-2">
          <li className="flex justify-between">
            <span className="text-gray-500">Company</span>
            <span>{vendor.companyName}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Service</span>
            <span>{vendor.category}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Location</span>
            <span>{vendor.storeLocation}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-500">Verified</span>
            <span>{vendor.verifiedDate}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
