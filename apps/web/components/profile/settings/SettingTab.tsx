"use client";

import React from "react";
import clsx from "clsx";

export interface TabItem {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export const SettingTab: React.FC<TabsProps> = ({
  tabs,
  onTabChange,
  activeTab,
}) => {
  return (
    <div className="w-fit">
      {" "}
      {/* Container width matches tab group */}
      <div className="flex space-x-6 border-b border-grey-400">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={clsx(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === tab.value
                ? "text-primary-dark after:absolute after:left-0 after:bottom-[-1px] after:h-[2px] after:w-full after:bg-primary-dark"
                : "text-grey-base hover:text-grey-base/80"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
