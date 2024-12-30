import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { useFormField } from "./form";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const messageVariants = cva("font-normal", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
    state: {
      error: "text-danger-500",
    },
  },
  defaultVariants: {
    size: "default",
    state: "error",
  },
});

const FieldMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof messageVariants>
>(({ className, size, ...props }, ref) => {
  const { formMessageId } = useFormField();

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        messageVariants({
          size,
        }),
        className
      )}
      {...props}
    />
  );
});
FieldMessage.displayName = "FieldMessage";

const MotionFieldMessage = motion.create(FieldMessage);
MotionFieldMessage.displayName = "MotionFieldMessage";

export { FieldMessage, MotionFieldMessage };
