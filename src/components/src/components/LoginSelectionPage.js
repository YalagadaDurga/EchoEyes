import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSelectionPage.css';

const adminCredentials = {
  wateradmin: 'water123',
  roadadmin: 'road123',
  cleanadmin: 'clean123',
  otheradmin: 'other123',
};

const LoginSelectionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Show User Login form
  const handleUserLoginClick = () => {
    setShowUserLogin(true);
    setShowAdminLogin(false);
    setMessage('');
    setFormData({ username: '', password: '' });
  };

  // Show Admin Login form
  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
    setShowUserLogin(false);
    setMessage('');
    setFormData({ username: '', password: '' });
  };

  // Handle User Login
  const handleUserLogin = (e) => {
    e.preventDefault();
    const mobilePattern = /^[6-9]\d{9}$/;

    if (!formData.name?.trim()) {
      setMessage('Please enter your name.');
    } else if (!mobilePattern.test(formData.mobile)) {
      setMessage('Please enter a valid 10-digit mobile number.');
    } else {
      setMessage('');
      alert('User login successful!');
      navigate('/report');
    }
  };

  // Handle Admin Login
  const handleAdminLogin = (e) => {
    e.preventDefault();

    const { username, password } = formData;
    if (adminCredentials[username] === password) {
      const problemType = username.replace('admin', '');
      navigate('/admin', { state: { problemType } });
    } else {
      setMessage('Invalid admin username or password');
    }
  };

  return (
    <div className="login-selection-container">
      <h1>Login</h1>
      <div className="button-group">
        <button onClick={handleUserLoginClick}>User Login</button>
        <button onClick={handleAdminLoginClick}>Admin Login</button>
      </div>

      {/* User Login Form */}
      {showUserLogin && (
        <div className="login-form">
          <h3>User Login</h3>
          <form onSubmit={handleUserLogin}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          {message && <p className="error-message">{message}</p>}
        </div>
      )}

      {/* Admin Login Form */}
      {showAdminLogin && (
        <div className="login-form">
          <h3>Admin Login</h3>
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
      )}
    </div>
  );
};

export default LoginSelectionPage;
