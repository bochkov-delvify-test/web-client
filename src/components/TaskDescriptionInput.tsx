import {
    ActionIcon,
    Button,
    MantineSize,
    Popover,
    Stack,
    Textarea,
    Tooltip,
} from '@mantine/core';
import { IconNotes } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface TaskDescriptionInputProps {
    initial?: string;
    onSubmit: (value: string) => void;
    clearOnSubmit?: boolean;
    size?: MantineSize;
}

export const TaskDescriptionInput = ({
    initial,
    onSubmit,
    size = 'md',
}: TaskDescriptionInputProps) => {
    const [description, setDescription] = useState<string>(initial || '');
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        setDescription(initial || '');
    }, [initial]);

    return (
        <Popover width={400} position="bottom-end" withArrow shadow="md">
            <Popover.Target>
                <Tooltip label="Task notes">
                    <ActionIcon size={size} color={initial ? 'green' : 'gray'}>
                        <IconNotes />
                    </ActionIcon>
                </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
                <Stack>
                    <Textarea
                        autosize
                        label={'Task description'}
                        value={description}
                        onChange={(event) => {
                            setIsSaved(false);
                            setDescription(event.currentTarget.value);
                        }}
                        placeholder="Add description"
                    />
                    <Button
                        onClick={() => {
                            onSubmit(description);
                            setIsSaved(true);
                        }}
                    >
                        {isSaved ? 'Saved!' : 'Save'}
                    </Button>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    );
};
