import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component}) => {
    const { user } = useUser();
    return user ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;