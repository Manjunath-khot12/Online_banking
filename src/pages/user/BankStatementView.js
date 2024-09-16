import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import '../Home.css';

function BankStatementView() {
    const { accountNumber, fromDate, toDate } = useParams();
    const [accountDetails, setAccountDetails] = useState({
        statementSummary: [],
        totalAmount: [],
        transactions: [],
    });
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchAccountDetails() {
            try {
                // Fetching account details and transaction data concurrently
                const [response1, response2, response3] = await Promise.all([
                    axios.get(`http://localhost:8080/banking/bankstatement/${accountNumber}`),
                    axios.get(`http://localhost:8080/banking/bankbill/${accountNumber}?startDate=${fromDate}&endDate=${toDate}`),
                    axios.get(`http://localhost:8080/banking/bankhistory/${accountNumber}?startDate=${fromDate}&endDate=${toDate}`)
                ]);

                // Merging all the fetched data
                const statementSummary = response1.data;
                const totalAmount = response2.data;
                const transactions = response3.data;

                setAccountDetails({ statementSummary, totalAmount, transactions });

            } catch (err) {
                setError("Failed to fetch account details. Please try again later.");
                console.error(err);
            }
        }

        if (accountNumber) {
            fetchAccountDetails();
        }
    }, [accountNumber, fromDate, toDate]);

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text("Bank Statement", 105, 10, { align: 'center' });
        doc.text(`Account Number: ${accountNumber}`, 10, 20);
        doc.text(`Statement Period: ${fromDate} to ${toDate}`, 10, 30);
        
        doc.text("Customer Information", 10, 40);
        const summary = accountDetails.statementSummary[0];
        if (summary) {
            doc.text(`Account Holder Name: ${summary[0]} ${summary[1]}`, 10, 50);
            doc.text(`Account Type: ${summary[2]}`, 10, 60);
            doc.text(`Account Balance: ₹${summary[4]}`, 10, 70);
        }

        doc.text("Amount Information", 10, 80);
        const total = accountDetails.totalAmount[0];
        if (total) {
            doc.text(`Total Deposits: ₹${total[0]}`, 10, 90);
            doc.text(`Total Withdrawals: ₹${total[1]}`, 10, 100);
            doc.text(`Total Bills: ₹${total[2]}`, 10, 110);
        }

        doc.text("Transaction Information", 10, 120);
        const tableRows = accountDetails.transactions.map((transaction) => [
            transaction[2], // Date
            transaction[3], // Description
            `₹${transaction[1]}`, // Amount
            transaction[4] // Type
        ]);

        doc.autoTable({
            head: [['Date', 'Description', 'Amount', 'Type']],
            body: tableRows,
            startY: 130,
        });

        doc.save(`bank_statement_${accountNumber}.pdf`);
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!accountDetails.transactions.length) {
        return <div className="alert alert-danger text-center mt-4">You don't have any transactions in this period.</div>;
    }

    const { statementSummary, transactions, totalAmount } = accountDetails;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card border-1 p-5">
                        <h2 className="text-decoration-underline text-primary text-center mb-4 mt-2">Bank Statement</h2>
                        {/* Account Statement Header */}
                        <p className="text-center fs-4 mb-0">
                            <strong>Account Statement for Account Number: <span className="text-primary">{accountNumber}</span> </strong>
                        </p>
                        <p className="text-center fs-5">
                            <strong>Statement Period:</strong> <span className="text-primary">{fromDate} to {toDate}</span>
                        </p>

                        {/* Statement Summary */}
                        <div className="statement-summary">
                            <h4 className="text-decoration-underline text-primary mb-4 mt-5">Customer Information</h4>
                            {statementSummary.length > 0 ? (
                                statementSummary.map((item, index) => (
                                    <div key={index}>
                                        <p><strong>Account Holder Name:</strong> {item[0]} {item[1]}</p>
                                        <p><strong>Account Type:</strong> {item[2]}</p>
                                        <p><strong>Account Number:</strong> {item[3]}</p>
                                        <p><strong>Account Balance:</strong> ₹{item[4]}</p>
                                        <p><strong>Bank Name:</strong> ExcleR Bank</p>
                                    </div>
                                ))
                            ) : (
                                <p>No account summary available.</p>
                            )}
                        </div>

                        {/* Amount Information */}
                        <div className="statement-summary">
                            <h4 className="text-decoration-underline text-primary mb-4 mt-5">Amount Information</h4>
                            {totalAmount.length > 0 ? (
                                <div>
                                    <p><strong>Total Deposits:</strong> ₹{totalAmount[0][0] || "0.00"}</p>
                                    <p><strong>Total Withdrawals:</strong> ₹{totalAmount[0][1] || "0.00"}</p>
                                    <p><strong>Total Bills:</strong> ₹{totalAmount[0][2] || "0.00"}</p>
                                </div>
                            ) : (
                                <p>No amount summary available.</p>
                            )}
                        </div>

                        {/* Transactions Table */}
                        <h4 className="text-decoration-underline text-primary mb-4 mt-5">Transaction Information</h4>
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td>{transaction[2] || ""}</td>
                                            <td>{transaction[3] || ""}</td>
                                            <td>₹{transaction[1] || "0.00"}</td>
                                            <td>{transaction[4] || ""}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No transactions available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Download PDF Button */}
                        <div className="text-center mt-4">
                            <button className="btn btn-primary" onClick={downloadPdf}>Download as PDF</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankStatementView;
