import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Spinner } from 'react-bootstrap';
import { FaTint, FaGasPump, FaHome, FaBolt, FaMobileAlt } from 'react-icons/fa'; // Icons for various bill types
import './ViewBill.css'; // Custom CSS for styling
import { useNavigate, Link } from 'react-router-dom';

function ViewBills() {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch bills from the API when the component mounts
    useEffect(() => {
        async function fetchBills() {
            try {
                const response = await axios.get('http://localhost:8080/banking/viewallbills');
                setBills(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch bills. Please try again later.');
                setLoading(false);
            }
        }
        fetchBills();
    }, []);

    

    // Function to return the correct icon based on bill type
    const getIcon = (billType) => {
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
            // Add more cases for other types of bills if needed
            default:
                return null;
        }
    };

    // Conditionally render loading spinner, error message, or bill cards
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 fs-2">All Bills</h2>
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
                                    <Card.Title className="text-primary mt-3">{bill.billName}</Card.Title>
                                    {/* Bill Details */}
                                    <Card.Text>
                                        <strong>Type:</strong> {bill.billType.charAt(0).toUpperCase() + bill.billType.slice(1)}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Provider:</strong> {bill.provider}
                                    </Card.Text>
                                    {/* Pay Button */}
                                    <Link   to={`/pages/user/PayBill/${bill.billName}/${bill.billType}/${bill.provider}`} >
                                    <Button variant="success" className="w-100 mt-auto pay-button" >Pay Bill
                                    </Button></Link>
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
