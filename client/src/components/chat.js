import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const defaultQuestions = [
    "Are there any discounts available for long-term subscriptions?",
    "Is there a trial period available for your services?",
    "What do I do if I encounter technical issues while using your platform?",
    "What is the process for making online payments for my telecommunications services?",
    "Where can I access my current and previous bills on the Sri-Care platform?",
    "Which payment methods do you accept for online bill payments?",
    "Could you guide me on setting up email notifications for my account?",
    "What are the operational hours for customer care agents available for live chat support?"
  ];

  const [chatMessages, setChatMessages] = useState([
    { text:"Hi! How may I help you today? :)", className: "message" }
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