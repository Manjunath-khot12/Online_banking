

import React from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';  

function UserHome() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Destructure firstName and customerId from location.state, or set default empty values
    const { firstName = "", customerId = "" } = location.state || {};

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className="user-home-container">
            <div className="welcome-banner">
                <h1 className="welcome-text">
                    Welcome, <span className="highlighted-text">{firstName}</span>
                </h1>
                <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default UserHome;
