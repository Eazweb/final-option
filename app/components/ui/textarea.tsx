import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        className={`
          flex min-h-[120px] w-full rounded-md border border-gray-300 
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

Textarea.displayName = "Textarea"; 