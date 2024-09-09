import React, { useState } from "react";
import * as yup from 'yup';
import AccountInformation from './AccountInformation';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css'; // Custom CSS for additional styling

function AccountDetails() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState({});
    const [showAccountInfo, setShowAccountInfo] = useState(false);

    const userSchema = yup.object().shape({
        accountNumber: yup.number().typeError("Account Number must be a number").integer("Account Number must be an integer").required("Account Number is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ accountNumber }, { abortEarly: false });
            setError({});
            setShowAccountInfo(true); // Show account info if validation is successful
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
            setShowAccountInfo(false); // Hide account info if validation fails
        }
    }

    function handleReset() {
        setAccountNumber('');
        setError({});
        setShowAccountInfo(false); // Hide account info on reset
    }

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
            <div className="card shadow-lg p-4 mb-5 bg-body rounded" style={{ width: '100%', maxWidth: '1000px' }}>
                <h2 className="text-center mb-4">Account Details</h2>
                <form autoComplete="off" >
                    <div className="mb-4">
                        <label htmlFor="accountNumber" className="form-label">Enter Account Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="accountNumber"
                            autoComplete="off" 
                            placeholder="Enter your Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        <div className="text-danger">{error.accountNumber}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-success flex-grow-1 me-2"
                            onClick={validateForm}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary flex-grow-1 me-2"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                        <button
                            className="btn btn-danger flex-grow-1"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </form>
                {/* Conditionally render the account information if the form is validated */}
                {showAccountInfo && (
                    <div className="mt-5">
                        <AccountInformation accountNumber={accountNumber} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountDetails;
