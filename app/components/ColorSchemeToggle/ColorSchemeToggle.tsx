'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();



  return (
    <Group justify="center" >
      <Button variant='light' color='orange' onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
        {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
      </Button>
    </Group>
  );
}
