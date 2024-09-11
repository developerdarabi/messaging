import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../provider/Auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login if the user is not authenticated
        return <Navigate to="/login" />;
    }

    // Render the children components if authenticated
    return children;
};

export default ProtectedRoute;
