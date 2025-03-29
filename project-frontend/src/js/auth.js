// auth.js (or auth.jsx)
const baseURL = "http://127.0.0.1:8000/scs/";

export async function signup(username, firstName, lastName, email, password, phone, profileImage) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("profile_image", profileImage);

    try {
        const response = await fetch(baseURL + "register/", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Registration failed. Please try again.");
        }
    } catch (error) {
        throw error;
    }
}

export async function login(username, password) {
    try {
        const response = await fetch(baseURL + "login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Login failed. Please check your credentials.");
        }
    } catch (error) {
        throw new Error("An error occurred. Please try again later.");
    }
}

export async function logout() {
    try {
        const response = await fetch(baseURL + "logout/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Logout failed. Please try again.");
        }
        window.location.href = "/"; //redirect to home page
    } catch (error) {
        throw new Error("An error occurred. Please check your connection.");
    }
}