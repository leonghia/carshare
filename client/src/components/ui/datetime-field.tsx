import React from "react";
import { FieldPath, FieldValues } from "react-hook-form";
import { useField } from "./field";
import { textVariants, FieldContainer, FieldStyles } from "./field-container";
import { FieldUpper } from "./field-upper";
import { FieldLabel } from "./field-label";
import { Clock, Calendar } from "iconsax-react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/styling";
import { FieldInput } from "./field-input";
import { dateVariants, monthVariants, yearVariants } from "./date-field";
import { FieldLower } from "./field-lower";
import { z } from "zod";

const innerVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-10",
      small: "gap-8",
    },
  },
  defaultVariants: { size: "default" },
});

const iconVariants = cva("text-foreground-600", {
  variants: {
    size: {
      default: "size-5",
      small: "size-[18px]",
    },
  },
  defaultVariants: { size: "default" },
});

const hourVariants = cva("flex-none min-w-0 pr-[2px]", {
  variants: {
    size: {
      default: "w-6",
      small: "w-[22px]",
    },
  },
  defaultVariants: { size: "default" },
});

const minuteVariants = cva("flex-none min-w-0 pl-[6px]", {
  variants: {
    size: {
      default: "w-[26px]",
      small: "w-6",
    },
  },
  defaultVariants: { size: "default" },
});

const wrapperVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "gap-2",
      small: "gap-1",
    },
  },
  defaultVariants: { size: "default" },
});

interface DatetimeFieldProps<
  TFieldValues extends FieldValues,
  THourName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMinuteName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TDateName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentPropsWithRef<"div">, "className"> {
  hourName: THourName;
  minuteName: TMinuteName;
  dateName: TDateName;
  monthName: TMonthName;
  yearName: TYearName;
  hourPlaceholder?: string;
  minutePlaceholder?: string;
  datePlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  revalidate: boolean;
  invalidMessage: string;
  requiredMessage: string;
  classNames?: FieldStyles & { inner?: string };
}

const DatetimeField = <
  TFieldValues extends FieldValues,
  THourName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMinuteName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TDateName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  hourName,
  minuteName,
  dateName,
  monthName,
  yearName,
  hourPlaceholder,
  minutePlaceholder,
  datePlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  ref,
  revalidate,
  invalidMessage,
  requiredMessage,
  classNames,
  ...props
}: DatetimeFieldProps<
  TFieldValues,
  THourName,
  TMinuteName,
  TDateName,
  TMonthName,
  TYearName
>) => {
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

  const { isDirty: isHourDirty } = getFieldState(hourName);
  const { isDirty: isMinuteDirty } = getFieldState(minuteName);
  const { isDirty: isDateDirty } = getFieldState(dateName);
  const { isDirty: isMonthDirty } = getFieldState(monthName);
  const { isDirty: isYearDirty } = getFieldState(yearName);

  const isDirty =
    isHourDirty || isMinuteDirty || isDateDirty || isMonthDirty || isYearDirty;

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemName?: TMinuteName | TDateName | TMonthName | TYearName
  ): void => {
    if (itemName) jumpToInput(event.target.value, itemName);

    // console.log(getValues(name));

    const hourStr = getValues(hourName) as string;
    const minuteStr = getValues(minuteName) as string;
    const dateStr = getValues(dateName) as string;
    const monthStr = getValues(monthName) as string;
    const yearStr = getValues(yearName) as string;

    const isAllEmpty =
      hourStr.length === 0 &&
      minuteStr.length === 0 &&
      dateStr.length === 0 &&
      monthStr.length === 0 &&
      yearStr.length === 0;

    const result = z
      .string()
      .datetime({ local: true })
      .safeParse(
        `${yearStr}-${monthStr.padStart(2, "0")}-${dateStr.padStart(
          2,
          "0"
        )}T${hourStr.padStart(2, "0")}:${minuteStr.padStart(2, "0")}:00`
      );

    result.success && clearErrors(name);

    if (!result.success && revalidate) {
      setError(name, { type: "validate", message: invalidMessage });
    }

    if (isAllEmpty && revalidate) {
      setError(name, { type: "required", message: requiredMessage });
    }
  };

  const jumpToInput = (
    value: string,
    name: TMinuteName | TDateName | TMonthName | TYearName
  ) => {
    if (value.length !== 2 || isNaN(Number(value))) return;
    const map = getInputsMap();
    const node = map.get(name);
    node?.focus();
  };

  return (
    <FieldContainer ref={ref} className={cn(classNames?.container)} {...props}>
      <FieldUpper className={cn(classNames?.upper)}>
        <div className="w-full flex gap-4 items-center">
          <div className="flex-1 space-y-1 min-w-0">
            {label && <FieldLabel mode="combined" isDirtyCustom={isDirty} />}
            <div className={cn(innerVariants({ size }), classNames?.inner)}>
              <div className={cn(wrapperVariants({ size }))}>
                <Clock variant="Bold" className={cn(iconVariants({ size }))} />
                <div className="flex items-center gap-0">
                  <FieldInput
                    handleRef={handleRef}
                    control={control}
                    fieldName={hourName}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder={hourPlaceholder}
                    id={fieldInputId}
                    className={cn(hourVariants({ size }))}
                    onChange={(e) => {
                      handleChange(e, minuteName);
                    }}
                  />
                  <span
                    className={cn(
                      textVariants({ size }),
                      "text-foreground-600"
                    )}
                  >
                    :
                  </span>
                  <FieldInput
                    handleRef={handleRef}
                    control={control}
                    fieldName={minuteName}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder={minutePlaceholder}
                    id={`${id}-minute-field-input`}
                    className={cn(minuteVariants({ size }))}
                    onChange={(e) => {
                      handleChange(e, dateName);
                    }}
                  />
                </div>
              </div>
              <div className={cn(wrapperVariants({ size }))}>
                <Calendar
                  variant="Bold"
                  className={cn(iconVariants({ size }))}
                />
                <div className="flex items-center gap-0">
                  <FieldInput
                    handleRef={handleRef}
                    control={control}
                    fieldName={dateName}
                    type="text"
                    inputMode="numeric"
                    maxLength={2}
                    placeholder={datePlaceholder}
                    id={`${id}-date-field-input`}
                    className={cn(dateVariants({ size }))}
                    onChange={(e) => {
                      handleChange(e, monthName);
                    }}
                  />

                  <span
                    className={cn(
                      textVariants({ size }),
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
                    className={cn(monthVariants({ size }))}
                    onChange={(e) => {
                      handleChange(e, yearName);
                    }}
                  />

                  <span
                    className={cn(
                      textVariants({ size }),
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
                    className={cn(yearVariants({ size }))}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </FieldUpper>
      <FieldLower className={cn(classNames?.lower)} />
    </FieldContainer>
  );
};

export { DatetimeField };
