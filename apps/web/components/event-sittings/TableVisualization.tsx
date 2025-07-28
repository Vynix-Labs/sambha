"use client";
import React from "react";

export interface Guest {
  name: string;
}

export interface TableShape {
  id: number;
  className: string;
  name: string;
  type: "round" | "rectangle" | "long"; // Added missing type property
  seats: number; // Added seats property since it's used in the component
  position: { x: number; y: number }; // Added position property
}

interface TableVisualizationProps {
  selectedTable?: TableShape | null; // Accept both undefined and null
  seatCount: number;
  assignedSeats: (Guest | null)[];
}

export const TableVisualization = ({
  selectedTable,
  seatCount,
  assignedSeats,
}: TableVisualizationProps) => {
  // Early return if no table is selected
  if (!selectedTable) {
    return (
      <div className="flex-1 bg-white-base rounded-r-2xl flex items-center justify-center">
        <p className="text-gray-500">Select a table to display</p>
      </div>
    );
  }

  // Calculate seat positions based on table type
  const getSeatPositions = () => {
    switch (selectedTable.type) {
      // for round table
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

      // for rectangle
      case "rectangle": {
        const seatsPerSide = Math.ceil(seatCount / 2);
        const seatPositions = [];
        const tableWidth = 200;
        const tableHeight = 100;

        // First side (top)
        for (let i = 0; i < seatsPerSide; i++) {
          seatPositions.push({
            x: -tableWidth / 2 + (tableWidth / (seatsPerSide - 1)) * i,
            y: -tableHeight / 2 - 30,
          });
        }

        // Second side (bottom)
        for (let i = 0; i < seatCount - seatsPerSide; i++) {
          seatPositions.push({
            x: -tableWidth / 2 + (tableWidth / (seatsPerSide - 1)) * i,
            y: tableHeight / 2 + 30,
          });
        }
        return seatPositions;
      }

      // for long
      case "long": {
        const positions = [];
        const longTableWidth = 300;
        const longTableHeight = 80;
        const seatsTopBottom = Math.ceil(seatCount * 0.4);

        // Top side
        for (let i = 0; i < seatsTopBottom; i++) {
          positions.push({
            x:
              -longTableWidth / 2 + (longTableWidth / (seatsTopBottom - 1)) * i,
            y: -longTableHeight / 2 - 30,
          });
        }

        // Right side
        for (
          let i = 0;
          i < Math.ceil((seatCount - seatsTopBottom * 2) / 2);
          i++
        ) {
          positions.push({
            x: longTableWidth / 2 + 30,
            y:
              -longTableHeight / 2 +
              (longTableHeight / (seatsTopBottom - 1)) * i,
          });
        }

        // Bottom side
        for (let i = 0; i < seatsTopBottom; i++) {
          positions.push({
            x:
              -longTableWidth / 2 + (longTableWidth / (seatsTopBottom - 1)) * i,
            y: longTableHeight / 2 + 30,
          });
        }

        // Left side (remaining seats)
        while (positions.length < seatCount) {
          positions.push({
            x: -longTableWidth / 2 - 30,
            y:
              -longTableHeight / 2 +
              (longTableHeight / (seatsTopBottom - 1)) *
                (positions.length % seatsTopBottom),
          });
        }
        return positions;
      }

      default:
        return [];
    }
  };

  const seatPositions = getSeatPositions();

  return (
    <div className="flex-1 bg-white-base rounded-r-2xl flex items-center pl-4 relative">
      <div
        className="relative w-[600px] h-[500px] left-0 right-0 mx-auto bg-primary-light"
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
      >
        <div className="absolute z-10">
          {/* Table visualization */}
          <div
            className={`${selectedTable.className} flex items-center justify-center text-white font-medium text-primary-light text-sm`}
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
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Table {selectedTable.id + 1}
          </div>

          {/* Seats arrangement */}
          <div className="absolute inset-0">
            {seatPositions.map((position, index) => (
              <div
                key={index}
                className="absolute flex flex-col items-center justify-center "
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="relative">
                  {!assignedSeats[index] ? (
                    <div className="rounded-full hover:scale-105 cursor-pointer text-center flex items-center justify-center bg-purple-base text-primary-light font-medium w-8 h-8">
                      {index + 1}
                    </div>
                  ) : (
                    <div className="relative flex flex-col h-full justify-center items-center hover:scale-105 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-purple-base"></div>
                      <div className="absolute inset-0 flex justify-center items-center">
                        <div className="transform -rotate-45 origin-center text-sm font-medium text-primary-darkPurple capitalize whitespace-nowrap">
                          {assignedSeats[index]?.name}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
