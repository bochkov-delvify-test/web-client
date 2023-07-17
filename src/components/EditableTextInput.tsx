import { ActionIcon, Group, MantineSize, TextInput } from '@mantine/core';
import { ReactNode, useState } from 'react';
import { IconPencil } from '@tabler/icons-react';

interface EditableTextInputProps {
    initial?: string;
    onSubmit: (value: string) => void;
    children: ReactNode;
    size?: MantineSize;
}

export const EditableTextInput = ({
    initial,
    onSubmit,
    children,
    size = 'sm',
}: EditableTextInputProps) => {
    const [value, setValue] = useState(initial || '');
    const [edit, setEdit] = useState(false);

    return (
        <Group spacing={'0.2rem'}>
            {edit ? (
                <TextInput
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onKeyUp={(event) => {
                        if (event.key !== 'Enter' || !value) return;
                        onSubmit(value);
                        setEdit(false);
                    }}
                />
            ) : (
                <>
                    {children}
                    <ActionIcon onClick={() => setEdit(true)} size={size}>
                        <IconPencil />
                    </ActionIcon>
                </>
            )}
        </Group>
    );
};
