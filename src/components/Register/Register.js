import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        navigate('/login');
      } else {
        setErrorMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleGoogleLogin = () => {
    window.location.href =
      'https://attendapp-backend.cloud-stacks.com/api/auth/google';
  };

  return (
    <div className="register-container">
      {/* Left Side */}
      <div className="register-left">
        <div className="overlay-text">
          <div className="logo">AttendOne</div>
          <h1>Welcome to AttendOne</h1>
          <p>Your event management solution</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="register-right">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Error/Success Messages */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {/* Form Fields */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="familyName">Family Name</label>
              <input
                type="text"
                id="familyName"
                name="familyName"
                placeholder="Family Name"
                value={formData.familyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>

            {/* Buttons */}
            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            <button
              type="button"
              className="btn-login"
              onClick={handleLoginClick}
            >
              Login
            </button>

            <button
              type="button"
              className="btn-google-login"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>

            <a href="/reset-password" className="forgot-password">
              Forgot Password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
