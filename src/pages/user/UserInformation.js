import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaIdCard,FaVenusMars,FaBirthdayCake, FaHome } from "react-icons/fa";
import '../Home.css';
import { useNavigate, Link } from 'react-router-dom';
import UpdateUser from "./UpdateUser";


function UserInformation({ customerId }) {
    const [userDetails, setUserDetails] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch account details using the customerId
        async function fetchUserDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/banking/userdetails/${customerId}`);
                setUserDetails(response.data);
            } catch (err) {
                setError("Failed to fetch account details. Please try again later.");
                console.error(err);
            }
        }

        if (customerId) {
            fetchUserDetails();
        }
    }, [customerId]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!userDetails.length) {
        return <div className="alert alert-danger text-center mt-4">You don't have any accounts.</div>;
    }
     
    const customerID = userDetails.length > 0 ? userDetails[0].customerID: '';
     const firstName = userDetails.length > 0 ? userDetails[0].firstName: '';
     const lastName = userDetails.length > 0 ? userDetails[0].lastName:'';
     const email = userDetails.length > 0 ? userDetails[0].email:'';
     const phoneNumber = userDetails.length > 0 ? userDetails[0].phoneNumber:'';
     const gender = userDetails.length > 0 ? userDetails[0].gender:'';
     const age = userDetails.length > 0 ? userDetails[0].age: '';
     const address = userDetails.length > 0 ? userDetails[0].address : '';
     const adharaNumber = userDetails.length > 0 ? userDetails[0].adharaNumber:'';
     const panNumber=userDetails.length > 0 ? userDetails[0].panNumber:'';
 

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow-lg border-0 mb-4">
                <div className="card-header bg-success text-white">
                    <h2 className="mb-0 text-center">User Profile</h2>
                </div>
                <div className="card-body ml-5">
                {customerId && (
                        <div className="mb-3">
                            <p className="fs-5"><FaIdCard /> Customer ID NUmber : <span className="fs-6 text-primary">{customerId}</span></p>
                        </div>
                    )}

                    {firstName && (
                        <div className="mb-3">
                            <p className="fs-5"><FaUser /> Customer Name: <span className="fs-6 text-primary">{firstName} {lastName}</span></p>
                        </div>
                    )}

                     {email && (
                        <div className="mb-3">
                            <p className="fs-5"><FaEnvelope /> Customer Email: <span className="fs-6 text-primary">{email}</span></p>
                        </div>
                    )}

                      {phoneNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaPhone /> Customer phoneNumber: <span className="fs-6 text-primary">{phoneNumber}</span></p>
                        </div>
                    )}
                     {gender && (
                        <div className="mb-3">
                            <p className="fs-5">< FaVenusMars /> Customer Gender: <span className="fs-6 text-primary">{gender}</span></p>
                        </div>
                    )}
                    {age && (
                        <div className="mb-3">
                            <p className="fs-5">< FaBirthdayCake /> Customer Age: <span className="fs-6 text-primary">    {age}</span></p>
                        </div>
                    )}
                    {address && (
                        <div className="mb-3">
                            <p className="fs-5">< FaHome /> Customer Address: <span className="fs-6 text-primary">{address}</span></p>
                        </div>
                    )}
                    {adharaNumber && (
                        <div className="mb-3">
                            <p className="fs-5">< FaIdCard /> Customer AdharaNumber: <span className="fs-6 text-primary">{adharaNumber}</span></p>
                        </div>
                    )}
                    {panNumber && (
                        <div className="mb-3">
                            <p className="fs-5">< FaIdCard /> Customer PanNumber: <span className="fs-6 text-primary">{panNumber}</span></p>
                        </div>
                    )}
                    
                    <div className="table-responsive mt-5 mb-5">
                    <h2 className="mb-0 text-center bg-secondary text-white">Account Details</h2>
                        <table className="table table-striped table-hover table-bordered mt-3">   
                            <thead className="bg-light">
                                <tr className="text-center">
                                    <th>Account Number</th>
                                    <th>Account Type</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetails.map((user, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{user.accountNumber}</td>
                                        <td>{user.accountType}</td>
                                        <td>{user.createdDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-2 mb-5 text-center">
                        <Link to={`/UpdateUser/${customerId}`}>
                         <button className="btn btn-outline-success bg-success text-white fs-5">Update Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
