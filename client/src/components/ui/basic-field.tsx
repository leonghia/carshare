import React from "react";
import { textVariants, FieldContainer, FieldStyles } from "./field-container";
import { FieldLabel } from "./field-label";
import { useField } from "./field";
import { FieldInput } from "./field-input";
import { FieldUpper } from "./field-upper";
import { FieldLower } from "./field-lower";
import { cn } from "@/utils/styling";

interface BasicFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  leftIcon?: React.ReactNode;
  leftText?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  classNames?: FieldStyles;
}

const BasicField = React.forwardRef<HTMLDivElement, BasicFieldProps>(
  ({ leftIcon, leftText, inputProps, classNames, ...props }, ref) => {
    const { label, size, fieldInputId, name, control } = useField();
    return (
      <FieldContainer
        ref={ref}
        className={cn(classNames?.container)}
        {...props}
      >
        <FieldUpper className={cn(classNames?.upper)}>
          <div className="w-full flex gap-4 items-center">
            {leftIcon}
            <div className="flex-1 space-y-1">
              {label && <FieldLabel />}
              <div className="w-full flex items-center gap-2">
                {leftText && (
                  <span className={cn(textVariants({ size }))}>{leftText}</span>
                )}
                <FieldInput
                  control={control}
                  fieldName={name}
                  id={fieldInputId}
                  className="flex-1 min-w-0"
                  {...inputProps}
                />
              </div>
            </div>
          </div>
        </FieldUpper>
        <FieldLower className={cn(classNames?.lower)} />
      </FieldContainer>
    );
  }
);

export { BasicField };
