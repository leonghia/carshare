import { AnimatePresence } from "motion/react";
import React from "react";
import { useField } from "./field";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { MotionFieldMessage } from "./fieldMessage";
import { MotionFieldDescription } from "./fieldDescription";

const field__lowerVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-2",
      small: "space-y-1",
    },
  },
  defaultVariants: { size: "default" },
});

const FieldLower = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { error, description, isFocus, size } = useField();

  return (
    <AnimatePresence>
      {(error || (description && isFocus)) && (
        <div
          ref={ref}
          className={cn(field__lowerVariants({ size }))}
          {...props}
        >
          {error && (
            <MotionFieldMessage
              key="message"
              size={size}
              state="error"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              {String(error.message)}
            </MotionFieldMessage>
          )}

          {description && isFocus && (
            <MotionFieldDescription
              key="description"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: "easeOut",
              }}
              size={size}
            >
              {description}
            </MotionFieldDescription>
          )}
        </div>
      )}
    </AnimatePresence>
  );
});

export { FieldLower };
