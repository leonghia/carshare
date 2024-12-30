"use client";

import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import {
  Control,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  useFormContext,
  FormProvider,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Input } from "./input";
import { Calendar as CalendarIcon } from "iconsax-react";
import { FieldLabel } from "./label";

const current = new Date();

const datePickerInputVariants = cva("flex-1", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

const rootVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-4",
      small: "space-y-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const messageAndDescriptionVariants = cva(undefined, {
  variants: {
    size: {
      default: "space-y-2",
      small: "space-y-1",
    },
  },
  defaultVariants: { size: "default" },
});

const containerVariants = cva(
  "group peer focus-within:outline focus-within:outline-8 focus-within:outline-primary-flat",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-8 outline-danger-flat",
      },
      size: {
        default: "rounded-3xl",
        small: "rounded-2xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const wrapperVariants = cva(
  "w-full h-fit bg-background-900 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:flex-none [&_svg]:text-foreground-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary-500 focus-within:bg-[#383D4C]",
  {
    variants: {
      state: {
        default: null,
        error: "outline outline-2 outline-danger-500",
      },
      size: {
        default: "px-6 py-3 rounded-3xl [&_svg]:size-6",
        small: "px-4 py-2 rounded-2xl [&_svg]:size-5",
      },
    },
    defaultVariants: {
      state: "default",
      size: "default",
    },
  }
);

const textVariants = cva("flex-none font-medium text-white", {
  variants: {
    size: {
      default: "text-base",
      small: "text-sm",
    },
  },
  defaultVariants: { size: "default" },
});

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  required?: boolean;
  placeholder?: string;
  ref?: React.Ref<HTMLDivElement>;
  description?: string;
  type: React.HTMLInputTypeAttribute;
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FieldItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FieldItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

interface FieldItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  label?: string;
  required?: boolean;
  placeholder?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  description?: string;
  ref?: React.Ref<HTMLDivElement>;
}

interface DatePickerFormItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  dayField?: ControllerRenderProps<any, any>;
  monthField?: ControllerRenderProps<any, any>;
  yearField?: ControllerRenderProps<any, any>;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  label?: string;
  required?: boolean;
}

const FormItemDatePicker = React.forwardRef<
  HTMLDivElement,
  DatePickerFormItemProps
>(
  (
    {
      className,
      size,
      state,
      label,
      required = false,
      dayPlaceholder,
      monthPlaceholder,
      yearPlaceholder,
      dayField,
      monthField,
      yearField,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(rootVariants({ size }), className)}
        {...props}
      >
        <div className={cn(containerVariants({ size, state }))}>
          <div className={cn(wrapperVariants({ size, state }))}>
            <div className="w-full h-fit flex gap-4 items-center">
              <div className="flex-1 h-fit space-y-1 min-w-0">
                {label && (
                  <FieldLabel size={size} required={required}>
                    {label}
                  </FieldLabel>
                )}
                <div className="w-full flex items-center gap-2">
                  <Input
                    type="tel"
                    size={size}
                    placeholder={dayPlaceholder}
                    className="flex-none w-6 min-w-0"
                  />
                  <span
                    className={cn(
                      textVariants({ size }),
                      "text-foreground-600"
                    )}
                  >
                    /
                  </span>
                  <Input
                    type="tel"
                    size={size}
                    placeholder={monthPlaceholder}
                    className="flex-none w-6 min-w-0"
                  />
                  <span
                    className={cn(
                      textVariants({ size }),
                      "text-foreground-600"
                    )}
                  >
                    /
                  </span>
                  <Input
                    type="tel"
                    size={size}
                    placeholder={yearPlaceholder}
                    className="flex-1 min-w-0"
                  />
                </div>
              </div>
              <CalendarIcon variant="Bold" />
              {/* <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <button type="button">
                        <CalendarIcon variant="Bold" />
                      </button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      showOutsideDays
                      required
                      selected={field.value}
                      onSelect={field.onChange}
                      autoFocus
                      hideNavigation
                      captionLayout="dropdown"
                      defaultMonth={current}
                      startMonth={new Date(2014, 0)}
                      endMonth={current}
                      classNames={{
                        root: "px-3 sm:px-1 py-2 sm:py-1",
                        month_caption: "p-2",
                        caption_label: "text-white font-medium text-sm gap-2",
                        chevron: "fill-foreground-500 inline-block",
                        dropdowns: "relative inline-flex items-center gap-4",
                        weekday:
                          "py-2 font-normal text-xs text-foreground-500 text-center",
                        today: "",
                        day: "text-sm sm:text-xs font-medium text-foreground-200",
                        outside:
                          "data-[outside=true]:text-foreground-700 data-[outside=true]:pointer-events-none",
                        selected:
                          "group data-[selected=true]:font-semibold data-[selected=true]:text-white",
                        day_button:
                          "group-data-[selected=true]:bg-primary-500 group-data-[selected=true]:shadow-lg transition-all duration-300 ease-out",
                      }}
                      formatters={{
                        formatMonthDropdown: (monthNumber, locale) =>
                          `Tháng ${monthNumber + 1}`,
                      }}
                    />
                  </PopoverContent>
                </Popover> */}
            </div>
          </div>
        </div>
        {/* <AnimatePresence>
            {error && (
              <MotionFormMessage
                key={"message"}
                size={size}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              >
                {String(error.message)}
              </MotionFormMessage>
            )}
          </AnimatePresence> */}
      </div>
    );
  }
);
FormItemDatePicker.displayName = "FormItemDatePicker";

const FieldControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FieldControl.displayName = "FieldControl";

export {
  FormProvider,
  Field,
  useFormField,
  FormItemDatePicker,
  FieldControl,
  type FieldProps,
  type FieldItemProps,
  FieldItemContext,
  rootVariants,
  containerVariants,
  wrapperVariants,
  textVariants,
  messageAndDescriptionVariants,
};
