// src/components/RegistrationModal.js
import React, { useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose, onRegister }) => {
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    // In a real app, you'd send this data to a server
    console.log('Registration successful!');
    onRegister(); // Call the handler from App.js
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="reg-username">Username</label>
            <input type="text" id="reg-username" required />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">Email</label>
            <input type="email" id="reg-email" required />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="reg-confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="close-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;