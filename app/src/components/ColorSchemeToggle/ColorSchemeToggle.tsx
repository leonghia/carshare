import classes from './ColorSchemeToggle.module.scss';
import { Moon, Sun1 } from 'iconsax-react';
import { Button, MantineColorScheme, useMantineColorScheme } from '@mantine/core';

function Markup({ colorScheme }: { colorScheme: MantineColorScheme }) {
  if (colorScheme === 'light') return <Moon variant="Outline" className={classes.icon} />;
  else if (colorScheme === 'dark') return <Sun1 variant="Outline" className={classes.icon} />;
  return <Moon variant="Bold" className={classes.icon} />;
}

export default function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Button
      onClick={toggleColorScheme}
      classNames={{
        root: classes.secondaryButtonRoot,
      }}
    >
      <Markup colorScheme={colorScheme} />
    </Button>
  );
}
