import React from "react";
import { field__textVariants } from "./field";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { FieldLabel } from "./fieldLabel";
import { useFieldRoot } from "./fieldRoot";

interface BasicFieldProps {
  leftIcon?: React.ReactNode;
  leftText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const parseNumeric = (value: string): string => {
  if (value.trim().length === 0) return "";
  const parsed: string[] = [];
  const raw = value.split("");
  raw.forEach((e) => {
    if (!isNaN(Number(e))) parsed.push(e);
  });
  return parsed.join("");
};

const BasicField = React.forwardRef<HTMLDivElement, BasicFieldProps>(
  ({ leftIcon, leftText, inputProps, ...props }, ref) => {
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
      error,
    } = useFieldRoot();

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
                  aria-describedby={
                    !error
                      ? `${fieldDescriptionId}`
                      : `${fieldDescriptionId} ${fieldMessageId}`
                  }
                  aria-invalid={!!error}
                  {...field}
                  {...inputProps}
                  id={fieldInputId}
                  size={size}
                  onFocus={onFocus}
                  onBlur={(_) => {
                    field.onBlur();
                    onBlur();
                  }}
                  onChange={(e) => {
                    if (
                      inputProps?.type === "tel" ||
                      inputProps?.inputMode === "numeric"
                    )
                      field.onChange(parseNumeric(e.target.value));
                    else field.onChange(e);
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
