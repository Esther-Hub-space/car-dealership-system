import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Review.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState('1');
    const API_BASE_URL = 'http://127.0.0.1:8000/scs/reviews/';

    // Function to get CSRF token from cookies
    function getCSRFTokenFromCookie() {
        const match = document.cookie.match(/csrftoken=([^;]+)/);
        return match ? match[1] : "";
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(API_BASE_URL, { withCredentials: true });
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const csrfToken = getCSRFTokenFromCookie();

        try {
            await axios.post(
                API_BASE_URL,
                { review: reviewText, rating: reviewRating },
                {
                    headers: { 'X-CSRFToken': csrfToken },
                    withCredentials: true
                }
            );

            alert("Thank you for your review!");
            setReviewText('');
            setReviewRating('1');
            setShowForm(false);

            // Refetch reviews after submitting
            const response = await axios.get(API_BASE_URL, { withCredentials: true });
            setReviews(response.data);
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Error submitting your review. Please try again.");
        }
    };

    return (
        <>
            <h1>Customer Reviews</h1>
            <div className="reviews-container" id="reviews-container">
                {reviews.map((review) => (
                    <div className="review-card" key={review.id}>
                        <img 
                            src={review.profile_image || "http://127.0.0.1:8000/media/default_profile.jpg"} 
                            alt={review.user} 
                            className="profile-pic"
                        />
                        <div>
                            <div className="reviewer-info">
                                {review.user} 
                                <span className="rating">
                                    {Array.from({ length: review.rating }).map((_, index) => (
                                        <span key={index}>★</span>
                                    ))}
                                </span>
                            </div>
                            <div className="review-text">"{review.review}"</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="add-review-section">
                <h2>Add Your Review</h2>
                <form id="reviewForm" onSubmit={handleSubmit} style={{ display: showForm ? 'block' : 'none' }}>
                    <label htmlFor="review-text">Your Review:</label><br />
                    <input
                        type="text"
                        id="review-text"
                        name="review"
                        placeholder="Enter your review here..."
                        required
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    /><br />
                    <label htmlFor="review-rating">Rating:</label><br />
                    <select
                        id="review-rating"
                        name="rating"
                        required
                        value={reviewRating}
                        onChange={(e) => setReviewRating(e.target.value)}
                    >
                        <option value="1">★</option>
                        <option value="2">★ ★</option>
                        <option value="3">★ ★ ★</option>
                        <option value="4">★ ★ ★ ★</option>
                        <option value="5">★ ★ ★ ★ ★</option>
                    </select><br />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
            <button id="addReviewButton" style={{ marginTop: '20px' }} onClick={() => setShowForm(!showForm)}>
                ➕ Add Review
            </button>
        </>
    );
};

export default Reviews;
