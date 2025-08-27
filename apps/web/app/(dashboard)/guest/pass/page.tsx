// pages/index.tsx
"use client";
import React from "react";
import EventPass from "components/event-pass/EventPass";
import { Button } from "@sambha/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import GlobalModal from "@sambha/ui/modal/globalModal";
import avatar from "../../../../public/Images/oliver-emily.png";

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

const users = [
  { id: 1, name: "Alice book", img: avatar, host: true },
  { id: 2, name: "Bob mark", img: avatar, host: true },
  { id: 3, name: "Charlie", img: avatar },
  { id: 4, name: "Cody Fisher", img: avatar },
  { id: 5, name: "Ralph Edwards", img: avatar },
  { id: 6, name: "you", img: avatar },
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
            <div
              onClick={toggleModal}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleModal()}
              className="clickable-div"
            >
              <EventPass
                date={pass.date}
                image="assets/images/event-pass-bg.png"
                time={pass.time}
                name={pass.name}
              />
            </div>

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
                quality={100}
                width={500}
                height={500}
                className="
            rounded-full h-24 w-24 
            object-cover
            border-4 border-white shadow-md 
            hover:scale-105 transition-transform duration-300
            ring-2 ring-offset-2 ring-gray-500
          "
              />

              <div className="py-4 flex flex-col items-center ">
                <h2 className="text-lg font-[Fractul] font-medium">
                  Racoon Musicals
                </h2>
                <div className=" flex items-center  gap-2 ">
                  <h1 className="text-sm md:text-lg font-bold bg-gradientText bg-clip-text text-transparent">
                    Wed, May 31
                  </h1>
                  <span className="">*</span>
                  <span className="text-gray-base">12:00 PM</span>
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
              <div className="flex justify-between items-center border-b pb-4">
                <h6>Members</h6>
                <span className="text-gray-500">23</span>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-3">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.img}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="rounded-full h-7 w-7 object-cover border"
                      />
                      <h2 className="text-sm">{user.name}</h2>
                    </div>

                    {/* Show host badge if exists */}
                    {user.host && (
                      <span className="text-xs px-3 py-0.5 rounded-full text-gray-base font-medium shadow-sm  border">
                        Host
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlobalModal>
    </div>
  );
}
