"use client";
import React from "react";

type ChairIconProps = {
  className?: string;
};

export default function ChairGrayIcon({ className }: ChairIconProps) {
  return (
    <div>
      <svg
        className={className}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.25004 11.25V16.5M12.75 11.25V16.5M5.31304 8.99998L5.03854 6.21523C4.84729 4.27498 4.75204 3.30523 5.16529 2.60923C5.94304 1.30048 7.68004 1.51273 9.00004 1.51273C10.32 1.51273 12.057 1.30048 12.8348 2.60923C13.248 3.30523 13.1528 4.27498 12.9615 6.21523L12.687 8.99998M5.25004 13.5H12.75M9.00004 8.24998C7.85854 8.24998 6.65254 8.46973 5.70604 8.76298C4.99354 8.98348 4.42054 9.99148 4.50904 10.8097C4.54204 11.1127 4.77679 11.25 5.02354 11.25H12.9765C13.224 11.25 13.458 11.1127 13.491 10.8097C13.5795 9.99148 13.0065 8.98348 12.294 8.76223C11.3483 8.47048 10.1415 8.24998 9.00004 8.24998Z"
          stroke="#98A2B3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
