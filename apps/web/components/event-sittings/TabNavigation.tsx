"use client";
import ElementIcon from "components/icons/ElementIcon";
import TextIcon from "components/icons/TestIcon";
import UserIcon from "components/icons/UserIcon";
import React from "react";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const icons = [
  { label: "Items", component: ElementIcon },
  { label: "Text", component: TextIcon },
  { label: "Guests", component: UserIcon },
];

export const TabNavigation = ({
  activeTab,
  setActiveTab,
}: TabNavigationProps) => (
  <div className="flex w-[254px] border-b items-center justify-between">
    {icons.map(({ label, component: IconComponent }) => (
      <div
        key={label}
        onClick={() => setActiveTab(label)}
        className={`flex flex-col items-center py-2 ${
          activeTab === label
            ? "bg-primary-100 text-primary-600 border-b-2 px-4 border-primary-darkPurple"
            : "text-gray-600 px-4"
        }`}
      >
        <IconComponent isActive={activeTab === label} />
        <span className="text-xs cursor-pointer">{label}</span>
      </div>
    ))}
  </div>
);
