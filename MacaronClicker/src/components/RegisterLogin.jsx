import React, { useState, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import './RegisterLogin.css';

function RegisterLogin() {
  const { registerUser, loginUser, logoutUser, user } = useContext(GameContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    registerUser(username, password);
  };

  const handleLogin = () => {
    loginUser(username, password);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="register-login-container">
      <h2 className="register-login-title">
        {user ? `Welcome, ${user.username}` : 'Register/Login'}
      </h2>
      {!user && (
        <>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button
              onClick={handleRegister}
              className="register-btn"
            >
              Register
            </button>
            <button
              onClick={handleLogin}
              className="login-btn"
            >
              Login
            </button>
          </div>
        </>
      )}
      {user && (
        <div className="welcome-message">
          <p>Logged in as {user.username}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </div>
  );
}

export default RegisterLogin;