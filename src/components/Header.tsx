import { ActionIcon, createStyles, Group, Header, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ThemeToggle } from './ThemeToggle.tsx';
import { IconNotebook } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing.md} ${theme.spacing.md}`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },
}));

export const TodoHeader = () => {
    const { classes } = useStyles();
    return (
        <Header height={60} fixed className={classes.header} px="lg">
            <Group align="center" sx={{ flexShrink: 0 }}>
                <ActionIcon component={Link} to="/" title="Home" size="xl">
                    <IconNotebook size={'2rem'} />
                </ActionIcon>
            </Group>
            <Group>
                <Text
                    variant="gradient"
                    gradient={{ from: 'ocean-blue', to: 'green', deg: 60 }}
                    sx={{
                        fontFamily: 'Greycliff CF, sans-serif',
                        fontSize: '2rem',
                    }}
                    size="xl"
                >
                    To Do List
                </Text>
            </Group>
            <Group>
                <ThemeToggle />
            </Group>
        </Header>
    );
};
