import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Login } from './pages';
import { ToDoHomeWithProvider } from './pages/todo/ToDoHome.tsx';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route
                path="/"
                element={
                    <ProtectedRoute>{<ToDoHomeWithProvider />}</ProtectedRoute>
                }
            ></Route>
        </Routes>
    );
};

export default AppRoutes;
