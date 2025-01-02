import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Checkbox } from "./checkbox";
import { useField } from "./field";

interface CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {
  control: Control<TFieldValues>;
  name: TName;
}

const CheckboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ref,
  ...props
}: CheckboxFieldProps<TFieldValues, TName>) => {
  const { size, label, description, fieldInputId } = useField();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          size={size}
          label={label}
          description={description}
          id={fieldInputId}
          {...props}
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
};

export { CheckboxField };
