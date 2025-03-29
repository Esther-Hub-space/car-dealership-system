import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/scs"; // Ensure it matches your Django backend URL

export const fetchCars = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cars/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const fetchCarImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/car-images/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car images:", error);
    return [];
  }
};

export const fetchCarDetails = async (carId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cars/${carId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
};

// Fetch user profile to get user_id
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      console.warn("No token found. User is not logged in.");
      return null;
    }

    const response = await axios.get(`${BASE_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Include cookies if needed
    });

    return response.data.user_id;
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error);
    return null;
  }
};


// Add to Wishlist (Fixed)
export const addToWishlist = async (carId) => {
  const user_id = await getUserProfile(); // Get logged-in user ID

  if (!user_id) {
    alert("You must be logged in to add to the wishlist.");
    return;
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlist/`,
      { user_id, car_id: carId }, // Ensure correct key names
      { withCredentials: true } // Include cookies for authentication
    );
    alert("Car added to wishlist!");
  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
};

// Fetch Wishlist (Fixed)
export const fetchWishlist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/wishlist/`, {
      withCredentials: true, // Ensures authentication via cookies
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
};

// Remove from Wishlist (Fixed)
export const removeFromWishlist = async (wishlistId) => {
  try {
    await axios.delete(`${BASE_URL}/wishlist/${wishlistId}/`, {
      withCredentials: true, // Ensure authenticated request
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
};

// Contact API - Send Message
export const sendMessage = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact/`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
