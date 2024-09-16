import React, { useState } from "react";
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css'; // Custom CSS for additional styling

function AccountDetails() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState('');
    const [error, setError] = useState({});

    const userSchema = yup.object().shape({
        accountNumber: yup.number().typeError("Account Number must be a number").integer("Account Number must be an integer").required("Account Number is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ accountNumber }, { abortEarly: false });
            setError({});  // Show account info if validation is successful
            // Navigate to the AccountInformation page after successful validation
            navigate(`/pages/user/AccountInformation/${accountNumber}`);
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages); // Hide account info if validation fails
        }
    }

    function handleReset() {
        setAccountNumber('');
        setError({});// Hide account info on reset
    }

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="card p-4">
                        <h2 className="text-center mt-4 mb-4">Account Details</h2>
                        <form>
                            <div className='form-group mb-3'>
                                <label htmlFor='accountNumber' className='form-label'>Enter Account Number</label>
                                <input 
                                    type='text' 
                                    className={`form-control ${error.accountNumber ? 'is-invalid' : ''}`} 
                                    id='accountNumber'  
                                    placeholder='Enter Account Number' 
                                    value={accountNumber} 
                                    onChange={(e) => setAccountNumber(e.target.value)} 
                                />
                                {error.accountNumber && <div className='invalid-feedback'>{error.accountNumber}</div>}
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
                                    type="button" 
                                    className="btn btn-danger flex-grow-1" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountDetails;
