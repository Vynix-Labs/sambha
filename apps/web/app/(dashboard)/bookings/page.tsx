/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import EventTabs from "components/event-sittings/EventTab";
import BookingList from "../../../components/bookings/BookingList";
import { Input } from "@sambha/ui/input";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<"New" | "Offers" | "Rejected">(
    "New"
  );
  const [query, setQuery] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "New":
        return <BookingList query={query} />;
      case "Offers":
        return <div className="text-sm text-gray-600">Offers content here</div>;
      case "Rejected":
        return <div className="text-sm text-gray-600">Rejected offers</div>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-[#2A1D52]">Bookings</h1>

        <div className="relative max-w-lg">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#EBECEE] pl-12 pr-4 py-3 rounded-xl focus:outline-none"
          />
        </div>
      </header>

      <div className="mt-8">
        <EventTabs
          tabs={["New", "Offers", "Rejected"]}
          activeTab={activeTab}
          onTabChange={(t) => setActiveTab(t as any)}
        />
        <div className="py-6">{renderContent()}</div>
      </div>
    </div>
  );
}
