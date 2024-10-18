import classes from './PublishedDatePickerInput.module.scss';
import { Calendar } from 'iconsax-react';
import { DatePickerInput, DateValue } from '@mantine/dates';

export default function PublishedDatePickerInput({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (d: DateValue) => void;
}) {
  const icon = <Calendar variant="Bold" />;

  return (
    <DatePickerInput
      rightSection={icon}
      rightSectionPointerEvents="none"
      valueFormat="DD/MM/YYYY"
      id="published_date"
      placeholder="Nhập ngày cấp CCCD..."
      value={value}
      onChange={onChange}
      classNames={{
        input: classes.input,
        wrapper: classes.wrapper,
        placeholder: classes.placeholder,
        section: classes.section,
      }}
      popoverProps={{
        classNames: {
          dropdown: classes['popover-dropdown'],
        },
      }}
    />
  );
}
