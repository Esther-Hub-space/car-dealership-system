import React, { useState } from 'react';
import { sendMessage } from '../js/Car';
import '../css/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',  // ✅ Added subject
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendMessage(formData);
            setStatus('✅ Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });  // ✅ Reset subject too
        } catch (error) {
            setStatus('❌ Failed to send message.');
        }
    };

    return (
        <div className="main-container">
            <div className="contact-container">
                <h2 className="contact-title">Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="subject" 
                        placeholder="Subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        required 
                    />
                    <textarea 
                        name="message" 
                        placeholder="Your Message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="send-button">Send Message</button>
                </form>
                {status && <p className="status-message">{status}</p>}
            </div>
            <footer className="footer">
                <p>© {new Date().getFullYear()} Contact Page. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;
