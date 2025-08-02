"use client";
import React from "react";

interface Position {
  x: number;
  y: number;
}

interface ChairType {
  id: string;
  tableId: string;
  seatNumber: number;
  position: Position;
  guestName: string | null;
}

interface ChairProps {
  chair: ChairType;
  handleDragStart: (
    item: ChairType,
    itemType: "chair",
    event: React.MouseEvent
  ) => void;
}

const Chair: React.FC<ChairProps> = ({ chair, handleDragStart }) => {
  const isAssigned = !!chair.guestName;

  return (
    <div
      className={`w-8 h-8 rounded-full border-2 cursor-move transition-all duration-200 flex items-center justify-center text-xs font-semibold absolute ${
        isAssigned
          ? "bg-green-500 border-green-600"
          : "bg-indigo-500 border-indigo-600"
      } text-white`}
      style={{
        left: chair.position.x - 16,
        top: chair.position.y - 16,
        zIndex: 5,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleDragStart(chair, "chair", e);
      }}
      title={chair.guestName || `Seat ${chair.seatNumber}`}
      aria-label={
        isAssigned
          ? `Assigned seat ${chair.seatNumber}`
          : `Empty seat ${chair.seatNumber}`
      }
    >
      {isAssigned ? chair.guestName?.charAt(0).toUpperCase() : chair.seatNumber}
    </div>
  );
};

export default Chair;
