"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "components/event-sittings/Breadcrumb";
import { TabNavigation } from "components/event-sittings/TabNavigation";
import { TableEditor } from "components/event-sittings/TableEditor";
import { TableVisualization } from "components/event-sittings/TableVisualization";
import AddText from "components/event-sittings/AddText";
import GuestSelector from "components/event-sittings/GuestSelector";
import TableItems from "components/event-sittings/TableItems";

// Define types
type TableShape = {
  id: number;
  className: string;
  name: string;
  type: "round" | "rectangle" | "long"; // Added missing type property
  seats: number; // Added seats property since it's used in the component
  position: { x: number; y: number }; // Added position property
};

type Guest = {
  name: string;
};

// Fake fetched data
const events = [
  {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  },
];

export default function CreateSittingChartPage() {
  const [activeTab, setActiveTab] = useState("Items");
  const { eventSlug } = useParams();
  const decodedSlug = decodeURIComponent(eventSlug as string);
  const currentEvent = events.find((event) => event.slug === decodedSlug);

  const [selectedTable, setSelectedTable] = useState<TableShape | null>(null);
  const [seatCount, setSeatCount] = useState<number>(1);
  const [assignedSeats, setAssignedSeats] = useState<(Guest | null)[]>([null]);

  // to increase sit number
  const incrementSeat = () => {
    setSeatCount((prev) => {
      setAssignedSeats((prevSeats) => [...prevSeats, null]);
      return prev + 1;
    });
  };
  //  to decrease sit number
  const decrementSeat = () => {
    setSeatCount((prev) => {
      if (prev <= 1) return prev;
      setAssignedSeats((prevSeats) => prevSeats.slice(0, -1));
      return prev - 1;
    });
  };
  //  to add guest
  const addGuest = (index: number) => {
    const name = prompt("Enter guest name");
    if (!name) return;

    const updated = [...assignedSeats];
    updated[index] = { name };
    setAssignedSeats(updated);
  };
  //  to remove guest
  const removeGuest = (index: number) => {
    const updated = [...assignedSeats];
    updated[index] = null;
    setAssignedSeats(updated);
  };

  // render tab items when being clicked
  const renderContent = () => {
    switch (activeTab) {
      case "Items":
        return selectedTable ? (
          <TableEditor
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
            seatCount={seatCount}
            assignedSeats={assignedSeats}
            incrementSeat={incrementSeat}
            decrementSeat={decrementSeat}
            addGuest={addGuest}
            removeGuest={removeGuest}
          />
        ) : (
          <TableItems onSelectTable={setSelectedTable} />
        );
      case "Text":
        return <AddText />;
      case "Guests":
        return <GuestSelector />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 space-y-4 min-h-screen">
      <Breadcrumb eventSlug={eventSlug as string} currentEvent={currentEvent} />

      <div>
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main content area */}
      <div
        className={`flex w-full flex-grow ${
          selectedTable
            ? "flex-col-reverse md:flex-row-reverse"
            : "flex-col md:flex-row"
        }`}
        style={{ minHeight: "calc(100vh - 200px)" }} // Adjust 200px based on your header height
      >
        {/* Left panel (content) */}
        <div
          className={`md:max-w-[30%] w-full ${
            selectedTable ? "md:pl-4 border-l" : "border-r"
          } overflow-auto`} // Added overflow-auto for scrollable content
        >
          {renderContent()}
        </div>

        {/* Right panel (table visualization) */}
        <div className="flex-1 overflow-hidden min-h-[400px]">
          <TableVisualization
            selectedTable={selectedTable || undefined}
            seatCount={seatCount}
            assignedSeats={assignedSeats}
          />
        </div>
      </div>
    </div>
  );
}


