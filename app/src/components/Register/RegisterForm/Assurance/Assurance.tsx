import { Key, useContext, useState } from 'react';
import classes from './Assurance.module.scss';
import { Checkbox } from '@mantine/core';
import AnimatedTick from '@/components/AnimatedTick/AnimatedTick';
import { AssuranceContext } from './AssuranceContext';

export default function Assurance({ keyVal }: { keyVal: Key }) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <AssuranceContext.Provider
      value={{
        isChecked,
        setIsChecked,
      }}
    >
      <Checkbox
        checked={isChecked}
        onChange={(e) => setIsChecked(e.currentTarget.checked)}
        icon={CheckboxIcon}
        label="Tôi cam đoan những thông tin được kê khai ở trên là đúng sự thật. Nếu sai, tôi sẵn sàng chịu mọi trách nhiệm liên quan."
        key={keyVal}
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
