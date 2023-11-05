import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const login_url = 'http://localhost:8222/api/authenticate/login'

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate('/registration');
    };

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = formData;
        console.log(formData);

        try {
            const response = await axios.post(login_url + "/" + email + "/" + password);
            if (response.data === "No Credentials") {
                alert("Login failed. Please provide both username and password.");
            } else if (response.data === "User not found") {
                alert("Login Failed. Invalid username or password.");
            } else if (response.data === "Success") {
                alert("Login Successful!")
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const { email, password } = formData;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-header text-center">Login Form</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="emailInput" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        id="emailInput"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="passwordInput" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        id="passwordInput"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            Do not have an account? <button className="btn btn-link" onClick={navigateToRegister}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
