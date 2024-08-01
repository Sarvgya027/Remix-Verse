import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { Link } from '@remix-run/react';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { ButtonComponent } from '../Button/Button';
import { User } from '~/utils/types';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];


type NavbarProps = {
  user: User | null;
};

export function Navbar({ user }: NavbarProps) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  // const links = mockdata.map((item) => (
  //   <UnstyledButton className={classes.subLink} key={item.title}>
  //     <Group wrap="nowrap" align="flex-start">
  //       <ThemeIcon size={34} variant="default" radius="md">
  //         <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
  //       </ThemeIcon>
  //       <div>
  //         <Text size="sm" fw={500}>
  //           {item.title}
  //         </Text>
  //         <Text size="xs" c="dimmed">
  //           {item.description}
  //         </Text>
  //       </div>
  //     </Group>
  //   </UnstyledButton>
  // ));

  return (
    <Box pb={10}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link className={classes.logo} to='/'>Remix Verse</Link>

          <Group visibleFrom="sm">
            {user ? (
              <Link to='/logout'><ButtonComponent variant="gradient" gradient={{ from: "pink", to: "yellow" }}>Log out</ButtonComponent></Link>
            ) : (
              <>
                <Link to='/login'>
                  <ButtonComponent variant="default">Log in</ButtonComponent>
                </Link>
                <Link to='/register'>
                  <ButtonComponent variant="gradient" gradient={{ from: "pink", to: "yellow" }}>Sign up</ButtonComponent>
                </Link>
              </>
            )}
            <ColorSchemeToggle />
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Stack
            justify="center"
            align='center'
            gap='10'
            pb="xl"
            pt="xl"
            styles={{
              root: {
                borderTop: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
              }
            }}
          >
            {user ? (
              <Link to='/logout'><ButtonComponent variant="gradient" gradient={{ from: "pink", to: "yellow" }}>Log out</ButtonComponent></Link>
            ) : (
              <>
                <Link style={{ width: '50%' }} to='/login' onClick={closeDrawer}>
                  <ButtonComponent w='100%'>Log in</ButtonComponent>
                </Link>
                <Link style={{ width: '50%' }} to='/register' onClick={closeDrawer}>
                  <ButtonComponent w='100%'>Register</ButtonComponent>
                </Link>
              </>
            )}
            <ColorSchemeToggle />
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
