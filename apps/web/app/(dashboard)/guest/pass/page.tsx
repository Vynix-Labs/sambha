// pages/index.tsx
"use client";
import React from "react";
import EventPass from "components/event-pass/EventPass";
import { Button } from "@sambha/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import GlobalModal from "@sambha/ui/modal/globalModal";
import avatar from "assets/images/avatar2.png";

import Image from "next/image";
import NotificationSwitch from "components/event-pass/NotificationSwitch";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full py-8">
      <h1 className="text-[42px] font-bold text-gray-800 mb-8 font-[Fractul]">
        Pass
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {passes.map((pass, index) => (
          <div key={index} className="flex flex-col gap-4">
            {/* Event pass card */}
            <button onClick={toggleModal}>
              <EventPass
                date={pass.date}
                image="assets/images/event-pass-bg.png"
                time={pass.time}
                name={pass.name}
              />
            </button>

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

      {/*  */}
      <div>
        <h1>test modal</h1>
        {/* Modal for Event Creation */}
        <GlobalModal
          isOpen={isModalOpen}
          showCloseButton
          onOpenChange={toggleModal}
          preventOutsideClick={true}
        >
          <div className="w-full -2 h-full">
            <div className="flex flex-col w-full space-y-4 md:w-[511px]">
              <div className="flex pt-8 flex-col items-center space-y-2 w-full">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={500}
                  height={500}
                  className="rounded-full h-24 w-24"
                />
                <div className="py-4 flex flex-col items-center ">
                  <h2 className="text-lg">Racoon Musicals</h2>
                  <div className="text-base flex gap-2 ">
                    <span> Wed, May 31</span> <span>12:00 PM</span>
                  </div>
                </div>

                <Button variant="secondary" className="mt-4 w-full font-medium">
                  View event
                </Button>
              </div>

              <div className="flex space-y-3 flex-col">
                <div className="flex justify-between items-center">
                  <h6>Mute notifications</h6>
                  <NotificationSwitch />
                </div>
                <h6 className="text-error-base">Report listing</h6>
                <h6>Members</h6>
              </div>
            </div>
          </div>
        </GlobalModal>
      </div>
    </div>
  );
}
