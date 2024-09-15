import React, { useState } from "react";
import * as yup from 'yup';
import { Spinner } from 'react-bootstrap';
import axios from "axios";
import Swal from "sweetalert2";

function AddBiller() {
  const [billName, setBillName] = useState('');
  const [billType, setBillType] = useState('');
  const[provider,setProvider]=useState('');
  const[customerId,setCustomerId]=useState('');
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const userSchema = yup.object().shape({
    customerId:yup.number().typeError("customer id must be a number").integer("customer id must be a integer").required("customer id is required"),
    billName: yup.string().required("Bill name is required"),
    billType: yup.string().required("Bill type is required"),
    provider:yup.string().required("provider is required")
  });

  async function validateForm() {
    try {
      await userSchema.validate({ customerId,billName, billType,provider }, { abortEarly: false });
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
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8080/banking/addbiller?userId=${customerId}`, {billName, billType, provider});
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Bill added successfully.',
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
        title: 'Error!',
        text: 'Error in adding bill. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        customClass: {
            title: 'swal-title',
            content: 'swal-content',
            confirmButton: 'swal-confirm-button'
        }
    });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setBillName('');
    setBillType('');
    setProvider('');
    setCustomerId('');
    setError({});
  }

  const renderSubOptions = () => {
    if (billType === 'water') {
      return (
        <div className="form-group mt-3">
          <label htmlFor="waterBoard" className="form-label">Select Water Board:</label>
          <select
            className={`form-control ${error.provider ? 'is-invalid' : ''}`}
            id='waterBoard'
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value=''>Select Water Board</option>
            <option value='Bangalore Water Supply'>Bangalore Water Supply</option>
            <option value='Belagavi Water Dept'>Belagavi Water Dept</option>
            <option value='Hukkeri Water Dept'>Hukkeri Water Dept</option>
          </select>
          {error.provider && <div className='invalid-feedback'>{error.provider}</div>}
        </div>
      );
    } else if (billType === 'gas') {
      return (
        <div className="form-group mt-3">
          <label htmlFor="gasProvider" className="form-label">Select Gas Provider:</label>
          <select
            className={`form-control ${error.provider ? 'is-invalid' : ''}`}
            id='gasProvider'
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value=''>Select Gas Provider</option>
            <option value='Indane'>Indane</option>
            <option value='Bharat Gas'>Bharat Gas</option>
            <option value='HP Gas'>HP Gas</option>
          </select>
          {error.provider && <div className='invalid-feedback'>{error.provider}</div>}
        </div>
      );
    } else if (billType === 'electricity') {
      return (
        <div className="form-group mt-3">
          <label htmlFor="electricityProvider" className="form-label">Select Electricity Provider:</label>
          <select
            className={`form-control ${error.provider ? 'is-invalid' : ''}`}
            id='electricityProvider'
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value=''>Select Electricity Provider</option>
            <option value='BESCOM'>BESCOM</option>
            <option value='MESCOM'>MESCOM</option>
            <option value='HESCOM'>HESCOM</option>
          </select>
          {error.provider && <div className='invalid-feedback'>{error.provider}</div>}
        </div>
      );
    } else if (billType === 'Rent') {
      return (
        <div className="form-group mt-3">
          <label htmlFor="rentType" className="form-label">Select Rent Type:</label>
          <select
            className={`form-control ${error.provider ? 'is-invalid' : ''}`}
            id='rentType'
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value=''>Select Rent Type</option>
            <option value='Apartment Rent'>Apartment Rent</option>
            <option value='House Rent'>House Rent</option>
          </select>
          {error.provider && <div className='invalid-feedback'>{error.provider}</div>}
        </div>
      );
    } else if (billType === 'mobile') {
      return (
        <div className="form-group mt-3">
          <label htmlFor="mobileProvider" className="form-label">Select Mobile Provider:</label>
          <select
            className={`form-control ${error.provider ? 'is-invalid' : ''}`}
            id='mobileProvider'
            value={error.provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value=''>Select Mobile Provider</option>
            <option value='Airtel'>Airtel</option>
            <option value='Jio'>Jio</option>
            <option value='Vodafone Idea'>Vodafone Idea</option>
          </select>
          {error.provider && <div className='invalid-feedback'>{error.provider}</div>}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card  p-4">
            <h2 className="text-center mb-4">Add Bills</h2>
            <form>
              <div className="form-group mt-3">
                <label htmlFor="customerId" className="form-label">Enter Customer Id</label>
                <input id="customerId" className={`form-control ${error.customerId ? 'is-invalid' : ''}`} value={customerId} placeholder="Enter customer Id" onChange={(e)=>setCustomerId(e.target.value)}/>
                {error.customerId && <div className='invalid-feedback'>{error.customerId}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="billName" className="form-label">Bill Name :</label>
                <select className={`form-control ${error.billName ? 'is-invalid' : ''}`} id='billName' value={billName} onChange={(e) => setBillName(e.target.value)}>
                  <option value=''>Select Bill Name</option>
                  <option value='water bill'>Water Bill</option>
                  <option value='gas bill'>Gas Bill</option>
                  <option value='electricity bill'>Electricity Bill</option>
                  <option value='Rent bill'>Rent Bill</option>
                  <option value='Mobile bill'>Mobile Bill</option>
                </select>
                {error.billName && <div className='invalid-feedback'>{error.billName}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="billType" className="form-label">Bill Type :</label>
                <select className={`form-control ${error.billType ? 'is-invalid' : ''}`} id='billType' value={billType} onChange={(e) => setBillType(e.target.value)}>
                  <option value=''>Select Bill Type</option>
                  <option value='water'>Water </option>
                  <option value='gas'>Gas</option>
                  <option value='electricity'>Electricity</option>
                  <option value='Rent'>Rent</option>
                  <option value='mobile'>Mobile</option>
                </select>
                {error.billType && <div className='invalid-feedback'>{error.billType}</div>}
              </div>
              {renderSubOptions()}
              <div className='text-center mt-5 mb-3'>
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

export default AddBiller;
