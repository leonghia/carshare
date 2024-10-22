import classes from './GetStartedButton.module.scss';
import { Button } from '@mantine/core';

export default function GetStartedButton() {
  return (
    <Button
      component="a"
      href="/"
      classNames={{
        root: classes.buttonRoot,
        label: classes.buttonLabel,
      }}
    >
      Bắt đầu
    </Button>
  );
}
