import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import * as yup from 'yup';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
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
        try {
            const response = await axios.post('http://localhost:8080/banking/forgotpassword', { email });
            if (response.status === 200) {
                const data = response.data;
                setFirstName(data.firstName);
                setPassword(data.password);
                alert(`Welcome, ${data.firstName}\nYour Password is: ${data.password}`);
                navigate('/pages/login');
            } else {
                setError({ general: "Invalid Credentials" });
            }
        } catch (error) {
            console.error("Error response:", error.response); 
            setError({ general: 'Error in getting password, Please try again' });
        }
    }

    function handleReset() {
        setEmail('');
        setError({});
    }

    return (
        <div className="container-fluid d-flex justify-content-center mt-5">
            <div className="row shadow-lg registration-contanier justify-content-center">
                <p id="Registration-heading" className='mt-4'>Forgot Password</p>
                <div className="col-md-10">
                    <form>
                        <div className="mt-3 mb-4">
                            <label htmlFor="email" className="form-label">Enter The Email Id:</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                className="form-control"
                                placeholder="Enter the Email id"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="text-danger">{error.email}</div>
                        </div>
                        <button type="button" className="btn res-btn1 p-2 btn-success mt-3" onClick={validateForm}>Submit</button>
                        <button type="button" className="btn res-btn2 p-2 btn-primary mt-3" onClick={handleReset}>Reset</button>
                        <div className="text-danger fs-5 text-center mt-4 mb-5">{error.general}</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
