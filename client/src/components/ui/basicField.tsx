import React from "react";
import { field__textVariants, FieldContainer } from "./fieldContainer";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fieldLabel";
import { useField } from "./field";
import { FieldInput } from "./fieldInput";
import { FieldUpper } from "./fieldUpper";
import { FieldLower } from "./fieldLower";

interface BasicFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  leftIcon?: React.ReactNode;
  leftText?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const BasicField = React.forwardRef<HTMLDivElement, BasicFieldProps>(
  ({ leftIcon, leftText, inputProps, ...props }, ref) => {
    const { label, size, fieldInputId, name, control } = useField();
    return (
      <FieldContainer ref={ref} {...props}>
        <FieldUpper>
          <div className="w-full flex gap-4 items-center">
            {leftIcon}
            <div className="flex-1 space-y-1">
              {label && <FieldLabel />}
              <div className="w-full flex items-center gap-2">
                {leftText && (
                  <span className={cn(field__textVariants({ size }))}>
                    {leftText}
                  </span>
                )}
                <FieldInput
                  control={control}
                  fieldName={name}
                  id={fieldInputId}
                  className="w-full"
                  {...inputProps}
                />
              </div>
            </div>
          </div>
        </FieldUpper>
        <FieldLower />
      </FieldContainer>
    );
  }
);

export { BasicField };
