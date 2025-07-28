import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  Control,
  RegisterOptions,
} from "react-form-hook";

export interface FormInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  className?: string;
  touched?: boolean;
  validationRules?: RegisterOptions<T, Path<T>>;
  labelClass?: string;
  readOnly?: boolean;
}

export interface FormSelectProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
  error?: FieldError;
  required?: boolean;
  className?: string;
  touched?: boolean;
  validationRules?: RegisterOptions<T, Path<T>>;
  labelClass?: string;
}
