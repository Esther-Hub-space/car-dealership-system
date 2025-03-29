import React, { useEffect, useState } from 'react';
import { fetchCars, fetchCarImages } from '../js/Car';
import { Link } from 'react-router-dom';
import '../css/Car-details.css';
import { FaArrowLeft } from "react-icons/fa";




const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const carData = await fetchCars();
            const imageData = await fetchCarImages();
            setCars(carData);
            setImages(imageData);
        };
        getData();
    }, []);

    const getCarImage = (carId) => {
        const carImage = images.find(image => image.car_id === carId);
        return carImage ? `http://127.0.0.1:8000${carImage.image}` : 'default.jpg';
    };

    return (
      
      <div>
          <div>
            
            <div className="header-content">
                            <video src="img/car-details.mp4" type="video/mp4"
                    autoPlay loop muted playsInline objectFit
                    style={{   
                        width: "100%",
                        height : "100%",
                        objectFit: "cover",
                        zIndex: "-1",

                    }}
            ></video>
            </div>
        </div>
        <div className="car-listing">
            {cars.map(car => (
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
            ))}
        </div>
      
      </div>
    );
};

export default CarListing;
