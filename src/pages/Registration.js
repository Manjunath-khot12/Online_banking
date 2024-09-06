import React, { useState } from "react";
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';


function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [createdDate,setCreatedDate]=useState('');
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();

    const userSchema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string(),
        phoneNumber: yup.string().matches(/^\d{10}$/, 'Mobile Number must be a 10-digit number').required("Mobile Number is required"),
        age: yup.number().typeError("Age must be a number").integer("Age must be an integer").min(7, 'Age must be at least 7 years').max(100, "Age must be below 100 years").required("Age is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must have a minimum of 8 characters").required("Password is required"),
        address: yup.string().required("Address is required"),
        gender: yup.string().required("Gender is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ firstName, lastName, phoneNumber, age, email, password, address, gender , createdDate }, { abortEarly: false });
            setErrors({});
            handleSubmit();
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setErrors(errorMessages);
        }
    }

    async function handleSubmit() {
        console.log("Submitting data:", { firstName, lastName, phoneNumber, age, email, password, address, gender,createdDate });
        try {
            const response = await axios.post('http://localhost:8080/banking/register', {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                password: password,
                age: age,
                address: address,
                gender: gender,
                createdDate:createdDate
            });

            if (response.status === 200) {
                alert("Registration Successful\n\n"+
                       "Your Login Details will be send through your Registered email id");
                navigate('/pages/login');
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrors({ general: 'Already have Account.' });
        }
    }
    
   

   function handleReset()
   {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
         setPassword('');
         setAge('');
         setAddress('');
         setGender('');
         setErrors({});
   }


    return (
        <div className="container-fluid d-flex justify-content-center  p-5 mb-5">
            <div className="row shadow-lg   justify-content-center">
            <p id="Registration-heading">Registration Page</p>
                <div className="col-md-10">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name:</label>
                            <input type="text" placeholder="Enter the First Name" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <div className="text-danger">{errors.firstName}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name:</label>
                            <input type="text" placeholder="Enter the Last Name" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <div className="text-danger">{errors.lastName}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                            <input type="text" placeholder="Enter the Phone Number" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <div className="text-danger">{errors.phoneNumber}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="text" placeholder="Enter the Email Address" className="form-control" id="email" value={email} onChange={(e) =>setEmail(e.target.value)} />
                            <div className="text-danger">{errors.email}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" placeholder="Enter the Password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="text-danger">{errors.password}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <input type="number" placeholder="Enter the Age" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                            <div className="text-danger">{errors.age}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address:</label>
                            <input type="text" placeholder="Enter the Address" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <div className="text-danger">{errors.address}</div>
                        </div>
                        <div className="mb-3 form-group">
                            <label htmlFor="gender" className="form-label">Gender:</label>
                            <select id="gender" className="form-control form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div className="text-danger">{errors.gender}</div>
                        </div>
                        <button type="button" className="btn res-btn1 p-2 btn-success mt-3" onClick={validateForm}>Submit</button>
                        <button type="button" className="btn res-btn2 p-2 btn-primary mt-3" onClick={handleReset}>Reset</button>
                        <div className="text-danger fs-5 text-center mt-4">{errors.general}</div>
                        
                    </form>
                    <div className="mt-4 mb-5 fs-5 text-center">
                        <Link  className="text-center" to="/pages/login">Already Register?Login Here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
