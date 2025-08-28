import { Check } from "lucide-react";
import { FC } from "react";
import clsx from "clsx";

type FormCheckBoxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
};

export const FormCheckBox: FC<FormCheckBoxProps> = ({
  id,
  name,
  checked,
  onChange,
  className,
  label,
  disabled = false,
}) => {
  return (
    <label
      htmlFor={id}
      className={clsx(
        "inline-flex items-center space-x-2 cursor-pointer",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span className="relative size-6 rounded-md  inline-block">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            "appearance-none absolute inset-0 border border-gray-300 rounded-md",
            "checked:bg-primary-dark checked:border-primary-dark",
            "focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2",
            "transition duration-200 cursor-pointer peer"
          )}
        />
        <Check
          className={clsx(
            "absolute z-10 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2",
            "text-transparent peer-checked:text-[#ffffff] transition duration-200"
          )}
          size={18}
        />
      </span>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};
