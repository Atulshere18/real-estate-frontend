import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [editingProperty, setEditingProperty] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [searchQuery, page]);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${BACKEND_URL}/api/properties?search=${searchQuery}&page=${page}&limit=10`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setProperties(data.properties);
            setTotalPages(data.totalPages);
        } catch (err) {
            alert("Failed to fetch properties.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${BACKEND_URL}/api/properties/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Property deleted successfully!");
            fetchProperties();
        } catch (err) {
            alert("Failed to delete property.");
        }
    };

    const handleUpdate = async (id) => {
        if (!editingProperty.title || !editingProperty.price || isNaN(editingProperty.price)) {
            alert("Please provide valid inputs.");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${BACKEND_URL}/api/properties/${id}`,
                editingProperty,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert("Property updated successfully!");
            setEditingProperty(null);
            fetchProperties();
        } catch (err) {
            alert("Failed to update property.");
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <button
                    className="add-property-btn"
                    onClick={() => (window.location.href = "/add-property")}
                >
                    Add Property
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <input
                className="search-input"
                type="text"
                placeholder="Search by title or location"
                value={searchQuery}
                onChange={handleSearch}
            />

            {loading ? (
                <p>Loading properties...</p>
            ) : properties.length === 0 ? (
                <p>No properties found.</p>
            ) : (
                properties.map((property) => (
                    <div className="property-card" key={property._id}>
                        {editingProperty && editingProperty._id === property._id ? (
                            <div className="property-edit-form">
                                <input
                                    type="text"
                                    value={editingProperty.title}
                                    onChange={(e) =>
                                        setEditingProperty({ ...editingProperty, title: e.target.value })
                                    }
                                />
                                <textarea
                                    value={editingProperty.description}
                                    onChange={(e) =>
                                        setEditingProperty({
                                            ...editingProperty,
                                            description: e.target.value,
                                        })
                                    }
                                ></textarea>
                                <input
                                    type="text"
                                    value={editingProperty.location}
                                    onChange={(e) =>
                                        setEditingProperty({
                                            ...editingProperty,
                                            location: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="number"
                                    value={editingProperty.price}
                                    onChange={(e) =>
                                        setEditingProperty({
                                            ...editingProperty,
                                            price: e.target.value,
                                        })
                                    }
                                />
                                <div className="edit-actions">
                                    <button className="save-btn" onClick={() => handleUpdate(property._id)}>
                                        Save
                                    </button>
                                    <button className="cancel-btn" onClick={() => setEditingProperty(null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3>{property.title}</h3>
                                <p>{property.description}</p>
                                <p>{property.location}</p>
                                <p>{property.image}</p>
                                <p>₹{property.price}</p>
                                <div className="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => setEditingProperty(property)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(property._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}

            <div className="pagination">
                <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    className="pagination-btn"
                    onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
