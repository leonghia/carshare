import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { useFormField } from "./form";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const descriptionVariants = cva("font-normal text-foreground-600", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p"> & VariantProps<typeof descriptionVariants>
>(({ className, size, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(descriptionVariants({ size }), className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

const MotionFieldDescription = motion.create(FieldDescription);
MotionFieldDescription.displayName = "MotionFieldDescription";

export { FieldDescription, MotionFieldDescription };
