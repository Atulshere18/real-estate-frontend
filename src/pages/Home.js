import React from "react";
import property1 from '../images/img1.webp';
import property2 from '../images/img2.webp';
import property3 from '../images/img3.webp';

import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="header">
                <h1 className="app-name">Real Estate Hub</h1>
                <p className="tagline">Your one-stop solution for buying, selling, and renting properties.</p>
            </header>

            <section className="overview">
                <h2>Discover Properties You'll Love</h2>
                <p>
                    Explore a wide range of properties tailored to your preferences. Whether you're looking for a cozy
                    apartment or a luxury villa, we've got you covered.
                </p>
            </section>

            <div className="image-gallery">
                <img src={property1} alt="Property 1" className="gallery-image" />
                <img src={property2}lt="Property 2" className="gallery-image" />
                <img src={property3} alt="Property 3" className="gallery-image" />
            </div>

            <section className="actions">
                <button onClick={() => navigate("/login")} className="action-button login">
                    Existing User? Login
                </button>
                <button onClick={() => navigate("/signup")} className="action-button signup">
                    New User? Signup
                </button>
            </section>

            <footer className="footer">
                <p>© 2025 Real Estate Hub. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
