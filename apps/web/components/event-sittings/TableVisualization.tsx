"use client";
import React, { useEffect, useRef } from "react";
import interact from "interactjs";
export interface Guest {
  name: string;
}

export interface TableShape {
  id: number;
  className: string;
  name: string;
  type: "round" | "rectangle" | "long";
  seats: number;
  position: { x: number; y: number };
}

interface TableVisualizationProps {
  selectedTable?: TableShape;
  seatCount: number;
  assignedSeats: (Guest | null)[];
  // onTableClick?: () => void; // Added click handler prop
}

export const TableVisualization = ({
  selectedTable,
  seatCount,
  assignedSeats,
  // onTableClick,
}: TableVisualizationProps) => {
  const tableRef = useRef<HTMLDivElement>(null);


 
  // this to get the sit arragement for guest
  const getSeatPositions = () => {
    if (!selectedTable) return [];

    switch (selectedTable.type) {
      case "round": {
        return Array.from({ length: seatCount }).map((_, index) => {
          const angle = index * (360 / seatCount) - 90;
          const radius = 100;
          return {
            x: Math.cos((angle * Math.PI) / 180) * radius,
            y: Math.sin((angle * Math.PI) / 180) * radius,
          };
        });
      }
      case "rectangle": {
        const positions = [];
        const tableWidth = 200;
        const tableHeight = 100;

        const sideSeats = [
          { x: tableWidth / 2 + 30, y: -tableHeight / 4 },
          { x: tableWidth / 2 + 30, y: tableHeight / 4 },
          { x: -tableWidth / 2 - 30, y: -tableHeight / 4 },
          { x: -tableWidth / 2 - 30, y: tableHeight / 4 },
        ];

        const remainingSeats = seatCount - 4;
        const seatsPerLongSide = Math.ceil(remainingSeats / 2);

        for (let i = 0; i < seatsPerLongSide; i++) {
          positions.push({
            x:
              -tableWidth / 2 + (tableWidth / (seatsPerLongSide + 1)) * (i + 1),
            y: -tableHeight / 2 - 30,
          });
        }

        for (let i = 0; i < remainingSeats - seatsPerLongSide; i++) {
          positions.push({
            x:
              -tableWidth / 2 + (tableWidth / (seatsPerLongSide + 1)) * (i + 1),
            y: tableHeight / 2 + 30,
          });
        }

        return [...positions, ...sideSeats].slice(0, seatCount);
      }
      case "long": {
        const positions = [];
        const tableWidth = 300;
        const tableHeight = 80;

        const sideSeats = [
          { x: tableWidth / 2 + 30, y: 0 },
          { x: -tableWidth / 2 - 30, y: 0 },
        ];

        const topBottomSeats = seatCount - 2;
        const seatsPerLongSide = Math.ceil(topBottomSeats / 2);

        for (let i = 0; i < seatsPerLongSide; i++) {
          positions.push({
            x:
              -tableWidth / 2 + (tableWidth / (seatsPerLongSide + 1)) * (i + 1),
            y: -tableHeight / 2 - 30,
          });
        }

        for (let i = 0; i < topBottomSeats - seatsPerLongSide; i++) {
          positions.push({
            x:
              -tableWidth / 2 + (tableWidth / (seatsPerLongSide + 1)) * (i + 1),
            y: tableHeight / 2 + 30,
          });
        }

        return [...positions, ...sideSeats].slice(0, seatCount);
      }
      default:
        return [];
    }
  };

  const seatPositions = getSeatPositions();

  return (
    <div className="h-full w-full bg-white-base rounded-r-2xl flex items-center justify-center relative pl-4">
      <div
        className="relative w-[600px] h-[500px] bg-primary-light"
        style={{
          backgroundImage: `
            linear-gradient(to right, #98A2B3 1px, transparent 1px),
            linear-gradient(to bottom, #98A2B3 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "20px 20px", // Adjust to start from top-left
          backgroundOrigin: "padding-box", // Ensure background starts from edge
        }}
      >
        {/* Overlay message if no table is selected */}
        {!selectedTable && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/60 z-10">
            <p className="text-gray-700 text-lg font-medium">
              Please select a table first.
            </p>
          </div>
        )}

        {selectedTable && (
          <div className="absolute inset-0 h-full w-full">
            {/* Table visualization - Draggable table  */}
            <div
              ref={tableRef}
              className={`${selectedTable.className} flex items-center justify-center text-white font-medium text-primary-light text-sm cursor-pointer`}
              style={{
                width:
                  selectedTable.type === "rectangle"
                    ? "200px"
                    : selectedTable.type === "long"
                      ? "300px"
                      : "150px",
                height:
                  selectedTable.type === "rectangle"
                    ? "100px"
                    : selectedTable.type === "long"
                      ? "80px"
                      : "150px",
                borderRadius: selectedTable.type === "round" ? "50%" : "8px",
                position: "absolute",
                left: `${selectedTable.position.x}px`, // Use the table's x position
                top: `${selectedTable.position.y}px`, // Use the table's y position
                // left: "50%",
                // top: "50%",
                // transform: "translate(-50%, -50%)",
                transform: "translate(0, 0)", // Removed the -50% transform
                userSelect: "none",
                pointerEvents: "auto", // Ensure it can receive clicks
              }}
              data-x={selectedTable.position.x}
              data-y={selectedTable.position.y}
            >
              Table {selectedTable.id + 1}
            </div>

            {/* Seats arrangement */}
            {seatPositions.map((position, index) => (
              <div
                key={index}
                className="absolute flex flex-col items-center justify-center p-4"
                style={{
                  left: `calc(0% + ${position.x}px)`,
                  top: `calc(0% + ${position.y}px)`,
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "auto", // Ensure seats can receive clicks
                }}
              >
                {!assignedSeats[index] ? (
                  <div className="rounded-full hover:scale-105 cursor-pointer text-center flex items-center justify-center bg-purple-base text-primary-light font-medium w-8 h-8">
                    {index + 1}
                  </div>
                ) : (
                  <div className="flex flex-col h-full justify-center items-center hover:scale-105 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-purple-base"></div>
                    <div className="absolute inset-0 flex justify-center items-center">
                      <div className="transform -rotate-45 origin-center text-sm font-medium text-primary-darkPurple capitalize whitespace-nowrap">
                        {assignedSeats[index]?.name}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
