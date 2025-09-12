"use client";

import React from "react";
import BookingCard, { Booking } from "../BookingCard";

const dummyBookings: Booking[] = [
  {
    id: "ab12",
    slug: "racoon-musicals",
    name: "Racoon Musicals",
    pricePerDay: 1500,
    summary:
      "We’re hosting a corporate event and would like you to consider our offer to rent your hall for 2 days.",
    dateRange: "May 1-2",
    time: "12:00 PM",
    guests: 50,
    createdAt: "20 minutes ago",
  },
];

const BookingList: React.FC = () => {
  return (
    <div className="grid gap-4">
      {dummyBookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingList;
