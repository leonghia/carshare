"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useField } from "./field";

const field__containerVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-4",
      small: "space-y-4",
    },
    state: {
      default: null,
      error: null,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const field__textVariants = cva("flex-none font-medium text-white", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

interface FieldContainerProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof field__containerVariants> {}

const FieldContainer = React.forwardRef<HTMLDivElement, FieldContainerProps>(
  ({ className, children }, ref) => {
    const { size, error } = useField();

    const state: Pick<
      VariantProps<typeof field__containerVariants>,
      "state"
    >["state"] = error ? "error" : "default";

    return (
      <div
        ref={ref}
        className={cn(field__containerVariants({ size, state }), className)}
      >
        {children}
      </div>
    );
  }
);

export { field__containerVariants, field__textVariants, FieldContainer };
