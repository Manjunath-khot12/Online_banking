import axios from "axios";
import React,{useState} from "react";
import { useParams } from "react-router-dom";
import * as yup from 'yup';
import { useNavigate} from 'react-router-dom';

function UpdateUser() {
    const { customerId } = useParams();  // Get customerId from the URL
    const {firstName} =useParams();
    const {lastName} = useParams();
    const {gender} = useParams();
    const {adharaNumber} = useParams();
    const {panNumber} = useParams();
    const[age,setAge]=useState('');
    const[email,setEmail]=useState();
    const[phoneNumber,setPhoneNumber]=useState('');
    const[address,setAddress]=useState('');
    const[error,setError]=useState({});
    const navigate = useNavigate();


    const  userSchema=yup.object().shape({
        email:yup.string().email("invalid email id").required("email id is required"),
        age:yup.number().typeError("age must be number").integer("age must be in integer").required("age is required").min(7, 'Age must be at least 7 years').max(100, "Age must be below 100 years").required("Age is required"),
        phoneNumber:yup.string().matches(/^\d{10}$/, 'Mobile Number must be a 10-digit number').required("Mobile Number is required"),
        address:yup.string().required("address is required")
    });

    async function validateForm()
    {
        try
        {
            await userSchema.validate({email,age,phoneNumber,address},{abortEarly:false});
            setError({});
            handelSubmit();
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
    
    async function handelSubmit()
    {
        try
        {
            const response=await axios.put(`http://localhost:8080/banking/updateuser/${customerId}`,null,{
                params:{
                    age:age,
                    email:email,
                    phoneNumber:phoneNumber,
                    address:address
                }
            });
            if (response.status === 200) {
                alert("Profile Updated successfully.");
                navigate('/pages/user/UserProfile');
            }
        }
        catch(error)
        {
            setError({ general: 'Profile Update is failed..' });
        }
    }

    function handleReset()
    {
        setEmail('');
        setAge('');
        setPhoneNumber('');
        setAddress('');
        setError({});
    }

    return (
        <div className="container-fluid d-flex justify-content-center  p-5 mb-5">
            <div className="row shadow-lg justify-content-center">
                    <h2 className="text-center mb-5 mt-3">Update Profile</h2>
                <div className="col-md-10">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input type="text" className="form-control" id="firstName" value={firstName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input type="text" className="form-control" id="lastName" value={lastName}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                            <input type="number" placeholder="Enter the Phone Number" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <div className="text-danger">{error.phoneNumber}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="text" placeholder="Enter the Email Address" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="text-danger">{error.email}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <input type="number" placeholder="Enter the Age" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                            <div className="text-danger">{error.age}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <input type="text" placeholder="Enter the Address" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <div className="text-danger">{error.address}</div>
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="gender" className="form-label">Gender:</label>
                            <input type="text" className="form-control" id="gender" value={gender}/>
                        </div>
                        <button type="button" className="btn res-btn1 p-2 btn-success mt-3" onClick={validateForm}>
                            Update
                        </button>
                        <button type="button" className="btn res-btn2 p-2 btn-primary mt-3" onClick={handleReset}>
                            Reset
                        </button>
                        <div className="text-danger fs-5 text-center mt-4">{error.general}</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
