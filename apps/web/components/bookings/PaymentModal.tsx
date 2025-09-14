// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@sambha/ui/dialog";
// import { Button } from "@sambha/ui/button";
// import { Input } from "@sambha/ui/input";

// interface PaymentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPay: (amount: number) => void;
// }

// const PaymentModal: React.FC<PaymentModalProps> = ({
//   isOpen,
//   onClose,
//   onPay,
// }) => {
//   const [amount, setAmount] = useState("");

//   const handlePay = () => {
//     if (!amount) return;
//     onPay(Number(amount));
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md md:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Make Payment</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-4">
//           <Input
//             type="number"
//             placeholder="Enter amount ($)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <Button onClick={handlePay} className="bg-[#C96FFF] text-white">
//             Pay Now
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>

//   );
// };

// export default PaymentModal;
import React from "react";
import { FaMoneyBill } from "react-icons/fa6";
import { Notebook } from "lucide-react";
import Image from "next/image";
import date2 from "../../assets/images/date-2.png";
// import { Dialog } from "@sambha/ui/dialog";
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
