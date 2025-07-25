"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown } from "../../../../apps/web/public/svg";
type Props = {
  options: { value: string; label: string }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  id: string;
  register?: any; // Optional, if using with react-hook-form
  className?: string; // Optional, for custom styling
  placeholder?: string; // Optional, for placeholder text
  disabled?: boolean; // Optional, to disable the select
};
export const Select = ({
  selected,
  setSelected,
  options,
  id,
  placeholder = "placeholder",
  className,
  disabled,
  register,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={selected || "Select Event Type"}
        onClick={toggleDropdown}
        className="outline-none border border-gray-300 rounded-lg text-gray-600 px-4 py-3 w-full cursor-pointer user-select-none"
        // {...register(id)}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={`Select ${placeholder}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        id={id}
      />
      <div
        className={`${isOpen ? "rotate-180 transform transition ease-in-out duration-200" : "rotate-60 transform transition ease-in-out duration-200"} absolute right-3 top-1/2 transform -translate-y-1/2`}
      >
        <ChevronDown />
      </div>

      {isOpen && (
        <ul className="absolute bg-primary-light border border-gray-300 rounded shadow-lg mt-1 w-full z-[99999]">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-600"
              aria-label={`Select ${option.label}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
