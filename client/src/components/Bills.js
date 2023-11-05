import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const bill_URL = 'http://localhost:8222/api/bill-retrieval/pending-bills';

function Bills() {
    const [Data, setResponseData] = useState([]);

    useEffect(() => {
        axios.get(bill_URL)
            .then(response => {
                // Access the data array from the response
                const data = response.data;
                setResponseData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const navigate = useNavigate();

    const navigateToHistory = () => {
        navigate('/payment-history');
    };

    const handlePayNowClick = (billData) => {
        navigate('/pay-now', { state: { billData } });
    };

    return (
        <>
            <a href="/dashboard" className="btn btn-link my-3">Back to Dashboard</a>
            <div className="container">
                <div className="card">
                    <h2 className="card-header text-center">Bill Viewing & Payment</h2>
                    <div className="card-body">
                        <button onClick={navigateToHistory} className="btn btn-primary mb-3">View Payment History</button>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Bill number</th>
                                    <th>Bill name</th>
                                    <th>Due date</th>
                                    <th>Amount (LKR)</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Data.length > 0 ? (
                                    Data.map((val, key) => (
                                        <tr key={key}>
                                            <td>{val.billNumber}</td>
                                            <td>{val.billName}</td>
                                            <td>{val.dueDate}</td>
                                            <td>{val.amount}</td>
                                            <td>
                                                <button onClick={() => handlePayNowClick(val)} className="btn btn-success">Pay now</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">No Bills to Pay available</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Bills;
