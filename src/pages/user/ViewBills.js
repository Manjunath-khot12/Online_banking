import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FaTint, FaGasPump, FaHome, FaBolt, FaMobileAlt } from 'react-icons/fa'; // Icons for various bill types
import './ViewBill.css'; // Custom CSS for styling
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function ViewBills() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { customerId} = useParams();

    // Fetch bills from the API when the component mounts
    useEffect(() => {
        async function fetchBills() {
            try {
                const response = await axios.get(`http://localhost:8080/banking/viewbillsById/${customerId}`);
                // Transform the response data into a suitable format
                const formattedBills = response.data.map(([billName, billType, provider], index) => ({
                    billId: index + 1, // Generating a unique ID for each bill
                    billName,
                    billType,
                    provider
                }));
                setBills(formattedBills);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch bills. Please try again later.');
                setLoading(false);
            }
        }
        if (customerId) {
            fetchBills();
        }
    }, [customerId]); // Add customerId to the dependency array

    // Function to return the correct icon based on bill type
    const getIcon = (billType) => {
        if (!billType) {
            return null; // Handle missing or undefined billType
        }

        switch (billType.toLowerCase()) {
            case 'water':
                return <FaTint className="bill-icon" />;
            case 'gas':
                return <FaGasPump className="bill-icon" />;
            case 'rent':
                return <FaHome className="bill-icon" />;
            case 'electricity':
                return <FaBolt className="bill-icon" />;
            case 'mobile':
                return <FaMobileAlt className="bill-icon" />;
            default:
                return null;
        }
    };

    // Conditionally render loading spinner, error message, or bill cards
    return (
        <div className="container mt-5">
           
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : (
                <div className="row">
                    {bills.map((bill) => (
                        <div className="col-md-4 mb-4" key={bill.billId}>
                            <Card className="shadow-sm h-100">
                                <Card.Body className="d-flex flex-column align-items-center">
                                    {/* Icon */}
                                    {getIcon(bill.billType)}
                                    {/* Bill Name */}
                                    <Card.Title className="text-primary mt-3">{bill.billName || 'N/A'}</Card.Title>
                                    {/* Bill Details */}
                                    <Card.Text>
                                        <strong>Type:</strong> {bill.billType ? bill.billType.charAt(0).toUpperCase() + bill.billType.slice(1) : 'N/A'}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Provider:</strong> {bill.provider || 'N/A'}
                                    </Card.Text>
                                    {/* Pay Button */}
                                    <Link 
                                        to={`/pages/user/PayBill/${bill.billName || 'N/A'}/${bill.billType || 'N/A'}/${bill.provider || 'N/A'}`}
                                    >
                                        <Button variant="success" className="w-100 mt-auto pay-button">
                                            Pay Bill
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewBills;
