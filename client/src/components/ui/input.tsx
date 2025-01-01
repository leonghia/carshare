import React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "bg-transparent font-medium text-white placeholder:font-normal placeholder:text-foreground-600 focus-visible:placeholder:text-foreground-500 focus-visible:outline-none",
  {
    variants: {
      size: {
        default: "text-base",
        small: "text-sm",
      },
    },
    defaultVariants: { size: "default" },
  }
);

interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
