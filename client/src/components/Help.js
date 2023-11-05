import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Help() {
    const [feedback, setFeedback] = useState('');
    const [helpdesk, setHelpdesk] = useState('');
    const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
    const [isHelpdeskSubmitted, setIsHelpdeskSubmitted] = useState(false);

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleHelpdeskChange = (event) => {
        setHelpdesk(event.target.value);
    };

    const handleFeedbackSubmit = (event) => {
        event.preventDefault();
        setIsFeedbackSubmitted(true);
    };

    const handleHelpdeskSubmit = (event) => {
        event.preventDefault();
        setIsHelpdeskSubmitted(true);
    };

    return (
        <>
            <a href="/dashboard" className="btn btn-link center">Back to Dashboard</a>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <h2 className="card-header text-center">Feedback and Helpdesk</h2>
                            <div className="card-body">
                                <div className="mb-3">
                                    <h5>Feedback</h5>
                                    {isFeedbackSubmitted ? (
                                        <p className="alert alert-success">Thank you for your feedback!</p>
                                    ) : (
                                        <form onSubmit={handleFeedbackSubmit}>
                                            <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={feedback}
                                                onChange={handleFeedbackChange}
                                                placeholder="Type your feedback here..."
                                                required
                                            />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit Feedback</button>
                                        </form>
                                    )}
                                </div>
                                <div className="mt-4">
                                    <h5>Helpdesk</h5>
                                    {isHelpdeskSubmitted ? (
                                        <p className="alert alert-success">Your helpdesk request has been submitted.</p>
                                    ) : (
                                        <form onSubmit={handleHelpdeskSubmit}>
                                            <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={helpdesk}
                                                onChange={handleHelpdeskChange}
                                                placeholder="Type your helpdesk request here..."
                                                required
                                            />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit Helpdesk Request</button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Help;
