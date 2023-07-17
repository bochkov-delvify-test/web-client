import { FC, ReactNode } from 'react';
import { UserContext } from './UserContext.ts';
import { User } from '../model';
import { useLocalStorage } from '../lib';

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useLocalStorage<User | null>({
        keyName: 'user',
        defaultValue: null,
    });

    const value = { user, storeUser: setUser, removeUser: () => setUser(null) };
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
