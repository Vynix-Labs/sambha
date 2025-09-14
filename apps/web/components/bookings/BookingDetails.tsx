"use client";

import React, { useState } from "react";
import Link from "next/link";
import CounterOfferModal from "./CounterOfferModal";
import PaymentModal from "./PaymentModal";
import { Button } from "@sambha/ui/button";

export default function BookingDetails() {
  const [isCounterOfferOpen, setCounterOfferOpen] = useState(false);
  const [isPaymentOpen, setPaymentOpen] = useState(false);

  const handleCounterOfferSubmit = (amount: number, message: string) => {
    console.log("Counter Offer:", { amount, message });
    // TODO: API call
  };

  const handlePayment = (amount: number) => {
    console.log("Payment made:", amount);
    // TODO: API call
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/bookings" className="hover:underline">
          Bookings
        </Link>{" "}
        /{" "}
        <Link href="/bookings/racoon-musicals" className="hover:underline">
          Racoon Musicals
        </Link>
      </nav>

      {/* Booking Content */}
      <h1 className="text-2xl font-semibold text-[#2A1D52] mb-6">
        Racoon Musicals – Booking Details
      </h1>

      <div className="flex gap-4">
        <Button
          onClick={() => setCounterOfferOpen(true)}
          className="bg-[#2A1D52] text-white"
        >
          Counter Offer
        </Button>

        <Button
          onClick={() => setPaymentOpen(true)}
          className="bg-[#C96FFF] text-white"
        >
          Make Payment
        </Button>
      </div>

      {/* Counter Offer Modal */}
      <CounterOfferModal
        isOpen={isCounterOfferOpen}
        onClose={() => setCounterOfferOpen(false)}
        onSubmit={handleCounterOfferSubmit}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setPaymentOpen(false)}
        onPay={handlePayment}
      />
    </div>
  );
}
