import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  containerVariants,
  Field,
  FieldControl,
  FieldItemContext,
  messageAndDescriptionVariants,
  rootVariants,
  textVariants,
  wrapperVariants,
} from "./form";
import React from "react";
import { cn } from "@/lib/utils";
import { DatepickerFieldLabel } from "./label";
import { VariantProps } from "class-variance-authority";
import { Input } from "./input";
import { AnimatePresence } from "motion/react";
import { MotionFieldMessage } from "./fieldMessage";
import { MotionFieldDescription } from "./fieldDescription";

interface DatepickerFieldProps<
  TFieldValues extends FieldValues,
  TDayName extends FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues>
> extends Omit<React.ComponentPropsWithRef<"div">, "size">,
    VariantProps<typeof containerVariants> {
  control: Control<TFieldValues>;
  dayFieldName: TDayName;
  monthFieldName: TMonthName;
  yearFieldName: TYearName;
  label?: string;
  required?: boolean;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  description?: string;
}

function DatepickerField<
  TFieldValues extends FieldValues,
  TDayName extends FieldPath<TFieldValues>,
  TMonthName extends FieldPath<TFieldValues>,
  TYearName extends FieldPath<TFieldValues>
>({
  ref,
  control,
  dayFieldName,
  monthFieldName,
  yearFieldName,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  size,
  state,
  className,
  label,
  required = false,
  description,
  ...props
}: DatepickerFieldProps<
  TFieldValues,
  TDayName,
  TMonthName,
  TYearName
>): React.JSX.Element {
  const id = React.useId();
  const dayFieldId = `${id}cr7_day`;
  const monthFieldId = `${id}cr7_month`;
  const yearFieldId = `${id}cr7_year`;

  const error = useFormContext().getFieldState(dayFieldName).error;
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <div ref={ref} className={cn(rootVariants({ size }), className)} {...props}>
      <div className={cn(containerVariants({ size, state }))}>
        <div className={cn(wrapperVariants({ size, state }))}>
          <div className="w-full h-fit flex gap-4 items-center">
            <div className="flex-1 h-fit space-y-1 min-w-0">
              {label && (
                <DatepickerFieldLabel
                  htmlFor={`${dayFieldId}-field-item`}
                  state={state}
                  required={required}
                >
                  {label}
                </DatepickerFieldLabel>
              )}
              <div className="w-full flex items-center gap-2">
                <Field
                  control={control}
                  name={dayFieldName}
                  render={({ field }) => (
                    <DatepickerFieldItem
                      fieldId={dayFieldId}
                      size={size}
                      placeholder={dayPlaceholder}
                      field={field}
                      className="flex-none w-6 min-w-0"
                      onFocus={(_) => setIsFocus(true)}
                      onBlur={(_) => {
                        field.onBlur();
                        setIsFocus(false);
                      }}
                    />
                  )}
                />
                <span
                  className={cn(textVariants({ size }), "text-foreground-600")}
                >
                  /
                </span>
                <Field
                  control={control}
                  name={monthFieldName}
                  render={({ field }) => (
                    <DatepickerFieldItem
                      fieldId={monthFieldId}
                      size={size}
                      placeholder={monthPlaceholder}
                      field={field}
                      className="flex-none w-6 min-w-0"
                      onFocus={(_) => setIsFocus(true)}
                      onBlur={(_) => {
                        field.onBlur();
                        setIsFocus(false);
                      }}
                    />
                  )}
                />
                <span
                  className={cn(textVariants({ size }), "text-foreground-600")}
                >
                  /
                </span>
                <Field
                  control={control}
                  name={yearFieldName}
                  render={({ field }) => (
                    <DatepickerFieldItem
                      fieldId={yearFieldId}
                      size={size}
                      placeholder={yearPlaceholder}
                      field={field}
                      className="flex-1 min-w-0"
                      onFocus={(_) => setIsFocus(true)}
                      onBlur={(_) => {
                        field.onBlur();
                        setIsFocus(false);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {(error || (description && isFocus)) && (
          <div className={cn(messageAndDescriptionVariants({ size }))}>
            {error && (
              <MotionFieldMessage
                key={id + "message"}
                size={size}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                {String(error.message)}
              </MotionFieldMessage>
            )}

            {description && isFocus && (
              <MotionFieldDescription
                key={id + "description"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{
                  type: "tween",
                  duration: 0.3,
                  ease: "easeOut",
                }}
                size={size}
              >
                {description}
              </MotionFieldDescription>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DatepickerFieldItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<"input">, "size">,
    Omit<VariantProps<typeof containerVariants>, "state"> {
  placeholder?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldId: string;
}

const DatepickerFieldItem = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  size,
  placeholder,
  field,
  fieldId,
  ...props
}: DatepickerFieldItemProps<TFieldValues, TName>) => {
  //   const { error } = useFormField();
  //   const [isFocus, setIsFocus] = React.useState(false);

  return (
    <FieldItemContext.Provider value={{ id: fieldId }}>
      <FieldControl>
        <Input
          type="tel"
          size={size}
          placeholder={placeholder}
          {...field}
          {...props}
        />
      </FieldControl>
    </FieldItemContext.Provider>
  );
};

export { DatepickerField };
