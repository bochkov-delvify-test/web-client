import { ReactNode, useEffect, useState } from 'react';
import { Popover, Select, SelectItem } from '@mantine/core';
import { useLists } from '../providers/ListsContext.ts';

interface MoveTasksSelectorProps {
    children: ReactNode;
    from: number;
    onSelect: (listId: number) => void;
}

export const MoveTasksSelector = ({
    children,
    from,
    onSelect,
}: MoveTasksSelectorProps) => {
    const { lists } = useLists();
    const [options, setOptions] = useState<SelectItem[]>([]);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        const newOptions = lists
            .filter((list) => list.id !== from)
            .map((list) => ({
                value: list.id.toString(),
                label: list.title,
            }));
        setOptions(newOptions);
    }, [lists, from]);

    return (
        <Popover position="bottom-end">
            <Popover.Target>{children}</Popover.Target>
            <Popover.Dropdown onMouseDown={(event) => event.preventDefault()}>
                <Select
                    label="Where?"
                    placeholder="Pick a new list"
                    data={options}
                    maxDropdownHeight={400}
                    nothingFound="You don't have any other lists"
                    value={selected}
                    onChange={(value) => {
                        if (!value) return;
                        setSelected(value);
                        onSelect(parseInt(value));
                    }}
                />
            </Popover.Dropdown>
        </Popover>
    );
};
