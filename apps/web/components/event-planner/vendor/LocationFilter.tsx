// components/LocationFilter.tsx
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
}: LocationFilterProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationChange = (location: string) => {
    onLocationChange(location);
    setIsOpen(false);
    // Don't navigate, just update the state
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
        Showing vendors in
      </p>
      <div style={{ position: "relative" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "#1F2937",
            fontWeight: 500,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
          }}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          {selectedLocation}
          <ChevronDown
            style={{
              width: "16px",
              height: "16px",
              transition: "transform 150ms",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {isOpen && (
          <div
            style={{
              position: "absolute",
              zIndex: 10,
              marginTop: "4px",
              width: "192px",
              backgroundColor: "white",
              borderRadius: "6px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #F3F4F6",
            }}
          >
            <div style={{ padding: "4px 0" }}>
              <button
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 16px",
                  fontSize: "0.875rem",
                  backgroundColor:
                    selectedLocation === "All" ? "#F5F0FF" : "transparent",
                  color: selectedLocation === "All" ? "#2A1D52" : "#374151",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 100ms, color 100ms",
                  ...(selectedLocation !== "All" && {
                    ":hover": { backgroundColor: "#F9FAFB" },
                  }),
                }}
                onClick={() => handleLocationChange("All")}
              >
                All Locations
              </button>
              {locations.map((location) => (
                <button
                  key={location}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                    backgroundColor:
                      selectedLocation === location ? "#F5F0FF" : "transparent",
                    color:
                      selectedLocation === location ? "#2A1D52" : "#374151",
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 100ms, color 100ms",
                    ...(selectedLocation !== location && {
                      ":hover": { backgroundColor: "#F9FAFB" },
                    }),
                  }}
                  onClick={() => handleLocationChange(location)}
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
