import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [registerData, setRegisterData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    loginIdentifier: '',
    password: '',
  });

  const [registerError, setRegisterError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError('');
    try {
      const response = await axios.post(
        // 'https://attendapp-backend.cloud-stacks.com/api/auth/register',
        'http://localhost:5000/api/auth/register',
        {
          firstName: registerData.firstName,
          familyName: registerData.familyName,
          email: registerData.email,
          phoneNumber: registerData.phone,
          password: registerData.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setIsRegister(false);
      setRegisterData({
        firstName: '',
        familyName: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setRegisterError(error.response.data.error);
      } else {
        setRegisterError('An error occurred during registration.');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          loginIdentifier: loginData.loginIdentifier,
          password: loginData.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const { token } = response.data;
      localStorage.setItem('token', token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError('An error occurred during login.');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-background">
          <div className="login-overlay">
            <div className="login-logo">
              <h1>YourLogo</h1>
            </div>
            <div className="login-text">
              <h2>Welcome to AttendOne</h2>
              <p>Manage your events efficiently and effortlessly.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          <div className="form-toggle">
            <button onClick={() => setIsRegister(false)} className={!isRegister ? 'active' : ''}>
              Login
            </button>
            <button onClick={() => setIsRegister(true)} className={isRegister ? 'active' : ''}>
              Register
            </button>
          </div>
          {isRegister ? (
            <form className="register-form" onSubmit={handleRegisterSubmit}>
              {registerError && <p className="error-message">{registerError}</p>}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={registerData.firstName}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="familyName">Family Name</label>
                <input
                  type="text"
                  id="familyName"
                  name="familyName"
                  required
                  value={registerData.familyName}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={registerData.phone}
                  onChange={handleRegisterInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="registerPassword"
                    name="password"
                    required
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit">Register</button>
              </div>
            </form>
          ) : (
            <form className="login-form" onSubmit={handleLoginSubmit}>
              {loginError && <p className="error-message">{loginError}</p>}
              <div className="form-group">
                <label htmlFor="loginIdentifier">Email or Phone Number</label>
                <input
                  type="text"
                  id="loginIdentifier"
                  name="loginIdentifier"
                  required
                  value={loginData.loginIdentifier}
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <div className="form-group">
                <button type="submit">Login</button>
              </div>
              <div className="social-login">
                <button type="button" className="google-login" onClick={handleGoogleLogin}>
                  Sign in with Google
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;