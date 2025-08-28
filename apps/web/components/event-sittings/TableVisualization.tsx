"use client";
import React from "react";

export interface Guest {
  name: string;
}

export interface TableShape {
  id: number;
  className: string;
  name: string;
}

interface TableVisualizationProps {
  selectedTable?: TableShape; // Make it optional instead of null
  seatCount: number;
  assignedSeats: (Guest | null)[];
}

export const TableVisualization = ({
  selectedTable,
  seatCount,
  assignedSeats,
}: TableVisualizationProps) => (
  <div className="flex-1 bg-white-base rounded-r-2xl flex items-center justify-center relative">
    {/* Grid Background */}
    <div
      className="absolute w-[600px] h-[500px] mx-auto bg-primary-light" // Set your desired width/height
      style={{
        backgroundImage: `
        linear-gradient(to right, #98A2B3 1px, transparent 1px),
        linear-gradient(to bottom, #98A2B3 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
        backgroundPosition: "center center",
        zIndex: 0,
        opacity: 0.8,
      }}
    ></div>

    {selectedTable ? (
      <div className="relative z-10">
        {/* Added z-10 to ensure content appears above grid */}
        <div
          className={`${selectedTable.className} flex items-center justify-center text-white font-medium text-primary-light text-sm`}
        >
          Table {selectedTable.id + 1}
        </div>

        <div className="absolute inset-0">
          {Array.from({ length: seatCount }).map((_, index) => {
            const angle = index * (360 / seatCount) - 90;
            const radius = 100;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center justify-center"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative">
                  {/* Seat number (hidden when assigned) */}
                  {!assignedSeats[index] && (
                    <div className="rounded-full hover:scale-105 cursor-pointer text-center flex items-center justify-center bg-purple-base text-primary-light font-medium w-8 h-8">
                      {index + 1}
                    </div>
                  )}

                  {/* Passenger name (shown when assigned) */}
                  {assignedSeats[index] && (
                    <div className="relative flex flex-col h-full justify-center items-center hover:scale-105 cursor-pointer">
                      {/* Circular background */}
                      <div className="w-8 h-8 rounded-full bg-purple-base"></div>

                      {/* Rotated text - centered version */}
                      <div className="absolute inset-0 flex justify-center items-center">
                        <div className="transform -rotate-45 origin-center text-sm font-medium text-primary-darkPurple capitalize whitespace-nowrap">
                          {assignedSeats[index].name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <p className="text-gray-500 z-10">Click a table item to display here</p>
    )}
  </div>
);
