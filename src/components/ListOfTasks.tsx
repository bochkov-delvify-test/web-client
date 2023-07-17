import {
    Button,
    Checkbox,
    createStyles,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { TaskItem } from './TaskItem.tsx';
import { Task } from '../model';
import { IconSTurnLeft, IconTrash } from '@tabler/icons-react';
import { useListState } from '@mantine/hooks';
import { UpdateTaskParams } from '../endpoints.ts';
import { MoveTasksSelector } from './MoveTasksSelector.tsx';

interface ListOfTasksProps {
    tasks: Task[];
    onUpdateTask: (params: UpdateTaskParams) => void;
    onMoveTasks: (tasks: Task[], to: number) => void;
    onRemoveTasks: (tasks: Task[]) => void;
}

const useStyles = createStyles(() => ({
    item: {
        flexGrow: 1,
    },
    checkbox: {
        flexShrink: 0,
    },
}));

export const ListOfTasks = ({
    tasks,
    onUpdateTask,
    onMoveTasks,
    onRemoveTasks,
}: ListOfTasksProps) => {
    const { classes } = useStyles();
    const [selectedTasks, selectedTasksHandlers] = useListState<Task>([]);

    const toggleSelectTask = (checked: boolean, task: Task) => {
        if (checked) {
            selectedTasksHandlers.append(task);
        } else {
            const idx = selectedTasks.indexOf(task);
            selectedTasksHandlers.remove(idx);
        }
    };

    return (
        <>
            {!tasks ||
                (tasks.length === 0 && (
                    <Text size="sm" c="dimmed" ta="center">
                        Start by creating some tasks!
                    </Text>
                ))}
            {tasks.length > 0 && (
                <Stack>
                    <Group position="apart">
                        <Text>Tasks</Text>
                        <Group>
                            <MoveTasksSelector
                                from={tasks[0].list_id}
                                onSelect={(listId) => {
                                    onMoveTasks(selectedTasks, listId);
                                    selectedTasksHandlers.setState([]);
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        onRemoveTasks(selectedTasks);
                                        selectedTasksHandlers.setState([]);
                                    }}
                                    color="ocean-blue"
                                    size="sm"
                                    disabled={selectedTasks.length === 0}
                                    leftIcon={<IconSTurnLeft />}
                                >
                                    Move Tasks
                                </Button>
                            </MoveTasksSelector>
                            <Button
                                onClick={() => {
                                    onRemoveTasks(selectedTasks);
                                    selectedTasksHandlers.setState([]);
                                }}
                                color="red"
                                size="sm"
                                disabled={selectedTasks.length === 0}
                                leftIcon={<IconTrash />}
                            >
                                Delete Tasks
                            </Button>
                        </Group>
                    </Group>
                    <Stack>
                        {tasks.map((task) => (
                            <Group key={task.id}>
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={selectedTasks.includes(task)}
                                    onChange={(e) => {
                                        toggleSelectTask(
                                            e.target.checked,
                                            task,
                                        );
                                    }}
                                />
                                <TaskItem
                                    task={task}
                                    onUpdateTask={onUpdateTask}
                                />
                            </Group>
                        ))}
                    </Stack>
                </Stack>
            )}
        </>
    );
};
