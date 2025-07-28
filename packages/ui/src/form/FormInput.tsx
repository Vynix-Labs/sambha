import { Dispatch, SetStateAction } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
  register?: any; // Optional, for form handling with react-hook-form
  id?: string; // Optional, for form handling with react-hook-form
  setValue?: Dispatch<SetStateAction<string>>; // Optional, for controlled components
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Optional, for handling key events
};
export const FormInput = ({
  placeholder,
  id,
  label,
  className,
  disabled,
  onChange,
  register,
  setValue,
  value,
  onKeyPress,
}: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium text-primary-darkPurple "
        >
          {label}
        </label>
      )}
      <input
        placeholder={placeholder || "Enter text"}
        id={id}
        value={value}
        onKeyDown={onKeyPress}
        onChange={
          onChange || (setValue ? (e) => setValue(e.target.value) : undefined)
        }
        disabled={disabled}
        //   {...(register ? register(id) : {})}"
        className={`border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-main ${className}`}
        type="text"
      />
    </div>
  );
};
