import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Checkbox, CheckboxStyles } from "./checkbox";
import { useField } from "./field";
import { FieldContainer } from "./fieldContainer";
import { FieldLower } from "./fieldLower";

interface CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div"> {
  control: Control<TFieldValues>;
  name: TName;
  classNames?: CheckboxStyles;
}

const CheckboxField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  ref,
  classNames,
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
            checked={field.value}
            onCheckedChange={field.onChange}
            classNames={classNames}
          />
        )}
      />
      <FieldLower />
    </FieldContainer>
  );
};

export { CheckboxField };
