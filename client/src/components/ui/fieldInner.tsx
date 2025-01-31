import { cn } from "@/lib/utils";
import React from "react";
import { useField } from "./field";
import { cva } from "class-variance-authority";

const innerVariants = cva(
  "gap-4 w-full flex items-center [&_svg]:text-foreground-300",
  {
    variants: {
      size: {
        default: "[&_svg]:size-6",
        small: "[&_svg]:size-5",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const FieldInner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  const { size } = useField();

  return (
    <div
      ref={ref}
      className={cn(innerVariants({ size }), className)}
      {...props}
    />
  );
});

export { FieldInner, innerVariants };
