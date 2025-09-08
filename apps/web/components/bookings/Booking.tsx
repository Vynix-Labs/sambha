import React from "react";
import { Calendar } from "lucide-react";
import ClockIcon from "components/icons/ClockIcon";
import { BsPerson } from "react-icons/bs";
import Link from "next/link";
const Booking = () => {
  const bookings = {
    id: "ab12",
    slug: "Racoon Musicals",
    name: "Racoon Musicals",
  };

  return (
    <>
      <div className="max-w-[400px] flex flex-col gap-2">
        <p className="text-[#98A2B3] text-md">20 minutes ago</p>
        <Link
          href={`/bookings/${bookings.slug}`}
          className="text-[#2A1D52] text-[18px] font-semibold"
        >
          Racoon Musicals {">"}
        </Link>
        <h2 className="text-[#C96FFF]  text-[16px]">$1,500 per day</h2>
        <p>
          We’re hosting a corporate event and would like you to consider our
          offer to rent your hall for 2 days at{" "}
          <span className="text-[#C96FFF]">... more</span>
        </p>
        <div className="flex items-center justify-between">
          <p className="flex gap-2 text-[#2A1D52]">
            <span>
              <Calendar />
            </span>
            May 1-2
          </p>
          <p className="flex gap-2 items-center text-[#2A1D52]">
            <span>
              <ClockIcon />
            </span>
            12: 00 PM
          </p>
          <p className="flex gap-2 text-[#2A1D52] items-center">
            <span>
              <BsPerson />
            </span>
            50 guests
          </p>
        </div>
      </div>
    </>
  );
};

export default Booking;
