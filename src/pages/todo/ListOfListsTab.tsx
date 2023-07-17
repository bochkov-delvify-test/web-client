import {
    ActionIcon,
    createStyles,
    Group,
    Navbar,
    rem,
    Text,
    TextInput,
    Tooltip,
} from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { CreateListModal, ListOfLists, UserMenu } from '../../components';
import { TaskList } from '../../model';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { CreateTaskListParams } from '../../endpoints.ts';

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0,
    },

    section: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        marginBottom: theme.spacing.md,

        '&:not(:last-of-type)': {
            borderBottom: `${rem(1)} solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3]
            }`,
        },
    },

    searchCode: {
        fontWeight: 700,
        fontSize: rem(10),
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        border: `${rem(1)} solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[2]
        }`,
    },

    lists: {
        paddingLeft: `calc(${theme.spacing.md} - ${rem(10)})`,
        paddingRight: `calc(${theme.spacing.md} - ${rem(10)})`,
        paddingBottom: theme.spacing.md,
    },

    listsHeader: {
        paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
        paddingRight: theme.spacing.md,
        marginBottom: rem(5),
    },
}));

export interface ListOfListsTabProps {
    lists?: TaskList[];
    onAddList: (params: CreateTaskListParams) => void;
    onOpenList: (list: TaskList) => void;
}

export function ListOfListsTab({
    lists,
    onAddList,
    onOpenList,
}: ListOfListsTabProps) {
    const { classes } = useStyles();
    const [showCreateListDialog, createListDialog] = useDisclosure(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedTaskLists, setDisplayedTaskLists] = useState(lists);

    useEffect(() => {
        const result = lists?.filter((taskList) =>
            taskList.title.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setDisplayedTaskLists(result);
    }, [lists, searchTerm]);

    return (
        <>
            <Navbar
                height={700}
                width={{ sm: 300 }}
                p="md"
                className={classes.navbar}
            >
                <Navbar.Section className={classes.section}>
                    <UserMenu />
                </Navbar.Section>
                <TextInput
                    placeholder="Search"
                    size="xs"
                    icon={<IconSearch size="0.8rem" stroke={1.5} />}
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.currentTarget.value)
                    }
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    mb="sm"
                />

                <Navbar.Section className={classes.section}>
                    <Group className={classes.listsHeader} position="apart">
                        <Text size="xs" weight={500} color="dimmed">
                            Lists
                        </Text>
                        <Tooltip label="Create list" withArrow position="right">
                            <ActionIcon
                                variant="default"
                                size={18}
                                onClick={createListDialog.open}
                            >
                                <IconPlus size="0.8rem" stroke={1.5} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    <ListOfLists
                        lists={displayedTaskLists ?? []}
                        onOpenList={onOpenList}
                    />
                </Navbar.Section>
            </Navbar>
            <CreateListModal
                opened={showCreateListDialog}
                onClose={createListDialog.close}
                onCreateList={(form) => {
                    createListDialog.close();
                    onAddList(form);
                }}
            />
        </>
    );
}
