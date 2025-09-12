import React from "react";
import Image from "next/image";
import avatar from "../../../assets/images/Image.png";

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

export default function BookingSummary({ booking }: { booking: Booking }) {
  const bookings = {
    id: "ab12",
    slug: "Racoon Musicals",
    name: "Racoon Musicals",
  };
  return (
    // <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-2">
    //   <h2 className="text-xl font-bold text-gray-900">{booking.name}</h2>
    //   <p className="text-sm text-gray-600">Venue: {booking.venue}</p>
    //   <p className="text-sm text-gray-600">Host: {booking.host}</p>
    //   <p className="text-sm text-gray-600">Dates: {booking.dates}</p>
    //   <p className="text-sm text-gray-600">Guests: {booking.guests}</p>
    //   <p className="text-sm text-gray-600">Price/Day: ${booking.pricePerDay}</p>
    //   <p className="text-sm font-semibold mt-2">Total: ${booking.total}</p>
    //   <p className="text-sm text-gray-700 mt-4">{booking.summary}</p>
    // </div>
    <div className="mt-3 w-full flex justify-between">
      {" "}
      <div className="fle max-w-[500px] flex-col gap-4">
        {" "}
        <div className="flex gap-4">
          {" "}
          <Image src={avatar} alt="avatar" className="rounded-lg" />{" "}
          <div className="text-[#2A1D52] flex flex-col gap-2">
            {" "}
            <h1 className="text-xl text-[24px]">{bookings.name}</h1>{" "}
            <h2 className="text-[#101928] text-[20px]">
              {" "}
              Grand Maple Theatre{" "}
            </h2>{" "}
            <p className="text-[14px]">Hosted by Sonia Paul</p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-4 flex flex-col gap-2">
          {" "}
          <h1 className="text-[#2A1D52] pb-2 max-w-[500px] border-gray-100 border-b-2 border-solid">
            {" "}
            Event Summary{" "}
          </h1>{" "}
          <div className="mt-3 flex items-center gap-40">
            {" "}
            <div className="flex flex-col gap-3">
              {" "}
              <div className="flex flex-col gap-2">
                {" "}
                <h3 className="text-[#98A2B3] text-[14px]">Dates</h3>{" "}
                <h2 className="text-[#070D17] text-[16px]">
                  {" "}
                  May 1 - 2, 2025{" "}
                </h2>{" "}
              </div>{" "}
              <div className="flex flex-col gap-2">
                {" "}
                <h3 className="text-[#98A2B3] text-[14px]">Price</h3>{" "}
                <h2 className="text-[#070D17] text-[16px]">
                  $1,500 per day
                </h2>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex flex-col gap-3">
              {" "}
              <div className="flex flex-col gap-2">
                {" "}
                <h3 className="text-[#98A2B3] text-[14px]">Guests</h3>{" "}
                <h2 className="text-[#070D17] text-[16px]">50 guests</h2>{" "}
              </div>{" "}
              <div className="flex flex-col gap-2">
                {" "}
                <h3 className="text-[#98A2B3] text-[14px]">Total</h3>{" "}
                <h2 className="text-[#070D17] text-[16px]">$3,000</h2>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <p className="text-[#070D17] mt-3">
            {" "}
            Hello, I want to rent your space for an event and I have created a
            couple of milestones that should be achieved so I can release
            payment. You can check the event detail for more details about the
            event.Hello, I want to rent your space for an event and I have
            created a couple of milestones that should be achieved so I can
            release payment. You can check the event detail for more details
            about the event.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
