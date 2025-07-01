import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decoded.exp < currentTime) {
                    alert("Session expired. Redirecting to login.");
                    localStorage.removeItem("token");
                    setIsAuthenticated(false);
                    window.location.href = "/login";
                }
            }
        };

        checkToken();
        const interval = setInterval(checkToken, 60000); // Check token every minute
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/dashboard" 
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/add-property" 
                    element={isAuthenticated ? <AddProperty /> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
