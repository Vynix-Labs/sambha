// src/components/RightDrawer/RightDrawer.tsx
"use client";
import React from "react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { TableShape, SeatAssignmentProps } from "types";
import SeatAssignment from "./SeatAssignment";

interface RightDrawerProps extends Omit<SeatAssignmentProps, "selectedTable"> {
  selectedTable: TableShape;
  setSelectedTable: (table: TableShape | null) => void;
  updateSelectedTable: (updates: Partial<TableShape>) => void;
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  selectedTable,
  setSelectedTable,
  // updateSelectedTable,
  ...seatAssignmentProps
}) => {
  const tableTypeLabel =
    selectedTable.type === "long"
      ? "Long Table"
      : selectedTable.type === "round"
        ? "Round Table"
        : "Square Table";

  return (
    <div className="w-80 bg-white border-l shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setSelectedTable(null)}
          aria-label="Close drawer"
        >
          <ArrowLeft size={20} className="w-4 h-4 text-gray-500" />

          {/* <ChevronLeft className="text-gray-600" /> */}
        </button>
        <h2 className="text-lg font-medium text-gray-900">
          {tableTypeLabel}
        </h2>
      </div>

      <div className="flex justify-between items-center py-4 border-t">
        <h1 className="text-base font-medium text-gray-700">Name</h1>
        <span className="text-lg text-purple-base font-normal">
          {selectedTable.name || ""}
        </span>
      </div>

      <SeatAssignment selectedTable={selectedTable} {...seatAssignmentProps} />
    </div>
  );
};

export default RightDrawer;
