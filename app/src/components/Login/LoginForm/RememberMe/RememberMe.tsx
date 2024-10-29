import React, { Key, useContext } from 'react';
import classes from './RememberMe.module.scss';
import { Checkbox } from '@mantine/core';
import { CheckboxIcon } from '@/components/CheckboxIcon/CheckboxIcon';
import { RememberMeContext } from '../RememberMeContext';

export default function RememberMe({
  isChecked,
  keyVal,
  ...props
}: {
  isChecked: boolean;
  keyVal: Key;
}) {
  return (
    <RememberMeContext.Provider value={{ isChecked: isChecked }}>
      <Checkbox
        icon={SpecificCheckboxIcon}
        label="Ghi nhớ tôi"
        classNames={{
          root: classes.rememberMeChecboxRoot,
          inner: classes.checkboxInner,
          input: classes.checkboxInput,
          label: classes.checkboxLabel,
          icon: classes.checkboxIcon,
        }}
        key={keyVal}
        {...props}
      />
    </RememberMeContext.Provider>
  );
}

const SpecificCheckboxIcon: React.FC<{ className: string; indeterminate: boolean | undefined }> = ({
  className,
  indeterminate,
}) => {
  const { isChecked } = useContext(RememberMeContext);

  return <CheckboxIcon className={className} indeterminate={indeterminate} isChecked={isChecked} />;
};
