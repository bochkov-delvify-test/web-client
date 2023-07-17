import { Page } from '../../components';
import { ListOfListsTab } from './ListOfListsTab.tsx';
import { useState } from 'react';
import { ListOfTasksPage } from './ListOfTasksPage.tsx';
import { ListsProvider } from '../../providers/ListsProvider.tsx';
import { useLists } from '../../providers/ListsContext.ts';

export const ToDoHome = () => {
    const { lists, addList, updateList, removeList } = useLists();
    const [openedListId, setOpenedListId] = useState<number | null>(null);

    return (
        <Page
            navbar={
                <ListOfListsTab
                    lists={lists}
                    onAddList={addList}
                    onOpenList={(t) => setOpenedListId(t.id)}
                />
            }
        >
            {openedListId && (
                <ListOfTasksPage
                    listId={openedListId}
                    onRemoveList={(params) => {
                        setOpenedListId(null);
                        removeList(params);
                    }}
                    onUpdateList={updateList}
                />
            )}
        </Page>
    );
};

export const ToDoHomeWithProvider = () => {
    return (
        <ListsProvider>
            <ToDoHome />
        </ListsProvider>
    );
};
