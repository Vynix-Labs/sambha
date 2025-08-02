import React from "react";
import { TableType } from "types";
import { ViewButton } from "../Details";

interface TableItemsTabProps {
  addTable: (type: TableType) => void;
}

const TableItemsTab: React.FC<TableItemsTabProps> = ({ addTable }) => {
  return (
    <div>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Items..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-b py-4">
          <h2 className="text-green-900 text-lg font-medium">Seating</h2>
          <ViewButton />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => addTable("long")}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <div className="w-12 h-6 bg-purple-base border-primary-darkPurple border-2 rounded"></div>
            <span className="text-xs text-gray-600">Long Table</span>
          </button>

          <button
            onClick={() => addTable("round")}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-base border-primary-darkPurple border-2 rounded-full"></div>
            <span className="text-xs text-gray-600">Round Table</span>
          </button>

          <button
            onClick={() => addTable("square")}
            className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-base border-primary-darkPurple border-2 rounded-lg"></div>
            <span className="text-xs text-gray-600">Square Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableItemsTab;
