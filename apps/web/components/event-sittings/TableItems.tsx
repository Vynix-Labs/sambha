import React, { useState } from "react";
import { ViewButton } from "./Details";
import { SearchFilter } from "./GuestSelector";

type TableShape = {
  id: number;
  className: string;
  name: string;
  type: "round" | "rectangle" | "long";
  seats: number;
  position: { x: number; y: number };
};

type TableItemsProps = {
  onSelectTable: (table: TableShape) => void;
};

export default function TableItems({ onSelectTable }: TableItemsProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const tableTypes = [
    {
      name: "Long Table",
      className: "w-20 h-10 bg-purple-base border-primary-darkPurple border-4",
      type: "long" as const,
      seats: 8,
    },
    {
      name: "Round Table",
      className:
        "w-20 h-20 bg-purple-base border-primary-darkPurple border-4 rounded-full",
      type: "round" as const,
      seats: 6,
    },
    {
      name: "Large Table",
      className: "w-32 h-28 bg-purple-base border-primary-darkPurple border-4",
      type: "rectangle" as const,
      seats: 10,
    },
    // {
    //   name: "Seating row",
    //   circleTables: Array.from({ length: 6 }, () => ({
    //     className: "w-4 h-4 bg-purple-base rounded-full",
    //   })),
    //   type: "long" as const,
    //   seats: 6,
    // },
  ];

  const handleTableClick = (name: string) => {
    const selected = name === selectedTable ? null : name;
    setSelectedTable(selected);

    if (selected) {
      const table = tableTypes.find((t) => t.name === selected);
      if (table) {
        onSelectTable({
          id: tableTypes.indexOf(table),
          className: table.className ?? "",
          name: table.name,
          type: table.type,
          seats: table.seats,
          position: { x: 0, y: 0 }, // Default position
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full py-4 space-y-6 px-4">
      {!selectedTable && (
        <>
          <div className="flex justify-between w-full">
            <SearchFilter onSearch={(query) => console.log(query)} />
          </div>
          <div className="flex justify-between border-b py-4">
            <h2 className="text-green-900 text-lg font-medium">Seating</h2>
            <ViewButton />
          </div>

          {/* Shape selection */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 items-center py-4">
            {tableTypes.map((table, index) => (
              <div
                key={index}
                className="flex flex-col cursor-pointer"
                onClick={() => handleTableClick(table.name)}
              >
                {table && <div className={table.className} />}
                <h6 className="text-gray-base text-sm mt-1">{table.name}</h6>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
