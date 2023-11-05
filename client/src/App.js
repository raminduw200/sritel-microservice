import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Bills from './components/Bills';
import PaymentHistory from './components/PaymentHistory';
import PayNow from './components/PayNow';
import Chat from './components/chat';
import Profile from './components/Profile';
import Help from './components/Help';
import Notifications from './components/Notifications';
import { Navbar } from 'react-bootstrap';
import { FaPhoneSquareAlt } from 'react-icons/fa';

function App() {
    return (
        <div className="App">
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
                <Navbar.Brand href="/" className="d-flex align-items-center ps-5"> {/* Added ps-3 for padding start (left) */}
                    <FaPhoneSquareAlt className="me-2" size={30} />
                    <span className="h3 mb-0" style={{ lineHeight: '1' }}>Sri-Tel</span>
                </Navbar.Brand>
            </Navbar>
            <main className="container mt-3">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<LoginForm />} />
                        <Route path="/registration" element={<RegistrationForm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/bills" element={<Bills />} />
                        <Route path="/payment-history" element={<PaymentHistory />} />
                        <Route path="/pay-now" element={<PayNow />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/notifications" element={<Notifications />} />
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;
