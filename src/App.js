import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Form from './components/Form';
import Map from './components/Map';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/form" element={<Form />} />
                <Route path="/map" element={<Map />} />
                <Route path="/" element={<Login />} />

                {/* Protected Routes for Admin */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Routes for User */}
                <Route
                    path="/user-dashboard"
                    element={
                        <ProtectedRoute allowedRole="user">
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
