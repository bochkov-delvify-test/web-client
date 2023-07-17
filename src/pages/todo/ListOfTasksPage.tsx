import {
    ActionIcon,
    createStyles,
    Group,
    Loader,
    rem,
    Space,
    Title,
} from '@mantine/core';
import {
    CreateTaskInput,
    EditableTextInput,
    ListOfTasks,
} from '../../components';
import { IconTrash } from '@tabler/icons-react';
import {
    CreateTaskParams,
    createTaskRequest,
    DeleteTaskListParams,
    deleteTasksRequest,
    getTaskListRequest,
    UpdateTaskListParams,
    UpdateTaskParams,
    updateTaskRequest,
    updateTasksParentRequest,
} from '../../endpoints.ts';
import { Task, TaskList } from '../../model';
import { useEffect, useState } from 'react';

interface ListOfTasksPageProps {
    listId: number;
    onUpdateList: (params: UpdateTaskListParams) => void;
    onRemoveList: (params: DeleteTaskListParams) => void;
}

const useStyles = createStyles((theme) => ({
    list: {
        paddingLeft: `calc(${theme.spacing.md} - ${rem(10)})`,
        paddingRight: `calc(${theme.spacing.md} - ${rem(10)})`,
        paddingBottom: theme.spacing.md,
    },
    newTask: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
}));

export const ListOfTasksPage = ({
    listId,
    onUpdateList,
    onRemoveList,
}: ListOfTasksPageProps) => {
    const { classes } = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState<TaskList | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getTaskListRequest({ id: listId })
            .then(setList)
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, [listId]);

    const onAddTask = (params: CreateTaskParams) => {
        createTaskRequest(params)
            .then((task) => {
                if (!list) return;
                setList({
                    ...list,
                    tasks: [...list.tasks, task],
                });
            })
            .catch(console.error);
    };

    const onUpdateTask = (params: UpdateTaskParams) => {
        updateTaskRequest(params)
            .then((updated) => {
                if (!list) return;
                setList({
                    ...list,
                    tasks: list.tasks.map((t) =>
                        t.id === updated.id ? updated : t,
                    ),
                });
            })
            .catch(console.error);
    };

    const onMoveTasks = (tasks: Task[], to: number) => {
        if (to === listId) return;
        updateTasksParentRequest({
            new_parent_id: to,
            body: { tasks_id: tasks.map((t) => t.id) },
        })
            .then(() => {
                if (!list) return;
                setList({
                    ...list,
                    tasks: list.tasks.filter((t) => !tasks.includes(t)),
                });
            })
            .catch(console.error);
    };

    const onRemoveTasks = (tasks: Task[]) => {
        deleteTasksRequest({ tasks_id: tasks.map((t) => t.id) })
            .then(() => {
                if (!list) return;
                setList({
                    ...list,
                    tasks: list.tasks.filter((t) => !tasks.includes(t)),
                });
            })
            .catch(console.error);
    };

    return (
        <div className={classes.list}>
            {isLoading && <Loader />}
            {!isLoading && list && (
                <>
                    <Group position="apart">
                        <EditableTextInput
                            initial={list.title}
                            onSubmit={(value) => {
                                onUpdateList({
                                    id: listId,
                                    body: { title: value },
                                });
                                setList({ ...list, title: value });
                            }}
                        >
                            <Title>{list.title}</Title>
                        </EditableTextInput>
                        <ActionIcon
                            onClick={() => onRemoveList({ id: listId })}
                            variant="outline"
                            color="red"
                        >
                            <IconTrash />
                        </ActionIcon>
                    </Group>
                    <CreateTaskInput
                        className={classes.newTask}
                        list={list}
                        onCreateTask={onAddTask}
                    />
                    <Space h="md" />
                    <ListOfTasks
                        tasks={list.tasks}
                        onUpdateTask={onUpdateTask}
                        onMoveTasks={onMoveTasks}
                        onRemoveTasks={onRemoveTasks}
                    />
                </>
            )}
        </div>
    );
};
