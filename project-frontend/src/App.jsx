// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Program from './components/Program';
import Reviews from './components/Reviews';
import CarListing from './components/CarListing';
import CarDetails from './components/CarDetails';
import Wishlist from './components/Wishlist';
import Message from './components/Message'; // Or Message, Chatbot, etc.
import TestBackground from './components/TestBackground'; 
import Footer from './components/Footer';
import Contact from './components/Contact';
import Payment from './components/Payment';
import SearchedCars from './components/SearchedCars';
// Import other components here (Dashboard, Contact, About, etc.)

function App() {
    return (
        <Router>
        <div>
            <Routes>
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="/" element = {<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/program" element={<Program />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/message" element={<Message />} />
                <Route path="/car-listing" element={<CarListing />} />
                <Route path="/car-details/:carId" element={<CarDetails />}  />
                <Route path="/test" element={<TestBackground />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/payment/:carId" element={<Payment />} /> {/* Added payment route */}
                <Route path="/search-cars" element={<SearchedCars />} />
            </Routes>
        </div>
        <Footer />
        </Router>
    );
}

export default App;