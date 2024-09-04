import React, { useEffect, useState } from "react";
import axios from "axios";

function AccountInformation({ customerId }) {
    const [accountDetails, setAccountDetails] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch account details using the customerId
        async function fetchAccountDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/banking/details/${customerId}`);
                setAccountDetails(response.data);
            } catch (err) {
                setError("Failed to fetch account details. Please try again later.");
                console.error(err);
            }
        }

        if (customerId) {
            fetchAccountDetails();
        }
    }, [customerId]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!accountDetails.length) {
        return <div className="text-danger">You Don't have any Account...</div>;
    }

    // Extract the firstName from the first account detail
    const firstName = accountDetails.length > 0 ? accountDetails[0].firstName : '';

    return (
        <div className="container mt-4">
            <h2>Account Information</h2>
            {firstName && (
                <div className="mb-3">
                    <p className="fs-5">Customer Name : <span className="fs-4 text-primary">{firstName}</span></p>
                </div>
            )}
            {accountDetails.map((account, index) => (
                <div key={index} className="card p-4 mb-3">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>Account Number</h5>
                            <p>{account.accountNumber}</p>
                        </div>
                        <div className="col-md-6">
                            <h5>Account Type</h5>
                            <p>{account.accountType}</p>
                        </div>
                        <div className="col-md-6">
                            <h5>Initial Deposit</h5>
                            <p>₹ {account.initialDeposit}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AccountInformation;
