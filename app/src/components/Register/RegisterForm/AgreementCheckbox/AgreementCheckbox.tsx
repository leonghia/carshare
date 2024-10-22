import { Key } from 'react';
import classes from './AgreementCheckbox.module.scss';
import { IconCheck, IconMinus } from '@tabler/icons-react';
import { Checkbox, CheckboxProps, useCheckboxGroupContext } from '@mantine/core';

const CheckboxIcon: CheckboxProps['icon'] = ({ indeterminate, ...others }) =>
  indeterminate ? <IconMinus {...others} /> : <IconCheck stroke={2.5} {...others} />;

export default function AgreementCheckbox({ keyVal, ...props }: { keyVal: Key }) {
  return (
    <Checkbox
      key={keyVal}
      label="Tôi cam đoan những thông tin được kê khai ở trên là đúng sự thật. Nếu sai, tôi sẵn sàng chịu mọi trách nhiệm liên quan."
      classNames={{
        root: classes.checkboxRoot,
        inner: classes.checkboxInner,
        input: classes.checkboxInput,
        label: classes.checkboxLabel,
        error: classes.checkboxError,
      }}
      icon={CheckboxIcon}
      {...props}
    />
  );
}
