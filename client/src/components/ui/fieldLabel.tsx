import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { useFieldRoot } from "./fieldRoot";

const fieldLabelVariants = cva(
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

interface FieldLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof fieldLabelVariants> {}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FieldLabelProps
>(({ className, ...props }, ref) => {
  const { fieldInputId, label, size, required, error, isDirty } =
    useFieldRoot();

  return (
    <Label
      ref={ref}
      className={cn(
        fieldLabelVariants({
          size,
          state: error ? "error" : isDirty ? "dirty" : "default",
        }),
        className
      )}
      htmlFor={fieldInputId}
      {...props}
    >
      {label}
      {required && <span className="text-danger-500"> *</span>}
    </Label>
  );
});
FieldLabel.displayName = "FieldLabel";

export { FieldLabel };
