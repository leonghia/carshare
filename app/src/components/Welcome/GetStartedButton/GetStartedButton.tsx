import classes from './GetStartedButton.module.scss';
import { Button } from '@mantine/core';

export default function GetStartedButton() {
  return (
    <Button
      component="a"
      href="/"
      variant="gradient"
      classNames={{
        root: classes.root,
        label: classes.label,
      }}
    >
      Bắt đầu
    </Button>
  );
}
