import React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { MotionCheck } from "./motionCheck";

const checkboxVariants = cva(
  "group relative flex-none bg-background-900 focus-visible:outline focus-visible:outline-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-500 data-[state=checked]:text-white transition-[background-color] duration-200 ease-out",
  {
    variants: {
      size: {
        default: "size-6 rounded-[0.625rem] [&_svg]:size-4",
        small: "size-5 rounded-lg [&_svg]:size-3",
        extraSmall: "size-4 rounded-md [&_svg]:size-[0.625rem]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const labelVariants = cva(
  "block flex-1 pl-2 font-normal text-foreground-400 cursor-pointer",
  {
    variants: {
      size: {
        default: "text-base",
        small: "text-sm",
        extraSmall: "text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface Props
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Props
>(({ className, size, label, id = "field", ...props }, ref) => {
  const [checked, setChecked] =
    React.useState<CheckboxPrimitive.CheckedState>(false);

  return (
    <div className="flex w-64">
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={setChecked}
        id={id}
        ref={ref}
        className={cn(checkboxVariants({ size }), className)}
        {...props}
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
              scale: [1.25, 1.25],
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
      {label && (
        <label htmlFor={id} className={cn(labelVariants({ size }))}>
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
