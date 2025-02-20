import * as React from "react";

import { cn } from "@/utils/styling";
import { cva } from "class-variance-authority";

const textareaVariants = cva(
  "flex min-h-[100px] w-full bg-background-900 px-4 py-3 font-normal text-white placeholder:text-foreground-600 focus-visible:outline-none focus-visible:ring-[6px] focus-visible:ring-primary-flat focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500 focus-visible:bg-[#383D4C] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "text-base rounded-2xl",
        small: "text-sm rounded-xl",
      },
    },
    defaultVariants: { size: "default" },
  }
);

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  size: "default" | "small" | null | undefined;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
