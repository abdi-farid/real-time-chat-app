// components/UsernameForm.js
import React, { useState } from 'react';

const UsernameForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ minWidth: '400px' }}>
        <h1>Type your username to enter the Chatroom</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-100">Start Chatting</button>
        </form>
      </div>
    </div>
  );
};

export default UsernameForm;
