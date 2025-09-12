"use client";

import React from "react";
import { Calendar } from "lucide-react";
import ClockIcon from "components/icons/ClockIcon";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";

export type Booking = {
  id: string;
  slug: string;
  name: string;
  pricePerDay: number;
  dateRange: string;
  time: string;
  guests: number;
  createdAt: string; // e.g. "20 minutes ago"
  summary: string;
};

const BookingCard: React.FC<{ booking: Booking }> = ({ booking }) => {
  return (
    <div className="max-w-[400px] flex flex-col gap-2 p-4 rounded-lg border border-gray-200 shadow-sm bg-white">
      <p className="text-gray-400 text-sm">{booking.createdAt}</p>
      <Link
        href={`/bookings/${booking.slug}`}
        className="text-[#2A1D52] text-lg font-semibold hover:underline"
      >
        {booking.name} {">"}
      </Link>
      <h2 className="text-[#C96FFF] text-md font-medium">
        ${booking.pricePerDay} per day
      </h2>
      <p className="text-gray-700 text-sm">
        {booking.summary}{" "}
        <span className="text-[#C96FFF] font-medium cursor-pointer">
          ... more
        </span>
      </p>
      <div className="flex items-center justify-between text-sm text-[#2A1D52]">
        <p className="flex gap-1 items-center">
          <Calendar className="h-4 w-4" />
          {booking.dateRange}
        </p>
        <p className="flex gap-1 items-center">
          <ClockIcon />
          {booking.time}
        </p>
        <p className="flex gap-1 items-center">
          <BsPerson />
          {booking.guests} guests
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
