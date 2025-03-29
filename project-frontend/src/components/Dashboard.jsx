// HomePage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Msg from './Message';
import { logout } from '../js/auth'; // Import your logout function

const Dashboard = () => {
    const navigate = useNavigate();
    const [isMessageCardOpen, setIsMessageCardOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        // Check if user is logged in (e.g., check for a token in local storage)
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const showCarListings = () => {
        navigate('/car-listing');
    };

    const toggleMessageCard = () => {
        setIsMessageCardOpen(!isMessageCardOpen);
    };

    const handleLogout = () => {
        logout(); // Call your logout function
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo">HotWheelsHQ</Link>
                <div className="menus">
                    <Link to="/program">Program</Link>
                    <Link to="/reviews">Reviews</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/about">About Us</Link>
                    {/* LOGOUT */}
                    <Link to="/signup" className="signup">Sign up</Link>
                </div>
            </nav>

            <div className="main-content">
                <section className="header" id="home">
                    <div className="headerdesc">
                        <div className="title"><span>Your</span> Next <br />Car <span>Awaits</span></div>
                        <p>Welcome to HotWheelsHQ, your ultimate online destination for buying and selling cars!</p>
                        <button className="headerbutton" onClick={showCarListings}>Find Your Ride Dh</button>
                    </div>

                    <div className="message-icon" onClick={toggleMessageCard}>
                        <FontAwesomeIcon icon={faCommentAlt} />
                    </div>

                    <div className={`message-card ${isMessageCardOpen ? 'open' : ''}`} id="messageCard">
                        <button className="close-btn" onClick={toggleMessageCard}>X</button>
                        <Msg />
                    </div>
                </section>

                <div className="car-search-form">
                    <h2>Find a Car</h2>
                    <form action="#">
                        <div className="form-group">
                            <select name="make" required>
                                <option value="">Select Make</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Mercedes Benz">Mercedes Benz</option>
                                <option value="Mazda">Mazda</option>
                            </select>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <button type="submit" className="headerbutton">Search</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
