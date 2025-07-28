import { Dispatch, SetStateAction } from "react";
import { FormSelectWithIcon } from "./FormSelectWithIcon";
import { on } from "events";
type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode; // Can be an image, SVG, etc.
};
type Props = {
  label?: string;
  placeholder?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  options: Option[];
  selectId: string;
  type?: string;
  value?: string; // Optional, for input value
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional, for input change handling
  setValue?: Dispatch<SetStateAction<string>>; // Optional, for input value management
};
export const FormInputWithSelect = ({
  options,
  selectId,
  setSelected,
  selected,
  label,
  placeholder = "Select option",
  id,
  className = "",
  disabled = false,
  type = "text",
  value,
  onChange,
  setValue,
}: Props) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-primary-darkPurple mb-1"
        >
          {label}
        </label>
      )}
      <div
        className={`relative h-12  ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          className="w-full h-full border outline-none px-4 rounded-lg "
          id={id}
          placeholder={placeholder || "Select option"}
          disabled={disabled}
          value={value || ""}
          type={type}
          onChange={
            onChange || (setValue ? (e) => setValue(e.target.value) : undefined)
          }
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
          <FormSelectWithIcon
            options={options}
            selected={selected}
            id={selectId}
            setSelected={setSelected}
          />
        </div>
      </div>
    </div>
  );
};
