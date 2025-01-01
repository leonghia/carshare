"use client";

import React from "react";

import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AnimatePresence } from "motion/react";
import { MotionFieldDescription } from "./fieldDescription";
import { MotionFieldMessage } from "./fieldMessage";

const fieldVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-4",
      small: "space-y-3",
    },
    state: {
      default: null,
      error: null,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const field__textVariants = cva("flex-none font-medium text-white", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

const field__upperVariants = cva(
  "group peer focus-within:outline focus-within:outline-8 focus-within:outline-primary-flat",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-8 outline-danger-flat",
      },
      size: {
        default: "rounded-3xl",
        small: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const field__upper__innerVariants = cva(
  "w-full h-fit bg-background-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:flex-none [&_svg]:text-foreground-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500 focus-within:bg-[#383D4C]",
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
    },
    defaultVariants: {
      state: "default",
      size: "default",
    },
  }
);

const field__lowerVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-2",
      small: "space-y-1",
    },
  },
  defaultVariants: { size: "default" },
});

interface FieldContextType
  extends Pick<VariantProps<typeof fieldVariants>, "size"> {
  onFocus: () => void;
  onBlur: () => void;
  fieldInputId: string;
  fieldDescriptionId: string;
  fieldMessageId: string;
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
}

const FieldContext = React.createContext<FieldContextType | null>(null);

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div">,
    Pick<VariantProps<typeof fieldVariants>, "size"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
}

const Field = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  required,
  size,
  children,
  description,
  className,
  ref,
  ...props
}: FieldProps<TFieldValues, TName>) => {
  const { error } = useFormContext().getFieldState(name);
  const [isFocus, setIsFocus] = React.useState(false);
  const id = React.useId();
  const fieldInputId = `${id}-field-input`;
  const fieldDescriptionId = `${id}-field-description`;
  const fieldMessageId = `${id}-field-message`;

  const state: Pick<VariantProps<typeof fieldVariants>, "state">["state"] =
    error ? "error" : "default";

  return (
    <FieldContext.Provider
      value={{
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        fieldInputId,
        fieldDescriptionId,
        fieldMessageId,
        control,
        name,
        label,
        required,
        size,
      }}
    >
      <div
        ref={ref}
        className={cn(fieldVariants({ size, state }), className)}
        {...props}
      >
        <div className={cn(field__upperVariants({ size, state }))}>
          <div
            className={cn(
              field__upper__innerVariants({
                size,
                state,
              })
            )}
          >
            {children}
          </div>
        </div>
        {(error || (description && isFocus)) && (
          <div className={cn(field__lowerVariants({ size }))}>
            <AnimatePresence>
              {error && (
                <MotionFieldMessage
                  key="message"
                  size={size}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {String(error.message)}
                </MotionFieldMessage>
              )}

              {description && isFocus && (
                <MotionFieldDescription
                  key="description"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{
                    type: "tween",
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  size={size}
                >
                  {description}
                </MotionFieldDescription>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </FieldContext.Provider>
  );
};

const useField = () => {
  const fieldContext = React.useContext(FieldContext);

  if (!fieldContext) {
    throw new Error("useField has to be used within <FieldContext.Provider>");
  }

  return fieldContext;
};

export {
  fieldVariants,
  field__textVariants,
  useField,
  Field,
  FieldContext,
  type FieldContextType,
};
