// UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [userIssues, setUserIssues] = useState([]);

    useEffect(() => {
        const fetchUserIssues = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/issues/user', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUserIssues(response.data);
            } catch (error) {
                console.error('Error fetching user issues:', error);
            }
        };

        fetchUserIssues();
    }, []);

    return (
        <div>
            <h1>User Dashboard</h1>
            <h2>Your Reported Issues</h2>
            <ul>
                {userIssues.map((issue) => (
                    <li key={issue.id}>
                        <strong>{issue.title}</strong> - {issue.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
