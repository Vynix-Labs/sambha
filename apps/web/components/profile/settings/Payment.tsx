"use client";

import { WalletIcon } from "@sambha/ui/icons";
import { useAtomValue, useSetAtom } from "jotai";
import React from "react";
import { modalAtom } from "../../../store/modalAtom";
import { getCardsAtom } from "../../../store/paymentCardAtom";
import { DisplayCard } from "./DisplayCard";
import PaymentHistory from "./PaymentHistory";

export const Payment = () => {
  const setModal = useSetAtom(modalAtom);
  const cards = useAtomValue(getCardsAtom);
  return (
    <div className="space-y-3 mt-4">
      <h1 className="font-bold text-xl text-primary-darkPurple">
        Payment method
      </h1>
      <p className="text-grey-base">Add a payment method.</p>
      {cards.length > 0 &&
        cards.map((card, id) => (
          <DisplayCard name={card.userName} key={id} number={card.number} />
        ))}
      <button
        onClick={() => setModal({ isOpen: true, type: "payment card" })}
        className="text-primary-darkPurple inline-flex space-x-2 items-center bg-neutral-100 rounded-[12px] py-3 px-4"
      >
        <WalletIcon />
        <span>Add payment method</span>
      </button>
      <div className="pt-8">
        <PaymentHistory />
      </div>
    </div>
  );
};
