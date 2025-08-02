"use client";
import React, { useRef } from "react";
import { TableShape, Chair, TextItem } from "types";

interface TableVisualizationProps {
  tables: TableShape[];
  chairs: Chair[];
  textItems: TextItem[];
  selectedTable?: TableShape | null;
  setSelectedTable: (table: TableShape | null) => void;
  handleMouseMove: (event: React.MouseEvent) => void;
  handleMouseUp: () => void;
  dragState: {
    isDragging: boolean;
  };
  renderTable: (table: TableShape) => React.ReactNode;
  renderChair: (chair: Chair) => React.ReactNode;
  renderTextItem: (text: TextItem) => React.ReactNode;
}

export default function TableVisualization({
  tables,
  chairs,
  textItems,
  setSelectedTable,
  handleMouseMove,
  handleMouseUp,
  dragState,
  renderTable,
  renderChair,
  renderTextItem,
}: TableVisualizationProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1 relative overflow-hidden bg-gray-50">
      <div
        ref={canvasRef}
        className="w-full h-full relative"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          cursor: dragState.isDragging ? "grabbing" : "default",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => setSelectedTable(null)}
      >
        {tables.length === 0 &&
        textItems.length === 0 &&
        chairs.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
            <div className="text-6xl mb-4">🪑</div>
            <h3 className="text-lg font-medium mb-2">
              Start designing your seating chart
            </h3>
            <p>Add tables and items from the left panel</p>
          </div>
        ) : (
          <>
            {tables.map((table) => renderTable(table))}
            {chairs.map((chair) => renderChair(chair))}
            {textItems.map((textItem) => renderTextItem(textItem))}
          </>
        )}
      </div>
    </div>
  );
}
