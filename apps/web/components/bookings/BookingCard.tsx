"use client";

import React from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { BsPerson } from "react-icons/bs";
import ClockIcon from "components/icons/ClockIcon";
import { Booking } from "../../types/booking";

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <p className="text-sm text-[#98A2B3]">{booking.createdAt}</p>

      <Link
        href={`/bookings/${booking.slug}`}
        className="block mt-2 text-[#2A1D52] text-lg font-semibold hover:underline"
      >
        {booking.name} <span className="text-gray-400">›</span>
      </Link>

      <div className="mt-2">
        <div className="text-[#C96FFF] font-medium">
          ${booking.pricePerDay} per day
        </div>
      </div>

      <p className="mt-3 text-gray-700">
        {booking.snippet} <span className="text-[#C96FFF]">... more</span>
      </p>

      <div className="mt-4 flex gap-6 text-sm text-[#2A1D52]">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{booking.dateRange}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon />
          <span>12:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <BsPerson />
          <span>{booking.guests} guests</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
