"use client";
import React, { useState, useRef } from "react";
import CanvasArea from "components/event-sittings/text/CanvasArea";
import LeftPanel from "components/event-sittings/text/LeftPanel";
import RightDrawer from "components/event-sittings/text/RightDrawer";
import { Chair, TableShape, TextItem } from "types";
import { Breadcrumb } from "components/event-sittings/Breadcrumb";
import { useParams } from "next/navigation";

// Fake fetched data
const events = [
  {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  },
];

const SeatingChartDesigner = () => {
  const [activeTab, setActiveTab] = useState<"items" | "text" | "guests">(
    "items"
  );
  const [selectedFont, setSelectedFont] = useState<string>("Arial");
  const [selectedTable, setSelectedTable] = useState<TableShape | null>();
  const [tables, setTables] = useState<TableShape[]>([]);
  const [chairs, setChairs] = useState<Chair[]>([]);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    draggedItem: TableShape | Chair | null;
    itemType: "table" | "chair" | null;
    offset: { x: number; y: number };
  }>({
    isDragging: false,
    draggedItem: null,
    itemType: null,
    offset: { x: 0, y: 0 },
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Constants
  const AVAILABLE_GUESTS = [
    "Kathryn Murphy",
    "John Smith",
    "Emily Davis",
    "Michael Brown",
    "Sarah Wilson",
    "David Johnson",
    "Lisa Anderson",
    "Robert Taylor",
  ];

  const FONT_OPTIONS = [
    "Arial",
    "Helvetica",
    "Inter",
    "Montserrat",
    "Open Sans",
  ];

  // Event handlers
  const addTable = (type: "round" | "rectangle" | "long" | "square") => {
    const newTable: TableShape = {
      id: `table-${Date.now()}`,
      type,
      position: { x: 400, y: 300 },
      name: `Table ${tables.length + 1}`,
      // seats: type === "long" ? 12 : type === "round" ? 8 : 6,
      seats: 3,
      seatAssignments: {
        1: "Kathryn Murphy", // ✅ pre-assign to seat 1
      },
      // seatAssignments: {},
    };
    setTables([...tables, newTable]);
  };

  const addTextBox = () => {
    const newText: TextItem = {
      id: `text-${Date.now()}`,
      position: { x: 300, y: 200 },
      text: "Double click to edit",
      fontFamily: selectedFont,
    };
    setTextItems([...textItems, newText]);
  };

  const handleDragStart = (
    item: TableShape | Chair,
    itemType: "table" | "chair",
    event: React.MouseEvent
  ) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const offset = {
      x: event.clientX - rect.left - item.position.x,
      y: event.clientY - rect.top - item.position.y,
    };

    setDragState({
      isDragging: true,
      draggedItem: item,
      itemType,
      offset,
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragState.isDragging || !dragState.draggedItem || !canvasRef.current)
      return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newPosition = {
      x: event.clientX - rect.left - dragState.offset.x,
      y: event.clientY - rect.top - dragState.offset.y,
    };

    if (dragState.itemType === "table") {
      setTables(
        tables.map((table) =>
          table.id === dragState.draggedItem?.id
            ? { ...table, position: newPosition }
            : table
        )
      );
    } else if (dragState.itemType === "chair") {
      setChairs(
        chairs.map((chair) =>
          chair.id === dragState.draggedItem?.id
            ? { ...chair, position: newPosition }
            : chair
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      draggedItem: null,
      itemType: null,
      offset: { x: 0, y: 0 },
    });
  };

  const updateSelectedTable = (updates: Partial<TableShape>) => {
    if (!selectedTable) return;
    setTables(
      tables.map((t) => (t.id === selectedTable.id ? { ...t, ...updates } : t))
    );
    setSelectedTable({ ...selectedTable, ...updates });
  };

  const updateSeatCount = (newSeatCount: number) => {
    if (!selectedTable) return;
    updateSelectedTable({ seats: newSeatCount });
  };

  const assignGuestToSeat = (seatNumber: number, guestName: string) => {
    if (!selectedTable) return;
    updateSelectedTable({
      seatAssignments: {
        ...selectedTable.seatAssignments,
        [seatNumber]: guestName,
      },
    });
  };

  const removeGuestFromSeat = (seatNumber: number) => {
    if (!selectedTable) return;
    const { [seatNumber.toString()]: _, ...remaining } =
      selectedTable.seatAssignments;
    updateSelectedTable({ seatAssignments: remaining });

    // const updatedAssignments = { ...selectedTable.seatAssignments };
    // delete updatedAssignments[seatNumber];
    // updateSelectedTable({ seatAssignments: updatedAssignments });
  };

  const { eventSlug } = useParams();
  const decodedSlug = decodeURIComponent(eventSlug as string);
  const currentEvent = events.find((event) => event.slug === decodedSlug);

  return (
    <div className="py-6 space-y-4">
      <Breadcrumb eventSlug={eventSlug as string} currentEvent={currentEvent} />
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1">
            <LeftPanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              addTable={addTable}
              addTextBox={addTextBox}
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              FONT_OPTIONS={FONT_OPTIONS}
            />

            <CanvasArea
              canvasRef={canvasRef}
              tables={tables}
              chairs={chairs}
              textItems={textItems}
              selectedTable={selectedTable || null}
              setSelectedTable={setSelectedTable}
              handleDragStart={handleDragStart}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
            />

            {selectedTable && (
              <RightDrawer
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
                updateSelectedTable={updateSelectedTable}
                updateSeatCount={updateSeatCount}
                assignGuestToSeat={assignGuestToSeat}
                removeGuestFromSeat={removeGuestFromSeat}
                AVAILABLE_GUESTS={AVAILABLE_GUESTS}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingChartDesigner;
