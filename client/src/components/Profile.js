import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'De Silva',
        email: 'john@gmail.com',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const confirmSave = window.confirm('Are you sure you want to save changes?');
        if (confirmSave) {
            console.log('Edited Data:', formData);
            setIsEditing(false);
        }
    };

    const handleCancelClick = () => {
        setFormData({
            firstName: 'John',
            lastName: 'De Silva',
            email: 'john@gmail.com',
        });
        setIsEditing(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>User Profile</h2>
                            </div>
                            <div className="card-body">
                                {Object.entries(formData).map(([key, value]) => (
                                    <div key={key} className="form-group mb-2">
                                        <label className="mr-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={key}
                                                value={value}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <span className="ml-2">{value}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="card-footer text-center">
                                {isEditing ? (
                                    <>
                                        <button className="btn btn-success mr-2" onClick={handleSaveClick}>Save</button>
                                        <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                                    </>
                                ) : (
                                    <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                <a href="/dashboard" className="btn btn-link">Back to Dashboard</a>
            </div>
        </>
    );
}

export default Profile;
