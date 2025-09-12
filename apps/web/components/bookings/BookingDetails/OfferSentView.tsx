"use client";

import React from "react";

type Booking = {
  name: string;
  venue: string;
  dates: string;
  total: number;
};

type Props = {
  booking: Booking;
};

const OfferSentView: React.FC<Props> = ({ booking }) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="bg-[#F7EBFF] p-4 rounded-lg">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              ✓
            </div>
            <div>
              <h3 className="font-semibold">Offer sent</h3>
              <p className="text-sm text-gray-600">
                Offer sent. Awaiting client&apos;s response
              </p>
              <p className="text-sm text-gray-400">Sent on April 24, 2025</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold">Your counter</h4>
          <p className="text-sm text-gray-500 mt-2">
            We can meet you in the middle and do it for $1,350 per day,
            totalling $2,700.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold">Event Summary</h4>
          <p className="text-sm text-gray-700 mt-2">
            {booking.name} • {booking.venue} • {booking.dates}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full px-4 py-2 rounded-lg border border-gray-200">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF]">
            Counter Offer Sent
          </span>
        </button>
        <button className="w-full px-4 py-2 rounded-lg text-red-600 border border-gray-100">
          Reject Offer
        </button>

        <button className="w-full px-4 py-2 rounded-lg bg-[#7F56D9] text-white">
          Accept Booking
        </button>
      </div>
    </div>
  );
};

export default OfferSentView;
