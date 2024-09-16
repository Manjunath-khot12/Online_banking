import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaVenusMars, FaBirthdayCake, FaHome } from "react-icons/fa";
import '../Home.css';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function UserInformation() {
    const [userDetails, setUserDetails] = useState([]);
    const [error, setError] = useState("");
    const {customerId} = useParams();

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

    const user = userDetails[0]; // Assuming userDetails array has at least one element

    return (
        <div className="container mt-4">
            <div className="card border-1 mb-4">
                <div className="card-header bg-success text-white">
                    <h2 className="mb-0 text-center">User Profile</h2>
                </div>
                <div className="card-body" style={{ textAlign: 'left' }}>
                    {customerId && (
                        <div className="mb-3">
                            <p className="fs-5"><FaIdCard /> Customer ID Number: <span className="fs-6 text-primary">{customerId}</span></p>
                        </div>
                    )}

                    {user.firstName && (
                        <div className="mb-3">
                            <p className="fs-5"><FaUser /> Customer Name: <span className="fs-6 text-primary">{user.firstName} {user.lastName}</span></p>
                        </div>
                    )}

                    {user.email && (
                        <div className="mb-3">
                            <p className="fs-5"><FaEnvelope /> Customer Email: <span className="fs-6 text-primary">{user.email}</span></p>
                        </div>
                    )}

                    {user.phoneNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaPhone /> Customer Phone Number: <span className="fs-6 text-primary">{user.phoneNumber}</span></p>
                        </div>
                    )}

                    {user.gender && (
                        <div className="mb-3">
                            <p className="fs-5"><FaVenusMars /> Customer Gender: <span className="fs-6 text-primary">{user.gender}</span></p>
                        </div>
                    )}

                    {user.age && (
                        <div className="mb-3">
                            <p className="fs-5"><FaBirthdayCake /> Customer Age: <span className="fs-6 text-primary">{user.age}</span></p>
                        </div>
                    )}

                    {user.address && (
                        <div className="mb-3">
                            <p className="fs-5"><FaHome /> Customer Address: <span className="fs-6 text-primary">{user.address}</span></p>
                        </div>
                    )}

                    {user.adharaNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaIdCard /> Customer Adhara Number: <span className="fs-6 text-primary">{user.adharaNumber}</span></p>
                        </div>
                    )}

                    {user.panNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaIdCard /> Customer PAN Number: <span className="fs-6 text-primary">{user.panNumber}</span></p>
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
                    <div className="mt-2 mb-5 fs-5 text-center">
                        <Link to={`/pages/user/UpdateUser/${customerId}/${user.firstName}/${user.lastName}/${user.gender}/${user.age}/${user.adharaNumber}/${user.panNumber}`} className="btn btn-primary">Update Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserInformation;
