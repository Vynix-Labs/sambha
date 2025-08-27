// pages/index.tsx
"use client";
import React from "react";
import EventPass from "components/event-pass/EventPass";
import { Button } from "@sambha/ui/button";
import { Download } from "lucide-react";

const passes = [
  {
    date: "Sept 10, 2025",
    time: "7:00 PM",
    name: "John Doe",
  },
  {
    date: "Sept 12, 2025",
    time: "8:30 PM",
    name: "Jane Smith",
  },
];

export default function Passpage() {
  return (
    <div className="min-h-screen w-full py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Event Pass</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {passes.map((pass, index) => (
          <div key={index} className="flex flex-col gap-4 item">
            {/* Event pass card */}
            <EventPass
              date={pass.date}
              image="assets/images/event-pass-bg.png"
              time={pass.time}
              name={pass.name}
            />

            {/* Download button for each card */}
            <div className="flex justify-end">
              <Button
                variant="primary"
                className="md:w-auto text-sm w-full flex items-center gap-2"
              >
                Download
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
