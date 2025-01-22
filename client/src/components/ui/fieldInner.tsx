import { cn } from "@/lib/utils";
import React from "react";
import { useField } from "./field";
import { cva } from "class-variance-authority";

const innerVariants = cva(
  "w-full flex items-center [&_svg]:text-foreground-300",
  {
    variants: {
      size: {
        default: "gap-6 [&_svg]:size-6",
        small: "gap-4 [&_svg]:size-5",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const FieldInner = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { size } = useField();

  return <div ref={ref} className={cn(innerVariants, size)} {...props} />;
});

export { FieldInner, innerVariants };
