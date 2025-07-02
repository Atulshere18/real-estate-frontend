
import React from "react";
import "../styles/NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404 - Page Not Found 🚫</h1>
            <p>The page you’re looking for doesn’t exist.</p>
            <a href="/" className="home-link">Go to Homepage</a>
        </div>
    );
};

export default NotFound;
