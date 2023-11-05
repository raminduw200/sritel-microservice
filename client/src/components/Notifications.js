import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notifications() {
    // Use state to store the data
    const [data, setData] = useState([]);

    // Use axios to get the data from backend
    useEffect(() => {
        axios.get('http://localhost:8082/userNotification/list')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center mb-3">
                <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h2 className="card-header text-center">Notifications</h2>
                        <div className="card-body">
                            <div className="list-group">
                                {data.map((notification) => (
                                    <Link to={`/${notification.url}`} className="list-group-item list-group-item-action flex-column align-items-start" key={notification.id}>
                                        <div className="d-flex w-100 justify-content-between">
                                            <h4 className="mb-1">{notification.notification}</h4>
                                            <small>{notification.date}</small>
                                        </div>
                                        <p className="mb-1">{notification.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
