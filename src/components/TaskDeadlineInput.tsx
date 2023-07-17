import { ActionIcon, MantineSize, Popover, Tooltip } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { DateTimePicker, DateValue } from '@mantine/dates';
import { ReactNode } from 'react';

interface TaskDeadlineInputProps {
    value: DateValue;
    onChange: (deadline: DateValue) => void;
    error?: ReactNode;
    size?: MantineSize;
    customButton?: ReactNode;
}

export const TaskDeadlineInput = ({
    value,
    onChange,
    error,
    size = 'md',
    customButton,
}: TaskDeadlineInputProps) => {
    return (
        <Popover position="bottom-end">
            <Popover.Target>
                {customButton ? (
                    customButton
                ) : (
                    <Tooltip label="Set deadline">
                        <ActionIcon
                            color={value ? (error ? 'red' : 'green') : 'gray'}
                            size={size}
                        >
                            <IconCalendar />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Popover.Target>
            <Popover.Dropdown
                onMouseDown={(event) => event.preventDefault()}
                data-dates-dropdown
            >
                <DateTimePicker
                    value={value}
                    onChange={onChange}
                    placeholder="Click to set a deadline for the task"
                    error={error}
                />
            </Popover.Dropdown>
        </Popover>
    );
};
