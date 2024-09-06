import React,{useState} from "react";
import * as yup from 'yup';

function Deposit()
{
    const[sourceAccount,setSourceAccount]=useState('');
    const[transactionType,setTransactionType]=useState('');
    const[transactionInfo,setTransactionInfo]=useState('');
    const[amount,setAmount]=useState('');
    const[error,setError]=useState({});


    const userSchema=yup.object().shape({
        sourceAccount:yup.number().typeError("Account Number Must Be Number").integer("Account Number Must Be Integer").required("Account Number Required"),
        transactionType:yup.string().required("Transaction type required"),
        transactionInfo:yup.string().required("transaction Information required"),
        amount:yup.number().typeError("Amount must be Number").min(100,"To deposit minimum 100 rupees required").required("amount required")
    });


    async function validateForm()
    {
        try
        {
            await userSchema.validate({
                sourceAccount,transactionType,transactionInfo,amount
            },{abortEarly:false});
            setError({});
        }
        catch(error)
        {
            const errorMessages={};
            error.inner.forEach((e)=>{
                errorMessages[e.path]=[e.message];
            });
            setError(errorMessages);
        }
    }
    
    function handleReset()
    {
        setSourceAccount('');
        setTransactionType('');
        setTransactionInfo('');
        setAmount('');
        setError({});
    }

    return(
        <div className="container mt-4 mb-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg p-4">
                    <h2 className="text-center mb-4">Deposit Page</h2>
                        <form>
                        <div className='form-group mb-3'>
                                <label htmlFor='sourceAccount' className='form-label'>Enter Account Number :</label>
                                <input type='number' className={`form-control ${error.sourceAccount ? 'is-invalid' : ''}`} id='sourceAccount' placeholder='Enter Source Account Number' value={sourceAccount} onChange={(e) => setSourceAccount(e.target.value)} />
                                {error.sourceAccount && <div className='invalid-feedback'>{error.sourceAccount}</div>}
                         </div>
                         <div className='form-group mb-3'>
                                <label htmlFor='TransactionType' className='form-label'>Transaction Type</label>
                                <select className={`form-control ${error.transactionType ? 'is-invalid' : ''}`} id='transactionType' value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                                    <option value=''>Select Transaction Type</option>
                                    <option value='own account'>Deposit</option>
                                </select>
                                {error.transactionType && <div className='invalid-feedback'>{error.transactionType}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='transactionInfo' className='form-label'>Enter Transaction Information :</label>
                                <input type='text' className={`form-control ${error.transactionInfo ? 'is-invalid' : ''}`} id='transactionInfo' placeholder='Enter Transaction Information' value={transactionInfo} onChange={(e) => setTransactionInfo(e.target.value)} />
                                {error.transactionInfo && <div className='invalid-feedback'>{error.transactionInfo}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <label htmlFor='amount' className='form-label'>Enter Amount :</label>
                                <input type='number' className={`form-control ${error.amount ? 'is-invalid' : ''}`} id='amount' placeholder='Enter Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                {error.amount && <div className='invalid-feedback'>{error.amount}</div>}
                            </div>
                         
                         <div className='text-center'>
                                <button type='button' className='btn btn-success me-2' onClick={validateForm}>Submit</button>
                                <button type='button' className='btn btn-secondary' onClick={handleReset}>Reset</button>
                            </div>
                            {error.general && <div className='text-danger text-center mt-4'>{error.general}</div>}

                            {/* <div className='text-center mt-4'>
                                <button className='btn btn-warning' onClick={handleLogout}>Logout</button>
                            </div> */}
                         </form>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Deposit;