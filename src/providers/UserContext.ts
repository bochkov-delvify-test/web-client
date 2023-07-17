import { createContext, useContext } from 'react';
import { User } from '../model';
import { noop } from '../lib';

interface UserContextProps {
    user: User | null;
    storeUser: (user: User) => void;
    removeUser: () => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    storeUser: noop,
    removeUser: noop,
});

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
