import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { FieldContainer, FieldStyles, textVariants } from "./field-container";
import { useField } from "./field";
import { FieldUpper } from "./field-upper";
import { FieldLabel } from "./field-label";
import { FieldInput } from "./field-input";
import { FieldLower } from "./field-lower";
import { useMediaQuery } from "react-responsive";
import { FieldInner } from "./field-inner";
import { cn } from "@/utils/styling";

export type Item = {
  id: string;
  content: string;
};

interface AutoCompleteFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  leftIcon?: React.ReactNode;
  leftText?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  classNames?: FieldStyles;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  items: Item[];
  onClear: () => void;
  onSelectItem: (id: any) => void;
}

const AutoCompleteField = React.forwardRef<
  HTMLDivElement,
  AutoCompleteFieldProps
>(
  (
    {
      classNames,
      leftIcon,
      leftText,
      inputProps,
      onChange,
      items,
      onClear,
      onSelectItem,
      ...props
    },
    ref
  ) => {
    const { isFocus } = useField();
    const is2K = useMediaQuery({ minWidth: 2560 });
    const is4K = useMediaQuery({ minWidth: 3840 });
    const is8K = useMediaQuery({ minWidth: 7680 });

    let sideOffset = 16;
    if (is2K) sideOffset = 20;
    if (is4K) sideOffset = 28;
    if (is8K) sideOffset = 64;

    const { label, size, fieldInputId, name, control, setValue, resetField } =
      useField();

    const handleClear = () => {
      resetField(name);
      onClear();
    };

    return (
      <FieldContainer
        ref={ref}
        className={cn(classNames?.container)}
        {...props}
      >
        <Popover open={isFocus && items.length > 0}>
          <PopoverAnchor asChild>
            <FieldUpper className={cn(classNames?.upper)}>
              <FieldInner>
                {leftIcon}
                <div className="flex-1 space-y-1">
                  {label && <FieldLabel />}
                  <div className="w-full flex items-center gap-2">
                    {leftText && (
                      <span className={cn(textVariants({ size }))}>
                        {leftText}
                      </span>
                    )}
                    <FieldInput
                      control={control}
                      fieldName={name}
                      id={fieldInputId}
                      className="flex-1 min-w-0"
                      onChange={onChange}
                      {...inputProps}
                    />
                  </div>
                </div>
                <button
                  key="clear"
                  className="opacity-0 group-focus-within:opacity-100"
                  type="button"
                  onClick={handleClear}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </FieldInner>
            </FieldUpper>
          </PopoverAnchor>
          <PopoverContent
            side="bottom"
            sideOffset={sideOffset}
            align="start"
            className="PopoverContent"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandList>
                <CommandEmpty>Không có kết quả nào</CommandEmpty>
                <CommandGroup>
                  {items.map((item, i) => (
                    <React.Fragment key={item.id}>
                      <CommandItem
                        value={item.id}
                        onSelect={(value) => {
                          const selected = items.find(
                            (item) => item.id === value
                          );
                          selected &&
                            setValue(name, item.content, {
                              shouldDirty: true,
                            });
                          onSelectItem(value);
                        }}
                      >
                        {item.content}
                      </CommandItem>
                      {i !== items.length - 1 && (
                        <div className="h-px border-b border-divider mx-3 sm:mx-2 border-dashed"></div>
                      )}
                    </React.Fragment>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FieldLower className={cn(classNames?.lower)} />
      </FieldContainer>
    );
  }
);

export { AutoCompleteField };
