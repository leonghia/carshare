"use client";

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { cva, VariantProps } from "class-variance-authority";

const Form = FormProvider;

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
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const formLabelVariants = cva(
  "block font-normal group-focus-within:text-primary-500",
  {
    variants: {
      size: {
        default: "text-sm",
        small: "text-xs",
      },
      state: {
        default: "text-white",
        dirty: "text-foreground-500",
        error: "text-danger-500",
      },
    },
    defaultVariants: { size: "default", state: "default" },
  }
);

interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof formLabelVariants> {
  formItemId: string;
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, formItemId, size, state, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(formLabelVariants({ size, state }), className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  formDescriptionId: string;
  formMessageId: string;
}

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
>(({ formDescriptionId, formMessageId, ...props }, ref) => {
  const { error, formItemId } = useFormField();

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

const formDescriptionVariants = cva("font-normal text-foreground-600", {
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

interface FormDescriptionProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof formDescriptionVariants> {
  formDescriptionId: string;
}

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, formDescriptionId, size, ...props }, ref) => {
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(formDescriptionVariants({ size }), className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const formMessageVariants = cva("font-normal", {
  variants: {
    size: {
      default: "text-sm",
      small: "text-xs",
    },
    state: {
      default: "text-foreground-500",
      error: "text-danger-500",
      success: "text-success-500",
    },
  },
  defaultVariants: {
    size: "default",
    state: "default",
  },
});

interface FormMessageProps
  extends React.ComponentPropsWithoutRef<"p">,
    VariantProps<typeof formMessageVariants> {
  formMessageId: string;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, size, state, formMessageId, ...props }, ref) => {
    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(formMessageVariants({ size, state }), className)}
        {...props}
      />
    );
  }
);
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
