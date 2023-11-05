import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { useEffect, useState } from 'react';

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
            console.log(data)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
    



    const navigate = useNavigate();

    const navigateToHistory = () => {
        navigate('/payment-history');
    };

    // Function to handle the "Pay Now" button click
    const handlePayNowClick = (billData) => {
        // Navigate to the pay-now.js page and pass the billData as state
        navigate('/pay-now', { state: { billData } });
    };

    return (
        <>
        <a href="/dashboard" className="back-to-dashboard" >Back to Dashboard</a>
        <div className="form-container">
            <h2>Bill Viewing & Payment</h2>
            <div>
                <button onClick={navigateToHistory}>View Payment History</button>
            </div><br />
            <div className="form form-dashboard table-bill">
                <div>
                    <table>
                        <thead>
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
                                            <button onClick={() => handlePayNowClick(val)}>Pay now</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Bills to Pay available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}

export default Bills;
