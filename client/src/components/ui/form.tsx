"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Label, LabelProps } from "@/components/ui/label";
import { Input } from "./input";

const Form = FormProvider;

const pwInnerVariants = cva("w-full h-fit flex items-center", {
  variants: {
    size: {
      default: "gap-6",
      small: "gap-4",
    },
  },
  defaultVariants: { size: "default" },
});

const pwThermometerVariants = cva(
  "h-1 rounded bg-background-600 overflow-hidden",
  {
    variants: {
      size: {
        default: "w-[5.625rem]",
        small: "w-[4.5rem]",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const pwIndicatorVariants = cva("h-full", {
  variants: {
    strength: {
      default: "w-0 bg-background-600",
      weak: "w-1/3 bg-danger-500",
      average: "w-2/3 bg-warning-500",
      strong: "w-full bg-success-500",
    },
  },
  defaultVariants: {
    strength: "default",
  },
});

const pwStrengthTextVariants = cva("font-normal", {
  variants: {
    size: {
      default: "text-xs",
      small: "text-xxs",
    },
    strength: {
      default: "text-foreground-500",
      weak: "text-danger-500",
      average: "text-warning-500",
      strong: "text-success-500",
    },
  },
  defaultVariants: { size: "default", strength: "default" },
});

const rootVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-4",
      small: "space-y-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const messageVariants = cva("font-normal", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
    state: {
      default: "text-foreground-600",
      error: "text-danger-500",
    },
  },
  defaultVariants: {
    size: "default",
    state: "default",
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
        default: "rounded-3xl",
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
    },
    defaultVariants: {
      state: "default",
      size: "default",
    },
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

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  // label?: React.ReactElement<typeof FormLabel>;
  label?: string;
  leftText?: string;
  required?: boolean;
  placeholder?: string;
  field: ControllerRenderProps<any, any>;
}

export interface PasswordFormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  icon?: React.ReactNode;
  // label?: React.ReactElement<typeof FormLabel>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  field: ControllerRenderProps<any, any>;
}

enum PasswordStrength {
  Default = "default",
  Weak = "weak",
  Average = "average",
  Strong = "strong",
}

const FormItemPassword = React.forwardRef<
  HTMLDivElement,
  PasswordFormItemProps
>(
  (
    {
      className,
      size,
      state,
      icon,
      label,
      children,
      required = false,
      placeholder,
      field,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const [strength, setStrength] = React.useState<PasswordStrength>(
      PasswordStrength.Default
    );

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(rootVariants({ size }), className)}
          {...props}
        >
          <div className={cn(containerVariants({ size, state }))}>
            <div className={cn(wrapperVariants({ size, state }))}>
              <div className={cn(pwInnerVariants({ size }))}>
                <div className="group flex-1 h-fit space-y-1">
                  <div
                    className={`w-full flex items-center ${
                      label ? "justify-between" : "justify-end"
                    }`}
                  >
                    {label && (
                      <FormLabel size={size} required={required}>
                        {label}
                      </FormLabel>
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          pwStrengthTextVariants({ size, strength })
                        )}
                      >
                        Strength
                      </span>
                      <div className={cn(pwThermometerVariants({ size }))}>
                        <div
                          className={cn(pwIndicatorVariants({ strength }))}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center">
                    <FormControl>
                      <Input
                        type="password"
                        size={size}
                        placeholder={placeholder}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>
                {icon}
              </div>
            </div>
          </div>
          <FormMessage size={size}>
            Minimum of 6 characters, with upper and lowercase and a number, or a
            symbo.
          </FormMessage>
          <FormMessage size={size} />
        </div>
      </FormItemContext.Provider>
    );
  }
);

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      className,
      size,
      state,
      iconBefore,
      iconAfter,
      label,
      leftText,
      children,
      required = false,
      placeholder,
      field,
      ...props
    },
    ref
  ) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn(rootVariants({ size }), className)}
          {...props}
        >
          <div className={cn(containerVariants({ size, state }))}>
            <div className={cn(wrapperVariants({ size, state }))}>
              <div className="w-full h-fit flex gap-4 items-center">
                {iconBefore}
                <div className="group flex-1 h-fit space-y-1">
                  {label && (
                    <FormLabel size={size} required={required}>
                      {label}
                    </FormLabel>
                  )}
                  <div className="w-full flex items-center gap-2">
                    {leftText && (
                      <span className={cn(leftTextVariants({ size }))}>
                        {leftText}
                      </span>
                    )}
                    <FormControl>
                      <Input size={size} placeholder={placeholder} {...field} />
                    </FormControl>
                  </div>
                </div>
                {iconAfter}
              </div>
            </div>
          </div>
          <FormMessage size={size} />
        </div>
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => {
  const { error, formItemId, isDirty } = useFormField();

  return (
    <Label
      ref={ref}
      className={className}
      htmlFor={formItemId}
      state={error ? "error" : isDirty ? "dirty" : "default"}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof messageVariants>
>(({ className, children, size, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(
        messageVariants({ size, state: error ? "error" : "default" }),
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormItemPassword,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormItemContext,
  rootVariants,
  containerVariants,
  wrapperVariants,
};
