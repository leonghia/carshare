import React, { Key, useContext } from 'react';
import classes from './Assurance.module.scss';
import { Checkbox } from '@mantine/core';
import { CheckboxIcon } from '@/components/CheckboxIcon/CheckboxIcon';
import { AssuranceContext } from './AssuranceContext';

export default function Assurance({
  isChecked,
  keyVal,
  ...props
}: {
  isChecked: boolean;
  keyVal: Key;
}) {
  return (
    <AssuranceContext.Provider value={{ isChecked: isChecked }}>
      <Checkbox
        {...props}
        key={keyVal}
        icon={SpecificCheckboxIcon}
        label="Tôi cam đoan những thông tin được kê khai ở trên là đúng sự thật. Nếu sai, tôi sẵn sàng chịu mọi trách nhiệm liên quan."
        classNames={{
          root: classes.checkboxRoot,
          inner: classes.checkboxInner,
          input: classes.checkboxInput,
          label: classes.checkboxLabel,
          error: classes.checkboxError,
          icon: classes.checkboxIcon,
        }}
      />
    </AssuranceContext.Provider>
  );
}

const SpecificCheckboxIcon: React.FC<{ className: string; indeterminate: boolean | undefined }> = ({
  className,
  indeterminate,
}) => {
  const { isChecked } = useContext(AssuranceContext);
  return <CheckboxIcon className={className} isChecked={isChecked} indeterminate={indeterminate} />;
};
