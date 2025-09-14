"use client";

import React from "react";
import Image from "next/image";
import { Milestone, Booking } from "../../../../../types/booking";
// import MessageThread from "../../../../../components/bookings/MessageThread";
import avatar from "../../../../../assets/images/Image.png";
import date1 from "../../../../../assets/images/date-1.png";
import date2 from "../../../../../assets/images/date-2.png";
import date3 from "../../../../../assets/images/date-3.png";
import PaymentModal from "components/bookings/PaymentModal";
import BookingHeader from "components/bookings/BookingHeader";
import CalenderIcon from "components/icons/CalenderIcon";
import gradient from "../../../../../assets/images/gradient.png";
import { useSetAtom } from "jotai";
import { modalAtom } from "store/modalAtom";

const DUMMY_MILESTONES: Milestone[] = [
  {
    id: "m1",
    title: "Milestone 1",
    amount: 500,
    date: "Sat, Mar 19",
    image: date1,
  },
  {
    id: "m2",
    title: "Milestone 2",
    amount: 500,
    date: "Sat, Mar 19",
    image: date2,
  },
  {
    id: "m3",
    title: "Deliver 5,000 chairs to event hall",
    amount: 500,
    date: "Thu, Feb 19",
    image: date3,
  },
];

const DUMMY: Booking = {
  id: "ab12",
  slug: "racoon-musicals",
  name: "Racoon Musicals",
  venue: "Grand Maple Theatre",
  host: "Sonia Paul",
  dateRange: "May 1 - 2, 2025",
  pricePerDay: 1500,
  guests: 50,
  total: 3000,
  messages: [
    {
      id: "m1",
      sender: "planner",
      text: "Please confirm setup",
      time: new Date().toISOString(),
    },
  ],
  milestones: DUMMY_MILESTONES,
};

export default function MilestonesPage() {
  const booking = DUMMY;
  const setModal = useSetAtom(modalAtom);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <BookingHeader />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* header */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <Image src={avatar} width={80} height={80} alt="event" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#2A1D52]">
                {booking.name} <span>{">"}</span>
              </h2>
              <p className="text-sm text-gray-600">{booking.venue}</p>
              <div className="flex items-center gap-2">
                <Image
                  src={gradient}
                  alt="gradient"
                  width={20}
                  className="h-5"
                />
                <p className="text-sm text-gray-500">
                  Hosted by {booking.host}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-6 mt-6">
            <div className="flex-1">
              <div className="text-xs text-gray-400">Total paid</div>
              <div className="text-[#C96FFF] font-semibold">$0.00</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400">Pending earnings</div>
              <div className="text-[#C96FFF] font-semibold">$1,500.00</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#2A1D52]">Milestones</h3>
            <div className="mt-4 space-y-4">
              {booking.milestones?.map((m) => (
                <div
                  key={m.id}
                  className="flex items-start justify-between bg-white p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-[#2A1D52]">
                        {m.title}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        ${m.amount} •{" "}
                        <div className="flex gap-2">
                          {/* {m.image && (
                            <Image
                              src={m.image}
                              alt={m.title}
                              width={20}
                              height={5}
                            />
                          )} */}
                          <CalenderIcon />
                          {m.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400">…</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg border border-gray-100">
            <h4 className="font-semibold text-[#2A1D52]">Event Summary</h4>
            <div className="grid grid-cols-2 gap-6 mt-3 text-sm text-[#2A1D52]">
              <div>
                <div className="text-xs text-gray-400">Dates</div>
                <div className="mt-1">{booking.dateRange}</div>
                <div className="text-xs text-gray-400 mt-3">Price</div>
                <div className="mt-1">${booking.pricePerDay} per day</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Guests</div>
                <div className="mt-1">{booking.guests} guests</div>
                <div className="text-xs text-gray-400 mt-3">Total</div>
                <div className="mt-1">${booking.total}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <button
            className="px-6 py-3 w-[250px] rounded-full bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#FFFFFF]"
            onClick={() =>
              setModal({ isOpen: true, size: "md", type: "payment" })
            }
          >
            Message client
          </button>
          <button className="px-6 py-3 w-[250px] rounded-full border border-[#D6C6F7] text-[#7F56D9]">
            Dispute job
          </button>
        </aside>
      </div>

      {/* <MessageThread initial={booking.messages} /> */}
      <PaymentModal />
    </div>
  );
}
