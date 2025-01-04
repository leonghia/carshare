import React from "react";
import { field__textVariants, FieldContainer } from "./fieldContainer";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fieldLabel";
import { useField } from "./field";
import { FieldInput } from "./fieldInput";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FieldUpper } from "./fieldUpper";
import { FieldLower } from "./fieldLower";

interface BasicFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div"> {
  leftIcon?: React.ReactNode;
  leftText?: string;
  control: Control<TFieldValues>;
  name: TName;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

const BasicField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  leftIcon,
  leftText,
  control,
  name,
  ref,
  inputProps,
  ...props
}: BasicFieldProps<TFieldValues, TName>) => {
  const { label, size, fieldInputId } = useField();
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
};

export { BasicField };
