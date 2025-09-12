import Link from "next/link";
import React from "react";

export default function BookingHeader() {
  const bookings = {
    id: "ab12",
    slug: "Racoon Musicals",
    name: "Racoon Musicals",
  };
  return (
    <>
      <div className="flex gap-2 py-2 items-center text-[18px] font-medium">
        {/* className="text-[#98A2B3] hover:border-b-2 hover:border-solid hover:border-[#98A2B3] " */}
        <span>
          <Link
            href={`/bookings`}
            className="text-[#2A1D52] hover:border-b-2 hover:border-solid hover:border-[#98A2B3]"
          >
            Bookings /
          </Link>
          {/* <Link href={/bookings}> Bookings / </Link>  */}
        </span>
        <Link
          href={`/bookings/${bookings.slug}`}
          className="text-[#2A1D52] hover:border-b-2 hover:border-solid hover:border-[#98A2B3]"
        >
          {bookings.name}
        </Link>
      </div>
    </>
  );
}
