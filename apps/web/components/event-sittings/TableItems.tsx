"use client";

import React, { useState } from "react";
import { ViewButton } from "./Details";
import { SearchFilter } from "./GuestSelector";

// types.ts or at the top of your file
type TableShape = {
  id: number;
  className: string;
  name: string; // 👈 Add this line
};

type TableItemsProps = {
  onSelectTable: (table: TableShape) => void;
};

export default function TableItems({ onSelectTable }: TableItemsProps) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const tableTypes = [
    {
      name: "Long Table",
      className: "w-20 h-10 bg-purple-base border-primary-black border-4",
    },
    {
      name: "Round Table",
      className:
        "w-20 h-20 bg-purple-base border-primary-black border-4 rounded-full",
    },
    {
      name: "Large Table",
      className: "w-32 h-28 bg-purple-base border-primary-black border-4",
    },
    {
      name: "Seating row",
      className: "w-4 h-4 bg-purple-base rounded-full",
      circleTables: Array.from({ length: 6 }, () => ({
        className: "w-4 h-4 bg-purple-base rounded-full",
      })),
    },
  ];

  const handleTableClick = (name: string) => {
    const selected = name === selectedTable ? null : name;
    setSelectedTable(selected);

    // If selected is not null, call onSelectTable with the data
    if (selected) {
      const table = tableTypes.find((t) => t.name === selected);

      if (table) {
        onSelectTable({
          id: tableTypes.indexOf(table),
          className: table.className,
          name: table.name,
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full py-4 space-y-6">
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
                {/* Render either main shape OR looped circles */}
                {!table.circleTables ? (

                  // Single shape table
                  <div className={table.className} />
                ) : (
                    
                  // Seating row (looped circles)
                  <div className="flex ">
                    {table.circleTables.map((circle, idx) => (
                      <div key={idx} className={circle.className} />
                    ))}
                  </div>
                )}
                <h6 className="text-gray-base text-sm mt-1">{table.name}</h6>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
