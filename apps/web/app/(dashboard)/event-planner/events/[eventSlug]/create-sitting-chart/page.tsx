"use client";
import React, { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "components/event-sittings/Breadcrumb";
import { TabNavigation } from "components/event-sittings/TabNavigation";
import { TableEditor } from "components/event-sittings/TableEditor";
import AddText from "components/event-sittings/AddText";
import GuestSelector from "components/event-sittings/GuestSelector";
import TableItems from "components/event-sittings/TableItems";
import TableVisualization from "components/event-sittings/TableVisualization";
import { TabType } from "types";

// Define types at the top for better organization
type Guest = {
  id: string;
  name: string;
};

type TableShape = {
  id: number;
  className: string;
  name: string;
  x: number;
  y: number;
  seats: number;
};

type Chair = {
  id: number;
  tableId: number;
  guest: Guest | null;
};

type TextItem = {
  id: number;
  text: string;
  x: number;
  y: number;
};

const events = [
  {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  },
];

export default function CreateSittingChartPage() {
  // State management
  const [activeTab, setActiveTab] = useState<TabType>("Items");
  const { eventSlug } = useParams();
  const decodedSlug = decodeURIComponent(eventSlug as string);
  const currentEvent = events.find((event) => event.slug === decodedSlug);

  const canvasRef = useRef<HTMLDivElement>(null);
  const [tables, setTables] = useState<TableShape[]>([]);
  const [chairs, setChairs] = useState<Chair[]>([]);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<TableShape | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Constants
  const AVAILABLE_GUESTS: Guest[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Michael Johnson" },
  ];

  // Event handlers
  const handleDragStart = useCallback(
    (e: React.MouseEvent, table: TableShape) => {
      setIsDragging(true);
      setSelectedTable(table);
      setDragOffset({
        x: e.clientX - table.x,
        y: e.clientY - table.y,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !selectedTable) return;

      const newTables = tables.map((t) =>
        t.id === selectedTable.id
          ? {
              ...t,
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            }
          : t
      );
      setTables(newTables);
      setSelectedTable(
        newTables.find((t) => t.id === selectedTable.id) || null
      );
    },
    [isDragging, selectedTable, dragOffset, tables]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const addTable = useCallback((table: Omit<TableShape, "id" | "x" | "y">) => {
    const newTable: TableShape = {
      ...table,
      id: Date.now(),
      x: 300,
      y: 300,
      seats: 4,
    };

    const newChairs: Chair[] = Array.from({ length: newTable.seats }).map(
      (_, i) => ({
        id: Date.now() + i,
        tableId: newTable.id,
        guest: null,
      })
    );

    setTables((prev) => [...prev, newTable]);
    setChairs((prev) => [...prev, ...newChairs]);
    setSelectedTable(newTable);
  }, []);

  const updateSeatCount = useCallback((tableId: number, newCount: number) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, seats: newCount } : table
      )
    );

    setChairs((prevChairs) => {
      const existingChairs = prevChairs.filter((c) => c.tableId === tableId);

      if (newCount > existingChairs.length) {
        const newChairs = Array.from({
          length: newCount - existingChairs.length,
        }).map((_, i) => ({
          id: Date.now() + i,
          tableId,
          guest: null,
        }));
        return [...prevChairs, ...newChairs];
      } else if (newCount < existingChairs.length) {
        const chairsToKeep = existingChairs
          .sort((a, b) => (a.guest ? -1 : 1))
          .slice(0, newCount);
        return [
          ...prevChairs.filter((c) => c.tableId !== tableId),
          ...chairsToKeep,
        ];
      }
      return prevChairs;
    });
  }, []);

  const assignGuestToSeat = useCallback((chairId: number, guest: Guest) => {
    setChairs((prev) =>
      prev.map((chair) => (chair.id === chairId ? { ...chair, guest } : chair))
    );
  }, []);

  const removeGuestFromSeat = useCallback((chairId: number) => {
    setChairs((prev) =>
      prev.map((chair) =>
        chair.id === chairId ? { ...chair, guest: null } : chair
      )
    );
  }, []);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "Items":
        return <TableItems onSelectTable={addTable} />;
      case "Text":
        return <AddText />;
      case "Guests":
        return <GuestSelector />;
      default:
        return null;
    }
  }, [activeTab, addTable]);

  const renderTable = useCallback(
    (table: TableShape) => (
      <div
        key={`table-${table.id}`}
        onMouseDown={(e: React.MouseEvent) => handleDragStart(e, table)}
        style={{
          position: "absolute",
          left: `${table.x}px`,
          top: `${table.y}px`,
          cursor:
            isDragging && selectedTable?.id === table.id ? "grabbing" : "grab",
        }}
      >
        <div
          className={`${table.className} flex items-center justify-center text-white font-medium text-sm w-20 h-20 rounded-full bg-purple-600`}
        >
          {table.name || `Table ${table.id}`}
        </div>
      </div>
    ),
    [handleDragStart, isDragging, selectedTable]
  );

  const renderChair = useCallback(
    (chair: Chair) => {
      const table = tables.find((t) => t.id === chair.tableId);
      if (!table) return null;

      const tableChairs = chairs.filter((c) => c.tableId === chair.tableId);
      const index = tableChairs.findIndex((c) => c.id === chair.id);
      const angle = index * (360 / table.seats) - 90;
      const radius = 60;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;

      return (
        <div
          key={`chair-${chair.id}`}
          style={{
            position: "absolute",
            left: `${table.x + x}px`,
            top: `${table.y + y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
            {chair.guest ? chair.guest.name[0] : index + 1}
          </div>
        </div>
      );
    },
    [chairs, tables]
  );

  const renderTextItem = useCallback(
    (textItem: TextItem) => (
      <div
        key={`text-${textItem.id}`}
        style={{
          position: "absolute",
          left: `${textItem.x}px`,
          top: `${textItem.y}px`,
        }}
        className="text-gray-700 text-sm"
      >
        {textItem.text}
      </div>
    ),
    []
  );

  return (
    <div className="py-6 space-y-4">
      <Breadcrumb eventSlug={eventSlug as string} currentEvent={currentEvent} />

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex w-full h-[743px]">
        <div className="md:max-w-[30%] w-full md:pr-8 px-4 md:px-0 border-r">
          {renderContent()}
        </div>

        <TableVisualization
          tables={tables}
          chairs={chairs}
          textItems={textItems}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
          handleMouseMove={handleMouseMove}
          handleMouseUp={handleMouseUp}
          dragState={{ isDragging }}
          renderTable={renderTable}
          renderChair={renderChair}
          renderTextItem={renderTextItem}
        />

        {selectedTable && (
          <div className="md:w-[30%] hidden md:block border-l pl-4">
            <TableEditor
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              seatCount={selectedTable.seats}
              assignedSeats={chairs
                .filter((c) => c.tableId === selectedTable.id)
                .map((c) => c.guest)}
              incrementSeat={() =>
                updateSeatCount(selectedTable.id, selectedTable.seats + 1)
              }
              decrementSeat={() =>
                updateSeatCount(
                  selectedTable.id,
                  Math.max(1, selectedTable.seats - 1)
                )
              }
              addGuest={() => {
                const chair = chairs.find(
                  (c) => c.tableId === selectedTable.id && !c.guest
                );
                if (chair) assignGuestToSeat(chair.id, AVAILABLE_GUESTS[0]);
              }}
              removeGuest={() => {
                const chair = chairs.find(
                  (c) => c.tableId === selectedTable.id && c.guest
                );
                if (chair) removeGuestFromSeat(chair.id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
