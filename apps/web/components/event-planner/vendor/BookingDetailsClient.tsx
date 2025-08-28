"use client";

import { Calendar, Check, ChevronLeft, Clock, Plus, X } from "lucide-react";
import { useState } from "react";
import { Vendor } from "../../../types/vendor";
import { Breadcrumbs } from "./Breadcrumbs";
import { VendorProfile } from "./VendorProfile";

type BookingStatus = "pending" | "confirmed" | "add-milestone" | "add-review";

interface BookingDetailsClientProps {
  vendor: Vendor;
}

export function BookingDetailsClient({
  vendor,
}: BookingDetailsClientProps): React.JSX.Element {
  const [status, setStatus] = useState<BookingStatus>("pending");
  const [milestones, setMilestones] = useState([
    {
      id: "2",
      name: "Setup event hall",
      amount: 500,
      dueDate: "2025-03-19",
      completed: false,
    },
  ]);

  const [newMilestone, setNewMilestone] = useState({
    name: "",
    amount: 0,
    dueDate: "",
    description: "",
  });

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const totalAmount = 1500;
  const paidAmount = milestones.reduce(
    (sum, m) => (m.completed ? sum + m.amount : sum),
    0
  );
  const escrowBalance = totalAmount - paidAmount;

  const handleAddMilestone = () => {
    if (newMilestone.name && newMilestone.amount > 0 && newMilestone.dueDate) {
      setMilestones([
        ...milestones,
        {
          id: Date.now().toString(),
          name: newMilestone.name,
          amount: newMilestone.amount,
          dueDate: newMilestone.dueDate,
          completed: false,
        },
      ]);
      setNewMilestone({ name: "", amount: 0, dueDate: "", description: "" });
      setStatus("pending");
    }
  };

  const handleSubmitReview = () => {
    console.log("Review submitted:", { rating, review });
  };

 
   const renderPendingConfirmation = () => (
      <div className="bg-white p-6 ">
        <div className="flex  gap-3 mb-6 bg-[#f7ebff] p-2 rounded-lg">
          <Clock className="w-6 h-6 text-blue-500 font-bold" />
          <div>
            <p className="text-gray-600">
              Hang tight. We are waiting for the vendor to confirm your booking.
              This usually takes a few hours.
            </p>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400">Total paid</h4>
            <p className="mt-1 font-bold text-gray-800">
              ${paidAmount.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400">Escrow balance</h4>
            <p className="mt-1 font-bold text-gray-800">
              ${escrowBalance.toFixed(2)}
            </p>
          </div>
        </div>
  
        <div className="flex flex-col justify-between items-start b-6">
          <h3 className="font-semibold text-gray-700  border-b border-gray-300 pb-2 w-full">
            Milestones
          </h3>
          <div className="space-y-4 pt-6 w-full">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="">
                <div className="flex items-start gap-3">
                  {/* Checkbox/Completion Indicator */}
                  <div className="flex items-center h-5 mt-0.5">
                    {milestone.completed ? (
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4
                          className={`font-medium ${
                            milestone.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {milestone.name}
                        </h4>
                        {milestone.completed && (
                          <span className="inline-flex items-center text-sm text-green-600 ml-2">
                            <Check className="w-4 h-4 mr-1" />
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">
                          ${milestone.amount}
                        </span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                          {new Date(milestone.dueDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-3xl text-gray-500">...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setStatus("add-milestone")}
              className="flex items-center text-gray-600 font-medium hover:text-gray-800 transition-colors hover:bg-gray-50 px-4 py-2 rounded-lg hover:shadow-sm hover:cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add milestone
            </button>
          </div>
        </div>
  
        <div className="mt-8">
          <button
            onClick={() => setStatus("add-review")}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors my-6"
          >
            view Complete Booking,
          </button>
        </div>
      </div>
    );

 const renderAddMilestone = () => (
   <div className="fixed pl-0 md:pl-60 lg:pl-64 inset-0 z-50 flex items-center justify-center bg-[#444444] bg-opacity-50 backdrop-blur-sm">
     <div className="relative bg-white-base rounded-2xl shadow-xl w-full max-w-md mx-4">
       {/* Close button */}
       <button
         onClick={() => setStatus("pending")}
         className="bg-[#fceaea] absolute top-3 right-3 text-[#de3232] hover:text-red-600 transition-colors p-1.5 rounded-full hover:bg-gray-100"
       >
         <X className="w-5 h-5" />
       </button>

       <div className="p-4 sm:p-5">
         <h2 className="font-semibold text-gray-800 text-lg sm:text-xl mb-4">
           Add Milestone
         </h2>

         <div className="mb-4 p-3 bg-[#f7f2ff] rounded-lg">
           <p className="text-gray-700 text-sm sm:text-base">
             <span className="font-medium">Amount remaining:</span> $
             {escrowBalance.toFixed(2)}
           </p>
         </div>

         <div className="space-y-4">
           <div>
             <label className="block font-medium text-gray-700 text-sm sm:text-base mb-1.5">
               Milestone name
             </label>
             <input
               type="text"
               className="w-full p-2.5 text-sm sm:text-base border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
               value={newMilestone.name}
               onChange={(e) =>
                 setNewMilestone({ ...newMilestone, name: e.target.value })
               }
               placeholder="Title"
             />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                 Amount ($)
               </label>
               <div className="relative">
                 <span className="absolute left-3 top-2.5 text-gray-500">
                   $
                 </span>
                 <input
                   type="number"
                   className="w-full pl-8 p-2.5 text-sm sm:text-base border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
                   value={newMilestone.amount || ""}
                   onChange={(e) => {
                     const value = Math.min(
                       Number(e.target.value),
                       escrowBalance
                     );
                     setNewMilestone({
                       ...newMilestone,
                       amount: isNaN(value) ? 0 : value,
                     });
                   }}
                   placeholder="0.00"
                   min="0"
                   max={escrowBalance}
                   step="0.01"
                 />
               </div>
               {newMilestone.amount > 0 && (
                 <p className="text-xs text-gray-500 mt-1">
                   Available: ${escrowBalance.toFixed(2)}
                 </p>
               )}
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1.5">
                 Due date
               </label>
               <div className="relative">
                 <Calendar className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                 <input
                   type="date"
                   className="w-full pl-9 p-2.5 text-sm sm:text-base border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
                   value={newMilestone.dueDate}
                   onChange={(e) =>
                     setNewMilestone({
                       ...newMilestone,
                       dueDate: e.target.value,
                     })
                   }
                   min={new Date().toISOString().split("T")[0]}
                 />
               </div>
             </div>
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1.5">
               Description (optional)
             </label>
             <textarea
               className="w-full p-2.5 text-sm sm:text-base border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] resize-none"
               rows={3}
               value={newMilestone.description}
               onChange={(e) =>
                 setNewMilestone({
                   ...newMilestone,
                   description: e.target.value,
                 })
               }
               placeholder="add description..."
             />
           </div>
         </div>

         <button
           onClick={handleAddMilestone}
           className="w-full py-2 mt-3 px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group"
           disabled={
             !newMilestone.name || !newMilestone.amount || !newMilestone.dueDate
           }
         >
           <span className="relative z-10 bg-clip-text text-xs sm:text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
             save
           </span>
           <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
         </button>
       </div>
     </div>
   </div>
 );

  const renderAddReview = () => (
    <div className="bg-white p-6">
      {/* Back button */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-2">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 overflow-hidden">
              <img
                src={vendor.images[0]}
                alt={vendor.name}
                className="w-full h-full object-cover"
              />
            </div>{" "}
          </div>
          <h2 className="font-semibold text-gray-700">
            How was the service from ?
          </h2>
          <p className="font-semibold text-gray-700"> {vendor.name}?</p>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-3xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              } transition-colors`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Dynamic Rating Text */}
        <p className="text-center text-gray-600 text-sm">
          {rating === 0 && "Tap to rate"}
          {rating === 1 && "Poor"}
          {rating === 2 && "Fair"}
          {rating === 3 && "Good"}
          {rating === 4 && "Great"}
          {rating === 5 && "Awesome!"}
        </p>

        {/* Review Textarea */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Write a review
          </label>
          <textarea
            className="w-full p-4 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] resize-none"
            rows={6}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us more about working with this vendor..."
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitReview}
          className="w-full py-[7px] px-4 rounded-full text-sm duration-300 relative overflow-hidden border border-[#6946e2]  text-white font-medium hover:bg-gradient-to-b from-[#6946e2] to-[#b868fa] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={rating === 0}
        >
          Submit Review
        </button>
      </div>
      <button
        onClick={() => setStatus("pending")}
        className="flex items-center text-gray-600 mt-4 hover:text-gray-800 text-sm"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to booking
      </button>
    </div>
  );

  const renderContent = () => {
    switch (status) {
      case "pending":
      case "confirmed":
        return renderPendingConfirmation();
      case "add-milestone":
        return renderAddMilestone();
      case "add-review":
        return renderAddReview();
      default:
        return renderPendingConfirmation();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-fit bg-white">
      <Breadcrumbs
        items={[
          { href: "/event-planner/vendors", label: "Vendors" },
          {
            href: `/event-planner/vendors/view/${vendor.id}`,
            label: vendor.name,
          },
          { label: "Booking Details", isCurrent: true },
        ]}
      />

      {status === "add-review" ? (
        <div className="grid grid-cols-1">{renderContent()}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
          <div className="lg:col-span-2">{renderContent()}</div>
          <div>
            <VendorProfile vendor={vendor} />
          </div>
        </div>
      )}
    </div>
  );
}
