import { Key } from 'react';
import classes from './PublishedDatePickerInput.module.scss';
import { Calendar } from 'iconsax-react';
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
  const icon = <Calendar variant="Bold" />;

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
        root: classes.root,
        input: classes.input,
        wrapper: classes.wrapper,
        error: classes.error,
        placeholder: classes.placeholder,
        section: classes.section,
        day: classes.day,
      }}
      popoverProps={{
        classNames: {
          dropdown: classes.popoverDropdown,
        },
      }}
      {...props}
      onChange={onChange}
      value={date}
    />
  );
}
