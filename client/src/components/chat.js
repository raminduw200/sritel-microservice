import React, { useState } from 'react';
import '../styles/style.css';
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
    <a href="/dashboard" className="back-to-dashboard center" >Back to Dashboard</a>
    <div>
      <h2>Chat</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={message.className}>
              {message.text}
            </div>
          ))}
        </div>
        <br />
        <hr/>
        <div className="default-questions">
          {defaultQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question, index + 1)}
              className="question-button"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Chat;
