"use client";

import React from "react";

export default function UserDetailSkeleton() {
  return (
    <div className="p-4 md:p-8 space-y-8 bg-gray-50 animate-pulse">
      {/* back link */}
      <div className="h-3 w-24 bg-gray-300 rounded" />

      {/* profile + deactivate */}
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        {/* avatar + info */}
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>
        {/* button */}
        <div className="h-10 w-28 bg-gray-300 rounded" />
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white p-4 rounded flex flex-col gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded" />
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>

      {/* tasks section header */}
      <div className="h-5 w-24 bg-gray-300 rounded" />

      {/* tabs */}
      <div className="flex gap-4">
        <div className="h-8 w-28 bg-gray-300 rounded" />
        <div className="h-8 w-28 bg-gray-200 rounded" />
      </div>

      {/* task cards (horizontal scroll area) */}
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[240px] sm:min-w-[280px] lg:min-w-[395px] bg-white rounded-lg overflow-hidden"
          >
            <div className="h-36 bg-gray-300" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-40 bg-gray-300 rounded" />
              <div className="h-3 w-56 bg-gray-200 rounded" />
              <div className="flex justify-between pt-4">
                <div className="h-4 w-12 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
