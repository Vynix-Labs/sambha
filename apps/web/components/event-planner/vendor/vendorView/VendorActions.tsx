"use client";

import Link from "next/link";

interface VendorActionsProps {
  vendorId: string;
}

export function VendorActions({ vendorId }: VendorActionsProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <Link
        href={`/event-planner/vendors/view/${vendorId}/book-now`}
        className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group"
      >
        <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
          Book now
        </span>
        <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      </Link>

      <Link
        href={`/event-planner/vendors/view/${vendorId}/make-offer`}
        className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group"
      >
        <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
          Make an offer
        </span>
        <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      </Link>

      <button className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group">
        <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
          Message
        </span>
        <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
      </button>
    </div>
  );
}
