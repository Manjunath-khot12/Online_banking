import React, { useState } from "react";
import * as yup from 'yup';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BillStatement.css'; // Custom CSS for additional styling

function BillStatement() {
    const [accountNumber, setAccountNumber] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false); // State to handle loading

    const userSchema = yup.object().shape({
        accountNumber: yup.number()
            .typeError("Account Number must be a number")
            .integer("Account Number must be an integer")
            .required("Account Number is required"),
        fromDate: yup.date()
            .typeError("Invalid date format")
            .max(new Date(), 'Date cannot be in the future')
            .required("From date is required"),
        toDate: yup.date()
            .typeError("Invalid date format")
            .max(new Date(), 'Date cannot be in the future')
            .required("To date is required")
    });

    async function validateForm() {
        try {
            await userSchema.validate({ accountNumber, fromDate, toDate }, { abortEarly: false });
            setError({});
            handleSubmit();
        } catch (error) {
            const errorMessages = {};
            error.inner.forEach((e) => {
                errorMessages[e.path] = e.message;
            });
            setError(errorMessages);
        }
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            // Mock submission or API call
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating network delay
            alert('Bill Statement generated successfully.');
        } catch (error) {
            console.error("Error during submission:", error);
            alert('An error occurred while generating the bill statement.');
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setAccountNumber('');
        setFromDate('');
        setToDate('');
        setError({});
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Card className="card p-4 bg-white">
                        <Card.Body>
                            <h2 className="text-center mb-4">Bank Statement</h2>
                            <Form>
                                <Form.Group controlId="formAccountNumber">
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your account number"
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                    />
                                    <Form.Text className="text-danger">{error.accountNumber}</Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formFromDate">
                                    <Form.Label>From Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                    <Form.Text className="text-danger">{error.fromDate}</Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formToDate">
                                    <Form.Label>To Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                    <Form.Text className="text-danger">{error.toDate}</Form.Text>
                                </Form.Group>
                                {loading && (
                                    <div className="d-flex justify-content-center my-3">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                )}
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="success" onClick={validateForm} disabled={loading}>
                                        {loading ? "Generating..." : "Generate Statement"}
                                    </Button>
                                    <Button variant="secondary" onClick={handleReset} disabled={loading}>
                                        Reset
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default BillStatement;
