import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const bill_URL = 'http://localhost:8222/api/bill-retrieval/paid-bills';

function PaymentHistory() {
    const [Data, setResponseData] = useState([]);

    useEffect(() => {
        axios.get(bill_URL)
            .then(response => {
                const data = response.data;
                setResponseData(data);
                console.log(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const navigate = useNavigate();

    const navigateToBills = () => {
        navigate('/bills');
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between mb-3">
                            <button className="btn btn-link" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                            <button className="btn btn-primary" onClick={navigateToBills}>View Current Bills</button>
                        </div>
                        <div className="card">
                            <h2 className="card-header text-center">Payment History</h2>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>Bill number</th>
                                            <th>Bill name</th>
                                            <th>Due date</th>
                                            <th>Amount</th>
                                            <th>Payment Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Data.map((val, key) => (
                                            <tr key={key}>
                                                <td>{val.billNumber}</td>
                                                <td>{val.billName}</td>
                                                <td>{val.dueDate}</td>
                                                <td>{val.amount}</td>
                                                <td>{val.paidDate}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentHistory;
