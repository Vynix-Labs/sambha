"use client";

import React, { useState } from "react";
import EventTabs from "components/event-sittings/EventTab";
import BookingList from "../../../components/bookings/BookingDetails/BookingList";
import { Input } from "@sambha/ui/input";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("New");

  const renderContent = () => {
    switch (activeTab) {
      case "New":
        return <BookingList />;
      case "Offers":
        return <div>Offers content here</div>;
      case "Rejected":
        return <div>Rejected Offers content here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col gap-6 mt-6 mb-3">
        <h1 className="text-3xl font-semibold text-[#2A1D52]">Bookings</h1>

        <div className="relative max-w-[400px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
          <Input
            placeholder="Search"
            className="w-full bg-[#EBECEE] pl-10 pr-3 py-2 rounded-2xl focus:outline-none"
          />
        </div>
      </header>

      <EventTabs
        tabs={["New", "Offers", "Rejected"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="py-4">{renderContent()}</div>
    </div>
  );
}
