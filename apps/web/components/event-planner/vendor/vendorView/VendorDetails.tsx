"use client";

import { Vendor } from "../../../../types/vendor";


interface VendorDetailsProps {
  vendor: Vendor;
}

export function VendorDetails({ vendor }: VendorDetailsProps): React.JSX.Element {
  return (
    <div className="space-y-4 pt-3">
      <div className="w-full">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2 align-top w-1/2">
                <h3 className="font-semibold text-gray-900 mb-1 border-b border-gray-200 pb-2">
                  Company name
                </h3>
                <p className="text-gray-800 text-sm">{vendor.companyName}</p>
                <p className="text-sm text-gray-800 mt-1">
                  ({vendor.businessNumber})
                </p>
              </td>
              <td className="py-2 align-top pl-4">
                <h3 className="font-semibold text-gray-900 mb-1 border-b border-gray-200 pb-2">
                  Service type
                </h3>
                <p className="text-gray-800 text-sm">{vendor.category}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2">
          Store location
        </h3>
        <p className="text-gray-700 text-sm">{vendor.storeLocation}</p>
        <p className="text-gray-400 text-sm">{vendor.storeAddress}</p>
      </div>
    </div>
  );
}
