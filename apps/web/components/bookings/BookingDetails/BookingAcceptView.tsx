"use client";

import React from "react";
// import { Message } from "./MesageThread"; // TODO: use for threaded chat preview

type Booking = {
  id: string;
  name: string;
  venue: string;
  host: string;
  dates: string;
  pricePerDay: number;
  guests: number;
  total: number;
  summary: string;
};

type Props = {
  booking: Booking;
};

const BookingAcceptView: React.FC<Props> = ({ booking }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#2A1D52]">
              {booking.name}
            </h2>
            <p className="text-sm text-gray-500">
              {booking.venue} • {booking.dates}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Pending earnings</p>
            <div className="text-[#7F56D9] font-semibold mt-1">
              ${booking.total}.00
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-[#2A1D52]">Milestones</h3>
          <ul className="mt-3 space-y-3">
            <li className="flex justify-between items-center">
              <div>
                <div className="font-medium">Milestone 1</div>
                <div className="text-sm text-gray-500">$500 • Sat, Mar 19</div>
              </div>
              <div>…</div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <div className="font-medium">Milestone 2</div>
                <div className="text-sm text-gray-500">$500 • Sat, Mar 19</div>
              </div>
              <div>…</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg bg-[#7F56D9] text-white">
          Message Client
        </button>
        <button className="px-4 py-2 rounded-lg border border-gray-200">
          Dispute Job
        </button>
      </div>
    </div>
  );
};

export default BookingAcceptView;
