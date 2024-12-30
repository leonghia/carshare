"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useFormField } from "./form";

const labelVariants = cva(
  "block font-normal group-focus-within:text-primary-500",
  {
    variants: {
      size: {
        default: "text-sm",
        small: "text-xs",
      },
      state: {
        default: "text-white",
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

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => {
  const { error, formItemId, isDirty } = useFormField();

  return (
    <Label
      ref={ref}
      className={className}
      htmlFor={formItemId}
      state={error ? "error" : isDirty ? "dirty" : "default"}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

const DatepickerFieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ state, ...props }, ref) => {
  return <Label ref={ref} state={state} {...props} />;
});

DatepickerFieldLabel.displayName = "DatepickerFieldLabel";

export { Label, FieldLabel, DatepickerFieldLabel };
