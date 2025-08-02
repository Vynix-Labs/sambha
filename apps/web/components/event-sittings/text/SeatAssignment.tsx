// src/components/RightDrawer/SeatAssignment.tsx
"use client";
import { UserRoundPlus, UserRoundX } from "lucide-react";
import React, { useState } from "react";
import { SeatAssignmentProps } from "types";

const SeatAssignment: React.FC<SeatAssignmentProps> = ({
  selectedTable,
  updateSeatCount,
  assignGuestToSeat,
  removeGuestFromSeat,
  AVAILABLE_GUESTS,
}) => {
  // const handleGuestAssignment = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   seatNumber: number
  // ) => {
  //   if (e.target.value) {
  //     assignGuestToSeat(seatNumber, e.target.value);
  //   }
  // };

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <div className="pt-2">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Seats</h3>
      <div className="flex items-center justify-between mb-4 border-t pt-4">
        <span className="text-sm text-gray-base">Number of seats</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              updateSeatCount(Math.max(1, selectedTable.seats - 1))
            }
            className="w-8 h-8 hover:bg-gray-300 rounded-full"
            aria-label="Decrease seat count"
          >
            -
          </button>
          <span className="font-medium text-gray-900 min-w-[20px] text-center">
            {selectedTable.seats}
          </span>
          <button
            onClick={() => updateSeatCount(selectedTable.seats + 1)}
            className="w-8 h-8 hover:bg-gray-300 rounded-full"
            aria-label="Increase seat count"
          >
            +
          </button>
        </div>
      </div>

      {/* seatAssignment contents */}
      <div className="space-y-2">
        {Array.from({ length: selectedTable.seats }).map((_, index) => {
          const seatNumber = index + 1;
          const assignedGuest = selectedTable.seatAssignments?.[seatNumber];

          return (
            <div
              key={`seat-${seatNumber}`}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                  {seatNumber}
                </span>

                {assignedGuest ? (
                  <span className="text-sm text-gray-900">{assignedGuest}</span>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === seatNumber ? null : seatNumber
                        )
                      }
                      className="w-8 h-8 p-2 rounded-full bg-white-90 text-white cursor-pointer flex items-center justify-center"
                    >
                      <UserRoundPlus className="" />
                    </button>

                    {/* drop down */}
                    {openDropdown === seatNumber && (
                      <ul className="absolute z-10 bg-primary-light mt-2 shadow-lg rounded-md max-h-44 overflow-auto w-52 right-0 left-0 scrollbar-hidden">
                        {AVAILABLE_GUESTS.filter(
                          (guest) =>
                            !Object.values(
                              selectedTable.seatAssignments || {}
                            ).includes(guest)
                        ).map((guest) => (
                          <li
                            key={guest}
                            onClick={() => {
                              assignGuestToSeat(seatNumber, guest);
                              setOpenDropdown(null);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                          >
                            {guest}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {assignedGuest && (
                <UserRoundX
                  onClick={() => removeGuestFromSeat(seatNumber)}
                  className="w-8 h-8 p-2 rounded-full bg-red-10 text-red-base cursor-pointer"
                  aria-label={`Remove guest from seat ${seatNumber}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatAssignment;
