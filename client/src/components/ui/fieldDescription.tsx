import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { useField } from "./field";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const fieldDescriptionVariants = cva("font-normal text-foreground-600", {
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

interface FieldDescriptionProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof fieldDescriptionVariants> {}

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ className, size, ...props }, ref) => {
  const { fieldDescriptionId } = useField();

  return (
    <p
      ref={ref}
      id={fieldDescriptionId}
      className={cn(fieldDescriptionVariants({ size }), className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

const MotionFieldDescription = motion.create(FieldDescription);
MotionFieldDescription.displayName = "MotionFieldDescription";

export { FieldDescription, MotionFieldDescription };
