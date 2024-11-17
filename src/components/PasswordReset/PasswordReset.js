import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PasswordReset.css';
import axios from 'axios';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      let message = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'Something went wrong';
      setErrorMessage(message);
      setSuccessMessage('');
    }
  }

  return (
    <div className="password-reset-container">
      <div className="left-section">
        <div className="background-image">
          <div className="overlay-text">
            <div className="logo">AttendOne</div>
            <h1>Reset Your Password</h1>
            <p>Enter your email to reset your password and continue managing your events.</p>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Password Reset</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="reset-button">Reset Password</button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="links">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;