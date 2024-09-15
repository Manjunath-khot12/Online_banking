import React, { useState } from "react";
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css'; // Custom CSS for additional styling
import ViewBills from "./ViewBills";


function BillView() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState({});
    const [showBillDetails, setShowBillDetails] = useState(false);

    const userSchema = yup.object().shape({
        customerId: yup.number().typeError("customer id must be a number").integer("customer id must be an integer").required("customer id is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ customerId }, { abortEarly: false });
            setError({});
            setShowBillDetails(true); // Show account info if validation is successful
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
            setShowBillDetails(false); // Hide account info if validation fails
        }
    }

    function handleReset() {
        setCustomerId('');
        setError({});
        setShowBillDetails(false); // Hide account info on reset
    }

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-lg-9">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center mt-4 mb-4">View Bills</h2>
                    <form>
                    <div className='form-group mb-3'>
                            <label htmlFor='customerId' className='form-label'>Enter Customer ID : </label>
                            <input type='text' className={`form-control ${error.customerId ? 'is-invalid' : ''}`} id='customerId' autoComplete="off" placeholder='Enter Customer Id' value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                            {error.customerId && <div className='invalid-feedback'>{error.customerId}</div>}
                    </div>
                    <div className="d-flex justify-content-between">
                    <button  type="button"  className="btn btn-success flex-grow-1 me-2" onClick={validateForm}>
                        Submit</button>
                    <button type="button" className="btn btn-secondary flex-grow-1 me-2" onClick={handleReset}>
                        Reset </button>
                    <button className="btn btn-danger flex-grow-1"   onClick={handleLogout} >
                        Logout </button>
                </div>
                    
                    </form> 
                </div>
            </div>
        </div>
        {/* Conditionally render the account information if the form is validated */}
        {showBillDetails && (
                    <div className="mt-5">
                        <ViewBills customerId={customerId} />
                    </div>
                )}
    </div>
           
    
    );
}

export default BillView;
