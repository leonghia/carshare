import React from "react";
import { field__textVariants, useField } from "./field";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { FieldLabel } from "./fieldLabel";

interface BasicFieldProps {
  placeholder?: string;
  leftIcon?: React.ReactNode;
  leftText?: string;
  type: React.HTMLInputTypeAttribute;
}

const BasicField = React.forwardRef<HTMLDivElement, BasicFieldProps>(
  ({ leftIcon, leftText, placeholder, type, ...props }, ref) => {
    const {
      fieldInputId,
      fieldDescriptionId,
      fieldMessageId,
      label,
      size,
      control,
      name,
      onBlur,
      onFocus,
    } = useField();
    const { error } = useFormContext().getFieldState(name);

    return (
      <div ref={ref} className="w-full flex gap-4 items-center" {...props}>
        {leftIcon}
        <div className="flex-1 space-y-1">
          {label && <FieldLabel />}
          <div className="w-full flex items-center gap-2">
            {leftText && (
              <span className={cn(field__textVariants({ size }))}>
                {leftText}
              </span>
            )}

            <Controller
              control={control}
              name={name}
              render={({ field }) => (
                <Input
                  id={fieldInputId}
                  type={type}
                  size={size}
                  placeholder={placeholder}
                  aria-describedby={
                    !error
                      ? `${fieldDescriptionId}`
                      : `${fieldDescriptionId} ${fieldMessageId}`
                  }
                  aria-invalid={!!error}
                  {...field}
                  onFocus={onFocus}
                  onBlur={(_) => {
                    field.onBlur();
                    onBlur();
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
);

export { BasicField };
