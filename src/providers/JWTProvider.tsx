import { FC, ReactNode } from 'react';
import { JWTContext } from './JWTContext';
import { useLocalStorage } from '../lib';

export const JWTProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [jwt, setJWT] = useLocalStorage<string | null>({
        keyName: 'jwt',
        defaultValue: null,
    });

    const value = { jwt, storeJWT: setJWT, removeJWT: () => setJWT(null) };
    return <JWTContext.Provider value={value}>{children}</JWTContext.Provider>;
};
