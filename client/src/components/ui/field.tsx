import { VariantProps } from "class-variance-authority";
import { FieldContainer, field__containerVariants } from "./fieldContainer";
import React, { ComponentPropsWithRef } from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

interface FieldContextType
  extends Pick<VariantProps<typeof field__containerVariants>, "size"> {
  onFocus: () => void;
  onBlur: () => void;
  fieldInputId: string;
  fieldDescriptionId: string;
  fieldMessageId: string;
  label?: string;
  required?: boolean;
  description?: string;
  isFocus: boolean;
  id: string;
  name: string;
}

const FieldContext = React.createContext<FieldContextType | null>(null);

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ComponentPropsWithRef<"div">,
    Pick<VariantProps<typeof field__containerVariants>, "size"> {
  label?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  name: TName;
}

const Field = <TFieldValues extends FieldValues>({
  label,
  required,
  description,
  size,
  name,
  ...props
}: FieldProps<TFieldValues>) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const id = React.useId();

  return (
    <FieldContext.Provider
      value={{
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        fieldInputId: `${id}-field-input`,
        fieldDescriptionId: `${id}-field-description`,
        fieldMessageId: `${id}-field-message`,
        label,
        required,
        description,
        isFocus,
        id,
        size,
        name,
      }}
    >
      <FieldContainer {...props} />
    </FieldContext.Provider>
  );
};

const useField = () => {
  const fieldContext = React.useContext(FieldContext);
  if (!fieldContext) {
    throw new Error("useField must be used within FieldContext.Provider");
  }

  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return { ...fieldContext, ...fieldState };
};

export { Field, FieldContext, useField };
