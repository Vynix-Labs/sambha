"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown } from "../../../../apps/web/public/svg";

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode; // Can be an image, SVG, etc.
};

type Props = {
  options: Option[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  id: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const FormSelectWithIcon = ({
  selected,
  setSelected,
  options,
  id,
  placeholder = "Select option",
  className = "",
  disabled = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selected);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative `}>
      <button
        type="button"
        id={id}
        className={`w-full flex items-center justify-between ${className}  rounded-lg text-gray-700 bg-white ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <div className="flex items-center gap-2">
          {selectedOption?.icon}
          <span>{selectedOption?.label || placeholder}</span>
        </div>
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown />
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute mt-1 w-full z-50 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={option.value === selected}
            >
              {option.icon}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
