// components/GuestDropdown.tsx
"use client";

import ChairColorIcon from "components/icons/ChairColorIcon";
import ChairGrayIcon from "components/icons/ChairGrayIcon";
import React, { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

type Guest = {
  id: number;
  name: string;
  isSeated: boolean;
};

interface Props {
  filteredGuests: Guest[];
}

export default function FilterGuest({ filteredGuests }: Props) {
  const [showSeated, setShowSeated] = useState(false);
  const [showUnseated, setShowUnseated] = useState(false);
  const [showAllGuests, setShowAllGuests] = useState(false);

  const seatedGuests = filteredGuests.filter((g) => g.isSeated);
  const unseatedGuests = filteredGuests.filter((g) => !g.isSeated);

  return (
    <div className="space-y-4 text-sm text-gray-700">
      {/* Seated Guests */}
      {seatedGuests.length > 0 && (
        <div className="w-full">
          <div
            onClick={() => setShowSeated(!showSeated)}
            className="flex items-center justify-between px-3 py-2 border-b cursor-pointer"
          >
            <span className="flex items-center gap-2 text-lg font-medium">
              Seated Guests
              {showSeated ? <FiChevronDown /> : <FiChevronRight />}
            </span>
          <span className="text-gray-500">{seatedGuests.length}</span>
          </div>

          {showSeated &&
            seatedGuests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50"
              >
                <ChairColorIcon className="" />
                <span>{guest.name}</span>
              </div>
            ))}
        </div>
      )}

      {/* Unseated Guests */}
      {unseatedGuests.length > 0 && (
        <div className="w-full">
          <div
            onClick={() => setShowUnseated(!showUnseated)}
            className="flex items-center justify-between px-3 py-2 border-b cursor-pointer"
          >
            <span className="flex items-center gap-2 text-lg font-medium">
              Unseated Guests
              {showUnseated ? <FiChevronDown /> : <FiChevronRight />}
            </span>
            <span className="text-gray-500">{unseatedGuests.length}</span>
          </div>

          {showUnseated &&
            unseatedGuests.map((guest) => (
              <div
                key={guest.id}
                className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50"
              >
                <ChairGrayIcon className="" />
                <span>{guest.name}</span>
              </div>
            ))}
        </div>
      )}

      {/* Full Guest List */}
      <div className=" w-full">
        <div
          onClick={() => setShowAllGuests(!showAllGuests)}
          className="flex items-center justify-between px-3 py-2 border-b cursor-pointer"
        >
          <span className="flex items-center gap-2 text-lg font-medium">
            Guest List {showAllGuests ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        </div>

        {showAllGuests &&
          filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50"
            >
              {guest.isSeated ? (
                <ChairColorIcon className="" />
              ) : (
                <ChairGrayIcon className="" />
              )}
              <span>{guest.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
