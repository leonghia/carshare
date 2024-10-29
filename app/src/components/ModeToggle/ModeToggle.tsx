import { useState } from 'react';
import classes from './ModeToggle.module.scss';
import { Moon, Sun1 } from 'iconsax-react';
import { Button, useMantineColorScheme } from '@mantine/core';

export default function ModeToggle({ className }: { className?: string }) {
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
      className={className || ''}
    >
      {colorScheme === 'light' ? <Moon variant="Outline" /> : <Sun1 variant="Outline" />}
    </Button>
  );
}
