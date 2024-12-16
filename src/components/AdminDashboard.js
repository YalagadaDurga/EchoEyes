// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/issues');
                setIssues(response.data);
            } catch (error) {
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Issues Reported</h2>
            <ul>
                {issues.map((issue) => (
                    <li key={issue.id}>
                        <strong>{issue.title}</strong> - {issue.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
