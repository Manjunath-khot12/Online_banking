import React from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function UserHome() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Log the location state to see if the data is being passed correctly
    console.log("Location State:", location.state);

    // Destructure firstName and customerId from location.state, or set default empty values
    const { firstName = "", customerId = "" } = location.state || {};

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div>
            <h1>Welcome, {firstName}</h1>
            <p>Your Customer ID is: {customerId}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserHome;
