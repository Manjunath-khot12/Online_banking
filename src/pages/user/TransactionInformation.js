import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Home.css';

function TransactionInformation({ accountNumber }) {
    const [transactionInformation, setTransactionInformation] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchTransactionDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/banking/account/${accountNumber}`);
                setTransactionInformation(response.data);
            } catch (err) {
                setError("Failed to fetch transaction details. Please try again later.");
                console.error(err);
            }
        }

        if (accountNumber) {
            fetchTransactionDetails();
        }
    }, [accountNumber]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!transactionInformation.length) {
        return <div className="text-danger text-center mt-4">You don't have any transaction details.</div>;
    }

    return (
        <div className="container-fluid mt-4">
            <div className="card shadow-lg border-0 mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0 text-center">Transaction Information</h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive mt-5 mb-5">
                        <table className="table table-striped table-hover table-bordered mt-3">
                            <thead className="bg-light">
                                <tr className="text-center">
                                    <th>Transaction ID</th>
                                    <th>Transaction Date</th>
                                    <th>Transaction Description</th>
                                    <th>From Account</th>
                                    <th>To Account</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionInformation.map((transaction, index) => (
                                    <tr key={index} className="text-center">
                                        <td>{transaction[0] || 'N/A'}</td>
                                        <td>{transaction[2] || 'N/A'}</td>
                                        <td>{transaction[3] || 'N/A'}</td>
                                        <td>{transaction[6] || 'N/A'}</td>
                                        <td>{transaction[5] || 'N/A'}</td>
                                        <td>₹ {transaction[1] !== undefined ? Number(transaction[1]).toLocaleString() : 'N/A'}</td>
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

export default TransactionInformation;
