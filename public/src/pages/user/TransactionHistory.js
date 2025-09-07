import React,{useState} from "react";
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TransactionInformation from "./TransactionInformation";

function TransactionHistory()
{
    const[accountNumber,setAccountNumber]=useState('');
    const[error,setError]=useState({});
    const { logout } = useAuth();
    const navigate = useNavigate();


    const userSchema=yup.object().shape({
        accountNumber:yup.number().typeError("Account Number Must be 10 Number").integer("Account Number Must Be Integer").required("Account Number is required")
    });



    async function validateForm()
    {
        try
        {
            await userSchema.validate({accountNumber},{abortEarly:false});
            setError({});
            navigate(`/pages/user/TransactionInformation/${accountNumber}`);
        }
        catch(error)
        {
            const errorMessages={};
            error.inner.forEach(
               (e) => {
                errorMessages[e.path]=e.message;
               } 
            );
            setError(errorMessages);
        }
    }

    function handleReset()
    {
        setAccountNumber('');
        setError({});
    }


    const handleLogout = () => {
        logout();
        navigate('/pages/Home');
    };


    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="card  p-4">
                        <h2 className="text-center mb-4">Transaction History</h2>
                        <form>
                        <div className='form-group mb-3'>
                                <label htmlFor='accountNumber' className='form-label'>Enter Account Number</label>
                                <input type='text' className={`form-control ${error.accountNumber ? 'is-invalid' : ''}`} id='accountNumber'  placeholder='Enter Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                                {error.accountNumber && <div className='invalid-feedback'>{error.accountNumber}</div>}
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

export default TransactionHistory;