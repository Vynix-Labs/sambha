declare module "react-form-hook" {
  import {
    FieldError,
    FieldValues,
    Path,
    UseFormRegister,
    Control,
    RegisterOptions,
  } from "react-hook-form";

  export type {
    FieldError,
    FieldValues,
    Path,
    UseFormRegister,
    Control,
    RegisterOptions,
  };

  // You can also declare any functions/components the package provides
  const useFormHook: any; // or better type if you know it
  export default useFormHook;
}
