import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';

const payment_URL = 'http://localhost:8222/api/bill-payment/verify-card';

function PayNow() {
    const [formData, setFormData] = useState({
        cardHolderName: '',
        cardNumber: '',
        cardExpiryMonth: '',
        cardExpiryYear: '',
        cardCVV: '',
    });

    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const billData = location.state?.billData;

    if (!billData) {
        return (
            <div className="alert alert-warning" role="alert">
                <h2 className="alert-heading">Payment Details</h2>
                <p>No payment data available.</p>
            </div>
        );
    }

    const showConfirmationDialog = () => {
        if (!formData.cardHolderName || !formData.cardNumber || !formData.cardExpiryMonth || !formData.cardExpiryYear || !formData.cardCVV) {
            alert("Please fill in all the required fields before proceeding.");
        } else {
            setShowConfirmation(true);
        }
    }

    const handleConfirmation = () => {
        setShowConfirmation(false);
    }

    const closeConfirmationDialog = () => {
        setShowConfirmation(false);
        navigate('/bills');
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { cardHolderName, cardNumber, cardExpiryMonth, cardExpiryYear, cardCVV } = formData;
        try {
            const response = await axios.post(payment_URL + "/" + cardNumber + "/" + cardHolderName + "/" + cardExpiryMonth + "/" + cardExpiryYear + "/" + cardCVV);
            alert(response.data);
            navigate('/bills');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <a href="/dashboard" className="btn btn-link" >Back to Dashboard</a>
                        <div className="card">
                            <h2 className="card-header">Payment Details</h2>
                            <div className="card-body">
                                <p>Bill Number: {billData.billNumber}</p>
                                <p>Bill Name: {billData.billName}</p>
                                <p>Due Date: {billData.dueDate}</p>
                                <p>Amount: {billData.amount}</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name on Card:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cardHolderName"
                                            value={formData.cardHolderName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Card Number:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Expiration Date:</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cardExpiryMonth"
                                                placeholder='MM'
                                                value={formData.cardExpiryMonth}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cardExpiryYear"
                                                placeholder='YY'
                                                value={formData.cardExpiryYear}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>CVV:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cardCVV"
                                            value={formData.cardCVV}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Pay Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="modal" tabindex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Payment Confirmation</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to make the payment?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={handleConfirmation}>Yes</button>
                                <button type="button" className="btn btn-secondary" onClick={closeConfirmationDialog}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PayNow;
