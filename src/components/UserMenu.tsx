import {
    Avatar,
    createStyles,
    Group,
    Menu,
    Text,
    UnstyledButton,
    UnstyledButtonProps,
} from '@mantine/core';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import { useJWT, useUser } from '../providers';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {}

export function UserMenu({ ...others }: UserButtonProps) {
    const { classes } = useStyles();
    const { user, removeUser } = useUser();
    const { removeJWT } = useJWT();

    return (
        <>
            <UnstyledButton className={classes.user} {...others}>
                <Group>
                    <Avatar src="https://i.imgur.com/fGxgcDF.png" radius="xl" />
                    <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                            {user!.email}
                        </Text>
                        <Text color="dimmed" size="xs">
                            Current User
                        </Text>
                    </div>
                    <Menu>
                        <Menu.Target>
                            <IconChevronRight size="0.9rem" stroke={1.5} />
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Application</Menu.Label>
                            <Menu.Item
                                icon={<IconLogout size={14} />}
                                onClick={() => {
                                    removeUser();
                                    removeJWT();
                                }}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </UnstyledButton>
        </>
    );
}
