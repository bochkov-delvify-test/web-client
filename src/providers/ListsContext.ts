import { createContext, useContext } from 'react';
import { TaskList } from '../model';
import { noop } from '../lib';
import {
    CreateTaskListParams,
    DeleteTaskListParams,
    UpdateTaskListParams,
} from '../endpoints.ts';

interface ListsContextProps {
    lists: TaskList[];
    addList: (params: CreateTaskListParams) => void;
    updateList: (params: UpdateTaskListParams) => void;
    removeList: (params: DeleteTaskListParams) => void;
}

export const ListContext = createContext<ListsContextProps>({
    lists: [],
    addList: noop,
    removeList: noop,
    updateList: noop,
});

export const useLists = (): ListsContextProps => {
    const context = useContext(ListContext);
    if (context === undefined) {
        throw new Error('useLists must be used within a ListsProvider');
    }
    return context;
};
