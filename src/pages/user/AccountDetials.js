import React, { useState } from "react";
import * as yup from 'yup';
import AccountInformation from './AccountInformation';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../Home.css';

function AccountDetails() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState({});
    const [showAccountInfo, setShowAccountInfo] = useState(false);

    const userSchema = yup.object().shape({
        customerId: yup.number().typeError("Customer ID must be a number").integer("Customer ID must be an integer").required("Customer ID is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ customerId }, { abortEarly: false });
            setError({});
            setShowAccountInfo(true); // Show the account information component on successful validation
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
            setShowAccountInfo(false); // Hide the account information component on error
        }
    }

    function handleReset() {
        setCustomerId('');
        setError({});
        setShowAccountInfo(false); // Hide the account information component when resetting
    }
    
    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className="container mt-4 mb-4 d-flex justify-content-center">
            <div className="row registration-contanier justify-content-center">
                <div className="col-md-10">
                    <form>
                        <div className="mt-4">
                            <label htmlFor="customerId" className="form-label">Enter the Customer ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="customerID"
                                placeholder="Enter the Customer ID"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                            />
                        </div>
                        <div className="text-danger mb-2">{error.customerId}</div>
                        <button type="button" className="btn mb-3 res-btn1 btn-success mt-4" onClick={validateForm}>Submit</button>
                        <button type="button" className="btn mb-3 res-btn2 btn-primary mt-4" onClick={handleReset}>Reset</button>
                        <button className="btn res-btn2 p-2 btn-success mt-3 acc-info-logout" onClick={handleLogout}>Logout</button>
                    </form>
                    {/* Render the AccountInformation component if the form is validated */}
                    {showAccountInfo && <AccountInformation customerId={customerId} />}
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
