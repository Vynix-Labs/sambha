"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Booking } from "../../../../types/booking";
// import MessageThread from "../../../../components/bookings/MessageThread";
import CounterOfferModal from "../../../../components/bookings/CounterOfferModal";
import avatar from "../../../../assets/images/Image.png";
import { useSetAtom } from "jotai";
import { modalAtom } from "../../../../store/modalAtom";
import gradient from "../../../../assets/images/gradient.png";
import BookingHeader from "components/bookings/BookingHeader";

const DUMMY_BOOKING: Booking = {
  id: "ab12",
  slug: "racoon-musicals",
  name: "Racoon Musicals",
  venue: "Grand Maple Theatre",
  host: "Sonia Paul",
  dateRange: "May 1 - 2, 2025",
  pricePerDay: 1500,
  guests: 50,
  total: 3000,
  description:
    "Hello, I want to rent your space for an event and I have created a couple of milestones that should be achieved so I can release payment. You can check the event detail for more details about the event.",
  messages: [
    {
      id: "m1",
      sender: "planner",
      text: "Hi — interested in your services.",
      time: new Date().toISOString(),
    },
    {
      id: "m2",
      sender: "vendor",
      text: "Thanks — can you share guest count?",
      time: new Date().toISOString(),
    },
  ],
};

export default function BookingDetailsPage() {
  const router = useRouter();
  const booking = DUMMY_BOOKING;
  const setModal = useSetAtom(modalAtom);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <BookingHeader />

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left/Main */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <Image src={avatar} width={80} height={80} alt="event" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#2A1D52]">
                {booking.name} <span className="text-gray-400">›</span>
              </h2>
              <p className="text-sm text-gray-600">{booking.venue}</p>
              <div className="flex items-center gap-2">
                <Image
                  src={gradient}
                  alt="gradient"
                  width={20}
                  className="h-5"
                />
                <p className="text-sm mt-1 text-gray-500">
                  Hosted by {booking.host}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#2A1D52] mb-3">
              Event summary
            </h3>

            <div className="grid grid-cols-2 gap-6 text-sm text-[#2A1D52]">
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

            <div className="mt-6 bg-gray-50 p-4 rounded-md text-sm text-[#070D17]">
              {booking.description}
            </div>
          </div>
          {/* 
          <div className="mt-6">
            <MessageThread initial={booking.messages} />
          </div> */}
        </div>

        {/* Right / Actions */}
        <aside className="flex flex-col gap-4">
          <button
            onClick={() => router.push(`/bookings/${booking.slug}/milestones`)}
            className="px-6 py-3 rounded-full text-white bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] shadow text-[#FFFFFF]"
          >
            Accept offer
          </button>

          <button
            onClick={() =>
              setModal({
                isOpen: true,
                size: "md",
                type: "Counter Offer",
              })
            }
            className="px-6 py-3 rounded-full border border-[#D6C6F7] bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-transparent bg-clip-text"
          >
            Counter Offer
          </button>

          <button className="text-red-600">Reject offer</button>
        </aside>
      </div>
      <CounterOfferModal />
    </div>
  );
}
