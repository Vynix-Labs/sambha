"use client";

import { Button } from "@sambha/ui/button";
import Tab from "@sambha/ui/tab";
import ExampleTable from "@sambha/ui/table";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { StoreIcon, TicketIcon02 } from "../../../../public/svg";
import Link from "next/link";
import GlobalModal from "@sambha/ui/modal/globalModal";
import CreateEvent from "./createEvent/CreateEvent";
import EventCreated from "@sambha/ui/modal/EventCreated";

const tabs = ["Upcoming", "Past", "Drafts"];

function Page() {
  const [isActive, setIsActive] = useState("Upcoming");
  const [events, setEvents] = useState<object[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventCreated, setEventCreated] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const renderEmptyState = (label: string) => (
    <div className="pt-16 flex items-center justify-center sm:justify-normal">
      <div className="gap-y-2 flex-col justify-center items-center flex sm:items-start">
        <div className="rounded-xl bg-white-900 p-3 inline-block">
          <TicketIcon02 />
        </div>
        <p className="text-sm font-normal text-gray-base max-w-[20ch] text-center sm:text-start">
          Your {label.toLowerCase()} events will show up here.
        </p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (events.length === 0) return renderEmptyState(isActive);
    return <ExampleTable />;
  };

  return (
    <div className="pt-8 gap-y-14 sm:gap-y-16 flex flex-col">
      {/* Header & Tabs */}
      <div className="flex w-full justify-between gap-4 sm:items-end flex-col sm:flex-row">
        <div className="space-y-6">
          <h1 className="md:text-5xl font-medium sm:text-4xl text-3xl text-gray-900">
            Events
          </h1>
          <Tab tabs={tabs} setIsActive={setIsActive} isActive={isActive} />
        </div>

        <Button onClick={toggleModal}>
          <span className="text-sm sm:text-base font-medium">Create Event</span>
          <Plus size={20} />
        </Button>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>

      {/* Quick Actions */}
      <div className="flex gap-y-4 flex-col sm:absolute sm:bottom-20">
        <p className="sm:text-xl text-lg text-gray-600 font-medium md:text-2xl">
          Quick Actions
        </p>
        <div className="flex-col sm:flex-row flex gap-3">
          <button
            onClick={toggleModal}
            className="rounded-2xl p-5 bg-gradient-primary space-y-4 max-w-64 text-left"
          >
            <Plus className="text-primary-light" size={22} />
            <div>
              <p className="font-semibold text-primary-light">Create event</p>
              <p className="font-normal text-sm text-primary-light">
                Tap to create a new event and do more.
              </p>
            </div>
          </button>

          <Link
            href="#"
            className="rounded-2xl p-5 bg-white-900 max-w-64 space-y-4"
          >
            <StoreIcon />
            <div>
              <p className="font-semibold text-gray-500">Marketplace</p>
              <p className="text-sm text-gray-600 font-normal">
                Check through our marketplace for vendors for your event.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Modal for Event Creation */}
      <GlobalModal
        isOpen={isModalOpen}
        showCloseButton
        onOpenChange={toggleModal}
        preventOutsideClick={true}
      >
        <CreateEvent
          setIsCreated={setEventCreated}
          setIsModal={setIsModalOpen}
        />
      </GlobalModal>
      {
        // This is where the modal for event created success
      }
      <GlobalModal
        isOpen={eventCreated} // Replace with state to control visibility
        showCloseButton={false}
        onOpenChange={() => {}} // Replace with function to handle close
      >
        <EventCreated setIsCreated={setEventCreated} />
      </GlobalModal>
    </div>
  );
}

export default Page;

