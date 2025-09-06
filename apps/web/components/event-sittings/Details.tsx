"use client";
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import bgImage from "../../assets/images/bgImage.png";
import adaImage from "../../assets/svgs/addImage.svg";
import FullMapImage from "../../assets/images/FullMap.png";
import TeamMembers from "./TeamMembers";
import Link from "next/link";
import LocationIcon from "components/icons/LocationIcon";
import CalenderIcon from "components/icons/CalenderIcon";
import ClockIcon from "components/icons/ClockIcon";
import ChairIcon from "components/icons/ChairIcon";
import MessageIcon from "components/icons/MessageIcon";
import ThemeIcon from "components/icons/ThemeIcon";
import GuestIcon from "components/icons/GuestIcon";
import PencilIconEdit from "components/icons/PencilIconEdit";
import { ThemeConfig } from "types/theme";

const icons = [
  { label: "Edit", icon: <PencilIconEdit /> },
  { label: "Message", icon: <MessageIcon /> },
  { label: "Theme", icon: <ThemeIcon /> },
  { label: "Guest", icon: <GuestIcon /> },
];

const event = {
  id: "abc123",
  slug: "oliver-and-emilys-wedding",
  name: "Oliver & Emily's Wedding",
};

export function ViewButton({ theme }: { theme: ThemeConfig }) {
  return (
    <button className="flex items-center md:w-auto justify-center gap-2 rounded-full text-gray-base  hover:text-gray-400 text-sm font-medium transition">
      View all
      <span>
        <Image
          src="/arrow-right.svg"
          width={20}
          height={20}
          className="w-4 h-4"
          alt="back svg Image"
        />
      </span>
    </button>
  );
}
interface DetailsProps {
  theme: ThemeConfig;
  onThemeClick: () => void;
}

// details component
export default function Details({ theme, onThemeClick }: DetailsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(bgImage); // fallback default `${bgImage}`

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result); // Update the image shown
      }
    };
    reader.readAsDataURL(file); // Convert image to base64
  };
  return (
    <div className="py-4 ">
      <div className="flex flex-col mdlg:flex-col lg:flex-row md:gap-4 gap-8 w-full">
        {/* max-w-[60%] w-full */}
        <div className="  w-full">
          <div className="h-[317px] w-full">
            <Image
              // src={bgImage}
              src={imageSrc}
              alt="Background Image"
              width={500}
              height={500}
              quality={100}
              className="h-full w-full rounded-lg"
            />

            {/* Edit Button */}
            <div className="-mt-14 z-20 justify-center flex w-full whitespace-nowrap">
              <div className="flex items-center">
                <Image
                  src={adaImage}
                  alt="Add Image"
                  width={500}
                  height={500}
                  quality={100}
                  className="h-full w-full rounded-lg"
                />

                <button
                  className=" justify-center z-10 rounded-md bg-white/80 px-4 py-2 text-sm font-medium text-primary-light shadow hover:bg-white"
                  onClick={handleEditClick}
                >
                  Edit Background
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="py-4 space-y-3">
            <TeamMembers theme={theme} />

            {/* table for guest */}
            <div className="flex space-y-3 flex-col">
              <div className="space-y-3 flex justify-between border-b py-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-primary-darkPurple">
                    Guests
                  </h2>
                  <p className="text-sm text-gray-base">
                    Add event managers to see your event through.
                  </p>
                </div>
                <ViewButton theme={theme} />
              </div>

              <div className="grid grid-cols-3 w-full">
                <div>
                  <h1>0</h1>
                  <p>Going</p>
                </div>
                <div>
                  <h1>0</h1>
                  <p>Pending</p>
                </div>
                <div>
                  <h1>0</h1>
                  <p>Not going</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Slug-aware navigation lg:max-w-[426px] */}
        <div className="space-y-4 w-full md:px-4">
          <div className="space-y-2 ">
            <h1 className="font-semibold text-primary-darkPurple text-xl md:text-2xl ">
              {event.name}
            </h1>
            <div className="flex justify-between w-full text-xs md:text-base">
              <div className="flex gap-2 items-center">
                <LocationIcon />
                The Grand Hall, Rosewood Estate
              </div>

              <div className="flex gap-2 text-neutral-black test-sm md:text-base  items-center">
                <CalenderIcon /> Sat, Aug 20
              </div>
            </div>
            <div className="flex gap-2 items-center text-sm md:text-base">
              <ClockIcon />
              3:00 PM - 10:00 PM
            </div>
          </div>

          {/* icons */}
          <div className="flex justify-between w-full py-4">
            {icons.map(({ label, icon }, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="bg-white-90 rounded-full p-4 hover:scale-105 shadow"
                  onClick={() => {
                    if (label === "Theme") {
                      onThemeClick(); // Open ThemeSelector
                    }
                  }}
                >
                  {React.cloneElement(icon, {
                    className: "md:w-8 md:h-8 text-primary",
                  })}

                </div>
                <h1 className="text-sm text-neutral-black font-medium">
                  {label}
                </h1>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href={`/event-planner/events/${event.slug}/create-sitting-chart`}
            >
              <div className="w-full h-[107px] bg-gradient-primary rounded-2xl gap-4 flex text-primary-light items-center justify-start p-4">
                <ChairIcon className="w-10 h-10" />
                <div>
                  <h1 className="text-lg font-semibold">
                    Create Seating Chart
                  </h1>
                  <p className="max-w-[220px] text-sm">
                    Assign seats to guests and notify them.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="border-b text-primary-darkPurple font-semibold py-2">
              About
            </h1>
            <p className="text-sm text-neutral-black font-[300]">
              Celebrate the union of Oliver and Emily at the beautiful Rosewood
              Estate. Enjoy a romantic ceremony, followed by a gourmet dinner
              and lively dance. Join us for an evening of love, joy, and
              unforgettable memories as the couple begins their journey
              together.
            </p>
          </div>

          <div className="space-y-2 py-2">
            <h1 className="border-b text-primary-darkPurple font-semibold py-2">
              Location
            </h1>
            <p>The Grand Hall, Rosewood Estate</p>
            <p className="text-sm text-gray-base">
              123 Broadway Avenue, NY 10001
            </p>
            <div>
              <Image
                src={FullMapImage}
                alt="Background Image"
                width={500}
                height={500}
                quality={100}
                className="h-full w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}