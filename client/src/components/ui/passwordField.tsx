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
  useFormField,
  wrapperVariants,
} from "./form";
import { FieldLabel } from "./label";
import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Input } from "./input";
import { Eye, EyeSlash } from "iconsax-react";
import { AnimatePresence } from "motion/react";
import { MotionFieldDescription } from "./fieldDescription";
import { MotionFieldMessage } from "./fieldMessage";

const innerVariants = cva("w-full h-fit flex items-center", {
  variants: {
    size: {
      default: "gap-6",
      small: "gap-4",
    },
  },
  defaultVariants: { size: "default" },
});

const thermometerVariants = cva(
  "h-1 rounded bg-background-600 group-focus-within:bg-background-500 overflow-hidden",
  {
    variants: {
      size: {
        default: "w-[5.625rem]",
        small: "w-[4.5rem]",
      },
    },
    defaultVariants: { size: "default" },
  }
);

const indicatorVariants = cva("h-full", {
  variants: {
    strength: {
      default: "w-0 bg-background-600",
      weak: "w-1/3 bg-danger-500",
      average: "w-2/3 bg-warning-500",
      strong: "w-full bg-success-500",
    },
  },
  defaultVariants: {
    strength: "default",
  },
});

const strengtLabelVariants = cva("font-normal w-max", {
  variants: {
    size: {
      default: "text-xs",
      small: "text-xxs",
    },
    strength: {
      default: "text-foreground-500 group-focus-within:text-foreground-400",
      weak: "text-danger-500 group-focus-within:text-danger-500",
      average: "text-warning-500 group-focus-within:text-warning-500",
      strong: "text-success-500 group-focus-within:text-success-500",
    },
  },
  defaultVariants: { size: "default", strength: "default" },
});

const calculatePasswordStrength = (
  password: string
): [Strength, StrengthText] => {
  let score = 0;

  if (password.length === 0) return strengths.default;
  if (password.length < 6) return strengths.weak;
  // Check password length
  if (password.length >= 12) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return strengths.weak;
    case 3:
    case 4:
      return strengths.average;
    default:
      return strengths.strong;
  }
};

type Strength = "default" | "weak" | "average" | "strong";
type StrengthText = "Độ mạnh" | "Yếu" | "Trung bình" | "Mạnh";

const strengths: Record<Strength, [Strength, StrengthText]> = {
  default: ["default", "Độ mạnh"],
  weak: ["weak", "Yếu"],
  average: ["average", "Trung bình"],
  strong: ["strong", "Mạnh"],
};

interface PasswordFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends Omit<FieldProps<TFieldValues, TName>, "type"> {
  hasStrength?: boolean;
}

interface PasswordFieldItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends FieldItemProps<TFieldValues, TName> {
  hasStrength?: boolean;
}

function PasswordField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  state,
  size,
  label,
  required,
  placeholder,
  className,
  description,
  hasStrength = false,
}: PasswordFieldProps<TFieldValues, TName>): JSX.Element {
  return (
    <Field
      control={control}
      name={name}
      render={({ field }) => (
        <PasswordFieldItem
          state={state}
          size={size}
          label={label}
          required={required}
          placeholder={placeholder}
          field={field}
          className={className}
          description={description}
          hasStrength={hasStrength}
        />
      )}
    ></Field>
  );
}

const PasswordFieldItem = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  className,
  size,
  state,
  label,
  required = false,
  placeholder,
  field,
  description,
  hasStrength = false,
  ref,
  ...props
}: PasswordFieldItemProps<TFieldValues, TName>) => {
  const id = React.useId();
  const { error } = useFormField();
  const [isFocus, setIsFocus] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const [strength, strengthText] = calculatePasswordStrength(field.value);

  return (
    <FieldItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        className={cn(rootVariants({ size }), className)}
        {...props}
      >
        <div className={cn(containerVariants({ size, state }))}>
          <div className={cn(wrapperVariants({ size, state }))}>
            <div className={cn(innerVariants({ size }))}>
              <div className="flex-1 h-fit space-y-1">
                <div
                  className={`w-full flex items-center ${
                    label ? "justify-between" : "justify-end"
                  }`}
                >
                  {label && (
                    <FieldLabel size={size} required={required}>
                      {label}
                    </FieldLabel>
                  )}
                  {hasStrength && (
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          strengtLabelVariants({
                            size,
                            strength,
                          })
                        )}
                      >
                        {strengthText}
                      </span>
                      <div className={cn(thermometerVariants({ size }))}>
                        <div
                          className={cn(
                            indicatorVariants({
                              strength,
                            })
                          )}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full flex items-center">
                  <FieldControl>
                    <Input
                      onFocus={(_) => setIsFocus(true)}
                      type={isVisible ? "text" : "password"}
                      size={size}
                      placeholder={placeholder}
                      {...field}
                      onBlur={(_) => {
                        field.onBlur();
                        setIsFocus(false);
                      }}
                    />
                  </FieldControl>
                </div>
              </div>
              <button
                className="block"
                type="button"
                onClick={() => {
                  setIsVisible(!isVisible);
                  // setIsFocus(true);
                }}
              >
                {isVisible ? (
                  <EyeSlash variant="Bold" />
                ) : (
                  <Eye variant="Bold" />
                )}
              </button>
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
PasswordFieldItem.displayName = "FormItemPassword";

export { PasswordField };
