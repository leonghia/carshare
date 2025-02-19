import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/utils/styling";
import { cva } from "class-variance-authority";
import { useField } from "./field";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root className={cn(className)} {...props} ref={ref} />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const labelVariants = cva("font-normal text-white cursor-pointer", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

const descriptionVariants = cva("font-normal text-foreground-500", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
  },
  defaultVariants: { size: "default" },
});

const rightVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-1",
      small: "space-y-[2px]",
    },
  },
  defaultVariants: { size: "default" },
});

const containerVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-4",
      small: "gap-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const itemVariants = cva(
  "aspect-square rounded-full bg-background-800 data-[state=checked]:bg-transparent data-[state=checked]:border-[2px] data-[state=checked]:border-primary-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "size-5",
        small: "size-4",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const circleVariants = cva("fill-primary-500 text-primary-500", {
  variants: {
    size: {
      default: "size-[10px]",
      small: "size-2",
    },
  },
  defaultVariants: { size: "default" },
});

interface RadioGroupUnitProps {
  label: string;
  description?: string;
  value: string;
  classNames?: {
    label?: string;
    description?: string;
  };
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { size } = useField();

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(itemVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(circleVariants({ size }))} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const RadioGroupUnit = React.forwardRef<HTMLDivElement, RadioGroupUnitProps>(
  ({ value, label, description, classNames, ...props }, ref) => {
    const { size } = useField();

    return (
      <div ref={ref} className={cn(containerVariants({ size }))} {...props}>
        <RadioGroupItem value={value} id={value} />
        <div className={cn(rightVariants({ size }))}>
          <label
            htmlFor={value}
            className={cn(labelVariants({ size }), classNames?.label)}
          >
            {label}
          </label>
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

export { RadioGroup, RadioGroupItem, RadioGroupUnit };
