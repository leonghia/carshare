"use client";

import React, { useEffect } from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { useField } from "./field";

export interface FieldStyles {
  upper?: string;
  container?: string;
  lower?: string;
}

const containerVariants = cva(undefined, {
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

const textVariants = cva("flex-none font-medium text-white", {
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
    VariantProps<typeof containerVariants> {}

const FieldContainer = React.forwardRef<HTMLDivElement, FieldContainerProps>(
  ({ className, children }, ref) => {
    const { size, error, isFocus } = useField();
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle<
      typeof containerRef.current,
      typeof containerRef.current
    >(ref, () => containerRef.current);

    useEffect(() => {
      if (containerRef.current && isFocus)
        containerRef.current.scrollIntoView({ behavior: "smooth" });
    }, [isFocus]);

    const state: Pick<
      VariantProps<typeof containerVariants>,
      "state"
    >["state"] = error ? "error" : "default";

    return (
      <div
        ref={containerRef}
        className={cn(
          containerVariants({ size, state }),
          "scroll-mt-4",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export { containerVariants, textVariants, FieldContainer };
