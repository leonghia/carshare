import { useState } from 'react';
import classes from './ModeToggle.module.scss';
import { Moon } from 'iconsax-react';
import { Button, useMantineColorScheme } from '@mantine/core';

export default function ModeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleClick = () => {
    if (colorScheme === 'light') setColorScheme('dark');
    else setColorScheme('light');
  };

  return (
    <Button
      onClick={handleClick}
      classNames={{
        root: classes.buttonRoot,
        inner: classes.buttonInner,
        label: classes.buttonLabel,
      }}
    >
      <Moon variant="Outline" />
    </Button>
  );
}
