import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'client' import from react-dom
import App from './App';
import './index.css';
import './styles/WelcomePage.css'
import './styles/SignUp.css';
import './styles/Login.css';
import './styles/AdminDashboard.css';
import './styles/UserDashboard.css';
import './styles/Form.css';
import './styles/App.css';


const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
