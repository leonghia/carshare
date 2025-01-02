import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { useField } from "./field";
import { field__containerVariants } from "./fieldContainer";

const field__upperVariants = cva(
  "group peer focus-within:outline focus-within:outline-8 focus-within:outline-primary-flat",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-8 outline-danger-flat",
      },
      size: {
        default: "rounded-3xl",
        small: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const field__upper__innerVariants = cva(
  "w-full h-fit bg-background-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:flex-none [&_svg]:text-foreground-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500 focus-within:bg-[#383D4C]",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-2 outline-danger-500",
      },
      size: {
        default: "px-6 py-3 rounded-3xl [&_svg]:size-6",
        small: "px-4 py-2 rounded-2xl [&_svg]:size-5",
      },
    },
    defaultVariants: {
      state: "default",
      size: "default",
    },
  }
);

const FieldUpper = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ children }, ref) => {
  const { size, error } = useField();

  const state: Pick<
    VariantProps<typeof field__containerVariants>,
    "state"
  >["state"] = error ? "error" : "default";

  return (
    <div ref={ref} className={cn(field__upperVariants({ size, state }))}>
      <div
        className={cn(
          field__upper__innerVariants({
            size,
            state,
          })
        )}
      >
        {children}
      </div>
    </div>
  );
});

export { FieldUpper };
