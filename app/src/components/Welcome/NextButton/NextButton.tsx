import { MouseEventHandler } from 'react';
import classes from './NextButton.module.scss';
import { Button } from '@mantine/core';

export default function NextButton({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Button
      onClick={onClick}
      variant="gradient"
      classNames={{
        root: classes.root,
        label: classes.label,
        section: classes.section,
      }}
    >
      Tiếp theo
    </Button>
  );
}
