"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import { MotionFieldDescription } from "./fieldDescription";
import { MotionFieldMessage } from "./fieldMessage";
import { useFieldRoot } from "./fieldRoot";

const fieldVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-4",
      small: "space-y-3",
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

const field__textVariants = cva("flex-none font-medium text-white", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

const field__upperVariants = cva(
  "group peer focus-within:outline focus-within:outline-8 focus-within:outline-primary-flat",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-8 outline-danger-flat",
      },
      size: {
        default: "rounded-3xl",
        small: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const field__upper__innerVariants = cva(
  "w-full h-fit bg-background-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:flex-none [&_svg]:text-foreground-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500 focus-within:bg-[#383D4C]",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-2 outline-danger-500",
      },
      size: {
        default: "px-6 py-3 rounded-3xl [&_svg]:size-6",
        small: "px-4 py-2 rounded-2xl [&_svg]:size-5",
      },
    },
    defaultVariants: {
      state: "default",
      size: "default",
    },
  }
);

const field__lowerVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-2",
      small: "space-y-1",
    },
  },
  defaultVariants: { size: "default" },
});

interface FieldProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof fieldVariants> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, children, ...props }, ref) => {
    const { size, error, description, isFocus } = useFieldRoot();

    const state: Pick<VariantProps<typeof fieldVariants>, "state">["state"] =
      error ? "error" : "default";

    return (
      <div
        ref={ref}
        className={cn(fieldVariants({ size, state }), className)}
        {...props}
      >
        <div className={cn(field__upperVariants({ size, state }))}>
          <div
            className={cn(
              field__upper__innerVariants({
                size,
                state,
              })
            )}
          >
            {children}
          </div>
        </div>
        <AnimatePresence>
          {(error || (description && isFocus)) && (
            <div className={cn(field__lowerVariants({ size }))}>
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
      </div>
    );
  }
);

export { fieldVariants, field__textVariants, Field };
