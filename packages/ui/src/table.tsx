"use client";
import React from "react";
import { useMobileScreen } from "../../../apps/web/hooks/useMobileScreen";
type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

type ReusableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  mobileColumns?: Column<T>[]; // ✅ optional now
  mobileData?: T[];
};

export function ReusableTable<T extends object>({
  columns,
  data,
  className = "",
  mobileColumns,
  mobileData,
}: ReusableTableProps<T>) {
  const isMobile = useMobileScreen();
  const currentColumns = isMobile && mobileColumns ? mobileColumns : columns;
  const currentData = isMobile && mobileData ? mobileData : data;

  return (
    <div className={`overflow-x-auto rounded-lg bg-white ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {currentColumns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-left text-xs font-medium capitalize text-black-400 ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {currentColumns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3  ${col.className ?? ""}`}
                >
                  {typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type User = {
  id: number;
  name: string;
  host: string;
  date: string;
  "to-do": string;
  Venue: string;
  action: string;
};

const data: User[] = [
  {
    id: 1,
    name: "Oliver & Emily's Wedding",
    host: "Jenny Wilson (You)",
    date: "Sat, Aug 20",
    "to-do": "6",
    Venue: "The Grand Hall, Rosewood Estate",
    action: "/",
  },
  {
    id: 2,
    name: "Oliver & Emily's Wedding",
    host: "Jenny Wilson (You)",
    date: "Sat, Aug 20",
    "to-do": "6",
    Venue: "The Grand Hall, Rosewood Estate",
    action: "/",
  },
];

const desktopColumns = [
  {
    header: "Name",
    accessor: (row: User) => (
      <span className="text-sm font-medium text-gray-900">{row.name}</span>
    ),
  },
  {
    header: "host",
    accessor: (row: User) => (
      <span className="text-sm font-base text-black-400">{row.host}</span>
    ),
  },
  {
    header: "date",
    accessor: (row: User) => (
      <span className="text-sm font-base text-black-400">{row.date}</span>
    ),
  },
  {
    header: "to-do",
    accessor: (row: User) => (
      <span className="text-sm font-base text-black-400">{row["to-do"]}</span>
    ),
  },
  {
    header: "Venue",
    accessor: (row: User) => (
      <span className="text-sm font-base text-black-400">{row.Venue}</span>
    ),
  },
  {
    header: "action",
    accessor: (row: User) => (
      <a
        href={row.action}
        className="text-xs font-medium bg-gradientText bg-clip-text text-transparent"
      >
        View Details
      </a>
    ),
  },
];

const mobileColumns = [
  {
    header: "",
    accessor: (row: User) => (
      <div className="h-full">
        <span className="text-sm font-medium text-gray-900">{row.name}</span>
        <span className="text-sm font-base text-black-400 inline-block">
          {row.host}
        </span>
      </div>
    ),
  },
  {
    header: "",
    accessor: (row: User) => (
      <div>
        <span className="font-base text-sm  truncate inline-block">
          {row.Venue}
        </span>
        <span className="text-xs font-medium bg-gradientText bg-clip-text text-transparent text-right block">
          view Details
        </span>
      </div>
    ),
  },
];

export default function ExampleTable() {
  return (
    <div className="">
      <h1 className="text-xl font-bold mb-4">User Table</h1>
      <ReusableTable
        columns={desktopColumns}
        data={data}
        mobileColumns={mobileColumns}
        mobileData={data}
      />
    </div>
  );
}
