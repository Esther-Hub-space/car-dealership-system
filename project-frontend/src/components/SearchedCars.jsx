import React, { useEffect, useState } from 'react';
import { fetchCars, fetchCarImages } from '../js/Car';
import { Link, useLocation } from 'react-router-dom';
import '../css/Car-details.css';
import { FaArrowLeft } from "react-icons/fa";

const SearchedCars = () => {
    const [cars, setCars] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Extract search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchedMake = searchParams.get("make") || ""; 

    useEffect(() => {
        const getData = async () => {
            try {
                const carData = await fetchCars();
                const imageData = await fetchCarImages();
                setCars(carData);
                setImages(imageData);
            } catch (err) {
                setError("Failed to load car data.");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const getCarImage = (carId) => {
        const carImage = images.find(image => image.car_id === carId);
        return carImage ? `http://127.0.0.1:8000${carImage.image}` : '/images/default-car.jpg'; // Use a real default image
    };

    // Filter cars based on searched make
    const filteredCars = searchedMake
        ? cars.filter(car => car.make.toLowerCase() === searchedMake.toLowerCase())
        : cars;

    return (
      <>
        <Link to="/dashboard" className="home"><FaArrowLeft size={24} /></Link>
        <h2>Searched Results for: "{searchedMake}"</h2>

        {loading ? (
            <p>Loading cars...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <div className="car-listing">
                {filteredCars.length > 0 ? (
                    filteredCars.map(car => (
                        <Link to={`/car-details/${car.car_id}`} key={car.car_id} className="car-card-link">
                            <div className="car-card">
                                <div className="car-image">
                                    <img src={getCarImage(car.car_id)} alt={car.model} />
                                </div>
                                <div className="car-info">
                                    <h3>{car.make} {car.model}</h3>
                                    <p>Price: Ksh {car.price}</p>
                                    <p>Make: {car.make}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No cars found for "{searchedMake}". Try another search.</p>
                )}
            </div>
        )}
      </>
    );
};

export default SearchedCars;