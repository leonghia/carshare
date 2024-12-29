import { cn } from "@/lib/utils";

import {
  DayPicker,
  DayPickerProps,
  getDefaultClassNames,
} from "react-day-picker";
import { vi } from "react-day-picker/locale";
import "react-day-picker/style.css";

export function Calendar({
  classNames: {
    root,
    month_caption,
    caption_label,
    day_button,
    ...classNames
  } = {},
  ...props
}: DayPickerProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={vi}
      classNames={{
        root: cn(defaultClassNames.root, root),
        month_caption: cn(defaultClassNames.month_caption, month_caption),
        caption_label: cn(defaultClassNames.caption_label, caption_label),
        day_button: cn(defaultClassNames.day_button, day_button),
        ...classNames,
      }}
      {...props}
    />
  );
}
