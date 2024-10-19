import classes from './GetStartedButton.module.scss';
import { Button } from '@mantine/core';

export default function GetStartedButton() {
  return (
    <Button
      component="a"
      href="/"
      classNames={{
        root: classes.root,
        label: classes.label,
      }}
    >
      Bắt đầu
    </Button>
  );
}
