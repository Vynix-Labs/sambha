// "use client";

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@sambha/ui/dialog";
// import { Input } from "@sambha/ui/input";
// import { Button } from "@sambha/ui/button";

// interface CounterOfferModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (amount: number, message: string) => void;
// }

// const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
//   isOpen,
//   onClose,
//   onSubmit,
// }) => {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = () => {
//     if (!amount) return;
//     onSubmit(Number(amount), message);
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Send Counter Offer</DialogTitle>
//         </DialogHeader>
//         <div className="flex flex-col gap-4">
//           <Input
//             type="number"
//             placeholder="Enter offer amount ($)"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <textarea
//             placeholder="Write a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="w-full border rounded-md p-2 text-sm"
//           />
//           <Button onClick={handleSubmit} className="bg-[#2A1D52] text-white">
//             Send Offer
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CounterOfferModal;
import React from "react";
import { Modal } from "components/Modal";
// import { Dialog } from "@sambha/ui/dialog";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

const CounterOfferModal: React.FC = ({}) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    console.log("Counter offer submitted:", amount, message);
    // TODO: push to offer-sent page if needed
  };

  return (
    <Modal title="Counter Offer">
      {" "}
      <div className="space-y-4">
        {" "}
        {/* <h1 className="text-[#2A1D52] text-xl font-semibold">
          {" "}
          Counter Offer{" "}
        </h1>{" "} */}
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
