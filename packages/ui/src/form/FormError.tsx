import React from "react";
type FormErrorProps = { message?: string; className?: string };
function FormError({ message, className }: FormErrorProps) {
  return (
    <div className="border border-red-500 bg-red-50 p-2 rounded-md  transition-all duration-300 ease-in-out">
      <small className={` ${className} text-sm text-red-400`}>{message}</small>
    </div>
  );
}

export default FormError;
