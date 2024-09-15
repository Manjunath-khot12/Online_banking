import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Home.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

    const downloadPDF = () => {
        const input = document.getElementById('transaction-table');

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save("transaction-information.pdf");
        });
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!transactionInformation.length) {
        return <div className="alert alert-danger text-center mt-4">You don't have any transaction details.</div>;
    }

    return (
        <div className="container-fluid mt-4">
            <div id="transaction-table" className="card border-0 mb-4">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0 text-center text-dark">Transaction Information</h2>
                </div>
                <div className="card-body">
                    <div className="table-responsive mt-1 mb-5">
                        <table className="table table-striped table-hover table-bordered mt-3">
                            <thead className="bg-light">
                                <tr className="text-center">
                                    <th>Transaction ID</th>
                                    <th>Transaction Date</th>
                                    <th>Transaction Description</th>
                                    <th>Transaction Type</th>
                                    <th>From Account</th>
                                    <th>To Account</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactionInformation.map((transaction, index) => {
                                    const transactionType = transaction[4]; // Assuming transactionType is at index 4
                                    const amount = transaction[1] !== undefined ? Number(transaction[1]).toLocaleString() : 'N/A';
                                    const isWithdraw = transactionType === 'withdraw';
                                    const isBillType = ['gas', 'electricity', 'Rent', 'water', 'mobile'].includes(transactionType);
                                    const isDeposit = transactionType === 'deposit' || !isBillType && !isWithdraw;
                                    const formattedAmount = isWithdraw || isBillType ? `- ₹ ${amount}` : `₹ ${amount}`;
                                    const color = isWithdraw || isBillType ? 'red' : (isDeposit ? 'blue' : 'inherit');
                                    const fontWeight = isWithdraw || isBillType ? 'bold' : 'normal';

                                    return (
                                        <tr key={index} className="text-center">
                                            <td>{transaction[0] || ''}</td>
                                            <td>{transaction[2] || ''}</td>
                                            <td>{transaction[3] || ''}</td>
                                            <td>{transactionType || ''}</td>
                                            <td>{transaction[6] || ''}</td>
                                            <td>{transaction[5] || ''}</td>
                                            <td style={{ color, fontWeight }}>
                                                {formattedAmount}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionInformation;
