import { createStyles, rem, UnstyledButton } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons-react';
import { TaskList } from '../model';

interface EntryProps {
    active: boolean;
}

const useStyles = createStyles((theme, { active }: EntryProps) => ({
    entries: {
        paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingBottom: theme.spacing.md,
    },

    entry: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: theme.fontSizes.xs,
        padding: `${rem(8)} ${theme.spacing.xs}`,
        border: '1px solid',
        borderColor: active ? theme.colors['ocean-blue'][5] : 'transparent',
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    entryInner: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },

    entryIcon: {
        marginRight: theme.spacing.sm,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
    },

    entryBadge: {
        padding: 0,
        width: rem(20),
        height: rem(20),
        pointerEvents: 'none',
    },
}));

interface ListEntryProps {
    list: TaskList;
    active: boolean;
    onClick?: (id: number) => void;
}

export const ListEntry = ({ list, active, onClick }: ListEntryProps) => {
    const { classes } = useStyles({ active });

    return (
        <UnstyledButton
            className={classes.entry}
            onClick={() => onClick && onClick(list.id)}
        >
            <div className={classes.entryInner}>
                <IconCheckbox
                    size={20}
                    className={classes.entryIcon}
                    stroke={1.5}
                />
                <span>{list.title}</span>
            </div>
        </UnstyledButton>
    );
};
