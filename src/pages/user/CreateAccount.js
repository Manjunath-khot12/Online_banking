import React, { useState } from 'react';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home.css';
import axios from 'axios';

function CreateAccount()
{
    const[customerId,setCustomerId]=useState('');
    const[adharaNumber,setAdharaNumber]=useState('');
    const[panNumber,setPanNumber]=useState('');
    const[accountType,setAccountType]=useState('');
    const[error,setError]=useState({});

    const userSchema = yup.object().shape({
        customerId:yup.string().required("Customer id is Required"),
        adharaNumber:yup.string().matches(/^\d{12}$/, 'Adhara Number must be a 12-digit number').required("Adhara Number is required"),
        panNumber:yup.string().required("Pan Number is required"),
        accountType:yup.string().required("Account type is required")
    });
    
     
    async function validateForm() {
        try {
            await userSchema.validate({ customerId, adharaNumber, panNumber, accountType }, { abortEarly: false });
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
        try {
            const response = await axios.post(`http://localhost:8080/banking/createAccount?userId=${customerId}`, {
                adharaNumber: adharaNumber,
                panNumber: panNumber,
                accountType: accountType
            });

            if (response.status === 201) {
                alert("Account Created Successfully");
                handleReset(); // Optionally reset form on success
            }
        } catch (error) {
            console.error("Account creation error:", error);
            setError({ general: 'Account creation failed, try again.' });
        }
    }

 
    function handleReset()
    {
        setAccountType('');
        setAdharaNumber('');
        setCustomerId('');
        setPanNumber('');
    }
    return(
        <div className='container-fluid mt-1  p-5 d-flex justify-content-center'>
            <div className='row  registration-contanier  justify-content-center'>
            <p id="Registration-heading" className='mt-4'>Create Account</p>
                <div className='col-md-10'>
                    <form>
                    <div className='mt-3'>
                            <label htmlFor='customerId' className='form-label'>Enter Customer Id :</label>
                            <input type='text' className='form-control' id='customerID' placeholder='Enter the Customer id' value={customerId} onChange={(e)=>setCustomerId(e.target.value)}/>
                            <div className='text-danger'>{error.customerId}</div>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor='adharaNumber' className='form-label'>Enter Adhara Number :</label>
                            <input type='text' className='form-control' placeholder='Enter the Adhara Number' id='adharaNumber' value={adharaNumber} onChange={(e)=>setAdharaNumber(e.target.value)}/>
                            <div className='text-danger'>{error.adharaNumber}</div>
                        </div>
                        <div className='mt-3'>
                            <label htmlFor='panNumber' className='form-label'>Enter Pan Number :</label>
                            <input type='text' className='form-control' id='panNumber' placeholder='Enter the Pan Number' value={panNumber} onChange={(e)=>setPanNumber(e.target.value)}/>
                            <div className='text-danger'>{error.panNumber}</div>
                        </div>
                        <div className='mt-3 mb-5 form-group'>
                            <label htmlFor='accountType' className='form-label'>Select The Account Type :</label>
                            <select id='accountType' className='form-control form-select' value={accountType} onChange={(e)=>setAccountType(e.target.value)} >
                                <option value="">Select Your Account-Type</option>
                                <option value="Saving">Saving-Account</option>
                                <option value="Current">Current-Account</option>
                                <option value="FD">FD-Account</option>
                            </select>
                            <div className='text-danger'>{error.accountType}</div>
                        </div>
                        <button type="button" className="btn res-btn1 p-2 btn-success mt-3" onClick={validateForm}>Create Account</button>
                        <button type="button" className="btn res-btn2 p-2 btn-success mt-3" onClick={handleReset}>Reset</button>
                        <div className="text-danger fs-5 text-center mt-4 mt-5">{error.general}</div>
                    </form>
                </div>
            </div>
        </div>
    )

}
    
export default CreateAccount;