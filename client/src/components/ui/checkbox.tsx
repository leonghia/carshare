import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { MotionCheck } from "./motionCheck";

const containerVariants = cva("flex", {
  variants: {
    size: {
      default: "gap-3",
      small: "gap-2",
    },
  },
  defaultVariants: { size: "default" },
});

const rightVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-1",
      small: "space-y-[0.125rem]",
    },
  },
  defaultVariants: { size: "default" },
});

const checkboxVariants = cva(
  "group relative flex-none bg-background-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-flat focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-500 data-[state=checked]:text-white transition-[background-color] duration-200 ease-out",
  {
    variants: {
      size: {
        default: "size-6 rounded-[0.625rem] [&_svg]:size-4",
        small: "size-5 rounded-lg [&_svg]:size-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const labelVariants = cva("block font-medium text-white cursor-pointer", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const descriptionVariants = cva("font-normal text-foreground-600", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
  },
  defaultVariants: { size: "default" },
});

export interface CheckboxStyles {
  container?: string;
  label?: string;
  description?: string;
}

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  classNames?: CheckboxStyles;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { className, size, label, description, id = "field", classNames, ...props },
    ref
  ) => {
    const [checked, setChecked] =
      React.useState<CheckboxPrimitive.CheckedState>(false);

    return (
      <div
        className={cn(
          containerVariants({ size }),
          className,
          classNames?.container
        )}
      >
        <CheckboxPrimitive.Root
          checked={checked}
          id={id}
          ref={ref}
          className={cn(checkboxVariants({ size }))}
          {...props}
          onCheckedChange={(checked: boolean) => {
            setChecked(checked);
            props.onCheckedChange && props.onCheckedChange(checked);
          }}
        >
          <CheckboxPrimitive.Indicator
            className={cn(
              "flex items-center justify-center text-current relative z-10"
            )}
          >
            <MotionCheck />
          </CheckboxPrimitive.Indicator>
          <motion.div
            animate={checked ? "checked" : "unchecked"}
            variants={{
              checked: {
                scale: [1.5, 1.5],
                opacity: [1, 0],
              },
              unchecked: {
                scale: 1,
                opacity: 0,
              },
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute inset-0 size-[inherit] rounded-[inherit] bg-primary-flat z-0"
          ></motion.div>
        </CheckboxPrimitive.Root>
        <div className={cn(rightVariants({ size }))}>
          {label && (
            <label
              htmlFor={id}
              className={cn(labelVariants({ size }), classNames?.label)}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn(
                descriptionVariants({ size }),
                classNames?.description
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
