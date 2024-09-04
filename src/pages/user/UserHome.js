import React from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CreateAccount from "./CreateAccount";
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
        <div className="contanier">
            <h1 className=" text-center mt-3">Welcome <span className="text-primary">{firstName}</span> </h1>
            <p className="text-center fs-5">Your Customer ID is : <span className="text-primary fs-3">{customerId}</span> </p>
            <button className="btn res-btn2 p-2 btn-success mt-3 logout" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserHome;
