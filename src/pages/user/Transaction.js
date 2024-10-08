import React, { useState } from "react";
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';
import axios from "axios";
import { Spinner } from 'react-bootstrap'; // Import Spinner component
import Swal from "sweetalert2";

function Transaction() {
    const [sourceAccount, setSourceAccount] = useState('');
    const [destinationAccount, setDestinationAccount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionInfo, setTransactionInfo] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false); // State for loading
    const { logout } = useAuth();
    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        sourceAccount: yup.number().typeError("Source Account must be a number").integer("Source Account must be integer").required("Source Account is Required"),
        destinationAccount: yup.number().typeError("Destination Account must be a number").integer("Destination Account must be Integer").required("Destination Account is required"),
        transactionType: yup.string().required("Transaction type is required"),
        transactionInfo: yup.string().required("Transaction Information is required"),
        amount: yup.number().typeError("Amount must be a number").required("Amount is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ sourceAccount, destinationAccount, transactionType, transactionInfo, amount }, { abortEarly: false });
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
        setLoading(true); // Set loading to true when starting submission
        try {
            const response = await axios.post('http://localhost:8080/banking/fundTransfer', {
                sourceAccount: {
                    accountNumber: sourceAccount
                },
                destinationAccount: {
                    accountNumber: destinationAccount
                },
                transactionType,
                transactionInfo,
                amount,
                transactionDate: new Date().toISOString().split('T')[0] // current date in YYYY-MM-DD format
            });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Amount Transfer Successful!',
                    text: 'Your payment has been processed successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        title: 'swal-title',
                        content: 'swal-content',
                        confirmButton: 'swal-confirm-button'
                    }
                });
                handleReset();
            }
        } catch (error) {
            Swal.fire({
                title: 'Insufficient Balance',
                text: 'There was an issue processing your payment. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass: {
                    title: 'swal-title',
                    content: 'swal-content',
                    confirmButton: 'swal-confirm-button'
                }
            });
        } finally {
            setLoading(false); // Set loading to false after submission completes
        }
    }

    function handleReset() {
        setSourceAccount('');
        setDestinationAccount('');
        setTransactionType('');
        setTransactionInfo('');
        setAmount('');
        setError({});
    }

    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card  p-4">
                        <h2 className="text-center mb-4">Fund Transfer Page</h2>
                        <form>
                            <div className='form-group mb-3'>
                                <label htmlFor='sourceAccount' className='form-label'>Enter Source Account Number :</label>
                                <input type='number' className={`form-control ${error.sourceAccount ? 'is-invalid' : ''}`} id='sourceAccount' placeholder='Enter Source Account Number' value={sourceAccount} onChange={(e) => setSourceAccount(e.target.value)} />
                                {error.sourceAccount && <div className='invalid-feedback'>{error.sourceAccount}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='destinationAccount' className='form-label'>Enter Destination Account Number :</label>
                                <input type='number' className={`form-control ${error.destinationAccount ? 'is-invalid' : ''}`} id='destinationAccount' placeholder='Enter Destination Account Number' value={destinationAccount} onChange={(e) => setDestinationAccount(e.target.value)} />
                                {error.destinationAccount && <div className='invalid-feedback'>{error.destinationAccount}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='transactionType' className='form-label'>Transaction Type</label>
                                <select className={`form-control ${error.transactionType ? 'is-invalid' : ''}`} id='transactionType' value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                    <option value=''>Select Transaction Type</option>
                                    <option value='own account'>Own Account</option>
                                    <option value='other account'>Other Account</option>
                                </select>
                                {error.transactionType && <div className='invalid-feedback'>{error.transactionType}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='transactionInfo' className='form-label'>Transaction Info</label>
                                <select className={`form-control ${error.transactionInfo ? 'is-invalid' : ''}`} id='transactionType' value={transactionInfo} onChange={(e) => setTransactionInfo(e.target.value)}>
                                    <option value=''>Select Transaction Information</option>
                                    <option value='Fund Transfer between own accounts'>Fund Transfer between own accounts</option>
                                    <option value='Fund Transfer between other accounts'>Fund Transfer between other accounts</option>
                                </select>
                                {error.transactionInfo && <div className='invalid-feedback'>{error.transactionInfo}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='amount' className='form-label'>Enter Amount :</label>
                                <input type='number' className={`form-control ${error.amount ? 'is-invalid' : ''}`} id='amount' placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                {error.amount && <div className='invalid-feedback'>{error.amount}</div>}
                            </div>
                            <div className='text-center'>
                                <button type='button' className='btn btn-success me-2' onClick={validateForm} disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                                </button>
                                <button type='button' className='btn btn-secondary' onClick={handleReset} disabled={loading}>
                                    Reset
                                </button>
                            </div>
                            <div className='text-center mt-4'>
                                <button className='btn btn-warning' onClick={handleLogout} disabled={loading}>
                                    Logout
                                </button>
                            </div>
                            {error.general && <div className='text-danger text-center mt-4'>{error.general}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;
