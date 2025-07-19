"use client";
import React from "react";

type PlusIconProps = {
  className?: string;
};

export default function PlusIcon({ className }: PlusIconProps) {
  return (
    <>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M7.99984 2.66675V13.3334ZM2.6665 8.00008H13.3332Z"
          fill="#0F2501"
        />
        <path
          d="M7.99984 2.66675V13.3334M2.6665 8.00008H13.3332"
          stroke="#2A1D52"
          strokeWidth="1.89583"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
