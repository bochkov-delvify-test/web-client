import { TaskList } from '../model';
import { ListEntry } from './ListEntry.tsx';
import { createStyles, rem, Text } from '@mantine/core';
import { useState } from 'react';

interface TaskListsProps {
    lists?: TaskList[];
    onOpenList: (list: TaskList) => void;
}

const useStyles = createStyles((theme) => ({
    lists: {
        paddingLeft: `calc(${theme.spacing.md} - ${rem(10)})`,
        paddingRight: `calc(${theme.spacing.md} - ${rem(10)})`,
        paddingBottom: theme.spacing.md,
    },
}));

export const ListOfLists = ({ lists, onOpenList }: TaskListsProps) => {
    const { classes } = useStyles();
    const [selectedListId, setSelectedListId] = useState<number | null>(null);
    const listOfLists = lists?.map((list) => (
        <ListEntry
            key={list.id}
            list={list}
            active={list.id === selectedListId}
            onClick={() => {
                setSelectedListId(list.id);
                onOpenList(list);
            }}
        />
    ));
    return (
        <div className={classes.lists}>
            {listOfLists ? (
                listOfLists
            ) : (
                <Text align="center" size="xs">
                    You don't have any lists yet
                </Text>
            )}
        </div>
    );
};
