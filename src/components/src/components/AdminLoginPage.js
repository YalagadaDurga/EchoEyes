import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const validAdmins = {
        wateradmin: 'water123',
        roadadmin: 'road123',
        cleanadmin: 'clean123',
        otheradmin: 'other123',
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (validAdmins[username] === password) {
            const problemType = username.replace('admin', ''); // Derive problem type from username
            navigate('/admin', { state: { problemType } });
        } else {
            setMessage('Invalid username or password');
        }
    };

    return (
        <div className="admin-login-container">
            <h1>Admin Login</h1>
            <form onSubmit={handleAdminLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter admin username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p className="error-message">{message}</p>}
        </div>
    );
};

export default AdminLoginPage;
