import React, { useState } from "react";
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [customerID, setCustomerId] = useState('');
    const [errors, setError] = useState({});
    const [loading, setLoading] = useState(false); // New state for loading
    const { login } = useAuth();
    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        email: yup.string().email("Invalid Email").required("Email is required"),
        password: yup.string().required("Password is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ email, password }, { abortEarly: false });
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

        if (!email) {
            setError({ global: 'Email cannot be empty' });
            return;
        }

        if (isValid) {
            setLoading(true); // Show the spinner before making the request
            try {
                const response = await axios.post('http://localhost:8080/banking/login', { email, password });
                if (response.status === 200) {
                    const data = response.data;
                    setFirstName(data.firstName);
                    setCustomerId(data.customerID);
                    alert(`Welcome, ${data.firstName}\nCustomer ID is: ${data.customerID}`);
                    login(); // Set authentication state
                    navigate('/pages/user/UserHome', { state: { firstName: data.firstName, customerId: data.customerID } });
                } else {
                    setError({ global: "Invalid Credentials" });
                }
            } catch (error) {
                setError({ global: 'Error Logging in, Please try again' });
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
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input
                                type="text"
                                placeholder="Enter the Email"
                                className="form-control"
                                id="username"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="text-danger">{errors.email}</div>
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
                        <button type="button" className="btn login-btn2 btn-primary mt-3" onClick={() => { setEmail(''); setPassword(''); setError({}); }} disabled={loading}>
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
