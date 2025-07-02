import React, { useState } from "react";
import axios from "axios";
import "../styles/AddProperty.css"; 

const AddProperty = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const token = localStorage.getItem("token");
            await axios.post(
           `${BACKEND_URL}/api/properties`,
                { title, description, location, price, image },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Property added successfully!");
            setTitle("");
            setDescription("");
            setLocation("");
            setPrice("");
            setImage("");
        } catch (err) {
            console.error("Error adding property:", err);
            setError(err.response?.data?.error || "Failed to add property. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-property-container">
            <form className="add-property-form" onSubmit={handleSubmit}>
                <h2>Add Property</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="form-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="form-textarea"
                ></textarea>
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="form-input"
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="form-input"
                />
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Adding..." : "Add Property"}
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
