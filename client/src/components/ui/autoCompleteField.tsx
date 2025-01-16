import React from "react";
import { cn } from "@/lib/utils";
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
import { FieldContainer, FieldStyles, textVariants } from "./fieldContainer";
import { useField } from "./field";
import { FieldUpper } from "./fieldUpper";
import { FieldLabel } from "./fieldLabel";
import { FieldInput } from "./fieldInput";
import { FieldLower } from "./fieldLower";
import { useMediaQuery } from "react-responsive";

type Place = {
  description: string;
  place_id: string;
};

const places: Place[] = [
  {
    description: "133 Thái Hà, Trung Liệt, Đống Đa, Hà Nội",
    place_id: "1",
  },
  {
    description: "91 Chùa Láng, Láng Thượng, Đống Đa, Hà Nội",
    place_id: "2",
  },
  {
    description: "47 Văn Cao, Liễu Giai, Ba Đình, Hà Nội",
    place_id: "3",
  },
  {
    description: "154 Đội Cấn, Đội Cấn, Ba Đình, Hà Nội",
    place_id: "4",
  },
  {
    description: "41 Nguyễn Bình, Trâu Quỳ, Gia Lâm, Hà Nội",
    place_id: "5",
  },
  {
    description: "8A Tôn Thất Thuyết, Dịch Vọng Hậu, Cầu Giấy, Hà Nội",
    place_id: "6",
  },
  {
    description: "189 Ngọc Hồi, Hoàng Liệt, Hoàng Mai, Hà Nội",
    place_id: "7",
  },
  {
    description: "189 Ngọc Hồi, Hoàng Liệt, Hoàng Mai, Hà Nội",
    place_id: "8",
  },
  {
    description: "189 Ngọc Hồi, Hoàng Liệt, Hoàng Mai, Hà Nội",
    place_id: "9",
  },
];

interface AutoCompleteFieldProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  leftIcon?: React.ReactNode;
  leftText?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  classNames?: FieldStyles;
}

const AutoCompleteField = React.forwardRef<
  HTMLDivElement,
  AutoCompleteFieldProps
>(({ classNames, leftIcon, leftText, inputProps, ...props }, ref) => {
  const { isFocus } = useField();
  const [selectedPlace, setSelectedPlace] = React.useState<Place | null>(null);
  const is2K = useMediaQuery({ minWidth: 2560 });
  const is4K = useMediaQuery({ minWidth: 3840 });
  const is8K = useMediaQuery({ minWidth: 7680 });

  let sideOffset = 16;
  if (is2K) sideOffset = 20;
  if (is4K) sideOffset = 28;
  if (is8K) sideOffset = 64;

  const { label, size, fieldInputId, name, control, setValue } = useField();

  return (
    <FieldContainer ref={ref} className={cn(classNames?.container)} {...props}>
      <Popover open={isFocus}>
        <PopoverAnchor asChild>
          <FieldUpper className={cn(classNames?.upper)}>
            <div className="w-full flex gap-4 items-center">
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
                    {...inputProps}
                  />
                </div>
              </div>
            </div>
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
                {places.map((place, i) => (
                  <React.Fragment key={place.place_id}>
                    <CommandItem
                      value={place.place_id}
                      onSelect={(value) => {
                        const place = places.find((p) => p.place_id === value);
                        place &&
                          setValue(name, place.description, {
                            shouldDirty: true,
                          });
                      }}
                    >
                      {place.description}
                    </CommandItem>
                    {i !== places.length - 1 && (
                      <div className="h-px border-b border-divider mx-2 sm:mx-1 border-dashed"></div>
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
});

export { AutoCompleteField };
