// app/bookings/[slug]/offer-accepted/page.tsx
"use client";

import Image from "next/image";
// import Link from "next/link";
import React from "react";
import avatar from "../../../../../assets/images/Image.png";
import check from "../../../../../assets/images/check.svg";
// import checkgreen from "../../../../../assets/images/check-green.svg";
import gradient from "../../../../../assets/images/gradient.png";
import BookingHeader from "components/bookings/BookingHeader";

export default function OfferAcceptedPage() {
  const bookings = {
    id: "ab12",
    slug: "racoon-musicals",
    name: "Racoon Musicals",
  };

  const acceptOffer = () => {
    console.log("Offer accepted!");
    // router.push("/bookings/.../milestones") if needed
  };

  return (
    <div className="flex flex-col gap-2 pt-4">
      <BookingHeader />
      <div className="mt-3 w-full flex justify-between">
        {/* Left side */}
        <div className="max-w-[500px] flex flex-col gap-4">
          {/* Event Header */}
          <div className="flex gap-4">
            <Image
              src={avatar}
              alt="avatar"
              className="rounded-lg items-start"
            />
            <div className="text-[#2A1D52] flex flex-col gap-2">
              <h1 className="text-[24px] font-semibold">{bookings.name}</h1>
              <h2 className="text-[#101928] text-[20px]">
                Grand Maple Theatre
              </h2>

              <div className="flex gap-2">
                <Image src={gradient} alt="gradient" width={20} height={5} />
                <p className="text-[14px]">Hosted by Sonia Paul</p>
              </div>
            </div>
          </div>

          {/* Offer Sent */}
          <div className="bg-[#F7EBFF] text-[#070D17] mt-4 p-4 rounded-lg flex gap-4 items-start">
            <Image src={check} alt="check icon" />
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Offer sent</h2>
              <p>Awaiting client’s response</p>
              <p>Sent on April 24, 2025</p>
            </div>
          </div>

          {/* Offer Accepted
        <div className="bg-[#F2FFF7] text-[#070D17] mt-4 p-4 rounded-lg flex gap-4">
          <Image src={checkgreen} alt="check icon" />
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Offer Accepted</h2>
            <p>
              The client has accepted your offer. Accept booking to continue.
            </p>
          </div>
        </div> */}

          {/* Counter Offer */}
          <div className="mt-6 flex flex-col gap-2">
            <h1 className="text-[#2A1D52] pb-2 font-semibold text-xl border-b-2 border-gray-100">
              Your counter
            </h1>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-[#98A2B3] text-[14px]">Offer amount</h3>
                <h2 className="text-[#070D17] text-[16px]">May 1 - 2, 2025</h2>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#98A2B3] text-[14px]">Price</h3>
                <h2 className="text-[#070D17] text-[16px]">$1,500 per day</h2>
              </div>
            </div>
            <p className="text-[#070D17] mt-3 bg-[#F9F9F9] p-3 rounded-md">
              Hi, thanks for reaching out. We can meet you in the middle and do
              it for $1,350 per day, totalling $2,700.
            </p>
          </div>

          {/* Event Summary */}
          <div className="mt-4 flex flex-col gap-2">
            <h1 className="text-[#2A1D52] pb-2 font-semibold text-xl border-b-2 border-gray-100">
              Event Summary
            </h1>
            <div className="mt-3 flex items-center gap-40">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Dates</h3>
                  <h2 className="text-[#070D17] text-[16px]">
                    May 1 - 2, 2025
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Price</h3>
                  <h2 className="text-[#070D17] text-[16px]">$1,500 per day</h2>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Guests</h3>
                  <h2 className="text-[#070D17] text-[16px]">50 guests</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Total</h3>
                  <h2 className="text-[#070D17] text-[16px]">$3,000</h2>
                </div>
              </div>
            </div>
            <p className="text-[#070D17] mt-3 bg-[#F9F9F9] p-3 rounded-md">
              Hello, I want to rent your space for an event and I have created a
              couple of milestones that should be achieved so I can release
              payment. You can check the event detail for more details about the
              event.
            </p>
          </div>
        </div>

        {/* Right Side - Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#FFFFFF] w-[250px] rounded-3xl px-4 py-3"
            onClick={acceptOffer}
          >
            Accept Booking
          </button>
          <button className="text-red-500 w-[250px] rounded-3xl px-4 py-3 bg-[#FFFFFF]">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
