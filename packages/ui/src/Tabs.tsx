"use client";
import { Button } from "./button";
import { cn } from "../../../apps/web/utils/cn";

export type TabItem = {
  label: string;
  key: string;
};

interface TabsProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export default function Tabs({ tabs, activeKey, onTabChange }: TabsProps) {
  return (
    <div className="w-full">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            className={cn(
              "bg-[#F3F3F3] text-sm px-4 py-[2px] h-10 text-[#98A2B3]",
              activeKey === tab.key
                ? "bg-gradient-primary text-primary-light hover:bg-gradient-to-b hover:from-[#2A1D52] hover:to-[#C96FFF] focus-visible:ring-primary-dark"
                : ""
            )}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
