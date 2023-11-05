import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const defaultQuestions = [
    "How can I contact support?",
    "Tell me more about your services.",
    "Where can I view my current and past bills on the Sri-Care platform?",
    "How can I make online payments for my telecommunications services?",
    "How can I view my payment history?",
    "What payment methods are accepted for online bill payments?",
    "How do I set up email notifications for my account?",
    "What are the customer care agents' working hours for live chat support?"
  ];

  const [chatMessages, setChatMessages] = useState([
    { text:"Hello! How can I help you? :)", className: "message" }
  ]);

  const handleQuestionClick = (question, id) => {
    // Add the user's question to chatMessages
    setChatMessages(prevMessages => [...prevMessages, { text: question, className: "message user" }]);
    SendQuestionToBackend(id);
  };

  const SendQuestionToBackend = (id) => {
    axios.get(`http://localhost:8222/api/chat/messages/${id}`)
      .then(response => {
        const newData = response.data;

        // Add the response to chatMessages
        setChatMessages(prevMessages => [...prevMessages, { text: newData, className: "message" }]);
        console.log(newData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
      <>
        <div className="container my-3">
          <a href="/dashboard" className="btn btn-link mb-2">Back to Dashboard</a>
          <div className="card">
            <h2 className="card-header">Chat</h2>
            <div className="card-body">
              <div className="chat-messages list-group mb-3">
                {chatMessages.map((message, index) => (
                    <div key={index} className={`list-group-item ${message.className === 'message user' ? 'list-group-item-primary' : ''}`}>
                      {message.text}
                    </div>
                ))}
              </div>
              <hr />
              <div className="default-questions">
                {defaultQuestions.map((question, index) => (
                    <button
                        key={index}
                        onClick={() => handleQuestionClick(question, index + 1)}
                        className="btn btn-outline-primary m-1"
                    >
                      {question}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Chat;