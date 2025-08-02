import React from "react";
import { Grid3X3, Type, Users } from "lucide-react";
import TableItemsTab from "./TableItemsTab";
import TextTab from "./TextTab";
import GuestsTab from "./GuestsTab";

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface LeftPanelProps {
  activeTab: "items" | "text" | "guests";
  setActiveTab: (tab: "items" | "text" | "guests") => void;
  addTable: (type: "round" | "rectangle" | "long" | "square") => void;
  addTextBox: () => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  FONT_OPTIONS: string[];
}

const TabButton: React.FC<TabButtonProps> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 pb-3 border-b-2 ${
      active
        ? "border-gray-900 text-gray-900"
        : "border-transparent text-gray-500"
    }`}
    aria-label={`${label} tab`}
    aria-current={active ? "page" : undefined}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const LeftPanel: React.FC<LeftPanelProps> = ({
  activeTab,
  setActiveTab,
  addTable,
  addTextBox,
  selectedFont,
  setSelectedFont,
  FONT_OPTIONS,
}) => {
  return (
    <div className="w-[30%] bg-white border-r p-6">
      {/* Breadcrumbs would go here */}

      {/* Tabs Navigation */}
      <div className="flex gap-6 mb-6" role="tablist">
        <TabButton
          icon={<Grid3X3 size={20} />}
          label="Items"
          active={activeTab === "items"}
          onClick={() => setActiveTab("items")}
        />
        <TabButton
          icon={<Type size={20} />}
          label="Text"
          active={activeTab === "text"}
          onClick={() => setActiveTab("text")}
        />
        <TabButton
          icon={<Users size={20} />}
          label="Guests"
          active={activeTab === "guests"}
          onClick={() => setActiveTab("guests")}
        />
      </div>

      {/* Tab Content */}
      <div role="tabpanel">
        {activeTab === "items" && <TableItemsTab addTable={addTable} />}
        {activeTab === "text" && (
          <TextTab
            addTextBox={addTextBox}
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            FONT_OPTIONS={FONT_OPTIONS}
          />
        )}
        {activeTab === "guests" && <GuestsTab />}
      </div>
    </div>
  );
};

export default LeftPanel;
