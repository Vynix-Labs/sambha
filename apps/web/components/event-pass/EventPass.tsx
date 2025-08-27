// components/event-pass/EventPass.tsx
"use client";
import Image from "next/image";
import avatar from "assets/images/avatar2.png";
import QrCode from "assets/images/QR-code.png";
import bgImage from "assets/images/event-pass-bg.png";
import React from "react";

interface EventPassProps {
  date: string;
  time: string;
  image: string; // 👈 optional now
  name: string;
}

const EventPass: React.FC<EventPassProps> = ({ date, time, name }) => {
  return (
    <div
      className="relative rounded-xl w-full h-full flex flex-col justify-between p-6 text-white"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="flex gap-4 h-full z-10 w-full justify-between items-center px-4">
        <div className="flex w-full  gap-3">
          <div className="relative z-10 flex flex-col w-full justify-center space-y-2">
            {/* Header */}
            <h1 className="text-lg font-bold">Raccoon Musicals</h1>

            {/* Date and Time */}
            <div className="flex justify-between w-full max-w-xs">
              <div>
                <p className="text-xs text-white">Date</p>
                <p className="text-sm">{date}</p>
              </div>

              <div>
                <p className="text-xs text-white">Time</p>
                <p className="text-sm">{time}</p>
              </div>
            </div>

            {/* Name */}
            <div className="flex items-center space-x-4">
              <Image
                src={avatar}
                alt="Avatar"
                width={28}
                height={28}
                className="rounded-full h-7 w-7"
              />
              <h2 className="text-sm">{name}</h2>
            </div>
          </div>

          {/* Divider */}
          <div className="border-l border-dashed mx-4"></div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center items-center">
          <Image
            src={QrCode}
            alt="QrCode"
            width={96}
            height={96}
            className="h-24 w-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default EventPass;
