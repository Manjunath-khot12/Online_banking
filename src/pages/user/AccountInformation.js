import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPhone, FaIdCard } from "react-icons/fa";
import '../Home.css';
import { useParams } from "react-router-dom";

function AccountInformation() {
    const [accountDetails, setAccountDetails] = useState([]);
    const [error, setError] = useState("");
    const { accountNumber} = useParams();

    useEffect(() => {
        // Fetch account details using the accountNumber
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
        return <div className="alert alert-danger text-center mt-4">You don't have any accounts.</div>;
    }

    const account = accountDetails[0]; // Assuming accountDetails array has at least one element

    return (
        <div className="container mt-4">
            <div className="card border-1 mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0 text-center text-dark">Account Information</h2>
                </div>
                <div className="card-body" style={{ textAlign: 'left' }}>
                    {account.firstName && (
                        <div className="mb-3">
                            <p className="fs-5"><FaUser /> Customer Name: <span className="fs-6 text-primary">{account.firstName}</span></p>
                        </div>
                    )}
                    {account.email && (
                        <div className="mb-3">
                            <p className="fs-5"><FaEnvelope /> Email ID: <span className="fs-6 text-primary">{account.email}</span></p>
                        </div>
                    )}
                    {account.phoneNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaPhone /> Phone Number: <span className="fs-6 text-primary">{account.phoneNumber}</span></p>
                        </div>
                    )}
                    {account.adharaNumber && (
                        <div className="mb-3">
                            <p className="fs-5"><FaIdCard /> Aadhar Card Number: <span className="fs-6 text-primary">{account.adharaNumber}</span></p>
                        </div>
                    )}

                    <div className="table-responsive mt-5 mb-5">
                        <h2 className="mb-0 text-center bg-secondary text-white">Account Details</h2>
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
                                {accountDetails.map((acc, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{acc.accountNumber}</td>
                                        <td>{acc.accountType}</td>
                                        <td>₹ {acc.initialDeposit.toLocaleString()}</td>
                                        <td>{acc.createdDate}</td>
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
