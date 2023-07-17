import { Task } from '../model';
import {
    ActionIcon,
    Checkbox,
    createStyles,
    Group,
    rem,
    Text,
    UnstyledButton,
} from '@mantine/core';
import { UpdateTaskParams } from '../endpoints.ts';
import { IconCalendarCancel } from '@tabler/icons-react';
import { TaskDescriptionInput } from './TaskDescriptionInput.tsx';
import { TaskDeadlineInput } from './TaskDeadlineInput.tsx';
import { EditableTextInput } from './EditableTextInput.tsx';

interface TaskProps {
    task: Task;
    onUpdateTask: (params: UpdateTaskParams) => void;
}

const useStyles = createStyles((theme) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    item: {
        ...theme.fn.focusStyles(),
        borderRadius: theme.radius.md,
        border: `${rem(1)} solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
        }`,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        flexGrow: 1,
    },

    itemDragging: {
        boxShadow: theme.shadows.sm,
    },
}));

export const TaskItem = ({ task, onUpdateTask }: TaskProps) => {
    const { classes } = useStyles();

    return (
        <div className={classes.item}>
            <Group position="apart">
                <Group>
                    <EditableTextInput
                        initial={task.title}
                        onSubmit={(value) => {
                            onUpdateTask({
                                id: task.id,
                                body: { ...task, title: value },
                            });
                        }}
                        size="xs"
                    >
                        <Text
                            style={{
                                textDecoration: task.is_completed
                                    ? 'line-through'
                                    : 'none',
                            }}
                        >
                            {task.title}
                        </Text>
                    </EditableTextInput>
                    {task.deadline && (
                        <>
                            <Text c="dimmed" italic size={'xs'}>
                                needs to be completed by
                            </Text>
                            <TaskDeadlineInput
                                value={new Date(task.deadline)}
                                onChange={(deadline) =>
                                    onUpdateTask({
                                        id: task.id,
                                        body: { ...task, deadline },
                                    })
                                }
                                customButton={
                                    <UnstyledButton>
                                        <Text
                                            c="dimmed"
                                            size={'xs'}
                                            td="underline"
                                        >
                                            {new Date(
                                                task.deadline,
                                            ).toDateString()}
                                        </Text>
                                    </UnstyledButton>
                                }
                            />
                            <ActionIcon
                                color={'red'}
                                size={'xs'}
                                onClick={() =>
                                    onUpdateTask({
                                        id: task.id,
                                        body: { ...task, deadline: null },
                                    })
                                }
                            >
                                <IconCalendarCancel />
                            </ActionIcon>
                        </>
                    )}
                </Group>

                <Group>
                    <TaskDescriptionInput
                        initial={task.description}
                        onSubmit={(description) =>
                            onUpdateTask({
                                id: task.id,
                                body: {
                                    ...task,
                                    description,
                                },
                            })
                        }
                    />
                    {!task.deadline && (
                        <TaskDeadlineInput
                            value={task.deadline || null}
                            onChange={(deadline) =>
                                onUpdateTask({
                                    id: task.id,
                                    body: { ...task, deadline },
                                })
                            }
                        />
                    )}
                    <Checkbox
                        checked={task.is_completed}
                        onChange={(e) => {
                            const newStatus = e.target.checked;
                            onUpdateTask({
                                id: task.id,
                                body: { ...task, is_completed: newStatus },
                            });
                        }}
                    />
                </Group>
            </Group>
        </div>
    );
};
