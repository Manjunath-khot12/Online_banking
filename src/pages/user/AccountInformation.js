import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import '../Home.css';

function AccountInformation({ accountNumber }) {
    const [accountDetails, setAccountDetails] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch account details using the customerId
        async function fetchAccountDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/banking/details/${accountNumber}`);
                setAccountDetails(response.data);
            } catch (err) {
                setError("Failed to fetch account details. Please try again later.");
                console.error(err);
            }
        }

        if (accountNumber) {
            fetchAccountDetails();
        }
    }, [accountNumber]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!accountDetails.length) {
        return <div className="text-danger text-center mt-4">You don't have any accounts.</div>;
    }

    const firstName = accountDetails.length > 0 ? accountDetails[0].firstName : '';
    const adharaNumber = accountDetails.length > 0 ? accountDetails[0].adharaNumber : '';
    const email = accountDetails.length > 0 ? accountDetails[0].email : '';
    const phoneNumber = accountDetails.length > 0 ? accountDetails[0].phoneNumber : '';

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow-lg border-0 mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0 text-center">Account Information</h2>
                </div>
                <div className="card-body">
                    {firstName && (
                        <div className="mb-3">
                            <p className="fs-5"><FaUser /> Customer Name: <span className="fs-6 text-primary">{firstName}</span></p>
                        </div>
                    )}
                    {email && (
                        <div className="mb-3">
                            <p className="fs-5"><FaEnvelope /> Email ID: <span className="fs-6 text-primary">{email}</span></p>
                        </div>
                        
                    )}
                    {phoneNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaPhone /> Phone Number: <span className="fs-6 text-primary">{phoneNumber}</span></p>
                        </div>
                    )}
                    {adharaNumber && (
                        <div className="mb-1">
                            <p className="fs-5"><FaIdCard /> Aadhar Card Number: <span className="fs-6 text-primary">{adharaNumber}</span></p>
                        </div>
                    )}
                    
                    <div className="table-responsive mt-5 mb-5">
                        <table className="table table-striped table-hover table-bordered mt-3">   
                            <thead className="bg-light">
                                <tr className="text-center">
                                    <th>Account Number</th>
                                    <th>Account Type</th>
                                    <th>Balance</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountDetails.map((account, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{account.accountNumber}</td>
                                        <td>{account.accountType}</td>
                                        <td>₹ {account.initialDeposit.toLocaleString()}</td>
                                        <td>{account.createdDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInformation;
