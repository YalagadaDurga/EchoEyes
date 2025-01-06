import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'; // Update with actual path to your WelcomePage component
import LoginSelectionPage from './components/LoginSelectionPage'; // Update with actual path to your LoginSelectionPage component
import ReportPage from './components/ReportPage'; // Update with actual path to your ReportPage component
import AdminPage from './components/AdminPage'; // Update with actual path to your AdminPage component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<LoginSelectionPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </Router>
    );
};

export default App;
