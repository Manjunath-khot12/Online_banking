import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import axios from "axios";
import { Spinner } from 'react-bootstrap'; 
import Swal from 'sweetalert2'; 
// Import Spinner component

function PayBill() {
    const { billName, billType,provider } = useParams(); 
    const transactionType = billType;
    const  transactionInfo=provider;
    const[amount,setAmount]=useState('');
    const[sourceAccount,setSourceAccount]=useState('');
    const[error,setError]=useState({});
    const [loading, setLoading] = useState(false);

    const userSchema=yup.object().shape({
        amount:yup.number().typeError("Amount must be Number").min(1,"Amount must be minimum 1 rupee").required("Amount is required"),
        sourceAccount:yup.number().typeError("Account Number Must Be a Number").integer("Account NumberBe in Integer").required("Account Number Is required")
    });

    async function validateForm()
    {
        try
        {
            await userSchema.validate({amount,sourceAccount},{abortEarly:false});
            setError({});
            handleSubmit();
        }
        catch(error)
        {
            const errorMessages={};
            error.inner.forEach((e)=>
            {
                errorMessages[e.path]=e.message;
            });
            setError(errorMessages);
        }
    }

    async function handleSubmit() {
        setLoading(true); // Set loading to true when starting submission
        try {
            const response = await axios.post('http://localhost:8080/banking/withdrawAmount', {
                sourceAccount: {
                    accountNumber: sourceAccount
                },
                transactionType,
                transactionInfo,
                amount,
                transactionDate: new Date().toISOString().split('T')[0] // current date in YYYY-MM-DD format
            });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Payment Successful!',
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


    function handleReset()
    {
        setAmount('');
        setSourceAccount('');
        setError({});
    }


    return (
        <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card  p-4">
                    <h2 className="text-center mb-4">Pay Bill</h2>
                    <form>
                        <div className='form-group mb-3'>
                            <label htmlFor='sourceAccount' className='form-label'>Enter  Account Number :</label>
                            <input type='number' className={`form-control ${error.sourceAccount ? 'is-invalid' : ''}`} id='sourceAccount' placeholder='Enter Source Account Number' value={sourceAccount} onChange={(e) => setSourceAccount(e.target.value)} />
                            {error.sourceAccount && <div className='invalid-feedback'>{error.sourceAccount}</div>}
                        </div>
                        <div className='form-group mb-3'>
                           <label htmlFor="lastName" className="form-label">Bill Name:</label>
                           <input type="text" className="form-control" id="lastName" value={billName}/>
                        </div>
                        <div className='form-group mb-3'>
                           <label htmlFor="lastName" className="form-label">Bill Type:</label>
                           <input type="text" className="form-control" id="lastName" value={billType}/>
                        </div>
                        <div className='form-group mb-3'>
                           <label htmlFor="lastName" className="form-label">Bill Information:</label>
                           <input type="text" className="form-control" id="lastName" value={provider}/>
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
                        {error.general && <div className='text-danger text-center mt-4'>{error.general}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default PayBill;
