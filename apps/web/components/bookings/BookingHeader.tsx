import React from "react";
import Link from "next/link";

const DUMMY_BOOKING = {
  id: "ab12",
  slug: "racoon-musicals",
  name: "Racoon Musicals",
};

const BookingHeader = () => {
  const booking = DUMMY_BOOKING;
  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-md font-semibold text-gray-500 mb-4">
        <Link href="/bookings" className="hover:underline">
          {"<"} Bookings
        </Link>{" "}
        <span className="mx-2">/</span>{" "}
        <Link
          href={`/bookings/${booking.slug}`}
          className="text-[#2A1D52] font-semibold hover:underline"
        >
          {booking.name}
        </Link>
      </div>
    </div>
  );
};

export default BookingHeader;
