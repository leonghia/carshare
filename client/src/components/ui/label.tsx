"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "w-full block font-normal group-focus-within:text-primary-500",
  {
    variants: {
      size: {
        default: "text-sm",
        small: "text-xs",
      },
      state: {
        default: "text-foreground-200",
        dirty: "text-foreground-500",
        error: "text-danger-500",
      },
    },
    defaultVariants: { size: "default", state: "default" },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size, state, children, required = false, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, state }), className)}
    {...props}
  >
    {children} {required && <span className="text-danger-500">*</span>}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
