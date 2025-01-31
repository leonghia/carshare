import { cva } from "class-variance-authority";
import React from "react";
import { useField } from "./field";
import { calculatePasswordStrength, cn } from "@/lib/utils";
import { Eye, EyeSlash } from "iconsax-react";
import { FieldLabel } from "./fieldLabel";
import { FieldInput } from "./fieldInput";
import { FieldContainer, FieldStyles } from "./fieldContainer";
import { FieldUpper } from "./fieldUpper";
import { FieldLower } from "./fieldLower";
import { FieldInner } from "./fieldInner";

const innerVariants = cva(undefined, {
  variants: {
    size: {
      default: "gap-6",
      small: "gap-5",
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

const indicatorVariants = cva(
  "h-full block transition-all duration-300 ease-out",
  {
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
  }
);

const strengthTextVariants = cva("font-normal w-max", {
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

type Strength = "default" | "weak" | "average" | "strong";
type StrengthText = "Độ mạnh" | "Yếu" | "Trung bình" | "Mạnh";

const strengths: Record<Strength, [Strength, StrengthText]> = {
  default: ["default", "Độ mạnh"],
  weak: ["weak", "Yếu"],
  average: ["average", "Trung bình"],
  strong: ["strong", "Mạnh"],
};

interface PasswordFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  visibleIcon?: React.ReactNode;
  invisibleIcon?: React.ReactNode;
  maxLength: number;
  placeholder?: string;
  hasStrength?: boolean;
  classNames?: FieldStyles;
}

const PasswordField = React.forwardRef<HTMLDivElement, PasswordFieldProps>(
  (
    {
      visibleIcon = <Eye variant="Bold" />,
      invisibleIcon = <EyeSlash variant="Bold" />,
      maxLength,
      placeholder,
      hasStrength = false,
      classNames,
      ...props
    },
    ref
  ) => {
    const { label, size, fieldInputId, name, control } = useField();
    const [isVisible, setIsVisible] = React.useState(false);
    const [strength, setStrength] = React.useState<Strength>("default");

    return (
      <FieldContainer
        ref={ref}
        className={cn(classNames?.container)}
        {...props}
      >
        <FieldUpper className={cn(classNames?.upper)}>
          <FieldInner className={cn(innerVariants({ size }))}>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                {label && <FieldLabel />}
                {hasStrength && (
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(strengthTextVariants({ size, strength }))}
                    >
                      {strengths[strength][1]}
                    </span>
                    <div className={cn(thermometerVariants({ size }))}>
                      <span
                        className={cn(indicatorVariants({ strength }))}
                      ></span>
                    </div>
                  </div>
                )}
              </div>
              <FieldInput
                className="w-full"
                control={control}
                fieldName={name}
                id={fieldInputId}
                type={isVisible ? "text" : "password"}
                placeholder={placeholder}
                maxLength={maxLength}
                onChange={(e) =>
                  setStrength(calculatePasswordStrength(e.target.value))
                }
              />
            </div>
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? invisibleIcon : visibleIcon}
            </button>
          </FieldInner>
        </FieldUpper>
        <FieldLower className={cn(classNames?.lower)} />
      </FieldContainer>
    );
  }
);

export { PasswordField, type Strength };
