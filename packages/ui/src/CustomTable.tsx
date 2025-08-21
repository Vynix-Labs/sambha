"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa";

interface ReusableTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  isLoading?: boolean;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  showSerialNumber?: boolean;
  emptyMessage?: string;
}

function getPageNumbers(
  totalPages: number,
  currentPage: number
): (number | string)[] {
  const range = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }
  return range;
}

export function CustomTable<TData>({
  data,
  columns,
  isLoading = false,
  pageIndex,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  showSerialNumber = true,
  emptyMessage = "No data available",
}: ReusableTableProps<TData>): React.ReactElement {
  const pageNumbers = getPageNumbers(totalPages, pageIndex);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      if (onPageChange && next.pageIndex !== pageIndex) {
        onPageChange(next.pageIndex);
      }

      if (onPageSizeChange && next.pageSize !== pageSize) {
        onPageSizeChange(next.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto min-h-[360px] space-y-4">
      <table className="w-full text-sm text-left min-w-[600px]">
        <thead className="whitespace-nowrap text-grey-400">
          <tr>
            {showSerialNumber && <th className="px-6 py-2 font-normal">S/N</th>}
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-2 font-normal">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length + (showSerialNumber ? 1 : 0)}
                className="py-8 text-center text-gray-500"
              >
                <div className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin" />
                  Loading...
                </div>
              </td>
            </tr>
          ) : data && data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (showSerialNumber ? 1 : 0)}
                className="py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, index) => (
              <tr key={row.id} className="border-t">
                {showSerialNumber && (
                  <td className="px-6 py-3 text-grey-400 text-sm">
                    {(pageIndex - 1) * pageSize + index + 1}
                  </td>
                )}
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-3 text-grey-400 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center pt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange?.(pageIndex - 1)}
            disabled={pageIndex <= 1}
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            <HiMiniChevronLeft />
            Prev
          </button>

          {pageNumbers.map((page, idx) =>
            typeof page === "string" ? (
              <span key={idx} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={`px-3 py-1 text-sm border rounded ${
                  pageIndex === page ? "bg-primary-dark text-white-base" : ""
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange?.(pageIndex + 1)}
            disabled={pageIndex >= totalPages}
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded disabled:opacity-40"
          >
            Next
            <HiMiniChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
