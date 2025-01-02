import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox } from "./checkbox";
import { useField } from "./field";
import { FieldContainer } from "./fieldContainer";
import { FieldLower } from "./fieldLower";

interface CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div"> {
  control: Control<TFieldValues>;
  name: TName;
  labelProps?: React.ComponentPropsWithRef<"label">;
  descriptionProps?: React.ComponentPropsWithRef<"p">;
}

const CheckboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ref,
  labelProps,
  descriptionProps,
  ...props
}: CheckboxFieldProps<TFieldValues, TName>) => {
  const { size, label, description, fieldInputId } = useField();

  return (
    <FieldContainer ref={ref} {...props}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Checkbox
            size={size}
            label={label}
            description={description}
            id={fieldInputId}
            labelProps={labelProps}
            descriptionProps={descriptionProps}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        )}
      />
      <FieldLower />
    </FieldContainer>
  );
};

export { CheckboxField };
