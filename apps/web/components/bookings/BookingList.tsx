// components/bookings/BookingList.tsx
"use client";

import React from "react";
import BookingCard from "./BookingCard";
import { Booking } from "../../types/booking";

const DUMMY: Booking[] = [
  {
    id: "ab12",
    slug: "racoon-musicals",
    name: "Racoon Musicals",
    venue: "Grand Maple Theatre",
    host: "Sonia Paul",
    dateRange: "May 1 - 2, 2025",
    pricePerDay: 1500,
    guests: 50,
    total: 3000,
    snippet:
      "We’re hosting a corporate event and would like you to consider our offer to rent your hall for 2 days.",
    createdAt: "20 minutes ago",
  },
  {
    id: "ab13",
    slug: "vision-summit-2025",
    name: "Vision Summit 2025",
    venue: "Convention Center",
    host: "Kemi Creations",
    dateRange: "May 1 - 2, 2025",
    pricePerDay: 1500,
    guests: 75,
    total: 3000,
    snippet: "Offer: $1,500 per day",
    createdAt: "35 minutes ago",
  },
  {
    id: "ab14",
    slug: "Harmony Wellness Retreat",
    name: "Harmony Wellness Retreat",
    venue: "Grand Maple Theatre",
    host: "Sonia Paul",
    dateRange: "May 1 - 2, 2025",
    pricePerDay: 1500,
    guests: 50,
    total: 3000,
    snippet:
      "We’re hosting a corporate event and would like you to consider our offer to rent your hall for 2 days.",
    createdAt: "48 minutes ago",
  },
];

type Props = {
  query?: string;
};

const BookingList: React.FC<Props> = ({ query = "" }) => {
  const filtered = DUMMY.filter((b) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      (b.snippet || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {filtered.map((b) => (
        <BookingCard key={b.id} booking={b} />
      ))}

      {filtered.length === 0 && (
        <div className="text-gray-500">No bookings found.</div>
      )}
    </div>
  );
};

export default BookingList;
