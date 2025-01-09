import React from "react";
import { useField } from "./field";
import { FieldContainer, FieldStyles } from "./fieldContainer";
import { FieldUpper as Left } from "./fieldUpper";
import { FieldLabel } from "./fieldLabel";
import { FieldInput } from "./fieldInput";
import { FieldLower } from "./fieldLower";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";

interface QuantityFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  max: number;
  min: number;
  placeholder?: string;
  classNames?: FieldStyles;
}

const upperVariants = cva("flex items-center w-full", {
  variants: {
    size: {
      default: "gap-2",
      small: "gap-2",
    },
  },
  defaultVariants: { size: "default" },
});

const rightVariants = cva("flex flex-col", {
  variants: {
    size: {
      default: "gap-2",
      small: "gap-2",
    },
  },
  defaultVariants: { size: "default" },
});

const buttonVariants = cva("text-foreground-500", {
  variants: {
    size: {
      default: "[&_svg]:size-6",
      small: "[&_svg]:size-5",
    },
  },
  defaultVariants: { size: "default" },
});

const QuantityField = React.forwardRef<HTMLDivElement, QuantityFieldProps>(
  ({ max, min, placeholder, classNames, ...props }, ref) => {
    const { label, size, fieldInputId, control, name, getValues, setValue } =
      useField();

    const handleIncrease = () => {
      const currentValue = getValues(name);
      if (isNaN(Number(currentValue))) return;
      if (Number(currentValue) + 1 > max) return;
      setValue(name, String(Number(currentValue) + 1), { shouldDirty: true });
    };

    const handleDecrease = () => {
      const currentValue = getValues(name);
      if (isNaN(Number(currentValue))) return;
      if (Number(currentValue) - 1 < min) return;
      if (Number(currentValue) - 1 === min)
        setValue(name, "", { shouldDirty: true });
      else
        setValue(name, String(Number(currentValue) - 1), { shouldDirty: true });
    };

    return (
      <FieldContainer
        ref={ref}
        className={cn(classNames?.container)}
        {...props}
      >
        <div className={cn(upperVariants({ size }), classNames?.upper)}>
          <Left>
            <div className="w-full space-y-1">
              {label && <FieldLabel />}
              <FieldInput
                control={control}
                fieldName={name}
                id={fieldInputId}
                className="w-full"
                type="text"
                inputMode="numeric"
                max={max}
                min={min}
                placeholder={placeholder}
              />
            </div>
          </Left>
          <div className={cn(rightVariants({ size }))}>
            <button
              type="button"
              className={cn(buttonVariants({ size }))}
              onClick={handleIncrease}
            >
              <ArrowUp2 variant="Bold" />
            </button>
            <button
              type="button"
              className={cn(buttonVariants({ size }))}
              onClick={handleDecrease}
            >
              <ArrowDown2 variant="Bold" />
            </button>
          </div>
        </div>
        <FieldLower className={cn(classNames?.lower)} />
      </FieldContainer>
    );
  }
);

export { QuantityField };
