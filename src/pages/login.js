import React, { useState } from "react";
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Swal from "sweetalert2";

function Login() {
    const [customerId, setCustomerId] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [errors, setError] = useState({});
    const [loading, setLoading] = useState(false); // New state for loading
    const { login } = useAuth();
    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        customerId: yup.number().typeError("Customer id must be a number").integer("customerId must be integer").required("CustomerId  is required"),
        password: yup.string().required("Password is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ customerId, password }, { abortEarly: false });
            setError({});
            return true; // Return true if validation passes
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
            return false; // Return false if validation fails
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validateForm();

        if (!customerId) {
            setError({ global: 'CustomerId cannot be empty' });
            return;
        }

        if (isValid) {
            setLoading(true); // Show the spinner before making the request
            try {
                const response = await axios.post('http://localhost:8080/banking/login', { id: customerId, password });
                if (response.status === 200) {
                    const data = response.data;
                    setFirstName(data.firstName);
                    setCustomerId(data.customerId);
                    Swal.fire({
                        title: `Welcome, ${data.firstName}!`,
                        text: `Customer ID: ${customerId}`,
                        icon: 'success',
                        confirmButtonText: 'Continue',
                        customClass: {
                            title: 'swal-title',
                            content: 'swal-content',
                            confirmButton: 'swal-confirm-button'
                        }
                    });
                    login(); // Set authentication state
                    navigate('/pages/user/UserHome', { state: { firstName: data.firstName, customerId: data.customerId } });
                } else {
                    Swal.fire({
                        title: 'Invalid Credentials',
                        text: 'Please check your username and password and try again.',
                        icon: 'error',
                        confirmButtonText: 'Retry',
                        customClass: {
                            title: 'swal-title',
                            content: 'swal-content',
                            confirmButton: 'swal-confirm-button'
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error In Login',
                    text: 'Please check your username and password and try again.',
                    icon: 'error',
                    confirmButtonText: 'Retry',
                    customClass: {
                        title: 'swal-title',
                        content: 'swal-content',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            } finally {
                setLoading(false); // Hide the spinner after the request is completed
            }
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="row shadow-lg justify-content-center">
                <p id="Registration-heading" className="mt-4">Login Page</p>
                <div className="col-md-10">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mb-5">
                            <label htmlFor="username" className="form-label">Enter Customer Id:</label>
                            <input
                                type="text"
                                placeholder="Enter the Customer Id"
                                className="form-control"
                                id="username"
                                autoComplete="off"
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                            />
                            <div className="text-danger">{errors.customerId}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                placeholder="Enter the Password"
                                className="form-control"
                                id="password"
                                autoComplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="text-danger">{errors.password}</div>
                        </div>
                        <div className="text-danger">{errors.global}</div>
                        
                        {/* Display Loading Spinner while submitting */}
                        {loading && (
                            <div className="d-flex justify-content-center my-3">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        )}

                        <button type="submit" className="btn login-btn1 btn-primary mt-3" disabled={loading}>
                            Login
                        </button>
                        <button type="button" className="btn login-btn2 btn-primary mt-3" onClick={() => { setCustomerId(''); setPassword(''); setError({}); }} disabled={loading}>
                            Reset
                        </button>
                        <div className="mt-4 fs-5 text-center">
                            <Link to="/pages/Registration">New User? Register Here.</Link>
                        </div>
                        <div className="mt-2 mb-5 fs-5 text-center">
                            <Link to="/pages/ForgotPassword">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
