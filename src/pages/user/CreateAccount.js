import React, { useState } from 'react';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function CreateAccount() {
    const [customerId, setCustomerId] = useState('');
    const [adharaNumber, setAdharaNumber] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [accountType, setAccountType] = useState('');
    const [initialDeposit, setInitialDeposit] = useState('');
    const [error, setError] = useState({});
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const userSchema = yup.object().shape({
        customerId: yup.string().required("Customer ID is Required"),
        adharaNumber: yup.string().matches(/^\d{12}$/, 'Adhara Number must be a 12-digit number').required("Adhara Number is required"),
        panNumber: yup.string().required("PAN Number is required"),
        accountType: yup.string().required("Account type is required"),
        initialDeposit: yup.number().typeError("Deposit must be a number").integer("Deposit must be an integer").min(1000, "Minimum 1000 Rupees initial deposit").required("Initial Deposit is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ customerId, adharaNumber, panNumber, accountType, initialDeposit }, { abortEarly: false });
            setError({});
            handleSubmit();
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
        }
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/banking/createAccount?userId=${customerId}`, {
                adharaNumber,
                panNumber,
                accountType,
                initialDeposit
            });

            if (response.status === 201) {
                alert("Account Created Successfully");
                handleReset();
            } else {
                alert("Failed to create account. Please try again.");
            }
        } catch (error) {
            console.error("Account creation error:", error);
            setError({ general: 'Account creation failed, try again.' });
            alert("Account creation failed. Please check your details details.");
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setCustomerId('');
        setAdharaNumber('');
        setPanNumber('');
        setAccountType('');
        setInitialDeposit('');
        setError({});
    }

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-lg-8'>
                    <div className='card shadow-lg p-4'>
                        <h2 className='text-center mb-4 '>Create Account</h2>
                        <form autoComplete="off">
                            <div className='form-group mb-3'>
                                <label htmlFor='customerId' className='form-label'>Customer ID</label>
                                <input type='text' className={`form-control ${error.customerId ? 'is-invalid' : ''}`} id='customerId' autoComplete="off" placeholder='Enter Customer ID' value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                                {error.customerId && <div className='invalid-feedback'>{error.customerId}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label htmlFor='adharaNumber' className='form-label'>Adhara Number</label>
                                <input type='text' className={`form-control ${error.adharaNumber ? 'is-invalid' : ''}`} id='adharaNumber' autoComplete="off" placeholder='Enter Adhara Number' value={adharaNumber} onChange={(e) => setAdharaNumber(e.target.value)} />
                                {error.adharaNumber && <div className='invalid-feedback'>{error.adharaNumber}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label htmlFor='panNumber' className='form-label'>PAN Number</label>
                                <input type='text' className={`form-control ${error.panNumber ? 'is-invalid' : ''}`} id='panNumber' autoComplete="off" placeholder='Enter PAN Number' value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
                                {error.panNumber && <div className='invalid-feedback'>{error.panNumber}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label htmlFor='accountType' className='form-label'>Account Type</label>
                                <select className={`form-control ${error.accountType ? 'is-invalid' : ''}`} id='accountType' value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                                    <option value=''>Select Account Type</option>
                                    <option value='Savings'>Savings</option>
                                    <option value='Current'>Checking</option>
                                    <option value='Fd'>Fd</option>
                                </select>
                                {error.accountType && <div className='invalid-feedback'>{error.accountType}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label htmlFor='initialDeposit' className='form-label'>Initial Deposit</label>
                                <input type='number' className={`form-control ${error.initialDeposit ? 'is-invalid' : ''}`} id='initialDeposit' autoComplete="off" placeholder='Enter Initial Deposit' value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} />
                                {error.initialDeposit && <div className='invalid-feedback'>{error.initialDeposit}</div>}
                            </div>

                            <div className='d-flex justify-content-between'>
                                <button type='button' className='btn btn-primary' onClick={validateForm} disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Create Account'}
                                </button>
                                <button type='button' className='btn btn-secondary' onClick={handleReset} disabled={loading}>Reset</button>
                            </div>

                            {error.general && <div className='alert alert-danger mt-3'>{error.general}</div>}
                            <div className='text-center mt-4'>
                                <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
