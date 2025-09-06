import React from "react";
import Image from "next/image";
import calendar from "../../assets/images/red calender.png";

const Booking = () => {
  return (
    <>
      <div className="max-w-[400px]">
        <p className="text-[#98A2B3] text-md">20 minutes ago</p>
        <h1 className="text-[#2A1D52] text-xl font-semibold">
          Racoon Musicals {">"}
        </h1>
        <h2 className="text-[#C96FFF] text-xl">$1,500 per day</h2>
        <p>
          We’re hosting a corporate event and would like you to consider our
          offer to rent your hall for 2 days at{" "}
          <span className="text-[#C96FFF]">... more</span>
        </p>
        <div>
          <small>
            <span>
              <Image src={calendar} alt="Red calendar" />
            </span>
            May 1-2
          </small>
        </div>
      </div>
    </>
  );
};

export default Booking;
