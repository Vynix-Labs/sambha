"use client";

import React from "react";
import { useState } from "react";

type Props = {
  status: "pending" | "accepted" | "declined" | "counter-offer";
};

const statusMap = {
  pending: { label: "Pending", bg: "bg-yellow-50", text: "text-yellow-700" },
  accepted: { label: "Accepted", bg: "bg-green-50", text: "text-green-700" },
  declined: { label: "Declined", bg: "bg-red-50", text: "text-red-700" },
  "counter-offer": {
    label: "Offer Sent",
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
};

const OfferStatusCard: React.FC<Props> = ({ status }) => {
  const s = statusMap[status];
  const [accept, setAccept] = useState(false);
  const acceptOffer = () => {
    setAccept(!accept);
  };
  return (
    <aside className="space-y-4">
      {/* <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500">Status</h3>
            <div
              className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${s.bg} ${s.text}`}
            >
              {s.label}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-semibold mt-1">$1,500 / day</p>
          </div>
        </div>
      </div> */}

      {/* <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="text-sm text-gray-500">Quick actions</h4>
        <div className="mt-3 flex flex-col gap-2">
          <button className="w-full px-3 py-2 rounded-lg bg-[#7F56D9] text-white">
            Message planner
          </button>
          <button className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white">
            Dispute job
          </button>
        </div>
      </div> */}
      <div className="flex flex-col gap-3">
        {" "}
        <button
          className="bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#FFFFFF] w-[250px] rounded-3xl px-4 py-3"
          onClick={acceptOffer}
        >
          {" "}
          Accept Offer{" "}
        </button>{" "}
        <button className="border-purple-500 border-2 border-solid bg-white-80 w-[250px] rounded-3xl px-4 py-3 ">
          {" "}
          <span className=" bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] bg-clip-text text-transparent">
            {" "}
            Counter Offer{" "}
          </span>{" "}
        </button>{" "}
        <button className=" text-red-500 w-[250px] rounded-3xl px-4 py-3">
          {" "}
          Reject Offer{" "}
        </button>{" "}
      </div>
    </aside>
  );
};

export default OfferStatusCard;
