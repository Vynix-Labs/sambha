"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  locations?: string[];
}

export function LocationFilter({
  selectedLocation,
  onLocationChange,
  locations = [
    "Eastbridge",
    "Westridge",
    "Northbridge",
    "Southbridge",
    "Central District",
  ],
}: LocationFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-[#a5adbc]">Showing vendors in</p>
      <div className="relative">
        <button
          className="flex items-center gap-1 text-gray-800 font-medium hover:text-[#2a1d52] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {selectedLocation}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-150 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-md border border-gray-100">
            <div className="py-1">
              <button
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedLocation === "All"
                    ? "bg-[#f5f0ff] text-[#2a1d52]"
                    : "text-gray-700 hover:bg-gray-50"
                } transition-colors duration-100`}
                onClick={() => {
                  onLocationChange("All");
                  setIsOpen(false);
                }}
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedLocation === location
                      ? "bg-[#f5f0ff] text-[#2a1d52]"
                      : "text-gray-700 hover:bg-gray-50"
                  } transition-colors duration-100`}
                  onClick={() => {
                    onLocationChange(location);
                    setIsOpen(false);
                  }}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
