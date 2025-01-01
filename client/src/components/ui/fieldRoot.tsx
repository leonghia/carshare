import { VariantProps } from "class-variance-authority";
import { fieldVariants } from "./field";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import React from "react";

interface FieldRootContextType
  extends Pick<VariantProps<typeof fieldVariants>, "size"> {
  onFocus: () => void;
  onBlur: () => void;
  fieldInputId: string;
  fieldDescriptionId: string;
  fieldMessageId: string;
  control: Control<any>;
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
  isFocus: boolean;
}

const FieldRootContext = React.createContext<FieldRootContextType | null>(null);

interface FieldRootProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> extends React.PropsWithChildren,
    Pick<VariantProps<typeof fieldVariants>, "size"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
}

const FieldRoot = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  required,
  size,
  description,
  children,
}: FieldRootProps<TFieldValues, TName>) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const id = React.useId();
  const fieldInputId = `${id}-field-input`;
  const fieldDescriptionId = `${id}-field-description`;
  const fieldMessageId = `${id}-field-message`;

  return (
    <FieldRootContext.Provider
      value={{
        onFocus: () => setIsFocus(true),
        onBlur: () => setIsFocus(false),
        fieldInputId,
        fieldDescriptionId,
        fieldMessageId,
        control,
        name,
        label,
        required,
        size,
        description,
        isFocus,
      }}
    >
      {children}
    </FieldRootContext.Provider>
  );
};

const useFieldRoot = () => {
  const fieldRootContext = React.useContext(FieldRootContext);

  if (!fieldRootContext) {
    throw new Error(
      "useFormField has to be used within <FormFieldContext.Provider>"
    );
  }

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldRootContext.name, formState);

  return { ...fieldRootContext, ...fieldState };
};

export { FieldRoot, useFieldRoot };
