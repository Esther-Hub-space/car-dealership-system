// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/auth.css';
import { login } from '../js/auth'; // Import your login function

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password); // Call your login function
            setMessage('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setMessage(error.message || 'Login failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your Username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Log In</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p id="login-message">{message}</p>
        </div>
    );
};

export default Login;