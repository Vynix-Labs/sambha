"use client";

import React, { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number, note?: string) => void;
};

const CounterOfferModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [note, setNote] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-[#2A1D52]">Counter Offer</h3>

        <label className="mt-4 block text-sm text-gray-600">Amount (USD)</label>
        <input
          type="number"
          value={amount === "" ? "" : amount}
          onChange={(e) =>
            setAmount(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="1350"
        />

        <label className="mt-4 block text-sm text-gray-600">
          Message to planner (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2 h-28"
          placeholder="We can meet you in the middle..."
        />

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">
            Cancel
          </button>
          <button
            onClick={() => {
              const numeric = typeof amount === "number" ? amount : 0;
              onSubmit(numeric, note);
            }}
            className="px-4 py-2 rounded-lg bg-[#7F56D9] text-white"
          >
            Send Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterOfferModal;
