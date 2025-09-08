"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import avatar from "../../../../assets/images/Image.png";
import info from "../../../../assets/images/alert.png";
import date1 from "../../../../assets/images/date-1.png";
import date2 from "../../../../assets/images/date-2.png";
import date3 from "../../../../assets/images/date-3.png";
import check from "../../../../assets/images/check.svg";
import checkgreen from "../../../../assets/images/check-green.svg";
import { Input } from "@sambha/ui/input";
import { Modal } from "components/Modal";
import { useState } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "../../../../store/modalAtom"; // Create a new atom for this modal
import { FaMoneyBill } from "react-icons/fa6";
import { Notebook } from "lucide-react";

const BookingDetails = () => {
  const [modal1, setModal1] = useAtom(modalAtom);
  const [modal2, setModal2] = useAtom(modalAtom);

  const openModal1 = () => {
    setModal1({ isOpen: true });
  };
  const openModal2 = () => {
    setModal2({ isOpen: true });
  };
  const bookings = {
    id: "ab12",
    slug: "Racoon Musicals",
    name: "Racoon Musicals",
  };
  const [accept, setAccept] = useState(false);

  const acceptOffer = () => {
    setAccept(!accept);
  };
  return (
    <div className="py-4 w-full">
      {/* header */}
      <div className="flex gap-2 py-2 items-center text-[18px] font-medium">
        <span className="text-[#98A2B3] hover:border-b-2 hover:border-solid hover:border-[#98A2B3]  ">
          <span>{"<"}</span> <Link href={`/bookings`}>Bookings /</Link>
        </span>
        <Link
          href={`/bookings/${bookings.slug}`}
          className="text-[#2A1D52]  hover:border-b-2 hover:border-solid hover:border-[#98A2B3]"
        >
          {bookings.name}
        </Link>
      </div>
      {/* section */}
      {/* left hand side */}
      {/* <div className="mt-3  w-full flex justify-between">
        <div className="fle max-w-[500px] flex-col gap-4">
          <div className="flex gap-4">
            <Image src={avatar} alt="avatar" className="rounded-lg" />
            <div className="text-[#2A1D52] flex flex-col gap-2">
              <h1 className="text-xl text-[24px]">{bookings.name}</h1>
              <h2 className="text-[#101928] text-[20px]">
                Grand Maple Theatre
              </h2>
              <p className="text-[14px]">Hosted by Sonia Paul</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h1 className="text-[#2A1D52] pb-2 max-w-[500px] border-gray-100 border-b-2 border-solid">
              Event Summary
            </h1>
            <div className="mt-3 flex items-center gap-40">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Dates</h3>
                  <h2 className="text-[#070D17] text-[16px]">
                    May 1 - 2, 2025
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Price</h3>
                  <h2 className="text-[#070D17] text-[16px]">$1,500 per day</h2>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Guests</h3>
                  <h2 className="text-[#070D17] text-[16px]">50 guests</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Total</h3>
                  <h2 className="text-[#070D17] text-[16px]">$3,000</h2>
                </div>
              </div>
            </div>
            <p className="text-[#070D17] mt-3">
              Hello, I want to rent your space for an event and I have created a
              couple of milestones that should be achieved so I can release
              payment. You can check the event detail for more details about the
              event.Hello, I want to rent your space for an event and I have
              created a couple of milestones that should be achieved so I can
              release payment. You can check the event detail for more details
              about the event.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#FFFFFF] w-[250px] rounded-3xl px-4 py-3"
            onClick={acceptOffer}
          >
            Accept Offer
          </button>
          <button className="border-purple-500 border-2 border-solid bg-white-80 w-[250px] rounded-3xl px-4 py-3 ">
            {" "}
            <span className=" bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] bg-clip-text text-transparent">
              Counter Offer
            </span>
          </button>
          <button className=" text-red-500 w-[250px] rounded-3xl px-4 py-3">
            Reject Offer
          </button>
        </div>
      </div> */}
      {/* New Page - Accept Offer */}
      {accept && (
        <div className="flex justify-between mt-3">
          <div className="flex max-w-[500px] flex-col">
            <div>
              <div className="flex gap-4">
                <Image src={avatar} alt="avatar" className="rounded-lg" />
                <div className="text-[#2A1D52] flex flex-col gap-2">
                  <h1 className="text-xl text-[24px]">{bookings.name}</h1>
                  <h2 className="text-[#101928] text-[20px]">
                    Grand Maple Theatre
                  </h2>
                  <p className="text-[14px]">Hosted by Sonia Paul</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <h2 className="text-[#2A1D52] text-[16px]">Total Paid</h2>{" "}
                  <Image src={info} alt="Info Icon" />
                </div>
                <h3 className="text-[#C96FFF] text-[18px]">$0.00</h3>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <h2 className="text-[#2A1D52] text-[16px]">
                    Pending earnings
                  </h2>
                  <Image src={info} alt="Info Icon" />
                </div>
                <h3 className="text-[#C96FFF] text-[18px]">$1,500.00</h3>
              </div>
            </div>
            <div className="w-[500px]">
              <h1 className="text-[#2A1D52] text-[18px] my-4 font-semibold pb-1 max-w-[500px] border-gray-100 border-b-2 border-solid">
                Milestones
              </h1>
              {/* section1 */}
              <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Input
                      type="checkbox"
                      name="milestone"
                      id=""
                      className="rounded-md w-8 h-4"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-[#070D17] text-[16px] font-semibold">
                        Milestone 1
                      </h2>
                      <div className="flex gap-2 items-center">
                        <small className="text-[#98A2B3] text-[14px]">
                          $500 <span className="w-14 h-7">.</span>
                        </small>{" "}
                        <Image src={date1} alt="date1" />{" "}
                        <p className="text-[#070D17] ">Sat, Mar 19</p>{" "}
                      </div>
                    </div>
                  </div>
                  <h1>...</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Input
                      type="checkbox"
                      name="milestone"
                      id=""
                      className="rounded-md w-8 h-4"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-[#070D17] text-[16px] font-semibold">
                        Milestone 2
                      </h2>
                      <div className="flex gap-2 items-center">
                        <small className="text-[#98A2B3] text-[14px]">
                          $500 <span className="w-14 h-7">.</span>
                        </small>{" "}
                        <Image src={date3} alt="date3" />{" "}
                        <p className="text-[#070D17] ">Sat, Mar 19</p>{" "}
                      </div>
                    </div>
                  </div>
                  <h1>...</h1>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Input
                      type="checkbox"
                      name="milestone"
                      id=""
                      className="rounded-md w-8 h-4"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-[#2A1D52] text-[16px] font-semibold">
                        Deliver 5,000 chairs to event hall
                      </h2>
                      <div className="flex gap-2 items-center">
                        <small className="text-[#98A2B3] text-[14px]">
                          $500 <span className="w-14 h-7">.</span>
                        </small>{" "}
                        <Image src={date2} alt="date2" />{" "}
                        <p className="text-[#940803] ">Thur, Feb 19</p>{" "}
                      </div>
                    </div>
                  </div>
                  <h1>...</h1>
                </div>
              </div>
              {/* end of section */}
              <div className="mt-4 flex flex-col gap-2">
                <h1 className="mt-2 text-[#070D17] font-semibold text-[18px] pb-2 max-w-[500px] border-gray-100 border-b-2 border-solid">
                  Event Summary
                </h1>
                <div className="mt-3 flex items-center gap-40">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#98A2B3] text-[14px]">Dates</h3>
                      <h2 className="text-[#070D17] text-[16px]">
                        May 1 - 2, 2025
                      </h2>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#98A2B3] text-[14px]">Price</h3>
                      <h2 className="text-[#070D17] text-[16px]">
                        $1,500 per day
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#98A2B3] text-[14px]">Guests</h3>
                      <h2 className="text-[#070D17] text-[16px]">50 guests</h2>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-[#98A2B3] text-[14px]">Total</h3>
                      <h2 className="text-[#070D17] text-[16px]">$3,000</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#FFFFFF] w-[250px] rounded-3xl px-4 py-3">
              Message Client
            </button>
            <button className="border-purple-500 border-2 border-solid bg-white-80 w-[250px] rounded-3xl px-4 py-3 ">
              {" "}
              <span className=" bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] bg-clip-text text-transparent">
                Dispute Job
              </span>
            </button>
          </div>
        </div>
      )}
      {/* Modal Component */}
      {/* <button onClick={openModal1}>Open Modal 1</button>
      <button onClick={openModal2}>Open Modal 2</button>
      <Modal>
        <div className="space-y-4">
          <h1 className="text-[#2A1D52] text-xl font-semibold">
            Counter Offer
          </h1>
          <h2 className="text-[#2A1D52] text-lg font-medium">
            Your offer amount
          </h2>
          <div className="flex items-center justify-between space-x-2  p-2 rounded border-[#E4E7EC] border-2">
            <select className=" flex-grow p-1 outline-none appearance-none bg-transparent">
              <option>$1,350</option>
              <option>$2,500</option>
            </select>
            <span className="text-gray-500">per day </span>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <h2 className="text-[#2A1D52] mt-6 text-lg font-medium">
              Message to client (optional)
            </h2>
            <div className="border-[#E4E7EC] border-2 rounded p-4 text-[#070D17]">
              <h2 className="flex flex-col gap-2">
                Hi, thanks for reaching out.{" "}
                <span>
                  {" "}
                  We can meet you in the middle and do it for $1,350 per day,
                  totalling $2,700.
                </span>
              </h2>
            </div>
          </div>

          <button className="w-full py-2 bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#ffff] rounded-3xl">
            Submit Offer
          </button>
        </div>
      </Modal>

      <Modal title="Counter Offer">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-5 h-5" />
            <h3 className="text-[#2A1D52] text-[24px] font-semibold">
              Milestone 1
            </h3>
          </div>
          <div className="flex items-center pb-6 border-b-1 border-[#E4E7EC] justify-between text-[#2A1D52]">
            <div className="flex items-center gap-2">
              <FaMoneyBill />
              <small className="text-[#070D17] text-[16px]">$500 </small>
            </div>
            <p className="text-[#98A2B3] text-[16px]">Edit</p>
          </div>
          <div className="flex items-center pb-6 border-b-1 border-[#E4E7EC] justify-between text-[#2A1D52]">
            <div className="flex items-center gap-2">
              <Image src={date2} alt="date1" />
              <small className="text-[#940803] text-[16px]">Thu, Feb 19</small>
            </div>
          </div>
          <textarea
            className="w-full h-32 p-2 border rounded"
            placeholder={`${(<Notebook />)} Description is here...`}
          />
        </div>
      </Modal> */}
      {/* offer sent page */}
      <div className="mt-3  w-full flex justify-between">
        <div className="fle max-w-[500px] flex-col gap-4">
          <div className="flex gap-4">
            <Image src={avatar} alt="avatar" className="rounded-lg" />
            <div className="text-[#2A1D52] flex flex-col gap-2">
              <h1 className="text-xl text-[24px]">{bookings.name}</h1>
              <h2 className="text-[#101928] text-[20px]">
                Grand Maple Theatre
              </h2>
              <p className="text-[14px]">Hosted by Sonia Paul</p>
            </div>
          </div>
          <div className="bg-[#F7EBFF] text-[#070D17] mt-4 p-4 rounded-lg flex gap-4">
            <div className="flex gap-2 items-start justify-center">
              <Image src={check} alt="check icon " />
              <div className="flex flex-col gap-2">
                <h2 className=" font-semibold">Offer sent</h2>
                <p>Offer sent Awaiting client’s response</p>
                <p>Sent on April 24, 2025</p>
              </div>
            </div>
          </div>
          <div className="bg-[#F2FFF7] text-[#070D17] mt-4 p-4 rounded-lg flex gap-4">
            <div className="flex gap-2 items-start justify-center">
              <Image src={checkgreen} alt="check icon " />
              <div className="flex flex-col gap-2">
                <h2 className=" font-semibold">Offer Accepted</h2>
                <p>
                  Offer accepted The client has accepted your offer. Accept
                  booking to continue.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <h1 className="text-[#2A1D52] pb-2 max-w-[500px] font-semibold text-xl border-gray-100 border-b-2 border-solid">
              Your counter
            </h1>

            <div className="flex  justify-between mt-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-[#98A2B3] text-[14px]">Offer amount </h3>
                <h2 className="text-[#070D17] text-[16px]">May 1 - 2, 2025</h2>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#98A2B3] text-[14px]">Price</h3>
                <h2 className="text-[#070D17] text-[16px]">$1,500 per day</h2>
              </div>
            </div>

            <p className="text-[#070D17] mt-3 bg-[#F9F9F9] p-3 rounded-md">
              Hi, thanks for reaching out. We can meet you in the middle and do
              it for $1,350 per day, totalling $2,700.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <h1 className="text-[#2A1D52] pb-2 max-w-[500px] font-semibold text-xl border-gray-100 border-b-2 border-solid">
              Event Summary
            </h1>
            <div className="mt-3 flex items-center gap-40">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Dates</h3>
                  <h2 className="text-[#070D17] text-[16px]">
                    May 1 - 2, 2025
                  </h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Price</h3>
                  <h2 className="text-[#070D17] text-[16px]">$1,500 per day</h2>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Guests</h3>
                  <h2 className="text-[#070D17] text-[16px]">50 guests</h2>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[#98A2B3] text-[14px]">Total</h3>
                  <h2 className="text-[#070D17] text-[16px]">$3,000</h2>
                </div>
              </div>
            </div>
            <p className="text-[#070D17] mt-3">
              Hello, I want to rent your space for an event and I have created a
              couple of milestones that should be achieved so I can release
              payment. You can check the event detail for more details about the
              event.Hello, I want to rent your space for an event and I have
              created a couple of milestones that should be achieved so I can
              release payment. You can check the event detail for more details
              about the event.
            </p>
          </div>
        </div>
        {/* buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <button className="border-purple-500 border-2 border-solid bg-white-80 w-[250px] rounded-3xl px-4 py-3 ">
              {" "}
              <span className=" bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] bg-clip-text text-transparent">
                Counter Offer Sent
              </span>
            </button>
            <button className=" text-red-500 w-[250px] rounded-3xl px-4 py-3">
              Reject Offer
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <button
              className="bg-gradient-to-b from-[#C96FFF] to-[#2B2BCF] text-[#FFFFFF] w-[250px] rounded-3xl px-4 py-3"
              onClick={acceptOffer}
            >
              Accept Booking
            </button>
            <button className=" text-red-500 w-[250px] rounded-3xl px-4 py-3">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
