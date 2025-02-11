import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Label } from "./label";
import { cn } from "@/utils/utils";
import { useField } from "./field";

const fieldLabelVariants = cva(
  "inline-block font-normal group-focus-within:text-primary-500",
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
    VariantProps<typeof fieldLabelVariants> {
  mode?: "combined" | "single";
  isDirtyCustom?: boolean;
}

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FieldLabelProps
>(({ className, isDirtyCustom, mode = "single", ...props }, ref) => {
  const { fieldInputId, label, size, required, error, isDirty } = useField();

  const dirty = mode === "single" ? isDirty : isDirtyCustom;

  return (
    <Label
      ref={ref}
      className={cn(
        fieldLabelVariants({
          size,
          state: error ? "error" : dirty ? "dirty" : "default",
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
