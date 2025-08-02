export type TableType = "round" | "rectangle" | "long" | "square";

export interface Position {
  x: number;
  y: number;
}

export interface TableShape {
  id: string;
  type: TableType;
  position: Position;
  name: string;
  seats: number;
  seatAssignments: Record<string, string>; // ✅ key is string
}

export interface Chair {
  id: string;
  tableId: string;
  seatNumber: number;
  position: Position;
  guestName: string | null;
}

export interface TextItem {
  id: string;
  position: Position;
  text: string;
  fontFamily: string;
}

export interface SeatAssignmentProps {
  selectedTable: TableShape;
  updateSeatCount: (newSeatCount: number) => void;
  assignGuestToSeat: (seatNumber: number, guestName: string) => void;
  removeGuestFromSeat: (seatNumber: number) => void;
  AVAILABLE_GUESTS: string[];
}
