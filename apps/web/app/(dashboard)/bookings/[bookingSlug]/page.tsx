"use client";

import React, { useState } from "react";
import BookingHeader from "../../../../components/bookings/BookingDetails/BookingHeader";
import BookingSummary from "../../../../components/bookings/BookingDetails/BookingSummary";
import BookingActions from "../../../../components/bookings/BookingDetails/BookingActions";
import MilestonesList from "../../../../components/bookings/BookingDetails/MilestonesList";
import OfferStatusCard from "../../../../components/bookings/BookingDetails/OfferStatusCard";
import CounterOfferModal from "../../../../components/bookings/BookingDetails/CounterOfferModal";
import BookingAcceptView from "../../../../components/bookings/BookingDetails/BookingAcceptView";
import OfferSentView from "../../../../components/bookings/BookingDetails/OfferSentView";

// Dummy data
const booking = {
  id: "ab12",
  name: "Racoon Musicals",
  venue: "Grand Maple Theatre",
  host: "Sonia Paul",
  dates: "May 1 - 2, 2025",
  pricePerDay: 1500,
  guests: 50,
  total: 3000,
  summary:
    "Hello, I want to rent your space for an event. We’re hosting a corporate event and would like you to consider our offer.",
};

const milestones = [
  {
    id: 1,
    title: "Milestone 1",
    amount: 500,
    date: "Sat, Mar 19",
    status: "pending",
  },
  {
    id: 2,
    title: "Milestone 2",
    amount: 500,
    date: "Sat, Mar 19",
    status: "pending",
  },
  {
    id: 3,
    title: "Deliver 5,000 chairs to event hall",
    amount: 500,
    date: "Thu, Feb 19",
    status: "overdue",
  },
];

export default function BookingDetailPage() {
  const [status, setStatus] = useState<
    "pending" | "accepted" | "declined" | "counter-offer"
  >("pending");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <BookingHeader />

      {status === "pending" && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <BookingSummary booking={booking} />
            {/* <MilestonesList milestones={milestones} /> */}
            {/* <BookingActions
              onAccept={() => setStatus("accepted")}
              onReject={() => setStatus("declined")}
              onCounter={() => setShowModal(true)}
            /> */}
          </div>
          <OfferStatusCard status={status} />
        </div>
      )}

      {status === "accepted" && <BookingAcceptView booking={booking} />}
      {status === "counter-offer" && <OfferSentView booking={booking} />}

      <CounterOfferModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => {
          setStatus("counter-offer");
          setShowModal(false);
        }}
      />
    </div>
  );
}
