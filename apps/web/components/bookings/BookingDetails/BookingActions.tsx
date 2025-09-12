import React from "react";

type Props = {
  onAccept: () => void;
  onReject: () => void;
  onCounter: () => void;
};

export default function BookingActions({
  onAccept,
  onReject,
  onCounter,
}: Props) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onAccept}
        className="px-4 py-2 rounded-lg bg-[#7F56D9] text-white hover:bg-[#6941C6]"
      >
        Accept
      </button>
      <button
        onClick={onCounter}
        className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50"
      >
        Counter Offer
      </button>
      <button
        onClick={onReject}
        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
      >
        Reject
      </button>
    </div>
  );
}
