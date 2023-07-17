import { ActionIcon, createStyles, Group, Text } from '@mantine/core';
import {
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing.md} ${theme.spacing.md}`,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
        },
    },
}));

export function TodoFooter() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Text size="sm">Delvify To Do App 2023</Text>

            <Group spacing="xs" position="right" noWrap>
                <ActionIcon
                    size="lg"
                    variant="default"
                    radius="xl"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/bochkov-alexej/"
                >
                    <IconBrandLinkedin size="1.05rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                    size="lg"
                    variant="default"
                    radius="xl"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/AJIJIi"
                >
                    <IconBrandGithub size="1.05rem" stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                    size="lg"
                    variant="default"
                    radius="xl"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/bochkov.alexej/?hl=en"
                >
                    <IconBrandInstagram size="1.05rem" stroke={1.5} />
                </ActionIcon>
            </Group>
        </div>
    );
}
