// src/components/LoginModal.js

import React from 'react';
import './LoginModal.css'; // We will create this CSS file next

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    onLogin();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" defaultValue="user" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" defaultValue="password" required />
          </div>
          <div className="modal-actions">
            <button type="button" className="close-button" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="submit-button">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;