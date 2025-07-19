import React from "react";

interface TextIconProps {
  isActive: boolean;
}

export default function TextIcon({ isActive }: TextIconProps) {
  return (
    <div
      className={`cursor-pointer p-2 rounded ${
        isActive ? "#2A1D52" : "#98A2B3"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        // fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke={isActive ? "#2A1D52" : "#98A2B3"} // changes fill on active
          d="M2 4V4C2 2.89543 2.89543 2 4 2H8M14 4V4C14 2.89543 13.1046 2 12 2H8M8 2V14M9.33333 14H6.66667"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
