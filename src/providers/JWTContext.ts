import { createContext, useContext } from 'react';

function noop() {
    return;
}

interface JWTContextProps {
    jwt: string | null;
    storeJWT: (jwt: string) => void;
    removeJWT: () => void;
}

export const JWTContext = createContext<JWTContextProps>({
    jwt: null,
    storeJWT: noop,
    removeJWT: noop,
});

export const useJWT = (): JWTContextProps => {
    const context = useContext(JWTContext);
    if (context === undefined) {
        throw new Error('useJWT must be used within a JWTProvider');
    }
    return context;
};
