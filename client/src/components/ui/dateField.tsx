import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useField } from "./field";
import { FieldInput } from "./fieldInput";
import { FieldLabel } from "./fieldLabel";
import { cn } from "@/utils/styling";
import { textVariants, FieldContainer, FieldStyles } from "./fieldContainer";
import { FieldUpper } from "./fieldUpper";
import { FieldLower } from "./fieldLower";
import { cva } from "class-variance-authority";
import { z } from "zod";

const dateVariants = cva("flex-none min-w-0 pr-[2px]", {
  variants: {
    size: {
      default: "w-6",
      small: "w-[1.375rem]",
    },
  },
  defaultVariants: { size: "default" },
});

const monthVariants = cva("flex-none min-w-0 pl-1", {
  variants: {
    size: {
      default: "w-[1.625rem]",
      small: "w-6",
    },
  },
  defaultVariants: { size: "default" },
});

const yearVariants = cva("flex-none min-w-0 pl-1", {
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
  TDateName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentPropsWithRef<"div">, "className"> {
  dateName: TDateName;
  monthName: TMonthName;
  yearName: TYearName;
  datePlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  revalidate: boolean;
  invalidMessage: string;
  requiredMessage: string;
  classNames?: FieldStyles;
}

const DateField = <
  TFieldValues extends FieldValues,
  TDateName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  dateName,
  monthName,
  yearName,
  datePlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  ref,
  revalidate,
  invalidMessage,
  requiredMessage,
  classNames,
  ...props
}: DateFieldProps<TFieldValues, TDateName, TMonthName, TYearName>) => {
  const {
    label,
    id,
    fieldInputId,
    size,
    getFieldState,
    name,
    setError,
    clearErrors,
    getValues,
    control,
  } = useField();
  const inputsRef = React.useRef<Map<string, HTMLInputElement> | null>(null);

  const { isDirty: isDateDirty } = getFieldState(dateName);
  const { isDirty: isMonthDirty } = getFieldState(monthName);
  const { isDirty: isYearDirty } = getFieldState(yearName);

  const isDirty = isDateDirty || isMonthDirty || isYearDirty;

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

  const jumpToInput = (value: string, name: TMonthName | TYearName) => {
    if (value.length !== 2 || isNaN(Number(value))) return;
    const map = getInputsMap();
    const node = map.get(name);
    node?.focus();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemName?: TMonthName | TYearName
  ) => {
    if (itemName) jumpToInput(event.target.value, itemName);

    const dateStr = getValues(dateName) as string;
    const monthStr = getValues(monthName) as string;
    const yearStr = getValues(yearName) as string;

    const isAllEmpty =
      dateStr.length === 0 && monthStr.length === 0 && yearStr.length === 0;

    const result = z
      .string()
      .date()
      .safeParse(
        `${yearStr}-${monthStr.padStart(2, "0")}-${dateStr.padStart(2, "0")}`
      );

    result.success && clearErrors(name);

    if (!result.success && revalidate)
      setError(name, { type: "validate", message: invalidMessage });

    if (isAllEmpty && revalidate)
      setError(name, { type: "required", message: requiredMessage });
  };

  return (
    <FieldContainer ref={ref} className={cn(classNames?.container)} {...props}>
      <FieldUpper className={cn(classNames?.upper)}>
        <div className="w-full flex gap-4 items-center">
          <div className="flex-1 space-y-1 min-w-0">
            {label && <FieldLabel mode="combined" isDirtyCustom={isDirty} />}
            <div className="flex items-center gap-0">
              <FieldInput
                handleRef={handleRef}
                control={control}
                fieldName={dateName}
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder={datePlaceholder}
                id={fieldInputId}
                className={cn(dateVariants({ size }))}
                onChange={(e) => handleChange(e, monthName)}
              />

              <span
                className={cn(textVariants({ size }), "text-foreground-600")}
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
                className={cn(monthVariants({ size }))}
                onChange={(e) => handleChange(e, yearName)}
              />

              <span
                className={cn(textVariants({ size }), "text-foreground-600")}
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
                className={cn(yearVariants({ size }))}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </FieldUpper>
      <FieldLower className={cn(classNames?.lower)} />
    </FieldContainer>
  );
};

export { DateField, dateVariants, monthVariants, yearVariants };
