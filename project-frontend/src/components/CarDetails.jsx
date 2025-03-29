import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCarDetails, fetchCarImages } from "../js/Car";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "../css/Car-details.css";

const CarDetails = () => {
    const { carId } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const getCarData = async () => {
            const carData = await fetchCarDetails(carId);
            setCar(carData);

            const imageData = await fetchCarImages();
            setImages(imageData.filter(image => image.car_id === carId));
        };

        getCarData();
    }, [carId]);

    // Function to navigate to the payment page
    const handlePayment = () => {
        navigate(`/payment/${carId}`);
    };

    const nextImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    if (!car) return <p>Loading...</p>;

    return (
        <div className="body">
            <Link to="/dashboard" className="home"><FaArrowLeft size={24} /></Link>
            <div className="car-details-container">
                {/* Image Slider with Next/Prev Buttons */}
                {images.length > 0 && (
                    <div className="image-slider">
                        <button className="slider-btn prev-btn" onClick={prevImage}>❮</button>
                        <img src={`http://127.0.0.1:8000${images[currentImageIndex]?.image}`} alt="Car" />
                        <button className="slider-btn next-btn" onClick={nextImage}>❯</button>
                    </div>
                )}

                {/* Car Details */}
                <div className="car-info">
                    <h2>{car.make} {car.model}</h2>
                    <p>🚗 <strong>Year:</strong> {car.year}</p>
                    <p>💰 <strong>Price: </strong>${car.price}</p>
                    <p>⚙️ <strong>Condition: </strong>{car.condition}</p>
                    <p>🔧 <strong>Transmission: </strong>{car.transmission}</p>
                    <p>⛽ <strong>Fuel Type: </strong>{car.fuel_type}</p>
                    <p>🎨 <strong>Color: </strong>{car.color}</p>
                    <p>📝 <strong>Description: </strong>{car.description}</p>

                    {/* Proceed to Payment Button */}
                    <button onClick={handlePayment} className="payment-btn">
                        💳 Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
