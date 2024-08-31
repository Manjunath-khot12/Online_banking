import React from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserHome() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div>
            <h1>Welcome to User Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserHome;
