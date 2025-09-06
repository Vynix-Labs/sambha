"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EventTabs from "../../../../../components/event-sittings/EventTab";
import Details from "../../../../../components/event-sittings/Details";
import { defaultTheme, type ThemeConfig } from "../../../../../types/theme";
import { ThemeSelector } from "../../../../../components/event-sittings/ThemeSelector";
import { ThemedBackground } from "../../../../../components/event-sittings/ThemedBackground";

const event = {
  id: "abc123",
  slug: "oliver-and-emilys-wedding",
  name: "Oliver & Emily's Wedding",
};

export default function EventSlugPage() {
  const [activeTab, setActiveTab] = useState("Details");
  const [selectedTheme, setSelectedTheme] = useState<ThemeConfig>(defaultTheme);
  const [openTheme, setOpenTheme] = useState(false);


  const renderContent = () => {
    switch (activeTab) {
      case "Details":
        return <Details
          theme={selectedTheme}
          onThemeClick={() => setOpenTheme(true)}
        />;
      case "Guests":
        return <div>Guests content here</div>;
      case "Tasks":
        return <div>Tasks content here</div>;
      case "Budget":
        return <div>Budget content here</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <ThemedBackground theme={selectedTheme} />


      <div className=" min-h-screen py-6 space-y-4 px-2 md:px-0">
        {/* Background Image Layer */}
        {/* <div
        className="relative"
        // className="relative fixed inset-0 -z-20"
        style={{
          backgroundImage: `url(${selectedTheme.image.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      /> */}

        {/* Blur Overlay */}
        {/* <div className={`fixed inset-0 -z-10 ${selectedTheme.styles.overlay}`} /> */}

        <div className="text-sm text-gray-600 space-x-2 flex items-center">
          <Image
            src="/back.svg"
            width={10}
            height={10}
            className="w-5 h-5"
            alt="back svg Image"
          />
          <Link
            href="/event-planner/events"
            className="text-gray-base font-medium md:text-base text-sm"
          >
            Events
          </Link>
          <span>/</span>
          <h1 className="font-medium text-green-900 text-sm md:text-base">
            {event.name}
          </h1>
        </div>

        <div className=" ">
          <div className=" w-full">
            <EventTabs
              tabs={["Details", "Guests", "Tasks", "Budget"]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            {/* Tab Body */}
            <div className="py-4 w-full">{renderContent()}</div>
          </div>
        </div>
        {openTheme && (
          <ThemeSelector
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            onClose={() => setOpenTheme(false)}
          />
        )}

      </div>
    </>
  );
}