import React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const rootVariants = cva("space-y-4", {
  variants: {
    size: {
      default: "",
      small: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const messageVariants = cva("font-medium text-danger-500", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const containerVariants = cva(
  "focus-within:outline focus-within:outline-8 focus-within:outline-primary-flat",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-8 outline-danger-flat",
      },
      size: {
        default: "rounded-3xl w-96",
        small: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const wrapperVariants = cva(
  "w-full h-fit bg-background-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:flex-none [&_svg]:text-foreground-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500 focus-within:bg-background-800",
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
      isTouched: {
        false: null,
        true: null,
      },
    },
    defaultVariants: {
      state: "default",
      size: "default",
      isTouched: false,
    },
  }
);

const labelVariants = cva(
  "w-full block font-normal group-focus-within:text-primary-500",
  {
    variants: {
      size: {
        default: "text-sm",
        small: "text-xs",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const inputVariants = cva(
  "flex-1 bg-transparent font-medium text-white placeholder:font-normal placeholder:text-foreground-600 focus-visible:placeholder:text-foreground-500 focus-visible:outline-none",
  {
    variants: {
      size: {
        default: "text-base",
        small: "text-sm",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const leftTextVariants = cva("flex-none font-medium text-white", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof wrapperVariants> {
  label: string;
  iconBefore?: React.ReactElement;
  iconAfter?: React.ReactElement;
  leftText?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type,
      id,
      state,
      size,
      iconBefore,
      iconAfter,
      leftText,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [currentValue, setCurrentValue] = React.useState(props.value);

    return (
      <div className={cn(rootVariants({ size }))}>
        <div className={cn(containerVariants({ size, state }))}>
          <div className={cn(wrapperVariants({ size, state }))}>
            <div className="w-full h-fit flex gap-4 items-center">
              {iconBefore}
              <div className="group flex-1 h-fit space-y-1">
                <label
                  htmlFor={id}
                  className={cn(
                    labelVariants({ size }),
                    currentValue ? "text-foreground-500" : "text-foreground-200"
                  )}
                >
                  {props.label}{" "}
                  {props.required && <span className="text-danger-500">*</span>}
                </label>
                <div className="w-full flex items-center gap-2">
                  {leftText && (
                    <span className={cn(leftTextVariants({ size }))}>
                      {leftText}
                    </span>
                  )}
                  <input
                    type={type}
                    id={id}
                    value={props.value}
                    placeholder={props.placeholder}
                    className={cn(inputVariants({ size }))}
                    onChange={(e) => setCurrentValue(e.target.value)}
                  />
                </div>
              </div>
              {iconAfter}
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className={cn(messageVariants({ size }))}>{errorMessage}</div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
