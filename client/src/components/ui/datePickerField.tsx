import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { useField } from "./field";
import { FieldInput } from "./fieldInput";
import { FieldLabel } from "./fieldLabel";
import { cn } from "@/lib/utils";
import { field__textVariants, FieldContainer } from "./fieldContainer";

interface DatePickerFieldProps<
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

const DatePickerField = <
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
}: DatePickerFieldProps<TFieldValues, TDayName, TMonthName, TYearName>) => {
  const { label, id, fieldInputId } = useField();
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
      <div className="w-full flex gap-4 items-center">
        <div className="flex-1 space-y-1">
          {label && <FieldLabel />}
          <div className="flex items-center gap-2">
            <FieldInput
              handleRef={handleRef}
              control={control}
              fieldName={dayName}
              type="text"
              inputMode="numeric"
              maxLength={2}
              placeholder={dayPlaceholder}
              id={fieldInputId}
              className="flex-none w-6 min-w-0"
              onChange={(e) => {
                if (e.target.value.length === 2) jumpToInput(monthName);
              }}
            />
            <span className={cn(field__textVariants, "text-foreground-600")}>
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
              className="flex-none w-6 min-w-0"
              onChange={(e) => {
                if (e.target.value.length === 2) jumpToInput(yearName);
              }}
            />
            <span className={cn(field__textVariants, "text-foreground-600")}>
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
              className="flex-1 min-w-0"
            />
          </div>
        </div>
      </div>
    </FieldContainer>
  );
};

export { DatePickerField };
