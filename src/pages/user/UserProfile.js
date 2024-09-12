import React, { useState } from "react";
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserProfile()
{
    const[customerId,setCustomerId]=useState('');
    const[error,setError]=useState({});
    const { logout } = useAuth();
    const navigate = useNavigate();


    const userSchema = yup.object().shape({
        customerId:yup.number().typeError("Customer Id Must Be a Number").integer("Customer Id must Be a Integer").required("Customer Id is Required")
    });

    async function validateForm()
    {
        try
        {
            await userSchema.validate({customerId},{abortEarly:false});
            setError({});
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

    function handleReset()
    {
        setCustomerId('');
        setError({});
    }
    
    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };

   return(
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="card shadow-lg p-4">
                    <h2 className="text-center text-bg-secondary mt-4 mb-4">User Profile</h2>
                    <form autoComplete="off">
                        <div className="form-group mb-4">
                            <label className="form-label mt-3" htmlFor="customerId">Enter Customer Id
                            </label>
                            <input className={`form-control ${error.customerId ? 'is-invalid' : ''}`} autoComplete="off" id="customerId" placeholder="Enter the Customer Id" value={customerId} onChange={(e)=>setCustomerId(e.target.value)}></input>
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
    </div>
   )
}
export default UserProfile;