import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        className={`
          flex h-10 w-full rounded-md border border-gray-300 
          bg-white px-3 py-2 text-sm 
          placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-[#a7c957] focus:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input"; 