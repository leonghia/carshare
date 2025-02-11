import React from "react";
import { Control, Controller } from "react-hook-form";
import { useField } from "./field";
import { Input } from "./input";
import { cn, parseNumericValue, parseTelValue } from "@/utils/utils";

interface FieldInputProps extends React.ComponentPropsWithoutRef<"input"> {
  fieldName: string;
  control: Control<any>;
  handleRef?: (node: HTMLInputElement | null, name: string) => () => boolean;
}

const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  ({ fieldName, control, onChange, handleRef, className, ...props }, ref) => {
    const { error, fieldDescriptionId, size, fieldMessageId, onBlur, onFocus } =
      useField();

    return (
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Input
            className={cn("text-ellipsis", className)}
            {...props}
            aria-describedby={
              !error
                ? `${fieldDescriptionId}`
                : `${fieldDescriptionId} ${fieldMessageId}`
            }
            aria-invalid={!!error}
            {...field}
            ref={(node) => {
              field.ref(node);
              handleRef && handleRef(node, fieldName);
            }}
            size={size}
            onFocus={onFocus}
            onBlur={(_) => {
              field.onBlur();
              onBlur();
            }}
            onChange={(e) => {
              if (props?.inputMode === "numeric")
                field.onChange(parseNumericValue(e.target.value));
              else if (props?.inputMode === "tel")
                field.onChange(parseTelValue(e.target.value));
              else field.onChange(e);
              onChange && onChange(e);
            }}
          />
        )}
      />
    );
  }
);

export { FieldInput };
