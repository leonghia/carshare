import { cn } from "@/utils/styling";
import React from "react";

interface PageTitleProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  classNames?: {
    root?: string;
    text?: string;
    dot?: string;
  };
}

const PageTitle = React.forwardRef<HTMLDivElement, PageTitleProps>(
  ({ classNames, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex gap-2 sm:gap-1", classNames?.root)}
      {...props}
    >
      <h1
        className={cn(
          "text-4xl sm:text-lg font-bold sm:font-semibold text-white shrink-0",
          classNames?.text
        )}
      >
        {children}
      </h1>
      <span
        className={cn(
          "inline-block translate-y-6 sm:translate-y-[15px] size-[0.625rem] sm:size-[0.375rem] bg-primary-500 rounded-full",
          classNames?.dot
        )}
      />
    </div>
  )
);

export { PageTitle };
