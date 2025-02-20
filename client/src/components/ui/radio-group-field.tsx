import React from "react";
import { useField } from "./field";
import { FieldContainer } from "./field-container";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/styling";
import { RadioGroup, RadioGroupUnit } from "./radio-group";
import { FieldLower } from "./field-lower";

export interface RadioItem {
  label: string;
  description?: string;
  value: string;
}

interface RadioGroupFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  items: RadioItem[];
  classNames?: {
    group?: string;
    unit?: {
      label?: string;
      description?: string;
    };
  };
}

const RadioGroupField = React.forwardRef<HTMLDivElement, RadioGroupFieldProps>(
  ({ items, classNames, ...props }, ref) => {
    const { control, name, size } = useField();

    return (
      <FieldContainer ref={ref} {...props}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn(classNames?.group)}
            >
              {items.map((item) => (
                <RadioGroupUnit
                  size={size}
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  description={item.description}
                  classNames={{
                    label: classNames?.unit?.label,
                    description: classNames?.unit?.description,
                  }}
                />
              ))}
            </RadioGroup>
          )}
        />
        <FieldLower />
      </FieldContainer>
    );
  }
);

export { RadioGroupField };
