import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-header text-center">Dashboard</h2>
                        <div className="card-body">
                            <p>Welcome John :)</p>
                            <div className="d-grid gap-2">  {/* Use grid for button layout */}
                                <button className="btn btn-primary" onClick={navigateToServices}>Services</button>
                                <button className="btn btn-primary" onClick={navigateToBills}>E-Bills</button>
                                <button className="btn btn-primary" onClick={navigateToChat}>Chat</button>
                                <button className="btn btn-primary" onClick={navigateToNotifications}>
                                    Notifications - <span className="badge bg-secondary">3</span>
                                </button>
                                <button className="btn btn-primary" onClick={navigateToProfile}>Profile</button>
                                <button className="btn btn-primary" onClick={navigateToHelp}>Feedback and Helpdesk</button>
                                <button className="btn btn-danger" onClick={navigateToLogin}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
