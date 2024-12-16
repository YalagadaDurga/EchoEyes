import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role, allowedRole }) => {
    const userRole = localStorage.getItem('role'); // Retrieve role from localStorage

    // Check if the user role matches the allowed role
    return userRole === allowedRole ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
