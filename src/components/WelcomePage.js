// WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleVisitClick = () => {
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to EchoEyes</h1>
            <p>
                EchoEyes is a platform where you can share issues affecting sustainable development goals.
                Help us create a better future by reporting problems with descriptions, photos, and locations.
            </p>
            <button onClick={handleVisitClick}>Visit</button>
        </div>
    );
};

export default WelcomePage;
