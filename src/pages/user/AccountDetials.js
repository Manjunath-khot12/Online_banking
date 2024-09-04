import React from "react";
import { useState } from "react";
import * as yup from 'yup';

function AccountDetails()
{
    const[customerId,setCustomerId]=useState('');
    const[error,setError]=useState({});

    const userSchema=yup.object().shape({
        customerId:yup.number().typeError("customer id must be a number").integer("customer id must be an integer").required("customer id is required")
    })
    return(
        <div className="container mt-4 justify-content-center">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <form>
                    <div className="mt-4">
                        <label htmlFor="customerId" className="form-label">Enter the customerID</label>
                        <input type="text" className="form-control" id="customerID" placeholder="Enter the Customer Id" value={customerId} onChange={(e)=> setCustomerId(e.target.value)}></input>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AccountDetails;
