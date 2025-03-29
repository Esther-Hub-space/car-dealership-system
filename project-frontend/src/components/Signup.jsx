// Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/auth.css';
import { signup } from '../js/auth'; // Import your signup function

const Signup = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(username, firstName, lastName, email, password, phone, profileImage);
            setMessage('Signup successful! Please log in.');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            setMessage(error.message || 'Signup failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form id="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" id="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" id="first_name" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" id="last_name" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" id="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" id="phone" placeholder="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="file" id="profile_image" accept="image/*" required onChange={handleImageChange} />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
            <p id="signup-message">{message}</p>
        </div>
    );
};

export default Signup;