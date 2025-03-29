import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { fetchCarDetails } from "../js/Car";
import "../css/Payment.css"; // You can add custom styling here

const Payment = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getCarData = async () => {
            const carData = await fetchCarDetails(carId);
            setCar(carData);
        };
        getCarData();
    }, [carId]);

    const handlePaymentSuccess = async (details) => {
        // Send transaction details to backend
        const response = await fetch("http://127.0.0.1:8000/scs/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`, //  JWT authentication
            },
            body: JSON.stringify({
                car_id: carId,
                transaction_id: details.id,
                payer_email: details.buyer.email_address,
                amount: car.price,
                status: "Completed",
            }),
        });

        if (response.ok) {
            alert("Payment successful! Redirecting...");
            navigate("/dashboard"); // Redirect to the user dashboard after payment
        } else {
            alert("Payment was successful, but there was an issue saving the transaction.");
        }
    };

    if (!car) return <p>Loading...</p>;

    return (
        <div className="payment-container">
            <h2>Confirm Payment</h2>
            <p><strong>Car:</strong> {car.make} {car.model}</p>
            <p><strong>Price:</strong> ${car.price}</p>

            <PayPalScriptProvider options={{ "client-id": "AVO5OkkWo47kvG_O3SV9tug3CVdoZBWz5Bbw1DGncfX6UB1h_zcHdlZuD9pmx0FVXpJANLOAV5kWo2qS" }}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: { value: car.price.toString() },
                            }],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        handlePaymentSuccess(details);
                    }}
                    onError={(err) => {
                        console.error("PayPal Checkout Error:", err);
                        alert("Payment failed, please try again.");
                    }}
                />
            </PayPalScriptProvider>
        </div>
    );
};

export default Payment;
