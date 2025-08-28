"use client";

import React from "react";

import { CardDark } from "@sambha/ui/icons";

export const DisplayCard = ({
  number,
  name,
}: {
  number: string;
  name: string;
}) => {
  const lastFour = number.slice(-4);

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-white ">
      <div className="w-4 h-4 rounded-full border-[2px] border-primary-darkPurple flex items-center justify-center">
        <div className="w-2 h-2 bg-primary-darkPurple rounded-full" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-lg font-semibold text-neutral-base">
          <CardDark />
          <span>....{lastFour}</span>
        </div>
        <p className="text-grey-base">{name}</p>
      </div>
    </div>
  );
};
