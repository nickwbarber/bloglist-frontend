import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const ok = await login({ username, password });
    if (!ok) {
      return;
    }
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form id="loginForm" onSubmit={handleLogin}>
        <div>
          username
          {' '}
          <input
            id="usernameInput"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          {' '}
          <input
            id="passwordInput"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
