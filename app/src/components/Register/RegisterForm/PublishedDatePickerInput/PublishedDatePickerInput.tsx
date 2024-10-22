import { Key } from 'react';
import classes from './PublishedDatePickerInput.module.scss';
import { Calendar1 } from 'iconsax-react';
import { DatePickerInput, DateValue } from '@mantine/dates';

export default function PublishedDatePickerInput({
  date,
  onChange,
  keyValue,
  ...props
}: {
  date: DateValue | null;
  onChange: (d: DateValue) => void;
  keyValue: Key;
}) {
  const icon = <Calendar1 variant="Outline" />;

  // console.log(date);

  return (
    <DatePickerInput
      key={keyValue}
      rightSection={icon}
      rightSectionPointerEvents="none"
      valueFormat="DD/MM/YYYY"
      id="published_date"
      placeholder="Nhập ngày cấp CCCD..."
      classNames={{
        root: classes.datePickerInputRoot,
        input: classes.datePickerInputInput,
        placeholder: classes.datePickerInputPlaceholder,
        section: classes.datePickerInputSection,
        day: classes.datePickerInputDay,
        error: classes.datePickerInputError,
      }}
      {...props}
      onChange={onChange}
      value={date}
      popoverProps={{
        classNames: {
          dropdown: classes.popoverDropdown,
        },
      }}
    />
  );
}
