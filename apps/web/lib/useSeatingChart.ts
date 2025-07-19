// lib/seating-chart/useSeatingChart.ts
"use client";

import { useState } from "react";

interface Seat {
  id: string;
  guestId?: string;
}

interface Table {
  id: string;
  seats: Seat[];
}

export function useSeatingChart() {
  const [tables, setTables] = useState<Table[]>([]);

  function addTable(): void {
    const id = Date.now().toString();
    const seats: Seat[] = Array.from({ length: 4 }, (_, i) => ({
      id: `${id}-seat${i + 1}`,
    }));
    setTables((prev) => [...prev, { id, seats }]);
  }

  return {
    tables,
    addTable,
  };
}
