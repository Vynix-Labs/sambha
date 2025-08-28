"use client";
import { useState } from "react";

interface Seat {
  id: string;
  guestId?: string;
}

interface Table {
  id: string;
  type: TableType;
  seats: Seat[];
  position?: { x: number; y: number }; // Added position for drag-and-drop
}

export type TableType =
  | "long"
  | "round"
  | "large"
  | "rectangle"
  | "seating-row";

export interface TableConfig {
  name: string;
  className?: string;
  seats: number; // Added seats configuration
}

// Added default table configurations
export const defaultTableConfigs: Record<TableType, TableConfig> = {
  long: { name: "Long Table", className: "bg-blue-200 w-32 h-16", seats: 6 },
  round: {
    name: "Round Table",
    className: "bg-green-200 rounded-full w-16 h-16",
    seats: 4,
  },
  large: {
    name: "Large Table",
    className: "bg-red-200 w-24 h-24 rounded-lg",
    seats: 8,
  },
  rectangle: {
    name: "Rectangle Table",
    className: "bg-yellow-200 w-20 h-16",
    seats: 6,
  },
  "seating-row": {
    name: "Seating Row",
    className: "bg-purple-200 w-40 h-12",
    seats: 10,
  },
};

export function useSeatingChart() {
  const [tables, setTables] = useState<Table[]>([]);

  function addTable(
    type: TableType = "round",
    position = { x: 0, y: 0 }
  ): void {
    const id = Date.now().toString();
    const seats = Array.from(
      { length: defaultTableConfigs[type].seats },
      (_, i) => ({
        id: `${id}-seat-${i + 1}`,
      })
    );

    setTables((prev) => [
      ...prev,
      {
        id,
        type,
        seats,
        position,
      },
    ]);
  }

  function removeTable(id: string): void {
    setTables((prev) => prev.filter((table) => table.id !== id));
  }

  function updateTablePosition(
    id: string,
    position: { x: number; y: number }
  ): void {
    setTables((prev) =>
      prev.map((table) => (table.id === id ? { ...table, position } : table))
    );
  }

  return {
    tables,
    addTable,
    removeTable,
    updateTablePosition,
    tableConfigs: defaultTableConfigs,
  };
}
