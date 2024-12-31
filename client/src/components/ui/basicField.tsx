import { FieldPath, FieldValues } from "react-hook-form";
import {
  containerVariants,
  FieldControl,
  Field,
  FieldItemContext,
  FieldItemProps,
  FieldProps,
  messageAndDescriptionVariants,
  rootVariants,
  textVariants,
  useFormField,
  wrapperVariants,
} from "./form";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { AnimatePresence } from "motion/react";
import { FieldLabel } from "./label";

import { MotionFieldMessage } from "./fieldMessage";
import { MotionFieldDescription } from "./fieldDescription";

interface BasicFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldProps<TFieldValues, TName> {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  leftText?: string;
}

interface BasicFieldItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldItemProps<TFieldValues, TName> {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  leftText?: string;
  type: React.HTMLInputTypeAttribute;
}

function BasicField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  state,
  size,
  label,
  required = false,
  placeholder,
  type,
  ref,
  className,
  ...props
}: BasicFieldProps<TFieldValues, TName>): JSX.Element {
  return (
    <Field
      control={control}
      name={name}
      render={({ field }) => (
        <BasicFieldItem
          ref={ref}
          state={state}
          size={size}
          label={label}
          required={required}
          placeholder={placeholder}
          field={field}
          type={type}
          className={className}
          {...props}
        />
      )}
    ></Field>
  );
}

const BasicFieldItem = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  size,
  className,
  ref,
  state,
  iconBefore,
  iconAfter,
  label,
  required,
  leftText,
  type,
  placeholder,
  description,
  field,
  ...props
}: BasicFieldItemProps<TFieldValues, TName>) => {
  const id = React.useId();
  const { error } = useFormField();
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <FieldItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn(rootVariants({ size }), className)}
        {...props}
      >
        <div className={cn(containerVariants({ size, state }))}>
          <div className={cn(wrapperVariants({ size, state }))}>
            <div className="w-full h-fit flex gap-4 items-center">
              {iconBefore}
              <div className="flex-1 h-fit space-y-1">
                {label && (
                  <FieldLabel size={size} required={required}>
                    {label}
                  </FieldLabel>
                )}
                <div className="w-full flex items-center gap-2">
                  {leftText && (
                    <span className={cn(textVariants({ size }))}>
                      {leftText}
                    </span>
                  )}
                  <FieldControl>
                    <Input
                      type={type}
                      size={size}
                      placeholder={placeholder}
                      {...field}
                    />
                  </FieldControl>
                </div>
              </div>
              {iconAfter}
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
    </FieldItemContext.Provider>
  );
};
BasicFieldItem.displayName = "BasicFieldItem";

export { BasicField };
