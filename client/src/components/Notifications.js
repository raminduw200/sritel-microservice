import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Notification.css'
import { Link } from 'react-router-dom';

function Notifications() {

    //use state to store the data
    const [data, setData] = useState([]);

    //use axios to get the data from backend
    useEffect(() => {
        axios.get('http://localhost:8082/userNotification/list')
            .then((response) => {
                setData(response.data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);    
    return (
        <>
            <a href="/dashboard" className="back-to-dashboard center">Back to Dashboard</a>
            <div className="notifications-page">
                <h2>Notifications</h2>
                <div className="notification-list">
                    {data.map((notification) => (
                        <Link to={`/${notification.url}`}><div className="notification" key={notification.id} >
                            <div className="notification-title">
                                <h4>{notification.notification}</h4>
                                <h5>{notification.date}</h5>
                            </div>
                            <p>{notification.description}</p>
                        </div></Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Notifications;
