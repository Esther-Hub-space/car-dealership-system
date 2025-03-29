// Program.jsx
import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

import '../css/Program.css';

const Program = () => {
    const toggleAnswer = (event) => {
        const answer = event.target.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    };

    return (
        <>
            <Link to="/dashboard" className="home"><strong><FaArrowLeft size={24} /> home</strong></Link>
            <div className="container">
                <header>
                    <h1>How Our Car Selling Process Works</h1>
                    <p>We make buying and selling cars easy, secure, and hassle-free. Follow our simple process below.</p>
                </header>

                <section className="process">
                    <h2>For Buyers:</h2>
                    <ol>
                        <li><strong>Browse Our Selection</strong> - Explore our wide variety of vehicles listed with details, photos, and prices.</li>
                        <li><strong>Contact the Seller</strong> - Reach out to the seller directly to ask questions about the vehicle or to express your interest.</li>
                        <li><strong>Secure Financing</strong> - Get financing options through our trusted partners and compare rates to find the best fit for you.</li>
                        <li><strong>Complete the Purchase</strong> - Finalize your purchase with secure payment options and clearly outlined terms.</li>
                        <li><strong>Drive Away in Your New Car!</strong> - Enjoy your new vehicle with confidence!</li>
                    </ol>

                    <h2>For Sellers:</h2>
                    <ol>
                        <li><strong>Create an Account</strong> - Sign up and list your car, including important details and high-quality photos.</li>
                        <li><strong>Verification Process</strong> - We verify your listing to ensure accuracy and security for both parties.</li>
                        <li><strong>Connect with Buyers</strong> - Receive inquiries directly and engage with potential buyers through the platform.</li>
                        <li><strong>Negotiate and Finalize the Sale</strong> - Discuss offers and finalize the terms of the sale efficiently through our platform.</li>
                        <li><strong>Receive Secure Payment</strong> - Once the sale is complete, you'll receive secure payment before handing over the vehicle.</li>
                    </ol>
                </section>

                <section className="faq">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-item">
                        <h3 className="faq-question" onClick={toggleAnswer}>What vehicles can I sell on your platform?</h3>
                        <p className="faq-answer" style={{ fontStyle: 'italic', display: 'none' }}>
                            You can sell any car that is roadworthy and has clear ownership documentation. This includes cars of various makes, models, and years, as long as they meet our guidelines for quality and safety. Our platform welcomes both used and certified pre-owned vehicles.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3 className="faq-question" onClick={toggleAnswer}>Is there a fee to list my vehicle?</h3>
                        <p className="faq-answer" style={{ fontStyle: 'italic', display: 'none' }}>
                            There are no listing fees. We only charge a small commission once your vehicle is sold. This helps ensure that we can continue to improve our services and provide you with a great experience. Our commission structure is designed to be fair and transparent, making selling your car as easy as possible.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3 className="faq-question" onClick={toggleAnswer}>How do I ensure secure payment?</h3>
                        <p className="faq-answer" style={{ fontStyle: 'italic', display: 'none' }}>
                            Our platform offers secure payment processing to protect both buyers and sellers during transactions. We partner with reliable payment providers to guarantee that funds are transferred safely and efficiently. Additionally, we offer guidance on proper transaction procedures to ensure a smooth experience for everyone involved.
                        </p>
                    </div>
                </section>

                <footer>
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li>Trusted Platform with verified buyers and sellers.</li>
                        <li>Secure payment processing for peace of mind.</li>
                        <li>Easy financing options available.</li>
                        <li>Dedicated customer support team.</li>
                    </ul>
                </footer>
            </div>
        </>
    );
};

export default Program;
