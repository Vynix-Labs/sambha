export type TableType = "round" | "rectangle" | "long" | "square";

// In your types file or at the top of your component
// types.ts
export type TabValue = "Items" | "Text" | "Guests";

export interface Position {
  x: number;
  y: number;
}

// export interface TableShape {
//   id: string;
//   type: TableType;
//   position: Position;
//   name: string;
//   seats: number;
//   seatAssignments: Record<string, string>; // ✅ key is string
// }

// export interface Chair {
//   id: string;
//   tableId: string;
//   seatNumber: number;
//   position: Position;
//   guestName: string | null;
// }

// export interface TextItem {
//   id: string;
//   position: Position;
//   text: string;
//   fontFamily: string;
// }

// types.ts
export interface TableShape {
  id: number;
  className: string;
  name: string;
  x: number;
  y: number;
  seats: number;
}

export interface Chair {
  id: number;
  tableId: number;
  guest: Guest | null;
  x?: number; // Optional if not used
  y?: number; // Optional if not used
}

export interface Guest {
  id: string;
  name: string;
}

export interface TextItem {
  id: number;
  text: string;
  x: number;
  y: number;
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
