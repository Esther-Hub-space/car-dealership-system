import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Homepage.css'; // Ensure correct path
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCommentAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Icons
import Message from './Message'; 
import { FaHeart } from 'react-icons/fa';
import { fetchWishlist } from '../js/Car';

const HomePage = () => {
    const navigate = useNavigate();
    const [isMessageCardOpen, setIsMessageCardOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu dropdown
    const [selectedMake, setSelectedMake] = useState("")

    useEffect(() => {
        const loadWishlist = async () => {
            const wishlist = await fetchWishlist();
            setWishlistCount(wishlist.length);
        };
        loadWishlist();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const showCarListings = () => navigate('/car-listing');
    const toggleMessageCard = () => setIsMessageCardOpen(!isMessageCardOpen);
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle menu function

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent page reload
        if (selectedMake) {
            navigate(`/search-cars?make=${encodeURIComponent(selectedMake)}`);
        }
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/" className="logo">HotWheelsHQ</Link>

                {/* Hamburger Menu Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </div>

                {/* Menu Links - Dropdown Style */}
                <div className={`menus ${isMenuOpen ? "active" : ""}`}>
                    <Link to="/program">Program</Link>
                    <Link to="/reviews">Reviews</Link>
                    <Link to="/contactus">Contact Us</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/wishlist" >
                        <div ><FaHeart /> {wishlistCount}</div>
                    </Link>
                    {/* LOGOUT */}
                    <Link to="/" className="signup">Logout</Link>
                </div>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <section className="header">
                    <div className="headerdesc">
                        <div className="title"><span>Your</span> Next <br />Car <span>Awaits</span></div>
                        <p>Welcome to HotWheelsHQ, your ultimate online destination for buying and selling cars!</p>
                        <button className="headerbutton" onClick={showCarListings}>Find Your Ride</button>
                    </div>

                    {/* Message Icon */}
                    <div className="message-icon" onClick={toggleMessageCard}>
                        <FontAwesomeIcon icon={faCommentAlt} />
                    </div>

                    {/* Chatbot Message Card */}
                    {isMessageCardOpen && (
                        <div className={`message-card ${isMessageCardOpen ? "open" : ""}`}>
                            <button className="close-btn" onClick={toggleMessageCard}>X</button>
                            <Message />
                        </div>
                    )}
                </section>

                {/* Car Search Form */}
                <div className="car-search-form">
                    <h2>Find a Car</h2>
                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <select name="make" 
                                    required
                                    value= {selectedMake}
                                    onChange={(e) => setSelectedMake(e.target.value)}

                                    >
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

export default HomePage;