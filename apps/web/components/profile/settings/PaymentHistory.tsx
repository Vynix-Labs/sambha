import React from "react";
import { paymentHistory } from "../data";
import { Receipt } from "@sambha/ui/icons";

export default function PaymentHistory() {
  return (
    <div>
      <h2 className="text-lg font-semibold border-b pb-3 text-primary-darkPurple mb-4">
        Payment History
      </h2>
      <ul className="space-y-4">
        {paymentHistory.map((item) => (
          <li key={item.id} className="">
            <div className="flex items-center space-x-3">
              <Receipt />
              <div className="">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-neutral-base">
                    {item.title}
                  </p>
                  <p className="text-xs text-grey-base">{item.time}</p>
                </div>

                <p className="text-xs text-grey-base">{item.vendor}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-base">
                {item.amount}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
