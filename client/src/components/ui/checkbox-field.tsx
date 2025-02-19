import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox, CheckboxStyles } from "./checkbox";
import { useField } from "./field";
import { FieldContainer } from "./field-container";
import { FieldLower } from "./field-lower";

interface CheckboxFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  classNames?: CheckboxStyles;
}

const CheckboxField = React.forwardRef<HTMLDivElement, CheckboxFieldProps>(
  ({ classNames, ...props }, ref) => {
    const { size, label, description, fieldInputId, control, name } =
      useField();

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
  }
);

export { CheckboxField };
