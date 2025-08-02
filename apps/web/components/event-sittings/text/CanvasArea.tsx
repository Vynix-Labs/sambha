"use client";
import React from "react";

import {
  TableShape,
  Chair as ChairType,
  TextItem as TextItemType,
} from "types";
import Table from "./Table";
import Chair from "./Chair";
import TextItem from "./TextItem";

interface CanvasAreaProps {
  canvasRef: React.RefObject<HTMLDivElement>;
  tables: TableShape[];
  chairs: ChairType[];
  textItems: TextItemType[];
  selectedTable: TableShape | null;
  setSelectedTable: (table: TableShape | null) => void;
  handleDragStart: (
    item: TableShape | ChairType,
    itemType: "table" | "chair",
    event: React.MouseEvent
  ) => void;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseUp: () => void;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  canvasRef,
  tables,
  chairs,
  textItems,
  selectedTable,
  setSelectedTable,
  handleDragStart,
  handleMouseMove,
  handleMouseUp,
}) => {
  console.log("chairs", chairs, textItems);

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <div
        ref={canvasRef}
        className="w-full h-full relative"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => setSelectedTable(null)}
        role="application"
        aria-label="Seating chart canvas"
      >
        {/* {tables.length === 0 &&
          textItems.length === 0 &&
          chairs.length === 0 && <EmptyState />} */}
        {tables?.length === 0 &&
          textItems?.length === 0 &&
          chairs?.length === 0 && <EmptyState />}

        {tables.map((table) => (
          <Table
            key={table.id}
            table={table}
            isSelected={selectedTable?.id === table.id}
            handleDragStart={handleDragStart}
            handleTableClick={setSelectedTable}
          />
        ))}

        {chairs.map((chair) => (
          <Chair
            key={chair.id}
            chair={chair}
            handleDragStart={handleDragStart}
          />
        ))}

        {textItems.map((textItem) => (
          <TextItem key={textItem.id} textItem={textItem} />
        ))}
      </div>
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
    <div className="text-6xl mb-4">🪑</div>
    <h3 className="text-lg font-medium mb-2">
      Start designing your seating chart
    </h3>
    <p>Add tables and items from the left panel</p>
  </div>
);

export default CanvasArea;
