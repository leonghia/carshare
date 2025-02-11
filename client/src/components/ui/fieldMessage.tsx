import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "@/utils/styling";
import { motion } from "motion/react";
import { useField } from "./field";

const fieldMessageVariants = cva("font-normal", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
    state: {
      default: "text-foreground-500",
      error: "text-danger-500",
      success: "text-success-500",
    },
  },
  defaultVariants: {
    size: "default",
    state: "default",
  },
});

interface FieldMessageProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof fieldMessageVariants> {}

const FieldMessage = React.forwardRef<HTMLParagraphElement, FieldMessageProps>(
  ({ className, size, state, ...props }, ref) => {
    const { fieldMessageId } = useField();

    return (
      <p
        ref={ref}
        id={fieldMessageId}
        className={cn(fieldMessageVariants({ size, state }), className)}
        {...props}
      />
    );
  }
);
FieldMessage.displayName = "FieldMessage";

const MotionFieldMessage = motion.create(FieldMessage);
MotionFieldMessage.displayName = "MotionFieldMessage";

export { FieldMessage, MotionFieldMessage };
