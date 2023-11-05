import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'

function Dashboard() {

    const navigate = useNavigate();

    const navigateToServices = () => {
        navigate('/services');
    };

    const navigateToBills = () => {
        navigate('/bills');
    };

    const navigateToChat = () => {
        navigate('/chat');
    };

    const navigateToNotifications = () => {
        navigate('/notifications');
    };

    const navigateToProfile = () => {
        navigate('/profile');
    };

    const navigateToHelp = () => {
        navigate('/help');
    };

    const navigateToLogin = () => {
        navigate('/');
    };

    return (
        <div className="form-container">
            <h2>Dashboard</h2>
            <p>Welcome John :)</p>
            <div className="form form-dashboard">
                <div>
                    <button onClick={navigateToServices}>Services</button>
                </div>
                <div>
                    <button onClick={navigateToBills}>E-Bills</button>
                </div>
                <div>
                    <button onClick={navigateToChat}>Chat</button>
                </div>
                <div>
                    <button onClick={navigateToNotifications}>Notifications - <label>3</label></button>
                </div>
                <div>
                    <button onClick={navigateToProfile}>Profile</button>
                </div>
                <div>
                    <button onClick={navigateToHelp}>Feedback and Helpdesk</button>
                </div>
                <div>
                    <button onClick={navigateToLogin}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
