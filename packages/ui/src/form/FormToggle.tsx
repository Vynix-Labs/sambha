import React from "react";

type FormCheckBoxProps = {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  className?: string;
};

export const FormToggle: React.FC<FormCheckBoxProps> = ({
  checked,
  onChange,
  name,
  id,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="relative w-9 h-5 cursor-pointer block">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="appearance-none peer absolute w-full h-full z-10 cursor-pointer"
        />

        {/* background track */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gray-650 transition-colors peer-checked:bg-primary-dark" />

        {/* toggle knob */}
        <span className="absolute left-0 top-0 h-5 w-5 rounded-full bg-primary-light transition-transform peer-checked:translate-x-4 ease-in-out duration-200" />
      </label>
    </div>
  );
};
