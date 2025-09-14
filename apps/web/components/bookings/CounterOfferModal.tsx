import React from "react";
import { Modal } from "components/Modal";
import { ArrowDown } from "lucide-react";

const CounterOfferModal: React.FC = () => {
  return (
    <Modal title="Counter Offer">
      {" "}
      <div className="space-y-4">
        {" "}
        <h2 className="text-[#2A1D52] text-lg font-medium">
          {" "}
          Your offer amount{" "}
        </h2>{" "}
        <div className="flex items-center justify-between space-x-2 p-2 rounded border-[#E4E7EC] border-2">
          {" "}
          <select className=" flex-grow p-1 outline-none appearance-none bg-transparent">
            {" "}
            <option>$1,350</option> <option>$2,500</option>{" "}
          </select>{" "}
          <span className="text-gray-500 flex gap-2">
            per day <ArrowDown />
          </span>{" "}
        </div>{" "}
        <div className="mt-10 flex flex-col gap-2">
          {" "}
          <h2 className="text-[#2A1D52] mt-6 text-lg font-medium">
            {" "}
            Message to client (optional){" "}
          </h2>{" "}
          <div className="border-[#E4E7EC] border-2 rounded p-4 text-[#070D17]">
            {" "}
            <h2 className="flex flex-col gap-2">
              {" "}
              Hi, thanks for reaching out.{" "}
              <span>
                {" "}
                We can meet you in the middle and do it for $1,350 per day,
                totalling $2,700.{" "}
              </span>{" "}
            </h2>{" "}
          </div>{" "}
        </div>{" "}
        <button className="w-full py-2 bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#ffff] rounded-3xl">
          {" "}
          Submit Offer{" "}
        </button>{" "}
      </div>
    </Modal>
  );
};

export default CounterOfferModal;
