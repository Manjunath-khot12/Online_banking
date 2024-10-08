import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import * as yup from 'yup';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'; // Optional: Bootstrap spinner
import Swal from "sweetalert2";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // New loading state
    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        email: yup.string().email("Invalid Email Address").required("Email Id is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ email }, { abortEarly: false });
            setError({});
            handleSubmit();
        } catch (validationError) {
            const errorMessages = {};
            validationError.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
        }
    }

    async function handleSubmit() {
        setLoading(true);  // Start loading spinner
        try {
            const response = await axios.post('http://localhost:8080/banking/forgotpassword', { email });
            if (response.status === 200) {
                const data = response.data;
                setFirstName(data.firstName);
                setEmail(data.email);
                Swal.fire({
                    title: `Hi, ${data.firstName}`,
                    text: `Your Password has been sent to your registered email: ${data.email}`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        title: 'swal-title',
                        content: 'swal-content',
                        confirmButton: 'swal-confirm-button'
                    }
                });
                navigate('/pages/login');
            } else {
                Swal.fire({
                    title: 'Invalid Credentials',
                    text: 'The Email you entered is incorrect. Please try again.',
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
                title: 'Invalid Credentials',
                text: 'The Email you entered is incorrect. Please try again.',
                icon: 'error',
                confirmButtonText: 'info',
                customClass: {
                    title: 'swal-title',
                    content: 'swal-content',
                    confirmButton: 'swal-confirm-button'
                }
            });
        } finally {
            setLoading(false); // Stop loading spinner
        }
    }

    function handleReset() {
        setEmail('');
        setError({});
    }

    return (
        <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="row shadow-lg justify-content-center">
                <p id="Registration-heading" className='mt-4'>Forgot Password</p>
                <div className="col-md-10">
                    <form autoComplete="off">
                        <div className="mt-3 mb-4">
                            <label htmlFor="email" className="form-label">Enter The Email Id:</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                className="form-control"
                                placeholder="Enter the Email id"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading} // Disable input during loading
                            />
                            <div className="text-danger">{error.email}</div>
                        </div>
                        <button
                            type="button"
                            className="btn res-btn1 p-2 btn-success mt-3"
                            onClick={validateForm}
                            disabled={loading} // Disable button during loading
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn res-btn2 p-2 btn-primary mt-3"
                            onClick={handleReset}
                            disabled={loading} // Disable button during loading
                        >
                            Reset
                        </button>

                        {/* Conditionally show the spinner while loading */}
                        {loading && (
                            <div className="text-center mt-4 mb-4">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}

                        <div className="text-danger fs-5 text-center mt-4 mb-5">{error.general}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
