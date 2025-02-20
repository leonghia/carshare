import { VariantProps } from "class-variance-authority";
import { containerVariants } from "./field-container";
import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface FieldContextType
  extends Pick<VariantProps<typeof containerVariants>, "size"> {
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
  control: Control<any>;
}

const FieldContext = React.createContext<FieldContextType | null>(null);

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Pick<VariantProps<typeof containerVariants>, "size"> {
  label?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  name: TName;
  control: Control<TFieldValues>;
}

const Field = <TFieldValues extends FieldValues>({
  label,
  required,
  description,
  size,
  name,
  control,
  children,
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
        control,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
};

const useField = () => {
  const fieldContext = React.useContext(FieldContext);
  if (!fieldContext) {
    throw new Error("useField must be used within FieldContext.Provider");
  }

  const {
    getFieldState,
    formState,
    setError,
    clearErrors,
    getValues,
    setValue,
    resetField,
  } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    ...fieldContext,
    ...fieldState,
    getFieldState,
    setError,
    clearErrors,
    getValues,
    setValue,
    resetField,
  };
};

export { Field, FieldContext, useField };
