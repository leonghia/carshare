import { MouseEventHandler } from 'react';
import classes from './NextButton.module.scss';
import { Button } from '@mantine/core';

export default function NextButton({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Button
      onClick={onClick}
      classNames={{
        root: classes.buttonRoot,
        label: classes.buttonLabel,
      }}
    >
      Tiếp theo
    </Button>
  );
}
