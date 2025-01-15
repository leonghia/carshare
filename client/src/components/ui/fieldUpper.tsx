import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { useField } from "./field";
import { containerVariants } from "./fieldContainer";

const variants = cva(
  "group peer w-full rounded-3xl bg-background-900 disabled:cursor-not-allowed disabled:opacity-50 focus-within:outline-none focus-within:ring-[6px] focus-within:ring-primary-flat focus-within:ring-offset-2 focus-within:ring-offset-primary-500 focus-within:bg-[#383D4C]",
  {
    variants: {
      state: {
        default: null,
        error:
          "ring-[6px] ring-danger-flat ring-offset-2 ring-offset-danger-500",
      },
      size: {
        default: "px-6 py-3",
        small: "px-4 py-3",
      },
    },
    defaultVariants: {
      size: "default",
      state: "default",
    },
  }
);

const FieldUpper = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  const { size, error } = useField();

  const state: Pick<VariantProps<typeof containerVariants>, "state">["state"] =
    error ? "error" : "default";

  return (
    <div
      ref={ref}
      className={cn(variants({ size, state }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

export { FieldUpper };
