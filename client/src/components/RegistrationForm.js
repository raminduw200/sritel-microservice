import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const register_URL = 'http://localhost:8222/api/register/register';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        password: '',
    });

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/');
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(register_URL + "/" + formData.firstName + "/" + formData.lastName + "/" + formData.email + "/" + formData.password + "/" + formData.contactNumber);

            if (response.data === "Error") {
                alert("Registration failed. Please provide all the details.");
            } else if (response.data === "Success") {
                alert("Registration successful!");
                navigateToLogin();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-header text-center">Registration</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {Object.keys(formData).map((key) => (
                                    <div className="form-group mb-3" key={key}>
                                        <label htmlFor={key + "Input"} className="form-label">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</label>
                                        <input
                                            type={key === "password" || key === "email" ? key : "text"}
                                            className="form-control"
                                            id={key + "Input"}
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            Already have an account? <button className="btn btn-link" onClick={navigateToLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
