import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { ModalProps } from '@mantine/core/lib/Modal/Modal';
import { useForm } from '@mantine/form';
import { CreateTaskListParams } from '../endpoints.ts';

export interface CreateListModalProps extends ModalProps {
    onCreateList: (params: CreateTaskListParams) => void;
}

export const CreateListModal = ({
    opened,
    onClose,
    onCreateList,
}: CreateListModalProps) => {
    const form = useForm({
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) =>
                value.trim().length > 0 ? null : 'Title is required',
        },
    });

    return (
        <Modal opened={opened} onClose={onClose} title="Create a List">
            <form
                onSubmit={form.onSubmit((arg) => {
                    onCreateList(arg);
                    form.reset();
                })}
            >
                <Stack>
                    <TextInput
                        required
                        label="Title"
                        placeholder="🚀 My favourite tasks"
                        value={form.values.title}
                        onChange={(event) =>
                            form.setFieldValue(
                                'title',
                                event.currentTarget.value,
                            )
                        }
                        error={form.errors.title && 'Invalid title'}
                        radius="md"
                    />
                </Stack>

                <Group position="apart" mt="xl">
                    <Button type="submit" radius="xl">
                        Submit
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};
