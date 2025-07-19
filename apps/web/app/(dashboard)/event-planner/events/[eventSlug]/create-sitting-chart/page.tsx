"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ElementIcon from "components/icons/ElementIcon";
import UserIcon from "components/icons/UserIcon";
import TextIcon from "components/icons/TestIcon";
import AddText from "components/event-sittings/AddText";
import GuestSelector from "components/event-sittings/GuestSelector";
import TableItems from "components/event-sittings/TableItems";
import {
  ArrowLeft,
  Minus,
  Plus,
  UserRoundPlus,
  UserRoundX,
} from "lucide-react";

// Fake fetched data
const events = [
  {
    id: "abc123",
    slug: "oliver-and-emilys-wedding",
    name: "Oliver & Emily's Wedding",
  },
];

//  Define types
type TableShape = {
  id: number;
  className: string;
  name: string;
};

type Guest = {
  name: string;
};

export default function CreateSittingChartPage() {
  const [activeTab, setActiveTab] = useState("Items");
  const { eventSlug } = useParams();
  const decodedSlug = decodeURIComponent(eventSlug as string);
  const currentEvent = events.find((event) => event.slug === decodedSlug);

  const icons = [
    { label: "Items", component: ElementIcon },
    { label: "Text", component: TextIcon },
    { label: "Guests", component: UserIcon },
  ];

  const [selectedTable, setSelectedTable] = useState<TableShape | null>(null);
  const [seatCount, setSeatCount] = useState<number>(1);
  const [assignedSeats, setAssignedSeats] = useState<(Guest | null)[]>([null]);

  // to add numder
  const incrementSeat = () => {
    setSeatCount((prev) => {
      setAssignedSeats((prevSeats) => [...prevSeats, null]);
      return prev + 1;
    });
  };

  //  to reduce the number added
  const decrementSeat = () => {
    setSeatCount((prev) => {
      if (prev <= 1) return prev;
      setAssignedSeats((prevSeats) => prevSeats.slice(0, -1));
      return prev - 1;
    });
  };

  // add guest
  const addGuest = (index: number) => {
    // use prompt to add a guest since no ui for that
    const name = prompt("Enter guest name");
    if (!name) return;
    const updated = [...assignedSeats];
    updated[index] = { name };
    setAssignedSeats(updated);
  };

  // remove guest
  const removeGuest = (index: number) => {
    const updated = [...assignedSeats];
    updated[index] = null;
    setAssignedSeats(updated);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Items":
        return selectedTable ? (
          <>
            <div className="space-y-4">
              <div className="border-b">
                <button
                  onClick={() => setSelectedTable(null)}
                  className="flex gap-2  py-3 items-center cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-gray-500 " />
                  <span className="text-darkPurple text-lg font-medium">
                    {selectedTable?.name || "Selected Table"}
                  </span>
                </button>
              </div>

              <div className="flex justify-between items-center py-4">
                <h1 className="text-base font-medium">Name</h1>
                <span className="text-lg text-purple-base font-normal">
                  Table 1
                </span>
              </div>

              <div className="border-b text-sm font-normal text-gray-base w-full pb-4">
                <span>Seats</span>
              </div>

              {/* seat count control */}
              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-normal">Number of seats</span>
                <div className="flex gap-3 items-center">
                  <Minus
                    className="w-8 h-8 p-2 rounded-full bg-white-90 cursor-pointer"
                    onClick={decrementSeat}
                  />
                  <span>{seatCount}</span>
                  <Plus
                    className="w-8 h-8 p-2 rounded-full bg-white-90 cursor-pointer"
                    onClick={incrementSeat}
                  />
                </div>
              </div>

              {/* Dynamic seat rows */}
              {Array.from({ length: seatCount }).map((_, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  {/* Seat number */}
                  <span className="rounded-full text-center flex items-center justify-center bg-purple-10 text-gradientText font-medium w-8 h-8">
                    {index + 1}
                  </span>

                  {/* If seat is assigned, show name and remove icon. Else show + icon */}
                  {assignedSeats[index] ? (
                    <div className="text-sm flex items-center font-normal gap-2">
                      <button className="px-4 py-2 bg-white-90 rounded-full capitalize">
                        {assignedSeats[index].name}
                      </button>
                      <UserRoundX
                        className="w-8 h-8 p-2 rounded-full bg-red-10 text-red-base cursor-pointer"
                        onClick={() => removeGuest(index)}
                      />
                    </div>
                  ) : (
                    <div className="text-sm flex items-center font-normal gap-2">
                      <UserRoundPlus
                        className="w-8 h-8 p-2 rounded-full bg-white-90 text-white cursor-pointer"
                        onClick={() => addGuest(index)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
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
    <div className="py-6 space-y-4">
      {/* Breadcrumb */}
      <div className="md:text-sm text-xs flex items-center whitespace-nowrap text-gray-600 space-x-2">
        <Image
          src="/back.svg"
          width={10}
          height={10}
          className="w-4 h-4"
          alt="Back"
        />
        <Link
          href="/event-planner/events"
          className="text-gray-base font-medium md:text-base text-xs"
        >
          Events
        </Link>
        <span>/</span>

        <Link
          href={`/event-planner/events/${eventSlug}`}
          className="text-gray-base font-medium md:text-base text-xs"
        >
          <span>{currentEvent?.name ?? "Event not found"}</span>
        </Link>

        <span>/</span>

        <h1 className="font-medium text-primary-darkPurple text-xs md:text-base">
          Create Seating Chart
        </h1>
      </div>
      <div>
        {/* tabs + Icons */}
        <div className="flex w-[254px] border-b items-center justify-between">
          {icons.map(({ label, component: IconComponent }) => (
            <div
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex flex-col items-center  py-2 ${
                activeTab === label
                  ? "bg-primary-100 text-primary-600 border-b-2 px-4 border-primary-darkPurple"
                  : "text-gray-600 px-4"
              }`}
            >
              <IconComponent isActive={activeTab === label} />
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`flex w-full h-[743px] ${
          selectedTable
            ? "flex-col-reverse md:flex-row-reverse"
            : "flex-col md:flex-row"
        }`}
      >
        <div
          className={`md:max-w-[30%] w-full md:pr-8 px-4 md:px-0 ${selectedTable ? "md:pl-4  border-l" : "border-r"}`}
        >
          {renderContent()}
        </div>

        <div className="flex-1 bg-white-80 rounded-r-2xl flex items-center justify-center relative ">
          {selectedTable ? (
            <div className="relative">
              {/* Table Shape */}
              <div className={selectedTable.className} />

              {/* Seated Guests Around Table */}
              <div className="absolute inset-0">
                {Array.from({ length: seatCount }).map((_, index) => {
                  const angle = index * (360 / seatCount) - 90; // Start from top
                  const radius = 100; // Distance from table center
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <div
                      key={index}
                      className="absolute flex flex-col items-center justify-center"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* Seat Number */}
                      <div className="rounded-full bg-purple-100 text-purple-800 w-8 h-8 flex items-center justify-center mb-1 font-medium">
                        {index + 1}
                      </div>

                      {/* Guest Name (if assigned) */}
                      {assignedSeats[index] && (
                        <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm whitespace-nowrap capitalize">
                          {assignedSeats[index]?.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Click a table item to display here</p>
          )}
        </div>
      </div>
    </div>
  );
}
