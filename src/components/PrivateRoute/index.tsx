import React from 'react';
import { Navigate, Route } from 'react-router-dom';

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
    isAuthenticated: boolean;
    redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated, redirectTo = '/signin' }) => {
    return isAuthenticated ? (
        <Route element={element} />
    ) : (
        <Navigate to={redirectTo} replace />
    );
};

export default PrivateRoute;
