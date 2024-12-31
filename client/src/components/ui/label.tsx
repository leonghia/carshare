"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useFormField } from "./form";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

const labelVariants = cva(
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

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size, state, children, required = false, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, state }), className)}
    {...props}
  >
    {children} {required && <span className="text-danger-500">*</span>}
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>((props, ref) => {
  const { error, fieldItemId, isDirty } = useFormField();

  return (
    <Label
      ref={ref}
      htmlFor={fieldItemId}
      state={error ? "error" : isDirty ? "dirty" : "default"}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

interface DatepickerLabelProps<
  TFieldValues extends FieldValues,
  TDayName extends FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<typeof LabelPrimitive.Root> {
  dayFieldName: TDayName;
  monthFieldName: TMonthName;
  yearFieldName: TYearName;
  required?: boolean;
  dayFieldItemId: string;
}

const DatepickerFieldLabel = <
  TFieldValues extends FieldValues,
  TDayName extends FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues>
>({
  dayFieldName,
  monthFieldName,
  yearFieldName,
  ref,
  dayFieldItemId,
  ...props
}: DatepickerLabelProps<TFieldValues, TDayName, TMonthName, TYearName>) => {
  const { isDirty: dayIsDirty, error: dayError } =
    useFormContext().getFieldState(dayFieldName);
  const { isDirty: monthIsDirty, error: monthError } =
    useFormContext().getFieldState(monthFieldName);
  const { isDirty: yearIsDirty, error: yearError } =
    useFormContext().getFieldState(yearFieldName);

  return (
    <Label
      ref={ref}
      htmlFor={dayFieldItemId}
      state={
        dayError || monthError || yearError
          ? "error"
          : dayIsDirty || monthIsDirty || yearIsDirty
          ? "dirty"
          : "default"
      }
      {...props}
    />
  );
};

DatepickerFieldLabel.displayName = "DatepickerFieldLabel";

export { Label, FieldLabel, DatepickerFieldLabel };
