import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";
import { LoaderCircle } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 transition-all duration-300 ease-out",
  {
    variants: {
      intent: {
        primary: null,
        secondary: null,
        danger: null,
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
      asLink: {
        false: null,
        true: null,
      },
    },
    compoundVariants: [
      {
        asLink: false,
        intent: "primary",
        className:
          "bg-primary-500 text-white hover:bg-primary-600 hover:shadow-xl",
      },
      {
        asLink: false,
        intent: "secondary",
        className:
          "bg-primary-flat text-primary-500 hover:bg-[rgba(29,144,245,0.25)] hover:text-primary-300",
      },
      {
        asLink: false,
        intent: "danger",
        className:
          "bg-danger-flat text-danger-500 hover:bg-[rgba(239,68,68,0.25)] hover:text-danger-400",
      },
      {
        asLink: true,
        intent: "primary",
        className: "text-primary-500 hover:text-primary-400",
      },
      {
        asLink: true,
        intent: "secondary",
        className: "text-foreground-500 hover:text-foreground-400",
      },
      {
        iconOnly: false,
        asLink: false,
        size: "default",
        className:
          "px-8 py-4 rounded-6xl [&_svg]:size-6 [&_.icon-loading]:size-7",
      },
      {
        iconOnly: false,
        size: "small",
        asLink: false,
        className:
          "px-8 py-4 rounded-5xl [&_svg]:size-5 [&_.icon-loading]:size-6",
      },
      {
        iconOnly: false,
        size: "extraSmall",
        asLink: false,
        className:
          "px-6 py-3 rounded-4xl [&_svg]:size-5 [&_.icon-loading]:size-5",
      },
      {
        iconOnly: true,
        size: "default",
        asLink: false,
        className: "size-12 [&_svg]:size-6",
      },
      {
        iconOnly: true,
        size: "small",
        asLink: false,
        className: "size-10 [&_svg]:size-5",
      },
      {
        iconOnly: true,
        size: "extraSmall",
        asLink: false,
        className: "size-8 [&_svg]:size-4",
      },
    ],
    defaultVariants: {
      size: "default",
      intent: "primary",
      iconOnly: false,
      asLink: false,
    },
  }
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  hasLoader?: boolean;
}

const UnmotionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      iconOnly,
      asChild = false,
      isLoading = false,
      children,
      hasLoader = false,
      asLink,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        // ref={ref}
        className={cn(
          buttonVariants({ intent, size, iconOnly, asLink }),
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {hasLoader ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={isLoading ? "loading" : "idle"}
              initial={{
                opacity: 0,
                y: "-1.5rem",
              }}
              animate={{
                opacity: 1,
                y: "0rem",
              }}
              exit={{
                opacity: 0,
                y: "1.5rem",
              }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.3,
              }}
            >
              {isLoading ? (
                <LoaderCircle className="text-white animate-spin icon-loading" />
              ) : (
                children
              )}
            </motion.span>
          </AnimatePresence>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

const MotionButton = motion.create(UnmotionButton);

// This is deprecated
// Button.defaultProps = {
//   whileTap: { y: 8 },
// };

// Instead, use object destructuring like this:
// const Button = ({
//   whileTap = { y: 8 },
//   ...props
// }: ButtonProps & HTMLMotionProps<"button">) => (
//   <MotionButton whileTap={whileTap} {...props} />
// );

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & HTMLMotionProps<"button">
>(({ whileTap = { y: "0.5rem" }, ...props }, ref) => {
  return <MotionButton ref={ref} whileTap={whileTap} {...props} />;
});

Button.displayName = "Button";

export { Button };
