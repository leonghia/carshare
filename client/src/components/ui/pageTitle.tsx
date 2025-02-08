import React from "react";

interface PageTitleProps extends React.ComponentPropsWithoutRef<"div"> {
  title: string;
}

const PageTitle = React.forwardRef<HTMLDivElement, PageTitleProps>(
  ({ title, ...props }, ref) => (
    <div ref={ref} className="flex gap-2 sm:gap-1" {...props}>
      <h1 className="text-4xl sm:text-lg font-bold sm:font-semibold text-white shrink-0">
        {title}
      </h1>
      <span className="inline-block translate-y-6 sm:translate-y-[15px] size-[0.625rem] sm:size-[0.375rem] bg-primary-500 rounded-full"></span>
    </div>
  )
);

export { PageTitle };
