import { Key, useContext, useState } from 'react';
import classes from './Assurance.module.scss';
import { Checkbox } from '@mantine/core';
import AnimatedTick from '@/components/AnimatedTick/AnimatedTick';
import { AssuranceContext } from './AssuranceContext';

export default function Assurance({
  keyVal,
  isChecked,
  ...props
}: {
  keyVal: Key;
  isChecked: boolean;
}) {
  return (
    <AssuranceContext.Provider
      value={{
        isChecked: isChecked,
      }}
    >
      <Checkbox
        {...props}
        key={keyVal}
        icon={CheckboxIcon}
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

const CheckboxIcon: React.FC<{
  indeterminate: boolean | undefined;
  className: string;
}> = ({ indeterminate, className }) => {
  const { isChecked } = useContext(AssuranceContext);

  return <AnimatedTick className={className} isChecked={isChecked} />;
};
