import { Navigate } from 'react-router-dom';
import { useUser } from '../providers';
import { FC, ReactNode } from 'react';

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useUser();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return children;
};
