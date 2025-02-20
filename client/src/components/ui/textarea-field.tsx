import React from "react";
import { Textarea } from "./textarea";
import { useField } from "./field";
import { FieldContainer } from "./field-container";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/styling";
import { FieldLower } from "./field-lower";

interface TextareaFieldProps extends React.ComponentPropsWithoutRef<"div"> {
  classNames?: {
    textArea?: string;
  };
  placeholder?: string;
}

const TextareaField = React.forwardRef<HTMLDivElement, TextareaFieldProps>(
  ({ classNames, placeholder, ...props }, ref) => {
    const { control, name, size } = useField();

    return (
      <FieldContainer ref={ref} {...props}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Textarea
              size={size}
              placeholder={placeholder}
              className={cn(classNames?.textArea)}
              {...field}
            />
          )}
        />
        <FieldLower />
      </FieldContainer>
    );
  }
);

export { TextareaField };
