"use client";
import React from "react";
import { TableShape } from "types";
import { getTableDimensions } from "utils";

interface TableProps {
  table: TableShape;
  isSelected: boolean;
  handleDragStart: (
    item: TableShape,
    itemType: "table",
    event: React.MouseEvent
  ) => void;
  handleTableClick: (table: TableShape) => void;
}

const Table: React.FC<TableProps> = ({
  table,
  isSelected,
  handleDragStart,
  handleTableClick,
}) => {
  const dimensions = getTableDimensions(table.type);

  return (
    <div
      className={`border-2 border-indigo-600 bg-indigo-500 cursor-move transition-all duration-200 flex items-center justify-center text-white font-medium text-sm absolute ${
        isSelected ? "ring-4 ring-indigo-300 shadow-lg" : ""
      }`}
      style={{
        left: table.position.x - dimensions.width / 2,
        top: table.position.y - dimensions.height / 2,
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: table.type === "round" ? "50%" : "8px",
        zIndex: isSelected ? 10 : 1,
      }}
      onMouseDown={(e) => handleDragStart(table, "table", e)}
      onClick={(e) => {
        e.stopPropagation();
        handleTableClick(table);
      }}
    >
      {table.type === "long" && "▬"}
      {table.type === "round" && "●"}
      {table.type === "square" && "■"}
    </div>
  );
};

export default Table;
