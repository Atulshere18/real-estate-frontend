import React, { useState } from "react";
import axios from "axios";
import "../styles/Signup.css"; 

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.post(`${BACKEND_URL}/api/auth/signup`, { username, email, password });
            alert("Signup successful. Please log in.");
            window.location.href = "/login"; 
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    className="signup-input"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="signup-input"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="signup-input"
                />
                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
