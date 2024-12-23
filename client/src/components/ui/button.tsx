import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 transition-all duration-300 ease-out",
  {
    variants: {
      intent: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-xl",
        secondary:
          "bg-primary-flat text-primary-500 hover:bg-[rgba(29,144,245,0.25)] hover:text-primary-300",
        danger:
          "bg-danger-flat text-danger-500 hover:bg-[rgba(239,68,68,0.25)] hover:text-danger-400",
      },
      size: {
        default: "text-base",
        small: "text-sm",
        extraSmall: "text-xs",
      },
      iconOnly: {
        false: null,
        true: "rounded-full",
      },
    },
    compoundVariants: [
      {
        iconOnly: false,
        size: "default",
        className: "px-8 py-4 rounded-6xl [&_svg]:size-6",
      },
      {
        iconOnly: false,
        size: "small",
        className: "px-8 py-4 rounded-5xl [&_svg]:size-5",
      },
      {
        iconOnly: false,
        size: "extraSmall",
        className: "px-6 py-3 rounded-4xl [&_svg]:size-5",
      },
      {
        iconOnly: true,
        size: "default",
        className: "size-12 [&_svg]:size-6",
      },
      {
        iconOnly: true,
        size: "small",
        className: "size-10 [&_svg]:size-5",
      },
      {
        iconOnly: true,
        size: "extraSmall",
        className: "size-8 [&_svg]:size-4",
      },
    ],
    defaultVariants: {
      size: "default",
      intent: "primary",
      iconOnly: false,
    },
  }
);

interface Props
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, intent, size, iconOnly, asChild = false, ...props }, ref) => {
    return (
      <motion.button
        whileTap={{
          y: 8,
        }}
        className={cn(buttonVariants({ intent, size, iconOnly, className }))}
        ref={ref}
        {...props}
      >
        {props.children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
