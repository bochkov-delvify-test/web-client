import { Group, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { TaskList } from '../model';
import { DateValue } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { CreateTaskParams } from '../endpoints.ts';
import { nonEmptyValidator } from '../lib/validators.ts';
import { TaskDescriptionInput } from './TaskDescriptionInput.tsx';
import { TaskDeadlineInput } from './TaskDeadlineInput.tsx';

interface CreateTaskInputProps {
    list: TaskList;
    className?: string;
    onCreateTask: (params: CreateTaskParams) => void;
}

interface FormValues {
    title: string;
    description: string;
    deadline: DateValue;
}

export const CreateTaskInput = ({
    list,
    className,
    onCreateTask,
}: CreateTaskInputProps) => {
    const addTaskPlaceholder = `Add task to ${list.title}, press Enter to save`;
    const form = useForm<FormValues>({
        initialValues: {
            title: '',
            description: '',
            deadline: null,
        },
        validate: {
            title: nonEmptyValidator,
            deadline: (value) =>
                value && value < new Date()
                    ? "Deadline can't be in the past"
                    : null,
        },
    });

    const rightSection = (
        <Group position="apart">
            <TaskDescriptionInput
                initial={form.values.description}
                onSubmit={(description) =>
                    form.setFieldValue('description', description)
                }
                size="sm"
            />
            <TaskDeadlineInput
                value={form.values.deadline}
                onChange={(deadline) =>
                    form.setFieldValue('deadline', deadline)
                }
                error={form.errors.deadline}
                size="sm"
            />
        </Group>
    );
    return (
        <TextInput
            className={className}
            placeholder={addTaskPlaceholder}
            icon={<IconPlus size="0.8rem" />}
            value={form.values.title}
            onChange={(event) =>
                form.setFieldValue('title', event.currentTarget.value)
            }
            onKeyUp={(event) => {
                if (event.key !== 'Enter' || form.validate().hasErrors) return;
                onCreateTask({ ...form.values, list_id: list.id });
                form.reset();
            }}
            rightSection={rightSection}
            rightSectionWidth={100}
            error={form.errors.title || form.errors.deadline}
        />
    );
};
