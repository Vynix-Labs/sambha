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
      className: "w-12 h-8 bg-purple-base border-primary-darkPurple rounded border-2",
      type: "long" as const,
      seats: 8,
    },
    {
      name: "Round Table",
      className:
        "w-10 h-10 bg-purple-base border-primary-darkPurple border-2 rounded-full",
      type: "round" as const,
      seats: 6,
    },
    {
      name: "Large Table",
      className: "w-10 h-10 bg-purple-base border-primary-darkPurple rounded border-2",
      type: "rectangle" as const,
      seats: 10,
    },
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
                className="flex flex-col cursor-pointer items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                onClick={() => handleTableClick(table.name)}
              >
                {table && <div className={table.className} />}
                <h6 className="text-gray-base text-sm mt-1">{table.name}</h6>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors w-full">
            <div className="flex gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-indigo-500 rounded-full"
                ></div>
              ))}
            </div>
            <span className="text-xs text-gray-600">Seating row</span>
          </div>
        </>
      )}
    </div>
  );
}
