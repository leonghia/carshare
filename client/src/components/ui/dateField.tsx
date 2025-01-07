import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { useField } from "./field";
import { FieldInput } from "./fieldInput";
import { FieldLabel } from "./fieldLabel";
import { cn } from "@/lib/utils";
import { field__textVariants, FieldContainer } from "./fieldContainer";
import { FieldUpper } from "./fieldUpper";
import { FieldLower } from "./fieldLower";
import { cva } from "class-variance-authority";

const dayVariants = cva("flex-none min-w-0", {
  variants: {
    size: {
      default: "w-6",
      small: "w-[1.375rem]",
    },
  },
  defaultVariants: { size: "default" },
});

const monthVariants = cva("flex-none min-w-0", {
  variants: {
    size: {
      default: "w-[1.625rem]",
      small: "w-6",
    },
  },
  defaultVariants: { size: "default" },
});

const yearVariants = cva("flex-none min-w-0", {
  variants: {
    size: {
      default: "w-12",
      small: "w-10",
    },
  },
  defaultVariants: { size: "default" },
});

interface DateFieldProps<
  TFieldValues extends FieldValues,
  TDayName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends React.ComponentPropsWithRef<"div"> {
  dayName: TDayName;
  monthName: TMonthName;
  yearName: TYearName;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  control: Control<TFieldValues>;
}

const DateField = <
  TFieldValues extends FieldValues,
  TDayName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  dayName,
  monthName,
  yearName,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  control,
  ref,
  ...props
}: DateFieldProps<TFieldValues, TDayName, TMonthName, TYearName>) => {
  const { label, id, fieldInputId, size } = useField();
  const inputsRef = React.useRef<Map<string, HTMLInputElement> | null>(null);

  const getInputsMap = () => {
    if (!inputsRef.current) {
      inputsRef.current = new Map();
    }
    return inputsRef.current;
  };

  const handleRef = (node: HTMLInputElement | null, name: string) => {
    const map = getInputsMap();
    if (node) map.set(name, node);
    return () => map.delete(name);
  };

  const jumpToInput = (name: TMonthName | TYearName) => {
    const map = getInputsMap();
    const node = map.get(name);
    node?.focus();
  };

  return (
    <FieldContainer ref={ref} {...props}>
      <FieldUpper>
        <div className="w-full flex gap-4 items-center">
          <div className="flex-1 space-y-1 min-w-0">
            {label && <FieldLabel />}
            <div className="flex items-center gap-0">
              <FieldInput
                handleRef={handleRef}
                control={control}
                fieldName={dayName}
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder={dayPlaceholder}
                id={fieldInputId}
                className={cn(dayVariants({ size }), "pr-[0.125rem]")}
                onChange={(e) => {
                  if (e.target.value.length === 2) jumpToInput(monthName);
                }}
              />

              <span
                className={cn(
                  field__textVariants({ size }),
                  "text-foreground-600"
                )}
              >
                /
              </span>

              <FieldInput
                handleRef={handleRef}
                control={control}
                fieldName={monthName}
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder={monthPlaceholder}
                id={`${id}-month-field-input`}
                className={cn(monthVariants({ size }), "pl-1")}
                onChange={(e) => {
                  if (e.target.value.length === 2) jumpToInput(yearName);
                }}
              />

              <span
                className={cn(
                  field__textVariants({ size }),
                  "text-foreground-600"
                )}
              >
                /
              </span>

              <FieldInput
                handleRef={handleRef}
                control={control}
                fieldName={yearName}
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder={yearPlaceholder}
                id={`${id}-year-field-input`}
                className={cn(yearVariants({ size }), "pl-1")}
              />
            </div>
          </div>
        </div>
      </FieldUpper>
      <FieldLower />
    </FieldContainer>
  );
};

export { DateField };
