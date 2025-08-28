"use client";

import React from "react";

export default function UserListSkeleton() {
  return (
    <div className="p-4 md:p-8 bg-gray-50 animate-pulse space-y-6">
      {/* Page title */}
      <div className="h-6 w-40 rounded bg-gray-300" />

      {/* Tabs + search row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Tabs */}
        <div className="flex gap-3">
          <div className="h-9 w-24 rounded bg-gray-300" />
          <div className="h-9 w-32 rounded bg-gray-200" />
        </div>

        {/* Search bar */}
        <div className="flex-1 md:flex-none max-w-md">
          <div className="h-10 w-full rounded bg-gray-200" />
        </div>
      </div>

      {/* Table header */}
      <div className="hidden sm:grid grid-cols-[160px_160px_120px_120px_120px] gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-gray-200" />
        ))}
      </div>

      {/* Table rows */}
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="grid grid-cols-2 sm:grid-cols-[160px_160px_120px_120px_120px] gap-4 bg-white p-4 rounded shadow-sm"
          >
            {/* Name cell with avatar */}
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
            </div>
            {/* Email */}
            <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
            {/* Status */}
            <div className="hidden sm:block h-4 w-20 rounded bg-gray-200 animate-pulse" />
            {/* Type */}
            <div className="hidden sm:block h-4 w-24 rounded bg-gray-200 animate-pulse" />
            {/* Actions */}
            <div className="hidden sm:block h-6 w-64 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="h-8 w-24 rounded bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-300" />
        <div className="h-8 w-24 rounded bg-gray-200" />
      </div>
    </div>
  );
}
