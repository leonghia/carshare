"use client";

import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import {
  Control,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useFormContext,
  FormProvider,
} from "react-hook-form";

import { cva, VariantProps } from "class-variance-authority";

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

const messageAndDescriptionVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-2",
      small: "space-y-1",
    },
  },
  defaultVariants: { size: "default" },
});

const containerVariants = cva(
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

const wrapperVariants = cva(
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

const textVariants = cva("flex-none font-medium text-white", {
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

const Field = <
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

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof containerVariants> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  type: React.HTMLInputTypeAttribute;
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FieldItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    fieldItemId: `${id}-field-item`,
    fieldDescriptionId: `${id}-field-item-description`,
    fieldMessageId: `${id}-field-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FieldItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

interface FieldItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof containerVariants> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  description?: string;
}

const FieldControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, fieldItemId, fieldDescriptionId, fieldMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={fieldItemId}
      aria-describedby={
        !error
          ? `${fieldDescriptionId}`
          : `${fieldDescriptionId} ${fieldMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FieldControl.displayName = "FieldControl";

export {
  FormProvider,
  Field,
  useFormField,
  FieldControl,
  type FieldProps,
  type FieldItemProps,
  FieldItemContext,
  rootVariants,
  containerVariants,
  wrapperVariants,
  textVariants,
  messageAndDescriptionVariants,
};
