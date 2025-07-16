import React from "react";
import { cn } from "../../../apps/web/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-white-base disabled:text-gray-base rounded-full py-3.5 px-5 whitespace-nowrap";

  const variants = {
    primary:
      "bg-gradient-primary text-primary-light hover:bg-gradient-to-b hover:from-[#2A1D52] hover:to-[#C96FFF] focus-visible:ring-primary-dark",
    secondary:
      "bg-[#F3F4F6] text-[#374151] hover:bg-[#E5E7EB] focus-visible:ring-[#F3F4F6]",
    outline:
      "border border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB] focus-visible:ring-[#E5E7EB]",
    ghost: "text-[#374151] hover:bg-[#F9FAFB] focus-visible:ring-transparent",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-[3.125rem] text-base",
    lg: "h-[3.75rem] text-lg",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
