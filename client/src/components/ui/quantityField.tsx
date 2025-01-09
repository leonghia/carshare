import React from "react";
import { useField } from "./field";
import { FieldContainer } from "./fieldContainer";
import { FieldUpper } from "./fieldUpper";
import { FieldLabel } from "./fieldLabel";
import { FieldInput } from "./fieldInput";

interface QuantityFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  max: number;
  placeholder?: string;
}

const QuantityField = React.forwardRef<HTMLDivElement, QuantityFieldProps>(
  ({ max, placeholder, ...props }, ref) => {
    const { label, size, fieldInputId, control, name } = useField();

    return (
      <FieldContainer ref={ref} {...props}>
        <FieldUpper>
          <div className="w-full space-y-1">
            {label && <FieldLabel />}
            <FieldInput
              control={control}
              fieldName={name}
              id={fieldInputId}
              className="w-full"
              type="text"
              inputMode="numeric"
              max={max}
              placeholder={placeholder}
            />
          </div>
        </FieldUpper>
      </FieldContainer>
    );
  }
);

export { QuantityField };
