import { FC, ReactNode, useEffect } from 'react';
import {
    CreateTaskListParams,
    createTaskListRequest,
    DeleteTaskListParams,
    deleteTaskListRequest,
    getTaskListsRequest,
    UpdateTaskListParams,
    updateTaskListRequest,
} from '../endpoints.ts';
import { useListState } from '@mantine/hooks';
import { TaskList } from '../model';
import { ListContext } from './ListsContext.ts';

export const ListsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [taskLists, { append, setState, applyWhere, filter }] =
        useListState<TaskList>([]);

    useEffect(() => {
        getTaskListsRequest()
            .then((lists) => setState(lists))
            .catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addList = (params: CreateTaskListParams) => {
        createTaskListRequest(params)
            .then((list) => append(list))
            .catch(console.error);
    };

    const updateList = (params: UpdateTaskListParams) => {
        updateTaskListRequest(params)
            .then((newList) => {
                applyWhere(
                    (list) => list.id === params.id,
                    () => newList,
                );
            })
            .catch(console.error);
    };

    const removeList = (params: DeleteTaskListParams) => {
        deleteTaskListRequest(params)
            .then(() => {
                filter((list) => list.id !== params.id);
            })
            .catch(console.error);
    };

    const value = { lists: taskLists, addList, updateList, removeList };

    return (
        <ListContext.Provider value={value}>{children}</ListContext.Provider>
    );
};
