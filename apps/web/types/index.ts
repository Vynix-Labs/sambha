export type TableType = "round" | "rectangle" | "long" | "square";

// types.ts
export type TabValue = "Items" | "Text" | "Guests";

export interface Position {
  x: number;
  y: number;
}

// types.ts
export interface TableShape {
  id: string;
  type: "round" | "rectangle" | "long";
  name: string;
  position: { x: number; y: number };
  seats: number;
  seatAssignments: Record<number, string>;
}

export interface Chair {
  id: string;
  tableId: string;
  seatNumber: number;
  position: { x: number; y: number };
  guestName: string | null;
}

export interface Guest {
  id: string;
  name: string;
}

export interface TextItem {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontFamily: string;
}

export interface DragState {
  isDragging: boolean;
  draggedItem?: TableShape | Chair | null;
  itemType?: "table" | "chair" | null;
  offset?: { x: number; y: number };
}

export interface SeatAssignmentProps {
  selectedTable: TableShape;
  updateSeatCount: (newSeatCount: number) => void;
  assignGuestToSeat: (seatNumber: number, guestName: string) => void;
  removeGuestFromSeat: (seatNumber: number) => void;
  AVAILABLE_GUESTS: string[];
}
