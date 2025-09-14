import React from "react";
import { FaMoneyBill } from "react-icons/fa6";
import { Notebook } from "lucide-react";
import Image from "next/image";
import date2 from "../../assets/images/date-2.png";
import { Modal } from "components/Modal";

const PaymentModal: React.FC = () => {
  return (
    <Modal title="Make Payment">
      <div className="flex flex-col gap-6">
        {" "}
        <div className="flex items-center gap-2">
          {" "}
          <input type="checkbox" className="w-5 h-5" />{" "}
          <h3 className="text-[#2A1D52] text-[24px] font-semibold">
            {" "}
            Milestone 1{" "}
          </h3>{" "}
        </div>{" "}
        <div className="flex items-center pb-6 border-b-1 border-[#E4E7EC] justify-between text-[#2A1D52]">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <FaMoneyBill />{" "}
            <small className="text-[#070D17] text-[16px]">$500 </small>{" "}
          </div>{" "}
          <p className="text-[#98A2B3] text-[16px]">Edit</p>{" "}
        </div>{" "}
        <div className="flex items-center pb-6 border-b-1 border-[#E4E7EC] justify-between text-[#2A1D52]">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <Image src={date2} alt="date1" />{" "}
            <small className="text-[#940803] text-[16px]">
              Thu, Feb 19
            </small>{" "}
          </div>{" "}
        </div>{" "}
        <textarea
          className="w-full h-32 p-2 border rounded"
          placeholder={`${(<Notebook />)} Description is here...`}
        />{" "}
      </div>
    </Modal>
  );
};

export default PaymentModal;
